import { sign, verify } from 'jsonwebtoken';
import { User } from '../entities/User';

export const createToken = (user: User) => {
  return sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    throw Error('Invalid / Expired JWT');
  }
};
