export interface UserType {
  id: number;
  user_number: string;
  debtor_name: string;
  merchant_name: string;
  request_number: string;
  phone_number: string;
  family_phone_number: string;
  business_lifetime: number;
  marriage_status: 'kawin' | 'belum kawin' | 'cerai';
  marriage_partner_name: string;
  limit_request_plafon: number;
  limit_request_cash: number;
  limit_plafon: null;
  limit_cash: null;
  user_type_id: number;
  user_status_id: number;
  bi_checking_status: null;
  bi_checking_notes: null;
  komite_notes: null;
  is_merchant_titipku: boolean;
  area_id: number;
  area_name: string;
  created_by: number;
  last_co_id: null;
  last_komite_id: null;
  last_admin_id: null;
  category_jelajah_id: number | null;
  category_jelajah_name: string;
  batch_id: null;
  balance: number;
  created_at: number;
  updated_at: null;
  deleted_at: null;
  user_status: User;
  user_type: User;
}

export type User = {
  id: number;
  name: string;
};
