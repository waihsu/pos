import { useContext } from "react";
import { config } from "../config/config";
import { getAccessToken } from "../utils";
import { AppContext } from "../contexts/AppContext";

export const useMenuCategories = () => {
  const accessToken = getAccessToken();
  const { fetchData } = useContext(AppContext);

  const createMenuCategory = async ({
    name,
    locationId,
  }: {
    name: string;
    locationId: string | null;
  }) => {
    await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, locationId }),
    });
    fetchData();
  };

  const updateMenuCategory = async (updateCategory: {
    id: string | undefined;
    name: string;
    locationIds: number[];
    menuIds: number[];
    currentLocationId: string | null;
  }) => {
    const resp = await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCategory),
    });
    fetchData();
  };

  const deleteMenu = async ({
    menuId,
    locationId,
  }: {
    menuId: number;
    locationId: number;
  }) => {
    const resp = await fetch(`${config.apiBaseUrl}/menuCategories/removeMenu`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menuId, locationId }),
    });
    fetchData();
  };

  return { updateMenuCategory, deleteMenu, createMenuCategory };
};
