import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function notFoundHandler(request: Request, response: Response) {
  response.status(StatusCodes.NOT_FOUND).send( "Route not found" );
}
