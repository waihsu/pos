import { SelectHTMLAttributes, useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getAccessToken, getLocationsByMenuCategoryId } from "../utils";
import Autocomplete from "./AutoComplete";
import { config } from "../config/config";
import { useMenuCategories } from "../hooks/useMenusCategories";

const EditMenuCateogry = () => {
  const { menuCategories, locations, menus_menu_categories_locations } =
    useContext(AppContext);
  const params = useParams();
  const menuCategoryId = params.id;

  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );
  const validLocations = getLocationsByMenuCategoryId(
    locations,
    menuCategoryId as string,
    menus_menu_categories_locations
  );

  const options = validLocations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const mappedLocations = locations
    .map((item) => ({
      id: item.id as number,
      name: item.name,
    }))
    .filter((item) => {
      const validLocationIds = validLocations.map((item) => item.id as number);
      return !validLocationIds.includes(item.id);
    });
  console.log("mappLocations", mappedLocations);
  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: "",
    locationIds: [] as number[],
  });

  //update MenuCategory
  const { updateMenuCategory } = useMenuCategories();

  if (!menuCategory)
    return (
      <Box sx={{ pt: 3, pl: 3 }}>
        <Typography variant="h4">Menu category not found</Typography>
      </Box>
    );

  return (
    <Box sx={{ pt: 3, pl: 3 }}>
      <TextField
        defaultValue={menuCategory.name}
        sx={{ mb: 2 }}
        onChange={(evt) =>
          setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
        }
      />
      <Autocomplete
        options={mappedLocations}
        defaultValue={options}
        label="locations"
        placeholder="locations"
        onChange={(options: any[]) =>
          setNewMenuCategory({
            ...newMenuCategory,
            locationIds: options.map((item: any) => item.id),
          })
        }
      />
      <Button
        variant="contained"
        onClick={() => updateMenuCategory(newMenuCategory)}
        sx={{ mt: 5 }}>
        Update
      </Button>
    </Box>
  );
};

export default EditMenuCateogry;
