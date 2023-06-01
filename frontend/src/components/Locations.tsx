import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useLocation } from "../hooks/useLocations";
import { Location } from "../types/Types";
import { ThemeContext } from "../contexts/ThemeContext";
import CreateNewLocation from "./CreateNewLocationDrawer";

const Locations = () => {
  const { locations, fetchData, company } = useContext(AppContext);
  const { syntax, isSmallscreen } = useContext(ThemeContext);
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
  const accessToken = localStorage.getItem("accessToken");
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
                    setUpdateData({ ...updateData, name: evt.target.value });
                  }}
                />
                <TextField
                  defaultValue={location.address}
                  fullWidth
                  onChange={(evt) => {
                    setUpdateData({ ...updateData, address: evt.target.value });
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
          );
        })}
      </Box>
      <Box
        sx={{
          maxWidth: 600,
          display: isSmallscreen ? "none" : "flex",
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
            fetchData();
          }}>
          Create
        </Button>
      </Box>
      <Box
        sx={{
          display: isSmallscreen ? "flex" : "none",
          position: "fixed",
          right: 0,
          top: "52%",
        }}>
        <CreateNewLocation
          createNewLocation={() => createNewLocation(newLocation)}
        />
      </Box>
    </Box>
  );
};

export default Locations;
