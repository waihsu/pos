import { useState, useEffect, useContext } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeContext } from "../contexts/ThemeContext";
import { Location } from "../types/Types";
import { AppContext } from "../contexts/AppContext";
import { useLocation } from "../hooks/useLocations";

export default function CreateNewLocation() {
  const { createNewLocation } = useLocation();
  const { sideBarBgColor, syntax, bg } = useContext(ThemeContext);
  const { company } = useContext(AppContext);
  const companyId = company?.id as number;
  const [open, setOpen] = useState(false);

  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: companyId,
  });

  return (
    <Box>
      <Button
        onClick={() => setOpen(!open)}
        sx={{
          background: `${sideBarBgColor}`,
          color: `${syntax}`,
          boxShadow: "-10px 10px 40px 0px rgba(20,20,20,.5)",
        }}>
        Create New Location
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new Location</DialogTitle>
        <DialogContent sx={{ width: 400, py: 20 }}>
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

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                createNewLocation(newLocation);
              }}>
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
