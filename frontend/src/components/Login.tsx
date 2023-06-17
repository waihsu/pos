import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import useLogin from "../hooks/useLogin";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login } = useLogin();

  return (
    <Box
      sx={{
        maxWidth: 700,
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        mt: 10,
        gap: 6,
      }}>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(evt) => {
          setUser({ ...user, email: evt.target.value });
        }}
      />
      <TextField
        type="password"
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={(evt) => {
          setUser({ ...user, password: evt.target.value });
        }}
      />
      <Button onClick={() => login(user)} variant="contained">
        Login
      </Button>
      <Link to="/register">Register</Link>
    </Box>
  );
};

export default Login;
