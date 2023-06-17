import express from "express";
import {
  createLocation,
  deleteLocation,
  getLocations,
  updateLocation,
} from "../controllers/locationsController";

const router = express.Router();

router.get("/", getLocations);

router.post("/", createLocation);

router.put("/:id", updateLocation);

router.delete("/:id", deleteLocation);

export default router;
