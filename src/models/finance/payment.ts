import { ListParams } from '../fetch';

export interface SettlementParams extends ListParams {
  invoice_id?: number | string;
  payment_id?: number | string;
}

export interface PaymentParams extends ListParams {
  min_payment_date?: number | string;
  max_payment_date?: number | string;
}
