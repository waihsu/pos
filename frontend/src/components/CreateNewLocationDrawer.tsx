import { useState, useEffect, useContext } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import { Box, Button, TextField, Typography } from "@mui/material";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { ThemeContext } from "../contexts/ThemeContext";
import { AppContext } from "../contexts/AppContext";
import { Location } from "../types/Types";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".ul",
      isOpen
        ? { opacity: 1, filter: "blur(0px)", transform: "translateX(0px)" }
        : { opacity: 0, filter: "blur(20px)", transform: "translateX(-300px)" },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      ".li",
      isOpen
        ? { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }
        : { opacity: 0, filter: "blur(20px)", transform: "translateY(0px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}

export default function CreateNewLocation({
  createNewLocation,
}: {
  createNewLocation: (location: Location) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);
  const { company } = useContext(AppContext);
  const { sideBarBgColor, syntax, bg } = useContext(ThemeContext);
  const companyId = company?.id as number;
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: companyId,
  });

  return (
    <Box ref={scope}>
      <div className="button" style={{ position: "relative" }}>
        <motion.div animate={{}} transition={{}}>
          <Box
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              borderRadius: 100,
              position: "absolute",
              right: 0,
              zIndex: 100,
            }}>
            <Button
              sx={{
                background: `${sideBarBgColor}`,
                color: `${syntax}`,
                boxShadow: "10px 10px 10px 10px #333",
              }}>
              Create
            </Button>
          </Box>
        </motion.div>
      </div>
      <div
        className="ul"
        style={{
          width: 300,
          borderRadius: 10,
          padding: "14px 0",
          background: `${bg}`,
          opacity: 0.1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          gap: 2,
        }}>
        <div className="li">
          <Box
            sx={{
              maxWidth: 600,

              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mx: "auto",
            }}>
            <Typography>Create New Location</Typography>
            <TextField
              value={newLocation.name}
              fullWidth
              onChange={(evt) =>
                setNewLocation({ ...newLocation, name: evt.target.value })
              }
            />
            <TextField
              value={newLocation.address}
              fullWidth
              onChange={(evt) =>
                setNewLocation({ ...newLocation, address: evt.target.value })
              }
            />
            <Button
              variant="contained"
              onClick={() => {
                createNewLocation(newLocation);
              }}>
              Create
            </Button>
          </Box>
        </div>
      </div>
    </Box>
  );
}
