import { Box, Button, TextField } from "@mui/material";
import FileDropZone from "./FileDropZone";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useCreateMenu } from "../hooks/useCreateMenu";

const CreateNewMenu = () => {
  const locationId = localStorage.getItem("selectedLocationId");
  const { fetchData } = useContext(AppContext);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    asset_url: "",
    locationId: locationId,
  });

  const { createNewMenu, uploadImage } = useCreateMenu();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const createMenu = async () => {
    const asset_url = await uploadImage(selectedFiles);
    newMenu.asset_url = asset_url;

    // console.log(newMenu);

    await createNewMenu(newMenu);
    fetchData();

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
      <FileDropZone onFileSelected={onFileSelected} />
      <Button onClick={createMenu}>Create</Button>
    </Box>
  );
};

export default CreateNewMenu;
