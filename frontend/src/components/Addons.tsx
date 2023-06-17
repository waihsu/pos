import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

import { Box, Typography } from "@mui/material";
import {
  getAddonCategoriesByLocationId,
  getAddonsByLocationId,
} from "../utils";

const Addons = () => {
  const {
    addons,
    addonCategories,
    menus_addon_categories,
    menus_menu_categories_locations,
  } = useContext(AppContext);
  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menus_addon_categories,
    menus_menu_categories_locations
  );
  const validAddons = getAddonsByLocationId(addons, validAddonCategories);
  console.log(validAddons);

  return (
    <Box>
      {validAddons.map((item) => {
        return (
          <Box
            key={item.id}
            sx={{
              height: 150,
              width: 100,
              border: "2px solid lightgray",
              mr: 2,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Typography>{item.name}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Addons;
