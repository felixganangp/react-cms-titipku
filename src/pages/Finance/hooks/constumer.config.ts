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
  limit_plafon: '',
  limit_cash: '',
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
  // BANK
  bank_name: '',
  bank_account: '',
  disburse_date: '',
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
  'limit_plafon',
  'limit_cash',
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
  'limit_plafon',
  'limit_cash',
  'business_lifetime',
  'user_type_id',
  'is_merchant_titipku',
  'marriage_status',
  'marriage_partner_name',
  'nik_partner',
  'bank_name',
  'bank_account',
  'disburse_date',
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
  // 'geotag_image',
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
  3: 'Nano Mikro',
};

export const Document = {
  1: 'KTP',
  2: 'NIB',
  3: 'NPWP',
  4: 'SKU',
  5: 'KTP Pasangan',
  6: 'Surat Cerai',
  7: 'Akta Nikah',
  8: 'Kartu Keluarga',
  9: 'Form Pengajuan KUR',
  10: 'Form Pengajuan Financing',
};

export const DocumentObjFinace = {
  1: {
    name: 'KTP',
    key: 'nik_image',
  },
  2: {
    name: 'NIB',
    key: 'nib_image',
  },
  3: {
    name: 'NPWP',
    key: 'npwp_image',
  },
  4: {
    name: 'SKU',
    key: 'sku_image',
  },
  5: {
    name: 'KTP Pasangan',
    key: 'nik_partner_image',
  },
  6: {
    name: 'Surat Cerai',
    key: 'divorce_papers_image',
  },
  7: {
    name: 'Akta Nikah',
    key: 'marriage_papers_image',
  },
  8: {
    name: 'Kartu Keluarga',
    key: 'kk_image',
  },
  9: {
    name: 'Form Pengajuan KUR',
    key: 'financing_form',
  },
  10: {
    name: 'Form Pengajuan Financing',
    key: 'financing_form_image',
  },
};
