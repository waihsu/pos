import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import userRouter from "./routers/users";
import locationRouter from "./routers/locations";
import appRouter from "./routers/appRouter";
import imageUploadRouter from "./routers/imageUpload";
import menuRouter from "./routers/menusRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", appRouter);
app.use("/assets", imageUploadRouter);
app.use("/api/user", userRouter);
app.use("/api/locations", locationRouter);
app.use("/api/menus", menuRouter);

app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});
