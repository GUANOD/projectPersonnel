import app from "./config/appConfig";
import r404 from "./routes/r404";
import regRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import contentRoutes from "./routes/contentRoutes";
import express from "express";
require("dotenv").config();

app.use("/auth", regRoute);
app.use("/user", userRoute);
app.use("/content", contentRoutes);
app.use("/images", express.static(__dirname + "/images"));
app.use("*", r404);

app.listen(process.env.PORT || 8080, () => console.log("They're listening"));
