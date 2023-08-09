import { ListParams } from 'models/fetch';

export interface Supplier {
  id?: number;
  name: string;
  address: string;
  phone_number: number;
  created_at: number;
  updated_at: number;
  total_inbound: number;
}

export interface SupplierParams extends ListParams {
  search?: string | undefined | null;
  defaultSearch?: string;
}

export interface CreateSupplier {
  name: string;
  address: string;
  phone_number: string;
  id?: number;
}

export interface CheckValidResponse {
  timestamp: number;
  status: string;
  message: string;
  data: boolean;
}
