import {Schema, model} from "mongoose";

export interface Product {
   id: number;
   name: string;
   image?: string[];
}
const schema = new Schema<Product>({
   id: {type: Number, default: 0},
   name: {type: String, required: true, unique: true},
   image: Array,
});

const ProductModel = model<Product>("Product", schema);

export default ProductModel;
