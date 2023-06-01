import express from "express";
import {
  createLocation,
  deleteLocation,
  getLocations,
} from "../controllers/locationsController";

const router = express.Router();

router.get("/", getLocations);

router.post("/", createLocation);

router.delete("/:id", deleteLocation);

export default router;
