import express, { Request, Response } from "express";
import { db } from "../db/db";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, menuIds } = req.body;
  const addCategory = await db.query(
    "INSERT INTO addon_categories (name) values($1) returning *",
    [name]
  );
  const newAddonCategory = addCategory.rows;
  const addon_categories_id = newAddonCategory[0].id as number;
  console.log(addon_categories_id);
  console.log("menuIds", menuIds);
  if (menuIds.length) {
    menuIds.forEach(async (item: number) => {
      await db.query(
        "insert into menus_addon_categories (menus_id, addon_categories_id) values ($1, $2)",
        [item, addon_categories_id]
      );
    });
  }
  res.status(200).json({ messg: "success" });
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, menuIds } = req.body;
  console.log(req.body, id);
  if (name) {
    const updateAddonCategory = await db.query(
      "update addon_categories set name = $1 where id = $2 ",
      [name, Number(id)]
    );
  }

  const existingMenuIdsresult = await db.query(
    "select menus_id from menus_addon_categories where addon_categories_id = $1 and is_archived = false",
    [Number(id)]
  );
  const existingMenuIds = existingMenuIdsresult.rows.map(
    (item) => item.menus_id
  );
  console.log("existingMenuIds", existingMenuIds);

  const removedMenuIds = existingMenuIds.filter(
    (item: number) => !menuIds.includes(item)
  );
  console.log("removedMenuIds", removedMenuIds);
  if (removedMenuIds.length) {
    removedMenuIds.forEach(async (item: number) => {
      await db.query(
        "update menus_addon_categories set is_archived = true where addon_categories_id = $1 AND menus_id = $2",
        [Number(id), item]
      );
    });
  }

  const addedMenuIds = menuIds.filter(
    (item: number) => !existingMenuIds.includes(item)
  );
  console.log("added", addedMenuIds);

  if (addedMenuIds.length) {
    addedMenuIds.forEach(async (item: number) => {
      const is_archived_True = await db.query(
        "select * from menus_addon_categories where menus_id = $1 and addon_categories_id = $2 and is_archived = true",
        [item, Number(id)]
      );
      const is_Archived_True = is_archived_True.rows;
      console.log(is_Archived_True);
      if (is_Archived_True.length) {
        await db.query(
          "update menus_addon_categories set is_archived = false where menus_id = $1 and addon_categories_id = $2",
          [item, Number(id)]
        );
      } else {
        await db.query(
          "insert into menus_addon_categories (menus_id, addon_categories_id) values ($1, $2)",
          [item, Number(id)]
        );
      }
    });
  }

  res.status(200).json({ messg: "success" });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedAddonCategory = await db.query(
    "update addon_categories set is_archived = true where id = $1",
    [Number(id)]
  );
  res.send(200);
});

export default router;
