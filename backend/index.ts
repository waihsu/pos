import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import userRouter from "./routers/users";
import locationRouter from "./routers/locations";
import appRouter from "./routers/app";
import imageUploadRouter from "./routers/imageUpload";
import menuRouter from "./routers/menusRouter";
import tablesRouter from "./routers/tablesRouter";
import menuCategoriesRouter from "./routers/menuCategoriesRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", appRouter);
app.use("/assets", imageUploadRouter);
app.use("/api/user", userRouter);
app.use("/menuCategories", menuCategoriesRouter);
app.use("/api/locations", locationRouter);
app.use("/api/menus", menuRouter);
app.use("/tables", tablesRouter);

app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});
