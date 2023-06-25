import { useContext, useState } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  menuIds: number[];
}

export const useAddonCategories = () => {
  const router = useNavigate();

  const { fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const createAddonCategory = async ({ name, menuIds }: Props) => {
    const resp = await fetch(`${config.apiBaseUrl}/addoncategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, menuIds }),
    });
    fetchData();
  };

  const updateAddonCategory = async ({
    id,
    name,
    menuIds,
    addonIds,
  }: {
    id: number;
    name: string;
    menuIds: number[];
    addonIds: number[];
  }) => {
    const resp = await fetch(`${config.apiBaseUrl}/addoncategories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, menuIds, addonIds }),
    });
  };

  const deleteAddonCategory = async (id: number) => {
    await fetch(`${config.apiBaseUrl}/addoncategories/${id}`, {
      method: "DELETE",
    });
    fetchData();
    router("/addon-categories");
  };

  return { createAddonCategory, updateAddonCategory, deleteAddonCategory };
};
