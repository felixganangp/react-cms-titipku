import { ListParams } from '../fetch';

export interface DisburseParams extends ListParams {
  start_date?: string;
  end_date?: string;
  status?: string | string[];
}

export type DisburseList = {
  id: number;
  date: number;
  due_date: number;
  dpd: number;
  merchant_name: string;
  account_number: string;
  amount: number;
  transfer_amount: number;
  status: string;
  jelajah_id: number;
  paid_off_date: number;
  paid_date: number;
};

export type DisburseDetails = {
  id: number;
  jelajah_id: number;
  bank_name: string;
  bank_code: string;
  bank_account_name: string;
  bank_account_number: number;
  amount: number;
  transfer_amount: number;
  disburse_status_id: number;
  paid_date: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  status: {
    id: number;
    description: string;
  };
};

export interface MerchantParams extends ListParams {
  start_join_date?: string | number;
  depo_type_id?: number[];
  jelajah_id?: number[];
  area_id?: number;
  balance_condition?: number;
  is_new?: number;
}
