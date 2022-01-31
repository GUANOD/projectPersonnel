import express from "express";
import {
  addContent,
  readContent,
  // searchBlogContent,
} from "../controllers/contentControllers";
import { verifyPerm } from "../middleware/verifyPermission";
import { verifyTokenHttp } from "../middleware/verifyToken";
const router = express.Router();

// /content/
router.post("/read", verifyTokenHttp, readContent);

// router.post("/blog/search", verifyTokenHttp, searchBlogContent);
// /content/post
router.post("/post", verifyTokenHttp, verifyPerm, addContent);

export default router;
