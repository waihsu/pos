import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import TableBarIcon from "@mui/icons-material/TableBar";
import logo from "../assets/logo-no-background.png";

import Logout from "./Logout";
import { title } from "process";

const sidebarMenuItems = [
  { id: 1, label: "Orders", icon: <LocalMallIcon />, route: "/orders" },
  { id: 2, label: "Menus", icon: <LocalDiningIcon />, route: "/menus" },
  {
    id: 3,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/menu-categories",
  },
  { id: 4, label: "Addons", icon: <LunchDiningIcon />, route: "/addons" },
  {
    id: 5,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/addon-categories",
  },
  {
    id: 6,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/locations",
  },
  {
    id: 7,
    label: "Tables",
    icon: <TableBarIcon />,
    route: "/tables",
  },
  { id: 8, label: "Settings", icon: <SettingsIcon />, route: "/settings" },
];

const SideBar = () => {
  const pathName = window.location.pathname;
  const { mainBg, hoverColor, syntax, isMediumScreen, isSmallscreen } =
    useContext(ThemeContext);
  const accessToken = localStorage.getItem("accessToken");
  return (
    <Box
      sx={{
        width: isMediumScreen ? "80px" : "290px",
        display: "flex",
        justifyContent: "flex-start",
        minHeight: "100vh",
        flexDirection: "column",
        boxShadow: "-20px 10px 10px rgba(20,20,20,.5)",
        opacity: 0.8,
        borderTopLeftRadius: 10,
      }}>
      <Box sx={{ mx: "auto", my: 2 }}>
        <img
          src={logo}
          alt="logo"
          width={isMediumScreen ? 60 : 120}
          height={isMediumScreen ? 30 : 60}
        />
      </Box>

      <Box>
        <List>
          {sidebarMenuItems.slice(0, 7).map((menuItem) => (
            <Link
              key={menuItem.id}
              to={menuItem.route}
              style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ marginLeft: "35px", color: "red" }}
                whileInView={{
                  scale: `${pathName === menuItem.route ? 1.15 : 1}`,
                  color: `${pathName === menuItem.route ? hoverColor : syntax}`,
                  marginLeft: `${
                    isMediumScreen
                      ? 0
                      : `${pathName === menuItem.route ? "35px" : 0}`
                  }`,
                }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon
                      sx={{
                        ml: isMediumScreen ? 1 : 0,
                        color: `${
                          pathName === menuItem.route ? "#5C469C" : syntax
                        }`,
                      }}>
                      {menuItem.icon}
                    </ListItemIcon>

                    {isMediumScreen ? null : (
                      <ListItemText primary={menuItem.label} />
                    )}
                  </ListItemButton>
                </ListItem>
              </motion.div>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {sidebarMenuItems.slice(-1).map((menuItem) => (
            <Link
              key={menuItem.id}
              to={"/settings"}
              style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ marginLeft: "35px", color: "red" }}
                whileInView={{
                  color: `${pathName === menuItem.route ? hoverColor : syntax}`,
                  marginLeft: `${pathName === menuItem.route ? "25px" : 0}`,
                }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon
                      sx={{
                        ml: isMediumScreen ? 1 : 0,
                        color: `${
                          pathName === menuItem.route ? "#526D82" : syntax
                        }`,
                      }}>
                      {menuItem.icon}
                    </ListItemIcon>

                    <ListItemText primary={menuItem.label} />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            </Link>
          ))}
        </List>
      </Box>
      {accessToken ? (
        <Logout />
      ) : (
        <NavLink to={"/register"}>
          <Button>Register</Button>
        </NavLink>
      )}
    </Box>
  );
};

export default SideBar;
