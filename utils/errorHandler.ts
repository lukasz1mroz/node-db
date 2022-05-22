import { Request, Response } from 'express';

export const expressErrorHandler = (err: any, req: Request, res: Response, next: any) => {
  const errorObject = {
    name: err.name,
    code: err.httpCode,
    logSource: err.logSource,
    description: err.message,
  };

  res.status(errorObject.code || 500).json(errorObject);
};
