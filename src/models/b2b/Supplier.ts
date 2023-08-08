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
