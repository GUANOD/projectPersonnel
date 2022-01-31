import { Request, Response, NextFunction } from "express";
import { searchUserById } from "../service/userData";

export async function verifyPerm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await searchUserById(req.user);

  if (user[0].id_role !== 606) {
    console.log("user", req.user, "unauthorized to change content");
    res.status(401).send({ err: "Unauthorized" });
    return;
  }
  next();
}
