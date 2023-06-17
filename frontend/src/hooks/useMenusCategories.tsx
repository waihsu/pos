import { useContext } from "react";
import { config } from "../config/config";
import { getAccessToken } from "../utils";
import { AppContext } from "../contexts/AppContext";

export const useMenuCategories = () => {
  const accessToken = getAccessToken();
  const { fetchData } = useContext(AppContext);
  const updateMenuCategory = async (newMenuCategory: {
    id: string | undefined;
    name: string;
    locationIds: number[];
  }) => {
    const resp = await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
    fetchData();
  };

  return { updateMenuCategory };
};
