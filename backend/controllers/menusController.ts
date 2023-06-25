import { Request, Response } from "express";
import { db } from "../db/db";

export const createMenu = async (req: Request, res: Response) => {
  const { name, price, locationId, description, asset_url, menuCategoryIds } =
    req.body;
  // console.log(req.body);
  if (
    !name ||
    !price ||
    !description ||
    !locationId ||
    !asset_url ||
    !menuCategoryIds
  )
    return res.status(401).json({ messg: "All fields must be fill" });
  try {
    const menuResult = await db.query(
      "INSERT INTO menus (name, price, description, asset_url) values($1,$2,$3,$4) returning *",
      [name, price, description, asset_url]
    );
    const menu = menuResult.rows[0];

    // console.log(menu);
    const menuId = menu.id;
    menuCategoryIds.forEach(async (item: number) => {
      await db.query(
        "insert into menus_menu_categories_locations (menus_id, menu_categories_id, locations_id) values($1, $2, $3)",
        [menuId, item, Number(locationId)]
      );
    });
    res.status(200).json({ messg: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
