import { ListParams } from './fetch';

export interface RoleUser {
  id?: number;
  name: string;
  is_exist: true;
  account_type: string;
}

export interface RoleUserParams extends ListParams {
  account_type: string;
  search?: string | undefined | null;
}
