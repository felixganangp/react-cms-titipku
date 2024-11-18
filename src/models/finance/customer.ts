export type CustomerDetailType = {
  id: number;
  user_number: string;
  debtor_name: string;
  merchant_name: string;
  nmid: string;
  request_number: string;
  phone_number: string;
  family_phone_number: string;
  business_lifetime: number;
  marriage_status: string;
  marriage_partner_name: string;
  limit_request_plafon: number;
  limit_request_cash: number;
  limit_plafon: number;
  limit_cash: number;
  user_type_id: number;
  user_status_id: number;
  bi_checking_status_id: null;
  bi_checking_notes: null;
  komite_notes: null;
  reject_notes: null;
  is_merchant_titipku: boolean;
  area_id: number;
  area_name: string;
  created_by: number;
  last_co_id: null;
  last_komite_id: null;
  last_admin_id: null;
  category_jelajah_id: number;
  category_jelajah_name: string;
  jelajah_id: number;
  batch_id: null;
  balance: number;
  created_at: number;
  updated_at: null;
  deleted_at: null;
  bank_name: string;
  bank_account: string;
  disburse_date: number;
  relatives_name: string;
  relatives_relation: string;
  bank_branch_name: string;
  bank_account_name: string;
  interest_rate: number;
  user_status: User;
  user_type: User;
  user_idir: UserIdir;
  user_documents: any[];
  user_status_history: UserStatusHistory[];
  user_geotag_images: any[];
  need_provision_cash: boolean;
  need_provision_normal: boolean;
  available_limit_plafon: number;
  available_limit_cash: number;
  has_qris: boolean;
};

export type UserIdir = {
  UserId: number;
  IdirNumber: string;
  GMV: number;
  Purchase: number;
  OperationalExpense: number;
  HouseholdExpense: number;
  AnotherExpense: number;
  AnotherLoan: number;
  RequestedLimit: number;
  AgreedFee: number;
  NetIncome: number;
  CashOutPurpose: string;
  IdirScore: number;
  IdirNotes: string;
  CreatedAt: number;
  UpdatedAt: null;
  DeletedAt: null;
  OfficeRent: number;
  Electricity: number;
  EducationExpense: number;
  EmployeeExpense: number;
};

export type User = {
  id: number;
  name: string;
  created_at: number;
};

export type UserStatusHistory = {
  id: number;
  user_id: number;
  user_status_id: number;
  admin_id: number;
  admin_type_id: number;
  created_at: number;
};

export type UserDocument = {
  id: number;
  user_id: number;
  document_type_id: number;
  document_number: string;
  image_filepath: string;
  created_at: number;
  updated_at: null;
  deleted_at: null;
};

export type GeoLocation = {
  id: number;
  user_id: number;
  image_filepath: string;
  created_at: number;
};
