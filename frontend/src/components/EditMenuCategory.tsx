import { SelectHTMLAttributes, useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  getAccessToken,
  getLocationsByMenuCategoryId,
  getMenusByLocationId,
  getSelectedLocationId,
} from "../utils";
import Autocomplete from "./AutoComplete";
import { config } from "../config/config";
import { useMenuCategories } from "../hooks/useMenusCategories";
import MenuCard from "./MenuCard";

const EditMenuCateogry = () => {
  const { menuCategories, locations, menus_menu_categories_locations, menus } =
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

  const locationByMenus = getMenusByLocationId(
    menus,
    menus_menu_categories_locations
  );

  const locationId = getSelectedLocationId();
  const validMenuIds = menus_menu_categories_locations
    .filter((item) => item.locations_id === Number(locationId))
    .filter((item) => item.menu_categories_id === Number(menuCategoryId))
    .map((item) => item.menus_id);
  console.log("validmenusIds", validMenuIds);

  const menuCategoryByMenu = menus.filter((item) =>
    validMenuIds.includes(item.id as number)
  );
  const mapMenuForAutoComplete = menuCategoryByMenu.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
  console.log("mapmenu", mapMenuForAutoComplete);
  const allmenu = getMenusByLocationId(menus, menus_menu_categories_locations);
  const menusOptions = allmenu.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  console.log("menuCategoryByMenu", menuCategoryByMenu);

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
  const [updateCategory, setUpdateCategory] = useState({
    id: menuCategoryId,
    name: "",
    locationIds: [] as number[],
    menuIds: [] as number[],
    currentLocationId: locationId,
  });

  //update MenuCategory
  const { updateMenuCategory, deleteMenu } = useMenuCategories();

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
          setUpdateCategory({ ...updateCategory, name: evt.target.value })
        }
      />
      <Autocomplete
        options={mappedLocations}
        defaultValue={options}
        label="locations"
        placeholder="locations"
        onChange={(options: any[]) =>
          setUpdateCategory({
            ...updateCategory,
            locationIds: options.map((item: any) => item.id),
          })
        }
      />
      <Autocomplete
        options={menusOptions}
        defaultValue={mapMenuForAutoComplete}
        label="Menus"
        placeholder="Menus"
        onChange={(mapMenuForAutoComplete: any[]) =>
          setUpdateCategory({
            ...updateCategory,
            menuIds: mapMenuForAutoComplete.map((item: any) => item.id),
          })
        }
      />
      <Button
        variant="contained"
        onClick={() => updateMenuCategory(updateCategory)}
        sx={{ mt: 5 }}>
        Update
      </Button>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menuCategoryByMenu.map((item) => (
          <Box sx={{ maxWidth: 300 }} key={item.id}>
            <MenuCard
              name={item.name}
              description={item.description as string}
              price={item.price}
              accet_url={item.asset_url as string}
            />
            <Button
              color="error"
              onClick={() =>
                deleteMenu({
                  menuId: item.id as number,
                  locationId: Number(locationId),
                })
              }>
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EditMenuCateogry;
