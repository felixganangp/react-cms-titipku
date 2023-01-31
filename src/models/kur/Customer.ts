import { Merchant, MerchantResp } from 'models/Merchant';
import { ListParams } from 'models/fetch';
import { Type } from './Type';
import { Area } from '../Area';

export interface CreateCustomer {
  idCustomer?: string;
  name: string;
  kurType: Type | null;
  adminFee: string;
  birthDate: object | null;
  phoneNumber: string;
  email: string;
  addressKtp: string;
  addressDomisili: string;
  lapakName: Area | null;
  merchantName: MerchantResp | null;
  nikKtp: string;
  imageNik: string | File | Blob;
  kkNumber: string;
  imageKk: string | File | Blob;
  npwp: string;
  imageNpwp: string | File | Blob;
  imageSKUsaha: string;
  dpdRate: string;
  creditLimit: string;
  bankName: BankList | null;
  bankNumberPrimary: string;
  nobuAccountNumber: string;
}

export interface Customer {
  id?: number;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  created_by: object;
  updated_by_id: number;
  updated_by_type: string;
  updated_by: object;
  user_id: number;
  user_type: string;
  user: Merchant;
  kur_user_number: string;
  name: string;
  nik: string;
  birth_date: number;
  email: string;
  phone_number: string;
  registered_address: string;
  living_address: string;
  credit_limit: number;
  admin_fee: number;
  dpd_rate: number;
  user_account_number: string;
  user_bank: string;
  nobu_account_number: string;
  join_date?: number;
  kur_user_status: KurUserStatus;
  kur_user_type: KurUserType;
  kur_user_document: KurUserDocument[];
}

export interface KurUserStatus {
  id?: number;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  updated_by_id: number;
  updated_by_type: string;
  name: string;
  description: string;
}

export interface KurUserType {
  id?: number;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  updated_by_id: number;
  updated_by_type: string;
  name: string;
  description: string;
}

export interface KurUserDocument {
  id?: number;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  updated_by_id: number;
  updated_by_type: string;
  kur_user_id: number;
  document_type: string;
  document_filepath: string;
  document_number: string;
  is_exist: boolean;
}

export interface CustomerParams extends ListParams {
  kur_user_type_id?: number;
  area_id?: number;
  // order_type?: string | undefined | null;
  order_by?: string;
}

export interface BankList {
  name: string;
  code: string;
}
