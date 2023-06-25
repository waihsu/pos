import { useContext } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";

export const useAddon = () => {
  const { fetchData } = useContext(AppContext);
  const createAddon = async ({
    name,
    price,
    addonCategoryIds,
  }: {
    name: string;
    price: string;
    addonCategoryIds: number[];
  }) => {
    const resp = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, addonCategoryIds }),
    });
    fetchData();
  };

  return { createAddon };
};
