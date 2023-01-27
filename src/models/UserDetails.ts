export interface UserDetails {
  id: number;
  full_name: string;
  email: string;
  created_at: number;
  updated_at: number;
  administrator_detail: AdministratorDetails[];
}

export interface AdministratorDetails {
  id: number;
  administrator_role: AdministratorRole;
  administrator_status: AdministratorStatus;
  account_type: string;
}

export interface AdministratorRole {
  id: number;
  name: string;
  description: string;
  is_exist: boolean;
  account_type: string;
}

export interface AdministratorStatus {
  id: number;
  name: string;
  description: string;
}
