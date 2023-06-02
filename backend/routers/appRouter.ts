import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
import { getAllData } from "../controllers/allDataController";

export const appRouter = express.Router();

appRouter.get("/", checkAuth, getAllData);

export default appRouter;
