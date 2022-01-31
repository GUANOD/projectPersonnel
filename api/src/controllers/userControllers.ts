import { Request, Response } from "express";
import {
  deleteUserById,
  searchUserById,
  searchUserByUsername,
  updateUserInfo,
  // updateUserInfoPw,
} from "../service/userData";
import bcrypt from "bcrypt";
import { User } from "../@types";

///***********************************************************************************************************

// UPDATE USER TAKES USERNAME, NAME, LASTNAME, DATE, EMAIL, ADDRESS
//***********************************************************************************************************
export const updateUserController = async (req: Request, res: Response) => {
  const { username, name, lastname, email, address } = req.body;
  try {
    if (!username || !name || !lastname || !email)
      throw new Error("Information missing");

    if (req.body.password) {
      await updateUserInfo(
        {
          username,
          name,
          lastname,
          email,
          address,
          password: req.body.password,
        },
        req.user
      );
    } else {
      await updateUserInfo(
        { username, name, lastname, email, address },
        req.user
      );
    }

    res.status(200).send({ res: "Sucessfully updated" });
  } catch (error: any) {
    res.status(400).send({ err: error.message });
  }
};
//***********************************************************************************************************

// DELETE TAKES password AND CLIENT NEEDS TO INVALIDATE token and remove from localstorage
//***********************************************************************************************************

export const deleteUserController = async (req: Request, res: Response) => {
  console.log(req.body);
  const { password } = req.body;
  try {
    if (!password) throw new Error("Information missing");
    const result = await searchUserById(req.user);

    if (result.length === 0) {
      throw new Error("Could not find user");
    }

    if (await bcrypt.compare(password, result[0].password)) {
      //DELETE USER IF PASSWORD MATCHES
      await deleteUserById(req.user);
      res.status(200).send({ res: "Deleted" });
    } else {
      throw new Error("Password does not match.");
    }
  } catch (error: any) {
    //ELSE SEND A 400 ERROR MESSAGE
    res.status(400).send({ err: error.message });
  }
};

///***********************************************************************************************************

// UPDATE USER TAKES THE JWT
//***********************************************************************************************************
export const readUserController = async (req: Request, res: Response) => {
  try {
    const result = await searchUserById(req.user, true);
    if (result.length) {
      res.status(200).send(JSON.stringify(result[0]));
    } else {
      throw new Error("No user found");
    }
  } catch (error: any) {
    res.status(400).send({ err: error.message });
  }
};
