import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../MyContext';
import { setUserToLocals } from '../utils/setUserLocals';

export const isUser: MiddlewareFn<MyContext> = ({ context }, next) => {
  try {
    setUserToLocals(context);
  } catch (err) {
    console.log(err);
  }
  return next();
};
