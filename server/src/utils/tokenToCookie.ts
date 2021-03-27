import { Response } from 'express';
import { COOKIE_NAME, __prod__ } from '../constants';
import { User } from '../entities/User';
import { createToken } from './tokenHandler';

export const tokenToCookie = (user: User, res: Response) => {
  res.cookie(COOKIE_NAME, createToken(user), {
    httpOnly: true,
    secure: __prod__,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
