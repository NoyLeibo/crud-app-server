import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { ProductCategory, PRODUCT_NAMES } from "../models/product.model";

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
      name: string;
      sku: number;
      description?: string;
      category: ProductCategory;
      marketingDate: string;
    } = request.body;
    const formattedName = name.charAt(0).toUpperCase() + String(name).slice(1);
console.log(formattedName);

    const newProduct = await productService.create({
      name: formattedName,
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
    const nameParam = request.query.name;

    let category: ProductCategory | null = null;
    if (
      typeof categoryParam === "string" &&
      ["Fruit", "Vegetable", "Field Crop"].includes(categoryParam)
    ) {
      category = categoryParam as ProductCategory;
    }

    const name: string | null =
      typeof nameParam === "string" && nameParam.trim() !== ""
        ? nameParam.trim()
        : null;

    const query = { category, name };

    const products = await productService.get(query);

    return response.status(StatusCodes.OK).send(products);
  } catch (error: any) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const undoDelete = async (
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
    const result = await productService.undoDelete(ids);
    return response.status(StatusCodes.OK).send(result);
  } catch (error: any) {
    console.log(error);

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
    return response.status(StatusCodes.OK).send(result);
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
  undoDelete,
};
