import { ListParams } from 'models/fetch';
import { RequestKUR } from 'models/kur/Request';
import { PaymentKUR } from 'models/kur/Payment';
import { KurUserType } from 'models/kur/Customer';

export interface PaymentKURParams extends ListParams {
  kur_user_type_id?: number;
  kur_user_id?: number;
  area_ids?: string;
  paid_status?: string;
  bank?: string;
  condition?: string;
  delivery_date_start?: number;
  delivery_date_end?: number;
  invoice_date_start?: number;
  invoice_date_end?: number;
  due_date_start?: number;
  due_date_end?: number;
}

export interface InvoiceKur {
  id: number;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  created_by: {
    id: number;
    name: string;
  };
  updated_by_id: number;
  updated_by_type: string;
  updated_by: {
    id: number;
    name: string;
  };
  release_date: number;
  due_date: number;
  kur_invoice_number: string;
  kur_request_id: number;
  kur_request: RequestKUR;
  request_amount: number;
  total_payment: number;
  total_dpd: number;
  total_adjustment: number;
  total_admin_fee: number;
  admin_fee: number;
  dpd_rate: number;
  paid_status: string;
  paid_date: number;
  kur_invoice_detail: InvoiceKurDetail[];
  kur_user_type: KurUserType;
  condition: string;
}

export interface InvoiceKurDetail {
  id: number;
  created_at: number;
  is_last: boolean;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  created_by: null;
  updated_by_id: number;
  updated_by_type: string;
  updated_by: null;
  kur_invoice_id: number;
  type: string;
  admin_fee: number;
  dpd_rate: number;
  amount: number;
  outstanding_amount: number;
  remarks: string;
  kur_payment_id: number;
  kur_request: RequestKUR;
  kur_payment: PaymentKUR;
  is_last: boolean;
}

export interface AdjustInvoice {
  kur_user_id: number;
  kur_invoice_id: number;
  final_outstanding_amount: number | undefined;
  remarks: string;
}
