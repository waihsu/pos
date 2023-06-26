import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Autocomplete from "./AutoComplete";
import { getAddonsByLocationId, getMenusByLocationId } from "../utils";
import { useAddonCategories } from "../hooks/useAddonCategories";
import DeleteDialog from "./DeleteDialog";

const EditAddonCategories = () => {
  const param = useParams();
  const addonCategoryId = param.id;
  const [open, setOpen] = useState(false);
  const { updateAddonCategory, deleteAddonCategory } = useAddonCategories();
  const [updateCategory, setUpdateCategory] = useState({
    id: Number(addonCategoryId),
    name: "",
    menuIds: [] as number[],
    addonIds: [] as number[],
  });

  const {
    addons,
    addonCategories,
    menus,
    menus_addon_categories,
    menus_menu_categories_locations,
  } = useContext(AppContext);

  const menusByLocation = getMenusByLocationId(
    menus,
    menus_menu_categories_locations
  );
  const mapMenus = menusByLocation.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  //validAddonCategory
  const validAddonCategory = addonCategories.find(
    (item) => item.id === Number(addonCategoryId)
  );
  console.log(validAddonCategory);
  const validAddonCategoryId = validAddonCategory?.id;
  // console.log(validAddonCategoryId);

  const validmenuAddonCategories = menus_addon_categories.filter(
    (item) => item.addon_categories_id === validAddonCategoryId
  );
  console.log(validmenuAddonCategories);
  const validMenuIdsByAddonCategory = validmenuAddonCategories.map(
    (item) => item.menus_id
  );
  // console.log("validMenuIdsByAddonCategory", validMenuIdsByAddonCategory);

  const validMenus = menus.filter((item) =>
    validMenuIdsByAddonCategory.includes(item.id as number)
  );
  // console.log(validMenus);
  const defaultMenus = validMenus.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  //validAddonForAutoComplete
  const addonByLocation = getAddonsByLocationId(addons, addonCategories);
  console.log(addonByLocation);
  const mapAddonByLocation = addonByLocation.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const defaultAddon = addons
    .filter((item) => item.is_archived === false)
    .filter((item) => item.addon_categories_id === Number(addonCategoryId));
  console.log("default", defaultAddon);
  const mapdefaultAddon = defaultAddon.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  if (!validAddonCategory)
    return (
      <Box sx={{ pt: 3, pl: 3 }}>
        <Typography variant="h4">Addon category not found</Typography>
      </Box>
    );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpen(!open)}>
          Delete
        </Button>
        <DeleteDialog
          title="Are you sure want to delete"
          open={open}
          setOpen={setOpen}
          callback={() => deleteAddonCategory(Number(addonCategoryId))}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          defaultValue={validAddonCategory.name}
          variant="outlined"
          onChange={(evt) =>
            setUpdateCategory({
              ...updateCategory,
              name: evt.target.value,
            })
          }
        />
        <Autocomplete
          options={mapMenus}
          defaultValue={defaultMenus}
          label="Menus"
          placeholder="Menus"
          onChange={(options: any[]) => {
            setUpdateCategory({
              ...updateCategory,
              menuIds: options.map((item: any) => item.id),
            });
          }}
        />
        <Autocomplete
          options={mapAddonByLocation}
          defaultValue={mapdefaultAddon}
          label="Addons"
          placeholder="Addons"
          onChange={(options: any[]) => {
            setUpdateCategory({
              ...updateCategory,
              addonIds: options.map((item: any) => item.id),
            });
          }}
        />
        <Button
          onClick={() => updateAddonCategory(updateCategory)}
          variant="contained">
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default EditAddonCategories;
