import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { productService } from "../services/product.service";

const create = async (request: Request, response: Response): Promise<any> => {
  try {
    const { title, description } = request.body;

    const newProduct = await productService.createProduct(title, description);

    console.log(newProduct);

    return response.status(StatusCodes.OK).send("Product has been created");
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
