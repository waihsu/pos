import { Box, Button, TextField } from "@mui/material";
import FileDropZone from "./FileDropZone";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useCreateMenu } from "../hooks/useCreateMenu";
import { useMenuCategories } from "../hooks/useMenusCategories";

const CreateNewMenuCategories = () => {
  const locationId = localStorage.getItem("selectedLocationId");
  const { fetchData } = useContext(AppContext);
  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
    locationId: locationId,
  });

  const { createMenuCategory } = useMenuCategories();

  return (
    <Box>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(evt) =>
          setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
        }
      />

      <Button
        variant="contained"
        onClick={() => createMenuCategory(newMenuCategory)}>
        Create
      </Button>
    </Box>
  );
};

export default CreateNewMenuCategories;
