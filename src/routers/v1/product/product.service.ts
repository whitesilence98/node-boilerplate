import ProductModel, {Product} from "./product.model";
import {apiBuilder} from "utils/api-builder.util";

export const find = async <T>(query?: T) => {
   return await apiBuilder(ProductModel, query);
};

export const findOne = async <T>(conditions?: T & any) => {
   return await ProductModel.findOne(conditions);
};

export const get = async (id: string) => {
   return await ProductModel.findById(id);
};

export const create = async (data: Product) => {
   return await ProductModel.create(data);
};

export const update = async (id: string, data: Product) => {
   return await ProductModel.findByIdAndUpdate(id, data, {new: true});
};

export const remove = async (id: string) => {
   return await ProductModel.findOneAndDelete({_id: id});
};
