import { Content, FilterOptions } from "../@types";
import DbConnection from "../config/dbConfig";
//***********************************************************************************************************
//PUT NEW CONTENT
export const putContent = async (content: Content) => {
  try {
    //create connection
    const connection = new DbConnection();
    let results: any;

    if (content.prix) {
      // IF EXISTS

      //DEFINE QUERY WITH PRICE
      const query = `
    INSERT INTO contenu(title, contenu, date, prix, id_type, id_user) 
    VALUES(?,?,?,?,?,?);`;
      const { title, contenu, date, prix, id_type, id_user } = content;

      //performQuery is autoClosing as such the connexion will close after querying
      results = await connection.performQuery(query, [
        title,
        contenu,
        date,
        prix,
        id_type,
        id_user,
      ]);
    } else {
      //DEFINE QUERY WITHOUT PRICE
      const query = `
      INSERT INTO contenu(titre, contenu, date, id_type, id_user)
      VALUES(?,?,?,?,?);`;
      const { title, contenu, date, id_type, id_user } = content;

      //performQuery is autoClosing as such the connexion will close after querying
      results = await connection.performQuery(query, [
        title,
        contenu,
        date,
        id_type,
        id_user,
      ]);
    }

    return results;
  } catch (error: any) {
    console.log(error);
    throw new Error("Database Error");
  }
};

//***********************************************************************************************************

export const getAllContent = async () => {
  try {
    const connection = new DbConnection();

    const query = `
    SELECT * FROM contenu
    ORDER BY date DESC;`;

    const results: any = await connection.performQuery(query);
    return results.rows;
  } catch (error: any) {
    console.log(error);
    throw new Error("Database error.");
  }
};

//***********************************************************************************************************

export const getContentFilter = async (options: FilterOptions) => {
  try {
    let addonSearch;
    let addonCreator; // TODO: ADD FILTER FOR PUBLISHER
    let addonType;

    const connection = new DbConnection();
    let query = `
    SELECT * FROM contenu`;

    // ESCAPE() COMES FROM THE NODE MYSQL LIBRARY AND PREVENTS SQL INJECTION
    // import {escape} from "mysql" IN TOP OF PAGE
    if (options.search) {
      addonSearch = ` 
      WHERE titre LIKE '%${options.search}%' `;
      query += addonSearch;
    }

    if (options.type) {
      addonType = addonSearch
        ? ` AND id_typeContenu = ${options.type}`
        : `
      WHERE id_typeContenu = ${options.type}`;
      query += addonType;
    }

    if (options.date) {
      let addonDate =
        addonSearch || addonType
          ? ` AND date >= '${options.date}' `
          : ` 
        WHERE date >= '${options.date}'`;
      query += addonDate;
    }

    query += `
    ORDER BY date DESC`;

    if (options.limit) {
      let addonLimit = `
      LIMIT ${options.limit}`;
      query += addonLimit;
    }

    const results: any = await connection.performQuery(query);
    return results.rows;
  } catch (error: any) {
    console.error(error);
    throw new Error("Database error.");
  }
};
