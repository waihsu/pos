import { createContext, useEffect, useState } from "react";
import {
  Menu,
  MenuCategory,
  menusAddonCategories,
  Addon,
  AddonCategory,
  menus_menu_categories_locations,
  Company,
  Location,
  Tables,
} from "../types/Types";
import { config } from "../config/config";
import { getAccessToken } from "../utils/getLocalStorage";
// import { config } from "../config/config";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menus_menu_categories_locations: menus_menu_categories_locations[];
  company: Company | null;
  tables: Tables[];
  menus_addon_categories: menusAddonCategories[];
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  menus_addon_categories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menus_menu_categories_locations: [],
  company: null,
  tables: [],
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);
  const accessToken = getAccessToken();

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
      menus_addon_categories,
      addons,
      addonCategories,
      locations,
      menus_menu_categories_locations,
      company,
      tables,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      menus_addon_categories,
      addons,
      addonCategories,
      locations,
      menus_menu_categories_locations,
      company,
      tables,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
