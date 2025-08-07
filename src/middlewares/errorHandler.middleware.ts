import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export function globalErrorHandler(
  err: any,
  request: Request,
  response: Response
) {
  console.error("Global error handler:", err);

  response
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Internal Server Error");
}
