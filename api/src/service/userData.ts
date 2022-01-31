import { User } from "../@types";
import DbConnection from "../config/dbConfig";
import bcrypt from "bcrypt";

//***********************************************************************************************************
export const searchUserById = async (
  id: number,
  hiddenDetails: boolean = false
) => {
  try {
    //create connection
    const connection = new DbConnection();
    const select = hiddenDetails
      ? "nom, prenom, date_naissance, pseudo, email, address"
      : "*";

    const query = `
    SELECT ${select} FROM user 
    WHERE id_user = ?;
    `;

    //performQuery is autoClosing as such the connexion will close after querying
    const results: any = await connection.performQuery(query, [id]);

    // return results
    return results.rows;
  } catch (error: any) {
    //if query fails
    throw new Error("Database Error");
  }
};

//***********************************************************************************************************
//SEARCH BY USERNAME
export const searchUserByUsername = async (username: string): Promise<any> => {
  try {
    //create connection
    const connection = new DbConnection();
    const query = `
    SELECT * FROM user
    WHERE pseudo = ?;`;

    //performQuery is autoClosing as such the connexion will close after querying
    const results: any = await connection.performQuery(query, [username]);

    // return results
    return results.rows;
  } catch (error: any) {
    //if query fails
    console.log(error); // TODO: IMPLEMENT A LOGGING SERVICE
    throw new Error("Database Error");
  }
};

///***********************************************************************************************************
//SEARCH BY EMAIL
export const searchUserByEmail = async (email: string) => {
  try {
    //create connxion
    const connection = new DbConnection();

    const query = `
    SELECT * FROM user
    WHERE email = ?;`;

    const results: any = await connection.performQuery(query, [email]);
    //returns the results
    return results.rows;
  } catch (error: any) {
    //if query fails
    console.log(error);
    throw new Error("Database Error");
  }
};

//***********************************************************************************************************
//INSERT USER
export const insertUser = async ({
  name,
  lastname,
  username,
  date,
  email,
  password,
  id_role,
  address,
}: User) => {
  try {
    //Create connexion
    const connection = new DbConnection();

    const query = `
    INSERT INTO user(nom, prenom, pseudo, date_naissance, email, password, id_role, address)
    VALUES (?,?,?,?,?,?,?,?);`;

    //ASYNC query
    await connection.performQuery(query, [
      name,
      lastname,
      username,
      date,
      email,
      password,
      id_role,
      address,
    ]);
    return "User added";
  } catch (error: any) {
    //IF QUERY FAILS
    console.log(error);
    throw new Error("Database Error");
  }
};

//***********************************************************************************************************
export const updateUserInfo = async (user: User, id: number) => {
  try {
    //Create connexion
    const connection = new DbConnection();
    let query: string;
    let result: any;

    if (user.password) {
      query = `
      UPDATE user
      SET nom = ?, prenom = ?, pseudo = ?, email = ?, address = ?, password = ?
      WHERE id_user = ?`;

      const salt = await bcrypt.genSalt();
      // @ts-ignore
      const hashedPass = await bcrypt.hash(user.password, salt);

      //ASYNC query
      result = await connection.performQuery(query, [
        user.lastname,
        user.name,
        user.username,
        user.email,
        user.address,
        hashedPass,
        id,
      ]);
    } else {
      query = `
      UPDATE user
      SET nom = ?, prenom = ?, pseudo = ?, email = ?, address = ?
      WHERE id_user = ?`;

      //ASYNC query
      result = await connection.performQuery(query, [
        user.lastname,
        user.name,
        user.username,
        user.email,
        user.address,
        id,
      ]);
    }
    return result.rows;
  } catch (error: any) {
    throw new Error("Database Error");
  }
};

// export const updateUserInfoPw = async (user: User, id: number) => {
//   try {
//     //Create connexion
//     const connection = new DbConnection();

//     const query = `
//       UPDATE user
//       SET nom = ?, prenom = ?, pseudo = ?, email = ?, address = ?, password = ?
//       WHERE id_user = ?`;

//     const salt = await bcrypt.genSalt();
//     // @ts-ignore
//     const hashedPass = await bcrypt.hash(user.password, salt);

//     //ASYNC query
//     const result: any = await connection.performQuery(query, [
//       user.lastname,
//       user.name,
//       user.username,
//       user.email,
//       user.address,
//       hashedPass,
//       id,
//     ]);

//     return result.rows;
//   } catch (error: any) {
//     console.log(error);
//     throw new Error("Database Error");
//   }
// };

//***********************************************************************************************************
export const deleteUserById = async (id: number) => {
  try {
    //Create connexion
    const connection = new DbConnection();

    const query = `
      DELETE FROM user
      WHERE id_user = ?`;

    //ASYNC query
    const result: any = await connection.performQuery(query, [id]);

    return result.rows;
  } catch (error: any) {
    console.log(error);
    throw new Error("Database Error");
  }
};
