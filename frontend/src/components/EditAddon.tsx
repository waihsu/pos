import { Box } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const EditAddon = () => {
  const param = useParams();
  const addonId = param.id;

  const { addons } = useContext(AppContext);
  const validAddon = addons.filter((item) => item.id === Number(addonId));
  console.log(validAddon);

  return (
    <Box>
      <h1>Edit addon</h1>
    </Box>
  );
};

export default EditAddon;
