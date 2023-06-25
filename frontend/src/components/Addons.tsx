import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

import { Box, Button, TextField, Typography } from "@mui/material";
import {
  getAddonCategoriesByLocationId,
  getAddonsByLocationId,
} from "../utils";
import { Link } from "react-router-dom";
import CreateNewAddon from "./CreateNewAddon";

const Addons = () => {
  const {
    addons,
    addonCategories,
    menus_addon_categories,
    menus_menu_categories_locations,
  } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menus_addon_categories,
    menus_menu_categories_locations
  );
  // console.log("validaddonCategories", validAddonCategories);
  const validAddons = getAddonsByLocationId(addons, validAddonCategories);
  // console.log(validAddons);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <Button
          onClick={() => setOpen(!open)}
          variant="contained"
          color="warning">
          Create
        </Button>
        <CreateNewAddon open={open} setOpen={setOpen} />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {validAddons.map((item) => {
          return (
            <Link key={item.id} to={`${item.id}`}>
              <Box
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
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default Addons;
