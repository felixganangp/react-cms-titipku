export interface ListResponse<T> {
  timestamp: number;
  status: string;
  message: string;
  page?: number;
  count?: number;
  total?: number;
  data: T[];
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
