import express from "express";
import { createMenu } from "../controllers/menusController";

const router = express.Router();

router.post("/", createMenu);

export default router;
