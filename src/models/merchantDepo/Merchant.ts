import { ListParams } from '../fetch';

export interface MerchantParams extends ListParams {
  start_join_date?: string | number;
  depo_type_id?: number;
  jelajah_id?: number[];
  area_id?: number[];
}

export interface MerchantList {
  rank: number;
  jelajah_id: number;
  join_date: number;
  merchant_name: string;
  type: string;
  limit: number;
  balance: number;
  total_gmv: number;
  average_daily_transaction: number;
  is_new: boolean;
}

export interface MerchantDetails {
  jelajah_id: number;
  depo_discount: number;
  should_paid: boolean;
  created_at: number;
  updated_at: null;
  deleted_at: null;
  limit: number;
  provision_fee: number;
  admin_fee: number;
  join_date: number;
  active_date: number;
  depo_type_id: number;
  bank_name: string;
  bank_branch_office: string;
  bank_account_name: string;
  bank_account_number: string;
  nobu_account_name: string;
  nobu_account_number: string;
  qris_ready: boolean;
  merchant_name: string;
  phone_number: string;
  balance: number;
  total_transaction: number;
  total_disburse: number;
  rank: number;
  score: number;
  area_name: string;
  qris_merchant_id: number;
  last_month_gmv: number;
  last_month_trx: number;
  is_active: boolean;
}

export interface TransactionMerchantDepoList {
  mutation_id: number;
  qris_id: number;
  jelajah_id: number;
  description: string;
  mutation_type_id: number;
  debit: number;
  credit: number;
  created_at: number;
}
