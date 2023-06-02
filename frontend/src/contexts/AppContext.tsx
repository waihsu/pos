import { createContext, useEffect, useState } from "react";
import {
  Menu,
  MenuCategory,
  Addon,
  AddonCategory,
  MenuLocation,
  Company,
  Location,
} from "../types/Types";
import { config } from "../config/config";
// import { config } from "../config/config";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menuLocations: MenuLocation[];
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: () => void;
  accessToken: string | null;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menuLocations: [],
  company: null,
  updateData: () => {},
  fetchData: () => {},
  accessToken: null,
};

export const AppContext = createContext(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
    });
  };

  return (
    <AppContext.Provider
      value={{ ...data, updateData, fetchData, accessToken }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
