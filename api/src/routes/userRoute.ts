import express, { Request, Response } from "express";
import {
  deleteUserController,
  readUserController,
  updateUserController,
} from "../controllers/userControllers";
import { verifyTokenHttp } from "../middleware/verifyToken";
const router = express.Router();

// /user/update
router.put("/update", verifyTokenHttp, updateUserController);
// /user/delete
router.delete("/delete", verifyTokenHttp, deleteUserController);
// /user/read
router.get("/read", verifyTokenHttp, readUserController);

export default router;
