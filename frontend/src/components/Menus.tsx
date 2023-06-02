import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Box, Grid } from "@mui/material";
import MenuCard from "./MenuCard";

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
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mx: "auto" }}>
        {menus &&
          menus.map((menu) => (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid key={menu.id} xs={6}>
                <MenuCard
                  name={menu.name}
                  description={menu.description as string}
                  price={menu.price}
                />
              </Grid>
            </Grid>
          ))}
      </Box>
    </Box>
  );
};

export default Menus;
