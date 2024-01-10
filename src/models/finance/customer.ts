export type CustomerDetailType = {
  id: number;
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
  limit_plafon: number;
  limit_cash: number;
  user_type_id: number;
  user_status_id: number;
  bi_checking_status: string;
  bi_checking_notes: string;
  komite_notes: string;
  is_merchant_titipku: boolean;
  area_id: number;
  area_name: string;
  created_by: number;
  last_co_id: null | number;
  last_komite_id: null | number;
  last_admin_id: null | number;
  category_jelajah_id: number;
  category_jelajah_name: string;
  batch_id: null | number;
  balance: number;
  created_at: number;
  updated_at: null;
  deleted_at: null;
  user_status: User;
  user_type: User;
  user_idir: UserIdir;
  user_documents: UserDocument[];
  user_status_history: UserStatusHistory[];
  user_geotag_images: GeoLocation[];
};

export type User = {
  id: number;
  name: string;
};

export type UserIdir = {
  UserId: number;
  IdirNumber: string;
  GMV: number;
  OfficeRent: number;
  Electricity: number;
  EducationExpense: number;
  HouseholdExpense: number;
  EmployeeExpense: number;
  AnotherLoan: number;
  CashOutPurpose: string;
  IdirScore: null;
  IdirNotes: null;
  CreatedAt: number;
  UpdatedAt: null;
  DeletedAt: null;
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

export type UserStatusHistory = {
  id: number;
  user_id: number;
  user_status_id: number;
  admin_id: number;
  admin_type_id: number;
  created_at: number;
};

export type GeoLocation = {
  id: number;
  user_id: number;
  image_filepath: string;
  created_at: number;
};
