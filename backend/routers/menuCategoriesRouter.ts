import express, { Request, Response } from "express";
import { db } from "../db/db";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, locationId } = req.body;
  const createMenuCategory = await db.query(
    "insert into menus_categories (name) values($1) returning *",
    [name]
  );
  const menuCategoryId = createMenuCategory.rows[0].id;

  const relationOfMenuCategoryAndLocation = await db.query(
    "insert into menus_menu_categories_locations (menu_categories_id, locations_id) values ($1, $2)",
    [menuCategoryId, Number(locationId)]
  );

  res.send(200);
});

router.put("/", async (req: Request, res: Response) => {
  const { id, name, locationIds, menuIds, currentLocationId } = req.body;
  console.log(req.body);
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
      "SELECT locations_id from menus_menu_categories_locations where menu_categories_id = $1 and is_archived = false",
      [id]
    );

    // existingLocationIds FROM existingLocationResult
    const existingLocationIds = existingLocationResult.rows.map(
      (item) => item.locations_id
    );

    if (locationIds.length) {
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
    }

    const addedLocationIds = locationIds.filter(
      (item: number) => !existingLocationIds.includes(item)
    );

    if (addedLocationIds.length) {
      addedLocationIds.forEach(async (item: number) => {
        const is_archived_True = await db.query(
          "select * from menus_menu_categories_locations where menu_categories_id = $1 and locations_id = $2 and is_archived = true",
          [Number(id), item]
        );
        const is_Archived_True = is_archived_True.rows;
        if (is_Archived_True) {
          await db.query(
            "update menus_menu_categories_locations set is_archived = false where menu_categories_id = $1 and locations_id = $2",
            [Number(id), item]
          );
        } else {
          await db.query(
            "insert into menus_menu_categories_locations (menu_categories_id, locations_id) values ($1, $2)",
            [Number(id), item]
          );
        }
      });
    }

    const existingMenuIdsResult = await db.query(
      "select menus_id from menus_menu_categories_locations where menu_categories_id = $1 and locations_id = $2",
      [Number(id), Number(currentLocationId)]
    );

    const existingMenuIds = existingMenuIdsResult.rows.map(
      (item) => item.menus_id
    );

    if (menuIds.length) {
      const removedMenuIds = existingMenuIds.filter(
        (item) => !menuIds.includes(item)
      );

      if (removedMenuIds.length) {
        removedMenuIds.forEach(async (item: number) => {
          await db.query(
            "update menus_menu_categories_locations set is_archived = true where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
            [item, Number(id), Number(currentLocationId)]
          );
        });
      }
    }

    const addMenuIds = menuIds.filter(
      (item: number) => !existingMenuIds.includes(item)
    );

    if (addMenuIds.length) {
      addMenuIds.forEach(async (item: number) => {
        await db.query(
          "insert into menus_menu_categories_locations (menus_id, menu_categories_id, locations_id) values ($1, $2, $3)",
          [item, Number(id), Number(currentLocationId)]
        );
      });
    }

    console.log("existing", existingLocationIds);
    // console.log("remove", removedLocationIds);
    console.log("added", addedLocationIds);
    console.log("existMenuId", existingMenuIds);
    // console.log("removedMenuId", removedMenuIds);
    console.log("addedMenuIds", addMenuIds);
    res.status(200).json({
      messg: "success",
    });
  } catch (err) {
    console.log(err);
    res.send(400);
  }
});

router.put("/:removeMenu", async (req: Request, res: Response) => {
  console.log(req.body);
  const { menuId, locationId } = req.body;
  await db.query(
    "update menus_menu_categories_locations set is_archived = true where menus_id = $1 and locations_id = $2",
    [menuId, locationId]
  );
  res.send(200);
});

export default router;
