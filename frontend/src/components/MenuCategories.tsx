import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

import { MenuCategory } from "../types/Types";
import { AppContext } from "../contexts/AppContext";
import CreateNewMenuCategories from "./CreateNewMenuCategories";
import { getSelectedLocationId } from "../utils/getLocalStorage";
import { getMenuCategoriesByLocationId } from "../utils";
import { Link } from "react-router-dom";

const variant: Variants = {
  offscreen: {
    opacity: 0,
    x: -100,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      bounce: 0.2,
      duration: 0.4,
      delay: 0.4,
    },
  },
};

const MenuCategories = () => {
  const { menuCategories, menus_menu_categories_locations } =
    useContext(AppContext);
  const locationId = getSelectedLocationId();
  // const validMenuCategoriesId = menus_menu_categories_locations
  //   .filter((item) => item.locations_id === Number(locationId))
  //   .map((item) => item.menu_categories_id);
  // console.log("valid", validMenuCategoriesId);
  // const menucategories = menuCategories.filter((item) =>
  //   validMenuCategoriesId.includes(item.id as number)
  // );
  const validMenuCategories = getMenuCategoriesByLocationId(
    menuCategories,
    menus_menu_categories_locations
  );
  const [updateData, setUpdateData] = useState({ id: Number, name: "" });
  const ref = useRef(null);
  return (
    <Box>
      <Box>
        <CreateNewMenuCategories />
      </Box>
      <Box sx={{ px: 3 }}>
        {validMenuCategories.map((menuCategorie: MenuCategory) => {
          return (
            <Link to={`${menuCategorie.id}`}>
              <motion.div
                key={menuCategorie.id}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ root: ref }}>
                <motion.div variants={variant}>
                  <Box
                    sx={{
                      mb: 2,
                      gap: 2,
                      display: "flex",
                      flexDirection: "column",
                      mx: "auto",
                    }}>
                    <TextField
                      defaultValue={menuCategorie.name}
                      fullWidth
                      onChange={(evt) => {
                        setUpdateData({
                          ...updateData,
                          name: evt.target.value,
                        });
                      }}
                    />

                    <Box>
                      <Button variant="contained">Update</Button>
                      <Button sx={{ bgcolor: "red" }}>Delete</Button>
                    </Box>
                  </Box>
                </motion.div>
              </motion.div>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default MenuCategories;
