import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Box } from "@mui/material";

interface Menu {
  id?: number;
  name: string;
  price: number;
  description: string;
}

const Menus = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { fetchData, menus } = useContext(AppContext);

  return (
    <Box>
      {menus && menus.map((menu) => <div key={menu.id}>{menu.name}</div>)}
    </Box>
  );
};

export default Menus;
