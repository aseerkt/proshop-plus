import { Request, Response } from 'express';
import { createProductLoader } from './utils/createProductLoader';
import { createUserLoader } from './utils/createUserLoader';

export interface MyContext {
  req: Request;
  res: Response & { locals: { userId: string } };
  pdtLoader: ReturnType<typeof createProductLoader>;
  userLoader: ReturnType<typeof createUserLoader>;
}
