import {Request, Response, NextFunction} from "express";

import ProductModel from "./product.model";
import * as productService from "./product.service";
import {validationResult} from "express-validator";

export const find = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const product = await productService.find(req.query);
      res.json({records: product, pagination: {}, fromCache: false});
   } catch (err) {
      next(err);
   }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const products = await productService.get(req.params.id);
      res.json(products);
   } catch (err) {
      next(err);
   }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const {id} = req.body;
      const product = await ProductModel.findOne({id});
      if (product) {
         await productService.remove(req.params.id);
         return res.json({status: "OK"});
      }
      return res.status(422).json({error: {name: "Product's not exist!"}});
   } catch (err) {
      next(err);
   }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(422).json({errors: errors.array()});
         return;
      }

      const {name} = req.body;
      const productExisted = await ProductModel.findOne({name});
      if (productExisted) {
         res.status(422).json({error: {name: "Existed"}});
      }
      const product = await productService.create(req.body);
      if (product) {
         res.json(product);
      }
   } catch (err) {
      next(err);
   }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const user = await productService.update(req.params.id, req.body);
      res.json(user);
   } catch (err) {
      next(err);
   }
};
