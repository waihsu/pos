import { Request, Response } from "express";
import { db } from "../db/db";

export const getLocations = async (req: Request, res: Response) => {
  const user = await db.query("SELECT * FROM companies");
  const locations = await db.query("SELECT * FROM locations");
  const resultLocations = locations.rows;
  const companyResult = user.rows[0];
  res.status(200).json({ resultLocations, companyResult });
};

export const createLocation = async (req: Request, res: Response) => {
  const { name, address, companyId } = req.body;
  const isValid = name && address && companyId;
  if (!isValid) return res.status(400).json({ messg: "not valid" });
  const newLocation = await db.query(
    "insert into locations (name, address, companies_id) values($1, $2, $3)",
    [name, address, companyId]
  );
  res.status(200).json({ newLocation });
};

export const updateLocation = async (req: Request, res: Response) => {
  const { name, address, locationId } = req.body;
  const updated = await db.query(
    "UPDATE locations SET name=$1, address=$2 WHERE id=$3",
    [name, address, locationId]
  );
  res.send("ok");
};

export const deleteLocation = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deleted = await db.query("DELETE FROM locations WHERE id=$1", [id]);
    res.status(200).json({ messg: "Delete Success" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ err });
  }
};
