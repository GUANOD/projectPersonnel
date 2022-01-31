import { Request, Response } from "express";
import { Content } from "../@types";
import {
  getAllContent,
  getContentFilter,
  putContent,
} from "../service/contentData";

// ADDCONTENT TAKES A CONTENT OBJECT {title, contenu, date, id_type, prix?}
export const addContent = async (req: Request, res: Response) => {
  const content: Content = req.body.content;
  try {
    if (!content.title || !content.contenu || !content.date || !content.id_type)
      throw new Error("Missing Information.");

    content.id_user = req.user;

    await putContent(content);

    res.status(201).send({ res: "Successfully created" });
  } catch (error: any) {
    res.status(400).send({ err: error.message });
  }
};

//***********************************************************************************************************

// READCONTENT  options: [limit, creator, date]
//***********************************************************************************************************

export const readContent = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    if (req.body.options) {
      const content: any = await getContentFilter(req.body.options);
      res.status(200).send({ res: content });
    } else {
      const content: any = await getAllContent();

      res.status(200).send({ res: content });
    }
  } catch (error: any) {
    res.status(400).send({ err: error.message });
  }
};

// export const searchBlogContent = async (req: Request, res: Response) => {
//   try {
//     const { search, date } = req.body;

//     if (search || date) {

//     }else{

//     }

//   } catch (error: any) {
//     console.log("error", error);
//   }
// };
