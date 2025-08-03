import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { ProductCategory, ProductName } from "../models/product.model";

const create = async (request: Request, response: Response): Promise<any> => {
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
    console.log(newProduct);

    return response.status(StatusCodes.CREATED).send("Product has been created");
  } catch (error: any) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send("Error in createProduct function");
  }
};

const get = async (request: Request, response: Response): Promise<any> => {
  try {
    return response
      .status(StatusCodes.OK)
      .send("Product has been sent" + "Product VARIABLE");
  } catch (error: any) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send("Error in getProducts function");
  }
};

export const ProductController = { get, create };
