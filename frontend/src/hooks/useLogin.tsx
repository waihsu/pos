import { useNavigate } from "react-router-dom";
import { config } from "../config/config";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const useLogin = () => {
  const { fetchData } = useContext(AppContext);
  const navigate = useNavigate();
  const login = async (user: { email: string; password: string }) => {
    const resp = await fetch(`${config.apiBaseUrl}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (resp.ok) {
      const data = await resp.json();
      const accessToken = data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
      fetchData();
    }
  };
  return { login };
};

export default useLogin;
