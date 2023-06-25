import {
  Addon,
  AddonCategory,
  Menu,
  menus_menu_categories_locations,
  MenuCategory,
  menusAddonCategories,
  Location,
} from "../types/Types";

export const getSelectedLocationId = () => {
  return localStorage.getItem("selectedLocationId");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getMenuCategoriesByLocationId = (
  menuCategories: MenuCategory[],
  menusMenuCategoriesLocations: menus_menu_categories_locations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menu_categories_id);
  return menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );
};

export const getMenusByLocationId = (
  menus: Menu[],
  menusMenuCategoriesLocations: menus_menu_categories_locations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menus_id);
  return menus.filter((item) => validMenuIds.includes(item.id as number));
};

export const getAddonCategoriesByLocationId = (
  addonCategories: AddonCategory[],
  menusAddonCategories: menusAddonCategories[],
  menusMenuCategoriesLocations: menus_menu_categories_locations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.locations_id && item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menus_id);
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menus_id))
    .map((item) => item.addon_categories_id);
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id as number)
  );
};

export const getAddonsByLocationId = (
  addons: Addon[],
  addonCategories: AddonCategory[]
) => {
  const validAddonCategoryIds = addonCategories.map((item) => item.id);

  return addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_categories_id)
  );
};

export const getLocationsByMenuCategoryId = (
  locations: Location[],
  menuCategoryId: string,
  menus_menu_categories_locations: menus_menu_categories_locations[]
) => {
  const valiLocations = menus_menu_categories_locations
    .filter((item) => item.menu_categories_id === Number(menuCategoryId))
    .map((item) => item.locations_id);

  return locations.filter((item) => valiLocations.includes(item.id as number));
};
