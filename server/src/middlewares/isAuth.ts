import { MiddlewareFn } from 'type-graphql';
import { NOT_AUTHENT_MESSAGE } from '../constants';
import { MyContext } from '../MyContext';
import { setUserToLocals } from '../utils/setUserLocals';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  try {
    const { userId } = setUserToLocals(context);
    if (!userId) {
      throw new Error(NOT_AUTHENT_MESSAGE);
    }
    return next();
  } catch (err) {
    console.log(err);
    throw new Error(NOT_AUTHENT_MESSAGE);
  }
};
