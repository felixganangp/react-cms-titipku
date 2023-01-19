export interface ListResponse<T> {
  timestamp: number;
  status: string;
  message: string;
  page?: number;
  count?: number;
  total?: number;
  data: T[];
}

export interface AddResponse<T> {
  timestamp: number;
  status: string;
  message: string;
  data: T;
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
}

export interface ErrorRespons {
  timestamp: number;
  status: string;
  message: string;
}
