import { ListParams } from './fetch';

export interface Menu {
  id: number;
  menu: string;
  created_at: number;
  is_exist: boolean;
  is_parent: boolean;
  parent_id: number;
  active_role: string;
  sub_menu: Menu[] | null;
}

export interface AccessMenu {
  id: number;
  menu: string;
  is_checked: boolean;
  sub_menu: AccessMenu[] | null;
}

export interface MenuParams extends ListParams {
  page: number;
  account_type: string;
  role_id?: number;
}

export interface SideBarMenu {
  id: number;
  menu: string;
}

export interface FilteredMenu {
  id: number;
  title: string;
  path: string;
  icon?: JSX.Element;
  child: Child[] | [];
}

export interface Child {
  id: number;
  title: string;
  path: string;
  child?:
    | {
        id: number;
        title: string;
        path: string;
      }[]
    | [];
}

export interface CurrentActiveMenu {
  id: number;
}
