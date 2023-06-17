import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { ThemeContext } from "../contexts/ThemeContext";

const Home = () => {
  const { fetchData } = useContext(AppContext);
  const { bg } = useContext(ThemeContext);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",

        textAlign: "center",
      }}>
      <Typography variant="h3" sx={{}}>
        Welcome to Foodie POS
      </Typography>
    </Box>
  );
};

export default Home;
