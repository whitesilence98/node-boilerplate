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

export const getPagination = (page: any, size: any) => {
   const limit = size ? +size : 3;
   const offset = page ? page * limit : 0;

   return {limit, offset};
};
