import { ListParams } from './fetch';

export interface RoleAccess {
  id?: number;
  name: string;
  is_exist: true;
  account_type: string;
  total_admin?: number;
}

export interface RoleAccessParams extends ListParams {
  account_type: string;
  search?: string | undefined | null;
  is_exist?: boolean;
}

// add
export default interface RoleAccessForm {
  id?: number;
  name: string;
  description?: string;
  account_type: string;
  controls?: AccessMenu[];
  is_exist?: boolean;
}
interface AccessMenu {
  id: number;
  activation: boolean;
}

export interface CheckRoleNameParams {
  role_name: string;
  account_type: string;
  exclude_id?: number;
}
