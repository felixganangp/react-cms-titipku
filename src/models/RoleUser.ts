import { ListParams } from './fetch';
import { RoleAccess } from './RoleAccess';

export interface RoleUser {
  id?: number;
  full_name: string;
  email: true;
  created_at: number;
  updated_at: number;
  administrator_detail: [];
}

export interface RoleUserParams extends ListParams {
  account_type: string;
  search?: string | undefined | null;
  id_status?: 1 | 0;
}

export interface CreateRoleUser {
  name: string;
  email: string;
  roleAccess: RoleAccess | null;
  id_status: 1;
  account_type: 'cms';
}

export interface CreateRoleUserPayload {
  full_name: string;
  email: string;
  id_role: number | undefined;
  id_status: 1;
  account_type: 'cms';
}
