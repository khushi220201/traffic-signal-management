import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Not Found",
  });
};
