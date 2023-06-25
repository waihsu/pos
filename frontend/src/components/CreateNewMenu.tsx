import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import FileDropZone from "./FileDropZone";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useCreateMenu } from "../hooks/useCreateMenu";
import Autocomplete from "./AutoComplete";
import { getMenuCategoriesByLocationId, getSelectedLocationId } from "../utils";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateNewMenu = ({ open, setOpen }: Props) => {
  const locationId = getSelectedLocationId() as string;
  const { fetchData, menuCategories, menus_menu_categories_locations } =
    useContext(AppContext);

  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    asset_url: "",
    locationId: locationId,
    menuCategoryIds: [] as number[],
  });

  const validMenuCategories = getMenuCategoriesByLocationId(
    menuCategories,
    menus_menu_categories_locations
  );
  const mapMenuCategories = validMenuCategories.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
  const { createNewMenu, uploadImage } = useCreateMenu();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const createMenu = async () => {
    const asset_url = await uploadImage(selectedFiles);
    newMenu.asset_url = asset_url;

    // console.log(newMenu);

    await createNewMenu(newMenu);
    fetchData();
    setOpen(false);

    // const formData = new FormData();
    // formData.append("files", selectedFiles[0]);
    // const resp = await fetch(`${config.apiBaseUrl}/assets`, {
    //   method: "POST",

    //   body: formData,
    // });
    // const data = await resp.json();
    // newMenu.asset_url = data.assetUrl;
    // if (resp.ok) {
    //   const response = await fetch(`${config.apiBaseUrl}/api/menus`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     body: JSON.stringify(newMenu),
    //   });
    //   if (response.ok) {
    //     fetchData();
    //   }
    // }
  };

  const onFileSelected = (selectedFiles: File[]) => {
    setSelectedFiles(selectedFiles);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create new menu</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(evt) => {
              setNewMenu({ ...newMenu, name: evt.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onChange={(evt) => {
              setNewMenu({ ...newMenu, description: evt.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            onChange={(evt) => {
              setNewMenu({ ...newMenu, price: Number(evt.target.value) });
            }}
          />
          <Autocomplete
            options={mapMenuCategories}
            label="MenuCategory"
            placeholder="MenuCategory"
            onChange={(options: any[]) =>
              setNewMenu({
                ...newMenu,
                menuCategoryIds: options.map((item: any) => item.id),
              })
            }
          />
          <FileDropZone onFileSelected={onFileSelected} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={createMenu}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewMenu;
