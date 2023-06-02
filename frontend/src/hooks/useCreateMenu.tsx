import { useContext } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";

export const useCreateMenu = () => {
  const { accessToken } = useContext(AppContext);

  const uploadImage = async (selectedFiles: File[]) => {
    const formData = new FormData();
    formData.append("files", selectedFiles[0]);
    const resp = await fetch(`${config.apiBaseUrl}/assets`, {
      method: "POST",
      body: formData,
    });
    const data = await resp.json();
    const asset_url = data.assetUrl;
    return asset_url;
  };

  const createNewMenu = async (newMenu: {
    name: string;
    description: string;
    price: number;
    asset_url: string;
    locationId: string | null;
  }) => {
    const resp = await fetch(`${config.apiBaseUrl}/api/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(newMenu),
    });
  };

  return { createNewMenu, uploadImage };
};
