import {Request, Response, NextFunction} from "express";

export const filterObject = <T extends unknown>(obj: any, allowedFields: any): T => {
   const newObj = {} as any;
   Object.keys(obj).forEach((el: string) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
   });

   return newObj;
};

export const catchAsync = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
   return fn(req, res, next).catch(next);
};
