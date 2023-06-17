import { Box, Button, TextField } from "@mui/material";
import FileDropZone from "./FileDropZone";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useCreateMenu } from "../hooks/useCreateMenu";

const CreateNewMenuCategories = () => {
  const locationId = localStorage.getItem("selectedLocationId");
  const { fetchData } = useContext(AppContext);

  return (
    <Box>
      <TextField id="outlined-basic" label="Name" variant="outlined" />

      <Button variant="contained">Create</Button>
    </Box>
  );
};

export default CreateNewMenuCategories;
