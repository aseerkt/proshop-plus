import { MiddlewareFn } from 'type-graphql';
import { NOT_AUTHENT_MESSAGE, NOT_AUTHOR_MESSAGE } from '../constants';
import { User } from '../entities/User';
import { MyContext } from '../MyContext';
import { setUserToLocals } from '../utils/setUserLocals';

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    const { userId } = setUserToLocals(context);
    if (!userId) {
      throw new Error(NOT_AUTHENT_MESSAGE);
    }
    const user = await User.findOne({
      where: { id: userId },
      select: ['isAdmin'],
    });
    if (!user?.isAdmin) {
      throw new Error(NOT_AUTHOR_MESSAGE);
    }
    return next();
  } catch (err) {
    console.log(err);
    if (err.message === NOT_AUTHOR_MESSAGE) throw new Error(NOT_AUTHOR_MESSAGE);
    throw new Error(NOT_AUTHENT_MESSAGE);
  }
};
