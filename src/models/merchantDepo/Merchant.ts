import { ListParams } from '../fetch';

export interface MerchantParams extends ListParams {
  start_join_date?: string | number;
}

export interface MerchantList {
  jelajah_id: number;
  join_date: number;
  merchant_name: string;
  type: string;
  limit: number;
  balance: number;
  total_gmv: number;
  average_daily_transaction: number;
}
