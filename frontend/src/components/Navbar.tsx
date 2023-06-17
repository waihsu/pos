import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface Props {
  title?: string;
}

const Navbar = ({ title }: Props) => {
  const { hoverColor } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        bgcolor: "#EBA83A",
        position: "sticky",
        top: 0,
        zIndex: 100,
        opacity: 0.8,
      }}>
      <Typography
        sx={{
          textAlign: "center",
          py: 2,
          fontFamily: "cursive",
          fontSize: 20,
          fontWeight: 700,
          background: `${hoverColor}`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",

          // WebkitBackgroundClip: "text",
          // WebkitTextFillColor: "transparent",
        }}>
        FOOD POS - {title?.split("/")[1]}
      </Typography>
    </Box>
  );
};

export default Navbar;
