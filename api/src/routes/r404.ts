import express from "express";
const router = express.Router();

router.use("*", (req, res) => {
  res.status(404).send({ res: "Not found" });
});

export default router;
