import { ProductCategory, ProductModel } from "../models/product.model";

const createProduct = async (name: string, category: ProductCategory) => {
  try {
    const newProduct = new ProductModel({
      name,
      category,
      // ...
      // ...
      // ...
    });

    return newProduct;
  } catch (error: any) {
    throw new Error("Error on CreateProduct" + error.message);
  }
};

export const productService = { createProduct }
