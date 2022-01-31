import { Request, Response } from "express";
import { User } from "../@types";
import {
  searchUserByUsername,
  searchUserByEmail,
  insertUser,
} from "../service/userData";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// LOGIN TAKES USERNAME AND PASSWORD
//***********************************************************************************************************
export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // CHECK IF MISSING INFO
    if (!username || !password) throw new Error("Information missing");

    // CHECK IF USER EXISTS AND PASSWORD MATCHES

    const results = await searchUserByUsername(username);
    if (results.length === 0) throw new Error("Wrong credentials.");

    const user = results[0];
    const webmaster = results[0].id_role === 606;

    //if password matches encryption
    if (await bcrypt.compare(password, user.password)) {
      //CREATE A JSON WEB TOKEN
      const token = jwt.sign(
        { user: user.id_user, webmaster },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: "24h" }
      );
      // SEND THE RESPONSE WITH A TOKEN.. I WOULD USE THIS AS A HTTP SECURE COOKIE
      // BUT I HAVENT FOUND A WAY TO SEND A COOKIE IN HEROKU
      // SO FOR THE PURPOSE OF THIS APP I WILL BE USING REACT STATE AND LOCAL STORAGE,
      // ALTHOUGH IT IS A SECURITY RISK
      res.status(200).send({ res: "Logged", token: `bearer ${token}` });
    } else {
      throw new Error("Wrong credentials.");
    }
  } catch (error: any) {
    res.status(400).send({ err: error.message });
  }
};

//***********************************************************************************************************

//REGISTRATION TAKES USERNAME , NAME, SURNAME, DATE, PASSWORD, EMAIL AS DEFINED IN /@TYPES/index.d.ts.. ROLE IS ADDED AFTERWARD
//***********************************************************************************************************
export const regController = async (req: Request, res: Response) => {
  const { username, name, lastname, date, password, email, address } = req.body;
  try {
    //CHECK IF ALL INFO IS PRESENT
    if (
      !username ||
      !name ||
      !lastname ||
      !date ||
      !password ||
      !email ||
      !address
    )
      throw new Error("Information missing");

    //CHECK IF USER EXISTS
    const userCheck = await searchUserByUsername(username);
    const emailCheck = await searchUserByEmail(email);

    if (userCheck.length !== 0 || emailCheck.length !== 0) {
      res.status(401).send({ err: "User already exists" });
      return;
    }

    const dateToAdd: Date = new Date(date);
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);

    //CREATE A NEW USER AND ADD ROLE USER
    const userToAdd: User = {
      username,
      name,
      lastname,
      date: dateToAdd,
      password: hashedPass,
      email,
      address,
      id_role: 505,
    };

    await insertUser(userToAdd);
    //IF INSERT SUCCEEDS SEND A 201 RESPONSE
    res.status(201).send({ res: "User created" });
  } catch (error: any) {
    //ELSE SEND A 400 ERROR MESSAGE
    res.status(400).send({ err: error.message });
  }
};

export const validateController = (req: Request, res: Response) => {
  res.status(200).send({ res: "Valid" });
};
