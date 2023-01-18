import { ListParams } from './fetch';

export interface RoleAccess {
  id?: number;
  name: string;
  is_exist: true;
  account_type: string;
}

export interface RoleAccessParams extends ListParams {
  account_type: string;
  search?: string | undefined | null;
}
