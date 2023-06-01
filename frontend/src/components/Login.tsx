import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config/config";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const signIn = async () => {
    const resp = await fetch(`${config.apiBaseUrl}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (resp.ok) {
      const responseData = await resp.json();
      const accessToken = responseData.accessToken;
      const user = responseData.noPassword;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", user);
      navigate("/");
    }
  };

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
      <Button onClick={signIn} variant="contained">
        Login
      </Button>
      <Link to="/register">Register</Link>
    </Box>
  );
};

export default Login;
