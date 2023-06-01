import { useContext } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";

export const useLocation = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { fetchData } = useContext(AppContext);

  //create location
  const createNewLocation = async (location: {
    name: string;
    address: string;
    companyId: number;
  }) => {
    const resp = await fetch(`${config.apiBaseUrl}/api/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(location),
    });
    if (resp.ok) {
      fetchData();
    }
  };

  const deletelocation = async (id: number) => {
    const resp = await fetch(`http://localhost:5000/api/locations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (resp.ok) {
      fetchData();
    }
  };

  return { createNewLocation, deletelocation };
};
