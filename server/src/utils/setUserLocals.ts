import { COOKIE_NAME } from '../constants';
import { MyContext } from '../MyContext';
import { verifyToken } from './tokenHandler';

export const setUserToLocals = (ctx: MyContext) => {
  const token = ctx.req.cookies[COOKIE_NAME];
  const payload = verifyToken(token);
  const { userId } = payload as any;
  ctx.res.locals.userId = userId;
  console.log(ctx.res.locals);
  return { userId: ctx.res.locals.userId };
};
