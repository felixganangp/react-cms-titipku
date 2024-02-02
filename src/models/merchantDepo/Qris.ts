import { ListParams } from '../fetch';

export interface QrisParams extends ListParams {
  depo_type_id?: number;
  jelajah_id?: number[];
  area_id?: number;
  start_date?: number;
  end_date?: number;
}

export interface QrisList {
  id: number;
  jelajah_id: number;
  amount: number;
  transaction_date: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  merchant_name: string;
}

export interface QrisForm {
  jelajah_id: number;
  amount: number;
  transaction_date: number;
}
