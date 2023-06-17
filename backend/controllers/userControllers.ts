import { db } from "../db/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

//register
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const isValid =
    name &&
    name.length > 0 &&
    email &&
    email.length > 0 &&
    password &&
    password.length > 0;
  console.log(req.body);
  if (!isValid)
    return res.status(401).json({ error: "Name and password are required." });
  try {
    const result = await db.query("select * from users where email=$1", [
      email,
    ]);
    if (result.rows.length)
      return res.status(200).json({ message: "User already exists." });
    const companiesResult = await db.query(
      "insert into companies (name) values($1) returning *",
      ["Default companies"]
    );
    const companyId = companiesResult.rows[0].id;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      "insert into users (name, email, password, companies_id) values($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, companyId]
    );
    const locationResult = await db.query(
      "insert into locations (name, address, companies_id) values($1, $2, $3) returning *",
      ["Default location", "Default addresss", companyId]
    );
    const locationId = locationResult.rows[0].id;
    const menusResult = await db.query(
      "insert into menus (name, price) select * from unnest ($1::text[], $2::int[]) returning *",
      [
        ["mote-hinn-kharr", "shan-khout-swell"],
        [500, 1000],
      ]
    );
    const menus = menusResult.rows;
    const defaultMenuId1 = menus[0].id;
    const defaultMenuId2 = menus[1].id;
    const menuCategoriesResult = await db.query(
      "insert into menus_categories (name) values ('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
    );
    const defaultMenuCategories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCategories[1].id;

    const menus_menu_categories_locationsResult = await db.query(
      `insert into menus_menu_categories_locations (menus_id,menu_categories_id,locations_id) select * from unnest ($1::int[], $2::int[], $3::int[]) returning *`,
      [
        [defaultMenuId1, defaultMenuId2],
        [defaultMenuCategoryId1, defaultMenuCategoryId2],
        [locationId, locationId],
      ]
    );

    const defaultAddonCategoriesResult = await db.query(
      "insert into addon_categories (name, is_required) values ('Drinks', 'TRUE'), ('Sizes','TRUE') returning *"
    );
    const defaultAddonCategoryId1 = defaultAddonCategoriesResult.rows[0].id;
    const defaultAddonCategoryId2 = defaultAddonCategoriesResult.rows[1].id;
    await db.query(
      `insert into menus_addon_categories (menus_id, addon_categories_id) values (${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
    );
    await db.query(`insert into addons (name, price, addon_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}),
      ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`);
    const registeredUser = newUser.rows;
    res.status(200).json({ registeredUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }

  //   const { name, email, password } = req.body;
  //   if (!name || !email || !password)
  //     return res.status(400).json({ messg: "All fields must be fill" });
  //   const existUser = await db.query("SELECT email FROM users WHERE email=$1", [
  //     email,
  //   ]);
  //   if (existUser.rows.length)
  //     return res.status(400).json({ err: "user already exists" });
  //   try {
  //     const createDefaultCompany = await db.query(
  //       "INSERT INTO companies (name) values($1) returning *",
  //       ["default company"]
  //     );
  //     const companyId = createDefaultCompany.rows[0].id;
  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const user = await db.query(
  //       "INSERT INTO users(name,email,password, companies_id) values($1, $2, $3,$4) returning *",
  //       [name, email, hashedPassword, companyId]
  //     );
  //     const userResult = user.rows[0];
  //     res.status(200).json({ userResult });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(401).json({ err });
  //   }
};

//login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ messg: "All fields must be fill" });
  try {
    const userResult = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    const user = userResult.rows[0];
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return res.status(400).json({ messg: "incorrect password" });
    const accessToken = jwt.sign(user, config.jwtSecret);
    const noPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      companies_id: user.companies_id,
    };
    res.status(200).json({ noPassword, accessToken });
  } catch (err) {
    console.log(err);
    res.status(200).json({ err });
  }
};
