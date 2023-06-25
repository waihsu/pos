import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Autocomplete from "./AutoComplete";
import { useContext, useState } from "react";
import { Props } from "./CreateNewAddonCategories";
import { AppContext } from "../contexts/AppContext";
import { getSelectedLocationId } from "../utils";
import { useAddon } from "../hooks/useAddon";

const CreateNewAddon = ({ open, setOpen }: Props) => {
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: "",
    addonCategoryIds: [] as number[],
  });

  const locationId = getSelectedLocationId();
  const {
    menus_menu_categories_locations,
    menus_addon_categories,
    addonCategories,
  } = useContext(AppContext);

  const validMenuIds = menus_menu_categories_locations
    .filter(
      (item) => item.locations_id && item.locations_id === Number(locationId)
    )
    .map((item) => item.menus_id);
  console.log(validMenuIds);
  const validAddonCategoryIds = menus_addon_categories
    .filter((item) => validMenuIds.includes(item.menus_id))
    .map((item) => item.addon_categories_id);
  console.log(validAddonCategoryIds);
  const validAddonCategories = addonCategories.filter((item) =>
    validAddonCategoryIds.includes(Number(item.id))
  );
  console.log(validAddonCategories);
  const options = validAddonCategories.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  //useAddon
  const { createAddon } = useAddon();
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Addon</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Name"
            onChange={(evt) =>
              setNewAddon({ ...newAddon, name: evt.target.value })
            }
          />
          <TextField
            label="Price"
            onChange={(evt) =>
              setNewAddon({ ...newAddon, price: evt.target.value })
            }
          />
          <Autocomplete
            options={options}
            label="Addon"
            placeholder="Addon"
            onChange={(options: any) => {
              setNewAddon({
                ...newAddon,
                addonCategoryIds: options.map((item: any) => item.id),
              });
            }}
          />
          <Button onClick={() => createAddon(newAddon)}>Create</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateNewAddon;
