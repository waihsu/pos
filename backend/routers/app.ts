import express, { Request, Response } from "express";

import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

const app = express.Router();

app.get("/", checkAuth, async (req: Request, res: Response) => {
  const userResult = await db.query(`select * from users where email = $1`, [
    //@ts-ignore
    req.email,
  ]);
  const userRows = userResult.rows;
  if (!userRows.length)
    return res.status(401).json({ messg: "user not exist" });
  const user = userResult.rows[0];
  const companyId = user.companies_id;
  const locations = await db.query(
    "select * from locations where companies_id = $1",
    [companyId]
  );
  const locationIds = locations.rows.map((row) => row.id);

  const menus_menu_categories_locations = await db.query(
    "select * from menus_menu_categories_locations where locations_id = ANY($1::int[])",
    [locationIds]
  );

  const menuIds = menus_menu_categories_locations.rows.map(
    (row) => row.menus_id
  );
  const menus_categoriesIds = menus_menu_categories_locations.rows.map(
    (row) => row.menu_categories_id
  );

  const menus = await db.query(
    "select * from menus where id = ANY($1::int[])",
    [menuIds]
  );

  const menuCategoriesResult = await db.query(
    "select * from menus_categories where id = ANY($1::int[])",
    [menus_categoriesIds]
  );

  const menusAddonCategoriesResult = await db.query(
    "select * from menus_addon_categories where menus_id = ANY($1::int[])",
    [menuIds]
  );
  const addonCategoryIds = menusAddonCategoriesResult.rows.map(
    (row) => row.addon_categories_id
  );
  const addonCategories = await db.query(
    "select * from addon_categories where id = ANY($1::int[])",
    [addonCategoryIds]
  );
  const addons = await db.query(
    "select * from addons where addon_categories_id = ANY($1::int[])",
    [addonCategoryIds]
  );

  const companyResult = await db.query(
    "select * from companies where id = $1",
    [companyId]
  );
  const tableResult = await db.query(
    "select * from tables where locations_id = ANY($1::int[])",
    [locationIds]
  );
  const company = companyResult.rows[0];
  res.send({
    menus: menus.rows,
    menus_addon_categories: menusAddonCategoriesResult.rows,
    menuCategories: menuCategoriesResult.rows,
    addons: addons.rows,
    addonCategories: addonCategories.rows,
    locations: locations.rows,
    menus_menu_categories_locations: menus_menu_categories_locations.rows,
    company,
    tables: tableResult.rows,
  });
});

export default app;
