export const initialValues = {
  debtor_name: '',
  merchant_name: '',
  nik: '',
  nib: '',
  npwp: '',
  nik_partner: '',
  divorce_papers: '',
  phone_number: '',
  family_phone_number: '',
  area: null,
  category_jelajah: null,
  marriage_status: '',
  marriage_partner_name: '',
  limit_request_plafon: '',
  limit_request_cash: '',
  business_lifetime: '',
  user_type_id: null,
  is_merchant_titipku: true,
  // IDIR
  gmv: '',
  office_rent: '',
  electricity: '',
  education_expenses: '',
  household_expenses: '',
  employee_expenses: '',
  another_loan: '',
  cash_out_purpose: '',
  // Doc
  nik_image: '',
  npwp_image: '',
  sku_image: '',
  nib_image: '',
  nik_partner_image: '',
  divorce_papers_image: '',
  geotag_image: [],
};

export const step1Key = [
  'debtor_name',
  'merchant_name',
  'phone_number',
  'family_phone_number',
  'area',
  'category_jelajah',
  'limit_request_plafon',
  'limit_request_cash',
  'business_lifetime',
  'user_type_id',
  'is_merchant_titipku',
];

export const step2Key = [
  'gmv',
  'office_rent',
  'electricity',
  'education_expenses',
  'household_expenses',
  'employee_expenses',
  'another_loan',
  'cash_out_purpose',
];

export const step3Key = [
  'nik',
  'nib',
  'npwp',
  'nik_partner',
  'divorce_papers',
  'nik_image',
  'npwp_image',
  'sku_image',
  'nib_image',
  'nik_partner_image',
  'divorce_papers_image',
  'marriage_status',
  'marriage_partner_name',
];

export const userDataKey = [
  'debtor_name',
  'merchant_name',
  'nik',
  'nib',
  'npwp',
  'nik_partner',
  'divorce_papers',
  'phone_number',
  'family_phone_number',
  'area_id',
  'area_name',
  'category_jelajah_id',
  'category_jelajah_name',
  'limit_request_plafon',
  'limit_request_cash',
  'business_lifetime',
  'user_type_id',
  'is_merchant_titipku',
  'marriage_status',
  'marriage_partner_name',
  'nik_partner',
];
export const idirDataKey = [
  ...step2Key,
  'marriage_status',
  'marriage_partner_name',
  'nik_partner',
];
export const docDataKey = [
  'nik_image',
  'npwp_image',
  'sku_image',
  'nib_image',
  'nik_partner_image',
  'divorce_papers_image',
  'geotag_image',
];

// {
//   "gmv": 15000000,
//   "office_rent": 3000000,
//   "electricity": 1000000,
//   "education_expenses": 500000,
//   "household_expenses": 800000,
//   "employee_expenses": 2500000,
//   "another_loan": 4000000,
//   "cash_out_purpose": "test pinjam saja"
// }

export const Type = {
  1: 'KUR WC',
  2: 'WC Titipku',
};

export const Document = {
  1: 'KTP',
  2: 'NIB',
  3: 'NPWP',
  4: 'SKU',
  5: 'KTP Pasangan',
  6: 'Surat Cerai',
};
