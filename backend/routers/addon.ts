import express, { Request, Response } from "express";
import { db } from "../db/db";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, price, addonCategoryIds } = req.body;
  console.log(name, price, addonCategoryIds);
  const valid = name && price && addonCategoryIds.length;
  if (!valid) return res.send(401);
  if (addonCategoryIds.length) {
    addonCategoryIds.forEach(async (item: number) => {
      await db.query(
        "insert into addons (name, price,addon_categories_id) values ($1, $2, $3)",
        [name, Number(price), item]
      );
    });
  }
  res.send(200);
});

export default router;
