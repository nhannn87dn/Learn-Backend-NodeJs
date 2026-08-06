import { ZodError, ZodIssue, ZodTypeAny } from 'zod';
import { NextFunction, Request, Response } from 'express';

type ValidationErrorItem = {
 field: string;
 message: string;
 code: string;
};


const mapZodIssues = (issues: ZodIssue[]): ValidationErrorItem[] => {
 return issues.map((issue) => ({
  field: issue.path.length > 0 ? issue.path.join('.') : 'request',
  message: issue.message,
  code: issue.code,
 }));
};

const validateSchema = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): void => {
 try {
  const result = schema.safeParse({
   body: req.body,
   query: req.query,
   params: req.params,
  });

  if (!result.success) {
   const errors = mapZodIssues(result.error.issues);

   res.status(400).json({
    success: false,
    statusCode: 400,
    message: 'Request validation failed',
    errors,
   });
   return;
  }

  next();
 } catch (err) {
  if (err instanceof ZodError) {
   const errors = mapZodIssues(err.issues);

   res.status(400).json({
    success: false,
    statusCode: 400,
    message: 'Request validation failed',
    errors,
   });
   return;
  }

  res.status(500).json({
    success: false,
   statusCode: 500,
   message: 'validate Zod Error',
  });
 }
};

export default validateSchema;