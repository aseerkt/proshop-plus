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
import { isAuth } from '../middlewares/isAuth';
import { isUser } from '../middlewares/isUser';
import { MyContext } from '../MyContext';
import {
  UserResult,
  RegisterInput,
  OkResult,
  ChangePasswordArgs,
} from '../typeDefs/userTypes';
import { extractErrors } from '../utils/extractErrors';
import { tokenToCookie } from '../utils/tokenToCookie';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isUser)
  me(@Ctx() { res, userLoader }: MyContext) {
    if (res.locals.userId) return userLoader.load(res.locals.userId);
    return null;
  }

  @Mutation(() => OkResult)
  async register(
    @Arg('registerInput') { email, name, password }: RegisterInput
  ): Promise<OkResult> {
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

  @Mutation(() => UserResult)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<UserResult> {
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

  @Mutation(() => UserResult)
  @UseMiddleware(isAuth)
  async editProfile(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Ctx() { res }: MyContext
  ): Promise<UserResult> {
    const user = await User.findOne(res.locals.userId);
    if (!user)
      return { errors: [{ path: 'unknow', message: 'User not found' }] };
    user.name = name;
    user.email = email;
    const { errors } = await extractErrors(user);
    if (errors) return { errors };
    await user.save();
    return { user };
  }

  @Mutation(() => OkResult)
  @UseMiddleware(isAuth)
  async changePassword(
    @Arg('changePasswordInput')
    { oldPassword, password, confirmPassword }: ChangePasswordArgs,
    @Ctx() { res }: MyContext
  ): Promise<OkResult> {
    const user = await User.findOne(res.locals.userId);
    if (!user)
      return { errors: [{ path: 'unknow', message: 'User not found' }] };

    const valid = await verify(user.password, oldPassword);
    if (!valid)
      return {
        errors: [{ path: 'oldPassword', message: 'Incorrect Password' }],
      };

    if (password !== confirmPassword)
      return {
        errors: [
          { path: 'confirmPassword', message: 'Passwords do not match' },
        ],
      };

    user.password = password;
    const { errors } = await extractErrors(user);
    if (errors) return { errors };
    await user.hashPassword();
    await user.save();
    return { ok: true };
  }
}
