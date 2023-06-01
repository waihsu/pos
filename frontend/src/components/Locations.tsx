import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useLocation } from "../hooks/useLocations";
import { Location } from "../types/Types";

const Locations = () => {
  const { locations, fetchData, company } = useContext(AppContext);
  const companyId = company?.id as number;

  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: companyId,
  });
  const [updateData, setUpdateData] = useState({
    name: "",
    address: "",
    locationId: Number,
  });
  const accessToken = localStorage.getItem("accessToken");
  const { createNewLocation, deletelocation } = useLocation();

  const updateLocation = async (id: number) => {
    console.log(id);
    const resp = await fetch(`http://localhost:5000/api/locations?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updateData),
    });
    fetchData();
  };

  return (
    <Box sx={{ ml: 3, mt: 5 }}>
      {locations.map((location, index) => {
        return (
          <Box
            key={location.id}
            sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" sx={{ mr: 3 }}>
              {index + 1}.
            </Typography>
            <TextField
              defaultValue={location.name}
              sx={{ mr: 3 }}
              onChange={(evt) => {
                setUpdateData({ ...updateData, name: evt.target.value });
              }}
            />
            <TextField
              defaultValue={location.address}
              sx={{ mr: 3 }}
              onChange={(evt) => {
                setUpdateData({ ...updateData, address: evt.target.value });
              }}
            />
            <Button
              variant="contained"
              onClick={() => updateLocation(location.id as number)}>
              Update
            </Button>
            <Button
              sx={{ bgcolor: "red" }}
              onClick={() => deletelocation(location.id as number)}>
              Delete
            </Button>
          </Box>
        );
      })}
      <Box sx={{ ml: 5, display: "flex", alignItems: "center" }}>
        <TextField
          value={newLocation.name}
          sx={{ mr: 3 }}
          onChange={(evt) =>
            setNewLocation({ ...newLocation, name: evt.target.value })
          }
        />
        <TextField
          value={newLocation.address}
          sx={{ mr: 3 }}
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
    </Box>
  );
};

export default Locations;
