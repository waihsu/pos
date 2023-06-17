import express from "express";
import { imageUpload } from "../controllers/imageUpload";

const router = express.Router();

router.post("/", imageUpload);

export default router;
