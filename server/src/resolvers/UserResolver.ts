import { verify } from 'argon2';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { COOKIE_NAME } from '../constants';
import { User } from '../entities/User';
import { isUser } from '../middlewares/isUser';
import { MyContext } from '../MyContext';
import {
  LoginResult,
  RegisterInput,
  RegisterResult,
} from '../typeDefs/userTypes';
import { extractErrors } from '../utils/extractErrors';
import { tokenToCookie } from '../utils/tokenToCookie';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isUser)
  me(@Ctx() { res, userLoader }: MyContext) {
    return userLoader.load(res.locals.userId);
  }

  @Mutation(() => RegisterResult)
  async register(
    @Arg('registerInput') { email, name, password }: RegisterInput
  ): Promise<RegisterResult> {
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      return {
        errors: [
          {
            path: 'email',
            message: 'An account with this email already exists, please login.',
          },
        ],
      };
    }
    const user = User.create({ email, name, password });
    const { errors } = await extractErrors(user);
    if (errors) return { errors };

    await user.save();
    return { ok: true };
  }

  @Mutation(() => LoginResult)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResult> {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        errors: [{ path: 'email', message: 'This email is not registered' }],
      };
    }
    const valid = await verify(user.password, password);
    if (!valid) {
      return {
        errors: [{ path: 'password', message: 'Incorrect password' }],
      };
    }
    tokenToCookie(user, res);
    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { res }: MyContext) {
    res.clearCookie(COOKIE_NAME);
    return true;
  }
}
