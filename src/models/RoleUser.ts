import { ListParams, Status } from './fetch';
import { RoleAccess } from './RoleAccess';

export interface RoleUser {
  id?: number;
  full_name: string;
  email: string;
  created_at: number;
  updated_at: number;
  administrator_detail: AdminDetail[];
}

export interface RoleUserParams extends ListParams {
  account_type: string;
  search?: string | undefined | null;
  id_status?: number;
  id_role?: string | number;
}

export interface CreateRoleUser {
  name: string;
  email: string;
  roleAccess: RoleAccess | null;
  id_status: number;
  account_type: 'cms';
  id?: number;
}

export interface CreateRoleUserPayload {
  full_name: string;
  email: string;
  id_role: number | undefined;
  id_status: number;
  account_type: 'cms';
  id?: number;
}

export interface CheckValidResponse {
  timestamp: number;
  status: string;
  message: string;
  data: boolean;
}

export interface AdminDetail {
  id: number;
  account_type: string;
  administrator_role: RoleAccess;
  administrator_status: Status;
}
