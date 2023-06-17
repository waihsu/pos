import { config } from "../config/config";

export const useTables = () => {
  const createTable = async (newTable: {
    name: string;
    locationId: string | null;
  }) => {
    const resp = await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTable),
    });
  };

  const updateTable = async ({
    name,
    locationId,
  }: {
    name: string;
    locationId: string | null;
  }) => {
    const resp = await fetch(`${config.apiBaseUrl}/tables/${locationId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    });
  };

  return { createTable, updateTable };
};
