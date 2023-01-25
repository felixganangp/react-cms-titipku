export interface ListResponse<T> {
  timestamp: number;
  status: string;
  message: string;
  page?: number;
  count?: number;
  total?: number;
  data: T[];
}

export interface IsExistResponse {
  timestamp: number;
  status: string;
  message: string;
  data: boolean;
}

export interface ListParams {
  page?: number;
  count?: number;
  search?: string | undefined | null;
  order_by?: string | number | null;
  order_type?: 'asc' | 'desc';
}

export interface ErrorRespons {
  timestamp: number;
  status: string;
  message: string;
}

export interface MenuListParam {
  page?: number;
  role_id?: number;
  account_type?: string;
}
