import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { getMenusByLocationId } from "../utils";
import Autocomplete from "./AutoComplete";
import { useAddonCategories } from "../hooks/useAddonCategories";

export interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateNewAddonCategories = ({ open, setOpen }: Props) => {
  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    menuIds: [] as number[],
  });
  const { menus, menus_menu_categories_locations } = useContext(AppContext);
  const validMenus = getMenusByLocationId(
    menus,
    menus_menu_categories_locations
  );
  const mapMenus = validMenus.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const { createAddonCategory } = useAddonCategories();
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Addon Category</DialogTitle>
        <DialogContent>
          <TextField
            label="name"
            variant="outlined"
            onChange={(evt) =>
              setNewAddonCategory({
                ...newAddonCategory,
                name: evt.target.value,
              })
            }
          />
          <Autocomplete
            options={mapMenus}
            label="Menus"
            placeholder="Menus"
            onChange={(options: any[]) => {
              setNewAddonCategory({
                ...newAddonCategory,
                menuIds: options.map((item: any) => item.id),
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              createAddonCategory(newAddonCategory);
              setOpen(false);
            }}>
            {" "}
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateNewAddonCategories;
