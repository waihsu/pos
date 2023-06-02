import { useContext, useRef, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useLocation } from "../hooks/useLocations";
import { ThemeContext } from "../contexts/ThemeContext";
import CreateNewLocation from "./CreateNewLocationDrawer";
import { motion, Variants } from "framer-motion";

const variant: Variants = {
  offscreen: {
    opacity: 0,
    x: -100,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      bounce: 0.2,
      duration: 0.4,
      delay: 0.4,
    },
  },
};

const Locations = () => {
  const ref = useRef(null);
  const { locations, fetchData, company } = useContext(AppContext);
  const { isSmallscreen, isMediumScreen } = useContext(ThemeContext);
  const companyId = company?.id as number;

  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: companyId,
  });
  const [updateData, setUpdateData] = useState({
    name: "",
    address: "",
    locationId: "",
  });

  const { createNewLocation, deletelocation, updateLocation } = useLocation();

  return (
    <Box
      sx={{
        pt: 6,
        display: "flex",
        px: 2,
      }}>
      <Box>
        {locations.map((location, index) => {
          return (
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ root: ref }}>
              <motion.div variants={variant}>
                <Box
                  key={location.id}
                  sx={{
                    maxWidth: 500,

                    display: "flex",
                    gap: 2,
                    mb: 2,
                    py: 2,
                  }}>
                  <Typography variant="h5">{index + 1}.</Typography>
                  <Box
                    sx={{
                      mb: 2,
                      gap: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}>
                    <TextField
                      defaultValue={location.name}
                      fullWidth
                      onChange={(evt) => {
                        setUpdateData({
                          ...updateData,
                          name: evt.target.value,
                        });
                      }}
                    />
                    <TextField
                      defaultValue={location.address}
                      fullWidth
                      onChange={(evt) => {
                        setUpdateData({
                          ...updateData,
                          address: evt.target.value,
                        });
                      }}
                    />
                    <Box>
                      <Button
                        variant="contained"
                        onClick={() =>
                          updateLocation({
                            ...updateData,
                            locationId: location.id as number,
                          })
                        }>
                        Update
                      </Button>
                      <Button
                        sx={{ bgcolor: "red" }}
                        onClick={() => deletelocation(location.id as number)}>
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </motion.div>
          );
        })}
      </Box>

      <Box
        sx={{
          maxWidth: 600,
          display: isMediumScreen ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mx: "auto",
        }}>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ root: ref }}>
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
              fetchData();
            }}>
            Create
          </Button>
        </motion.div>
      </Box>

      <Box
        sx={{
          display: isSmallscreen ? "flex" : "none",
          position: "fixed",
          right: 0,
          top: "52%",
        }}>
        <CreateNewLocation
          newLocation={newLocation}
          setNewLocation={setNewLocation}
          createNewLocation={() => createNewLocation(newLocation)}
        />
      </Box>
    </Box>
  );
};

export default Locations;
