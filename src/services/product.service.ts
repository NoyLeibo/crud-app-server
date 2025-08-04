import {
  ProductCategory,
  ProductModel,
  ProductName,
} from "../models/product.model";
interface CreateProductInput {
  name: ProductName;
  sku: number;
  description?: string;
  category: ProductCategory;
  marketingDate: Date;
}

const create = async (input: CreateProductInput) => {
  try {
    const newProduct = new ProductModel(input);
    await newProduct.save();

    return newProduct;
  } catch (error: any) {
    throw new Error(error);
  }
};

const get = async (category: ProductCategory | null) => {
  if (category) {
    return ProductModel.find({ category });
  }
  return ProductModel.find();
};

export const productService = { create, get };
