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

const createProducts = async (input: CreateProductInput) => {
  try {
    const newProduct = new ProductModel(input);
    await newProduct.save();

    return newProduct;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getProducts = async (category: ProductCategory | null) => {
  try {
    if (category) {
      return ProductModel.find({ category });
    }
    return ProductModel.find();
  } catch (error: any) {
    throw new Error(error);
  }
};

const deleteProducts = async (ids: string | string[]) => {
  try {
    if (Array.isArray(ids)) {
      return await ProductModel.deleteMany({ _id: { $in: ids } });
    } else {
      return await ProductModel.findByIdAndDelete(ids);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const productService = { createProducts, getProducts, deleteProducts };
