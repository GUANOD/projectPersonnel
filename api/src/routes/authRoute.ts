import express from "express";
import {
  loginController,
  regController,
  validateController,
} from "../controllers/authControllers";
import { verifyTokenHttp } from "../middleware/verifyToken";
const router = express.Router();

// /auth/reg
router.post("/reg", regController);
// /auth/login
router.post("/login", loginController);

router.get("/validate", verifyTokenHttp, validateController);

export default router;
