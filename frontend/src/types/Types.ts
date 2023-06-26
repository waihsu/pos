interface BaseType {
  id?: number;
  name: string;
}

export interface Menu extends BaseType {
  price: number;
  locationIds: number[];
  description?: string;
  asset_url?: string;
  isAvailable?: boolean;
}

export interface MenuCategory extends BaseType {}

export interface menusAddonCategories {
  id: number;
  menus_id: number;
  addon_categories_id: number;
}

export interface Addon extends BaseType {
  price: number;
  isAvailable: boolean;
  addon_categories_id: number;
  is_archived: boolean;
}

export interface AddonCategory extends BaseType {
  isRequired: boolean;
}

export interface Location extends BaseType {
  companyId: number;
  address?: string;
}

export interface menus_menu_categories_locations {
  id: number;
  locations_id: number;
  menu_categories_id: number;
  menus_id: number;
}

export interface Company {
  id?: number;
  name: string;
  address: string;
}

export interface Tables {
  id: number;
  name: string;
  locations_id: number;
}
