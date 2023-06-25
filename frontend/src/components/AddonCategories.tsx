import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

import { Box, Button, Typography } from "@mui/material";
import { getAddonCategoriesByLocationId } from "../utils";
import CreateNewAddonCategories from "./CreateNewAddonCategories";
import { Link } from "react-router-dom";

const AddonCategories = () => {
  const {
    addonCategories,
    menus_addon_categories,
    menus_menu_categories_locations,
  } = useContext(AppContext);
  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menus_addon_categories,
    menus_menu_categories_locations
  );

  const [open, setOpen] = useState(false);

  console.log(validAddonCategories);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpen(!open)}>
          Create Addon Category
        </Button>
      </Box>
      <CreateNewAddonCategories open={open} setOpen={setOpen} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}>
        {validAddonCategories.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}`}
              style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  bgcolor: "white",
                  height: 150,
                  width: 100,
                  border: "2px solid lightgray",
                  mr: 2,
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ":hover": {
                    color: "orangered",
                  },
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

export default AddonCategories;
