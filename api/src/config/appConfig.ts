import cors from "cors";
import express from "express";
var path = require("path");

const app = express();
export const router = express.Router();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors({ origin: "http://localhost:3000", credentials: true }));

export default app;
