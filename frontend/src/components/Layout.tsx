import { ReactNode } from "react";
import NavBar from "./Navbar";
import SideBar from "./SideBar";
import { Box } from "@mui/material";
import Drawer from "./Drawer";
import { useNavigate, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";

interface Props {
  title?: string;
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useNavigate();
  const title = window.location.pathname;
  return (
    <Box
      sx={{
        maxHeight: "100vh",
        // background: `${bg}`,
        overflowX: "hidden",
        background:
          "linear-gradient(122deg, rgba(43,12,91,1) 0%, rgba(128,39,53,1) 21%, rgba(205,160,56,1) 83%, rgba(93,48,20,1) 100%)",
      }}>
      <Navbar title={title} />
      <Box sx={{ position: "absolute", zIndex: 1100 }}>
        <Drawer />
      </Box>
      <Box
        sx={{
          minWidth: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Box sx={{ width: "77vw" }}>
          <Box
            sx={{
              maxWidth: "80%",
              mx: "auto",
              boxShadow: "-20px 10px 10px 10px rgba(20,20,20,.5)",
              opacity: 0.8,
              bgcolor: "#4D4D4D",
            }}>
            {children}
          </Box>
        </Box>

        <Box position={"fixed"} right={0} zIndex={1100}>
          <SideBar title={title} />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
