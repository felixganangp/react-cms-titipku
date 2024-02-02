import { ListParams } from '../fetch';

export interface DisburseParams extends ListParams {
  start_date?: string;
  end_date?: string;
  status?: string;
}

export type DisburseList = {
  id: number;
  date: number;
  due_date: number;
  dpd: number;
  merchant_name: string;
  padi_date: number;
  account_number: string;
  amount: number;
  transfer_amount: number;
  status: string;
};
