import { BankList, Customer } from 'models/kur/Customer';
import { Area } from 'models/Area';
import { Type } from 'models/kur/Type';
import { ListParams } from '../fetch';

export interface PaymentKURParams extends ListParams {
  kur_user_type_id?: number;
  kur_user_id?: number;
  area_ids?: string;
  status?: string;
  submit_date_start?: number;
  submit_date_end?: number;
  paid_to_bank?: string;
}

export interface PaymentKURDisplayFilter {
  areas?: Area[];
  types?: Type | null;
  paid_to_bank?: string;
  submit_date_start?: number;
  submit_date_end?: number;
}

export interface PaymentKURStateParams {
  area_ids?: string;
  kur_user_type_id?: number;
  kur_user_id?: number;
  status?: string;
  submit_date_start?: number;
  submit_date_end?: number;
  paid_to_bank?: string;
}

export interface PaymentKUR {
  id: number;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  created_by: ModifierUser;
  updated_by_id: number;
  updated_by_type: string;
  updated_by: ModifierUser;
  kur_payment_number: string;
  kur_user_id: number;
  kur_user: Customer;
  status: string;
  amount: number;
  paid_to_account_number: string;
  paid_to_bank: string;
  proof_of_payment: string;
  decision_date: number;
  decision_by_admin_id: null;
  decision_by_admin: null;
  remarks: string;
}

export interface ModifierUser {
  id: number;
  name: string;
  area?: {
    id: number;
    name: string;
  };
}

export interface KURPaymentDetail {
  id: number;
  created_date: number;
  updated_date: number;
  created_by_id: number;
  created_by_type: string;
  created_by: null | ModifierUser;
  updated_by_id: number;
  updated_by_type: string;
  updated_by: null | ModifierUser;
  kur_payment_number: string;
  kur_user_id: number;
  kur_user: Customer[];
  status: string;
  amount: number;
  paid_to_account_number: string;
  paid_to_bank: string;
  proof_of_payment: string;
  decision_date: number;
  decision_by_admin_id: number;
  decision_by_admin: null | ModifierUser;
  remarks: string;
}

export interface ActionParams {
  id: string | number;
  detailsPage: boolean;
  remarks?: string;
}

export interface BodyCreatePayment {
  kur_user_id: number | null | undefined;
  amount: number | null | string;
  paid_to_account_number: string | null;
  paid_to_bank: string | null;
  description: string;
  decision_date: number | null;
  remarks: string;
}

export interface CreatePayment {
  body: {
    data: BodyCreatePayment;
    file: string | Blob;
  };
}

export interface InitialCreatePayment {
  kur_user_id: Customer | null;
  amount: string;
  paid_to_account_number: string | null;
  paid_to_bank: string | null;
  description: string;
  decision_date: number | null;
  remarks: string;
  file: File | string | Blob;
}

export interface BankAccount {
  bank: string;
  account_number: string;
}
