import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { useContext, useState } from "react";
import { getSelectedLocationId } from "../utils/getLocalStorage";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { useTables } from "../hooks/useTables";

const Tables = () => {
  const [open, setOpen] = useState(false);
  const { tables } = useContext(AppContext);

  const selectedLocationId = getSelectedLocationId();
  const [newTable, setNewTable] = useState({
    name: "",
    locationId: selectedLocationId,
  });

  const { createTable, updateTable } = useTables();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 3,
          pt: 3,
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create new table
          </Button>
        </Box>
        <Box sx={{}}>
          <h1>Selected locations tables</h1>
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new table</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <TextField
            onChange={(evt) =>
              setNewTable({ ...newTable, name: evt.target.value })
            }
            placeholder="Table name"
            sx={{ width: "100%" }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={() => createTable(newTable)}>
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      {tables &&
        tables.map((table) => (
          <Box key={table.id} sx={{ mb: 1, mx: "auto" }}>
            <TextField defaultValue={table.name} />
            <Button variant="contained" onClick={() => updateTable(newTable)}>
              Update
            </Button>
          </Box>
        ))}
    </Box>
  );
};

export default Tables;
