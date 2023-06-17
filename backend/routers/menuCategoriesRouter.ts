import express, { Request, Response } from "express";
import { db } from "../db/db";

const router = express.Router();

router.put("/", async (req: Request, res: Response) => {
  const { id, name, locationIds } = req.body;
  if (!id || !name || !locationIds) return res.send(400);
  if (!id) return res.send(400);
  try {
    if (name) {
      await db.query("update menus_categories set name = $1 where id = $2", [
        name,
        id,
      ]);
    }

    //existingLocationResult from menus_menu_categories_locations WHERE menu_categories_id
    const existingLocationResult = await db.query(
      "SELECT locations_id from menus_menu_categories_locations where menu_categories_id = $1",
      [id]
    );

    // existingLocationIds FROM existingLocationResult
    const existingLocationIds = existingLocationResult.rows.map(
      (item) => item.locations_id
    );

    const removedLocationIds = existingLocationIds.filter(
      (item) => !locationIds.includes(item)
    );

    if (removedLocationIds.length) {
      removedLocationIds.forEach(async (item) => {
        await db.query(
          "update menus_menu_categories_locations set is_archived = true where menu_categories_id = $1 AND locations_id = $2",
          [Number(id), item]
        );
      });
    }
    const addedLocationIds = locationIds.filter(
      (item: number) => !existingLocationIds.includes(item)
    );

    res.send({
      existingLocationIds,
      removedLocationIds,
      locationIds,
      addedLocationIds,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
