import express, { Request, Response } from "express";

import { db } from "../db/db";
const tablesRouter = express.Router();

tablesRouter.get("/:locationId", async (req: Request, res: Response) => {
  const locationId = req.params.locationId;
  if (!locationId) return res.send(400);
  const tablesResult = await db.query(
    "select * from tables where locations_id = $1",
    [locationId]
  );
  res.send(tablesResult.rows);
});

tablesRouter.post("/", async (req: Request, res: Response) => {
  const { name, locationId } = req.body;
  const isValid = name && locationId;
  if (!isValid) return res.send(400);
  await db.query("insert into tables (name, locations_id) values($1, $2)", [
    name,
    locationId,
  ]);
  res.send(200);
});

export default tablesRouter;
