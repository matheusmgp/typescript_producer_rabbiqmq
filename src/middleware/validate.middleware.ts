import { NextFunction, Request, Response } from 'express';
import { validationPipe } from './validation';

export const validationMiddleware =
  (validationSchema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const result: any = await validationPipe(validationSchema, { ...req.body, ...req.params });
    if (!isEmpty(result)) return res.status(400).json({ success: false, ...result });
    next();
  };

const isEmpty = (obj: object) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
};
