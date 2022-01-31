import { Request, Response, NextFunction } from "express";
// import jwt from 'jsonwebtoken';  GETTING AN ERROR IN TOKEN SECRET WHEN USING IMPORTS
const jwt = require("jsonwebtoken");

export function verifyTokenHttp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers.authorization;
  const token = bearerHeader && (<string>bearerHeader).split(" ")[1];

  if (!token) {
    res.status(401).send({ err: "Unauthorized" });
    return;
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error: Error, payload: any) => {
      if (error) {
        res.status(401).send({ err: "Unauthorized" });
        return;
      } else {
        req.user = payload.user;
        next();
      }
    }
  );
}
