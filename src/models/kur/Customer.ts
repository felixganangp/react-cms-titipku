import { Moment } from 'moment';
import { Merchant, MerchantResp } from 'models/Merchant';
import { ListParams } from 'models/fetch';
import { Type } from './Type';
import { Area } from '../Area';

export interface CreateCustomer {
  idCustomer?: string;
  name: string;
  kurType: Type | null;
  adminFee: string;
  birthDate: Moment | null;
  phoneNumber: string;
  email: string;
  addressKtp: string;
  addressDomisili: string;
  pasarName: Area | null;
  merchantName: MerchantResp | null;
  nikKtp: string;
  oldNikKtp?: string;
  imageNik: string | File | Blob;
  idImageNik?: number | null;
  kkNumber: string;
  oldKkNumber?: string;
  imageKk: string | File | Blob;
  idImageKk?: number | null;
  npwp: string;
  oldNpwp?: string;
  imageNpwp: string | File | Blob;
  idImageNpwp?: number | null;
  imageSKUsaha: string;
  idImageSKUsaha?: number | null;
  dpdRate: string;
  creditLimit: string;
  bankName: BankList | null;
  bankNumberPrimary: string;
  nobuAccountNumber: string;
  kurUserStatus: string | undefined;
}

export interface Customer {
  id?: number;
  user_number: string;
  debtor_name: string;
  merchant_name: string;
  request_number: string;
  phone_number: string;
  family_phone_number: string;
  business_lifetime: number;
  marriage_status: string;
  marriage_partner_name: string;
  limit_request_plafon: number;
  limit_request_cash: number;
  limit_plafon: string | null;
  limit_cash: string | null;
  user_type_id: number;
  user_status_id: number;
  bi_checking_status: string;
  bi_checking_notes: string | null;
  komite_notes: string | null;
  is_merchant_titipku: boolean;
  area_id: number;
  area_name: string;
  created_by: number;
  last_co_id: number | null;
  last_komite_id: number | null;
  last_admin_id: number | null;
  category_jelajah_id: number;
  category_jelajah_name: string;
  batch_id: number | null;
  balance: number;
  created_at: number;
  updated_at: number | null;
  deleted_at: number | null;
  user_status: CustomerStatus;
  user_type: CustomerType;
}

export interface CustomerStatus {
  id: number;
  name: string;
}

export interface CustomerType {
  id: number;
  name: string;
}

export interface BiChecking {
  id: number;
  bi_checking_status_id: number;
  bi_checking_status_notes: string;
}

// old
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
  name?: string;
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
  // kur_user_type_id?: number;
  // area_ids?: string;
  // credit_score?: number;
  status?: number;
}

export interface BankList {
  name: string;
  code: string;
}

export interface CreateCustomerPayload {
  idCustomer?: number;
  user_id: number | undefined;
  user_type: string; // as of now only merchant
  name: string;
  nik: string;
  birth_date: number | undefined;
  email: string;
  phone_number: string;
  registered_address: string;
  living_address: string;
  credit_limit: number;
  admin_fee: number;
  dpd_rate: number;
  user_account_number: string;
  user_bank: string | undefined;
  nobu_account_number: string;
  join_date: number | undefined;
  kur_user_status_id: number;
  kur_user_type_id: number | undefined;
  kur_user_document: KurUserDocumentPayload[];
}

export interface KurUserDocumentPayload {
  id?: number | null;
  is_update?: boolean;
  document_type: 'ktp' | 'kk' | 'npwp' | 'sku'; // available options : ktp, kk, npwp, sku
  document_filepath?: string;
  document_number?: string;
}

export interface CheckMerchantExistParams {
  merchant_id: number | undefined;
  exclude_id?: number | undefined;
}

export interface UserCreditScore {
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
