import {Request, Response} from "express";
import {Model, UpdateQuery} from "mongoose";

import {filterObject, catchAsync} from "utils/common.util";

//Factory Partern
export const findData = <T extends unknown>(model: Model<T>) =>
   catchAsync(async (req: Request, res: Response) => {
      const params: any = req.params;
      const doc = await model.find(params, req.query, []);
      res.json({status: "success", doc});
   });

export const getData = <T extends unknown>(model: Model<T>, popOptions?: string) =>
   catchAsync(async (req: Request, res: Response) => {
      const query = model.findById(req.params.id);
      if (popOptions) {
         query.populate(popOptions);
      }
      const data = await query;
      res.json({status: "success", data});
   });

export const createData = <T extends unknown>(model: Model<T>, allowedFields?: string[]) =>
   catchAsync(async (req: Request, res: Response) => {
      const filteredBody = filterObject<UpdateQuery<T>>(req.body, allowedFields);
      const data = await model.create(filteredBody);
      res.json({status: "success", data});
   });

export const updateData = <T extends unknown>(model: Model<T>, allowedFields?: string[]) =>
   catchAsync(async (req: Request, res: Response) => {
      const filteredBody = filterObject<UpdateQuery<T>>(req.body, allowedFields);
      const data = await model.findByIdAndUpdate(req.params.id, filteredBody, {
         new: true,
         runValidators: true,
      });
      res.json({status: "success", data});
   });

export const removeData = <T extends unknown>(model: Model<T>) =>
   catchAsync(async (req: Request, res: Response) => {
      await model.findOneAndDelete({_id: req.body._id});
      res.json({status: "removed"});
      res.end();
   });
