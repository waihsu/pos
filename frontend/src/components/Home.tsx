import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

const Home = () => {
  const { fetchData } = useContext(AppContext);
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
      <Typography variant="h3" sx={{ color: "yellow" }}>
        Welcome to Myint Myat
      </Typography>
    </Box>
  );
};

export default Home;
