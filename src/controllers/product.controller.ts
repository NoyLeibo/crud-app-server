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

    const newProduct = await productService.createProducts({
      name,
      sku,
      description,
      category,
      marketingDate: new Date(marketingDate),
    });

    return response.status(StatusCodes.CREATED).send(newProduct);
  } catch (error: any) {
    console.log(error);

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
    const products = await productService.getProducts(
      category ? category : null
    );

    return response.status(StatusCodes.OK).send(products);
  } catch (error: any) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send("Error in getProducts function");
  }
};

const deleteProduct = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    console.log("delete!");

    const { ids } = request.body;
    if (!ids || (Array.isArray(ids) && ids.length === 0)) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No IDs provided for deletion" });
    }
    const result = await productService.deleteProducts(ids);
    return response
      .status(StatusCodes.OK)
      .json({ message: "Deleted successfully", result });
  } catch (error: any) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

export const ProductController = { getProduct, createProduct, deleteProduct };
