import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { ProductCategory, ProductName } from "../models/product.model";

const createProduct = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const {
      name,
      sku,
      description,
      category,
      marketingDate,
    }: {
      name: ProductName;
      sku: number;
      description?: string;
      category: ProductCategory;
      marketingDate: string; // ISO format, will convert to Date
    } = request.body;

    const newProduct = await productService.create({
      name,
      sku,
      description,
      category,
      marketingDate: new Date(marketingDate),
    });

    return response.status(StatusCodes.CREATED).send(newProduct);
  } catch (error: any) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const getProduct = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const categoryParam = request.query.category;

    let category: ProductCategory | null = null;
    if (
      typeof categoryParam === "string" &&
      ["Fruit", "Vegetable", "Field Crop"].includes(categoryParam)
    ) {
      category = categoryParam as ProductCategory;
    }
    const products = await productService.get(category ? category : null);

    return response.status(StatusCodes.OK).send(products);
  } catch (error: any) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const { ids } = request.body;
    if (!ids || (Array.isArray(ids) && ids.length === 0)) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No IDs provided for deletion" });
    }
    const result = await productService.remove(ids);
    return response
      .status(StatusCodes.OK)
      .json({ message: "Deleted successfully", result });
  } catch (error: any) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const getProductById = async (
  request: Request,
  response: Response
): Promise<any> => {
  const productId: string = request.params.id;
  try {
    const product = await productService.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return response.status(StatusCodes.OK).send(product);
  } catch (error: any) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const updateProduct = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const productId = request.params.id;
    const product = request.body;
    const updatedProduct = await productService.update(product, productId);
    return response.status(StatusCodes.OK).send(updatedProduct);
  } catch (error: any) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

export const productController = {
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
};
