import { useFormik } from 'formik';
import * as yup from 'yup';
import useToast from 'hooks/useToast';

export default function useUserMerchant({
  id,
  handleClose,
}: {
  id?: string | number;
  handleClose: (isSubmited: boolean) => void;
}) {
  const { openToast } = useToast();
  const isUpdate = Boolean(id);

  const formik = useFormik({
    initialValues: {
      user_data: {
        debtor_name: '',
        merchant_name: '',
        phone_number: '',
        family_phone_number: '',
        area_id: null,
        area_name: '',
        category_jelajah_id: null,
        category_jelajah_name: '',
        limit_request_plafon: '',
        limit_request_cash: '',
        business_lifetime: '',
        user_type_id: null,
        is_merchant_titipku: true,
        bank_name: '',
        bank_account: '',
        bank_branch_name: '',
        bank_account_name: '',
        relatives_name: '',
        relatives_relation: '',
        disburse_date: 1694767919,
        nik: undefined,
        nib: undefined,
        npwp: undefined,
        sku: undefined,
        nik_partner: undefined,
        divorce_papers: undefined,
        marriage_status: undefined,
        marriage_partner_name: undefined,
      },
      user_idir: {
        gmv: 0, // Jumlah pendapatan per bulan
        purchase: 0, // Jumlah pembelian atau stock lapak per bulan
        operational_expense: 0, // Biaya Operasional Tempat Usaha Per bulan
        household_expense: 0, // Total Biaya Rumah Tangga per bulan
        another_expense: 0, // Total Biaya di Luar Rumah Tangga
        another_loan: 0, // Angsuran di Bank/ BPR/ Fintech/ Leasing, dll. Per Bulan
        requested_limit: 0, // Limit Belanja yang diajukan
        agreed_fee: 0, // Total kewajiban yang disanggupi
        net_income: 0, // Total Pendapatan Bersih,
        idir_score: 0,
        idir_notes: 'string',
      },
    },
    onSubmit: (values) => {
      if (isUpdate) {
        // update data
      }
    },
    validationSchema: yup.object().shape({
      user_data: yup.object().shape({
        debtor_name: yup
          .string()
          .max(255, 'must be at most 255 characters')
          .required('This field is required'),
        merchant_name: yup
          .string()
          .max(255, 'must be at most 255 characters')
          .required('This field is required'),
        phone_number: yup
          .string()
          .min(8, 'Phone number must be at least 8 characters')
          .max(15, 'Phone number must be at least 15 characters')
          // @ts-ignore
          .test('firstChar', 'Phone number must start with 8', (value) => {
            return value && value[0] === '8';
          })
          .required('This field is required'),
        family_phone_number: yup
          .string()
          .min(8, 'Phone number must be at least 8 characters')
          .max(15, 'Phone number must be at least 15 characters')
          // @ts-ignore
          .test('firstChar', 'Phone number must start with 8', (value) => {
            return value && value[0] === '8';
          })
          .required('This field is required'),
        area_id: yup.mixed().nullable().required('This field is required'),
        category_jelajah_id: yup
          .mixed()
          .nullable()
          .required('This field is required'),
        limit_request_plafon: yup
          .number()
          .min(1, 'Cant be less than 1')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .required('This field is required'),
        limit_request_cash: yup
          .number()
          .min(1, 'Cant be less than 1')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .required('This field is required'),
        business_lifetime: yup.string().required('This field is required'),
        user_type_id: yup
          .string()
          .nullable()
          .required('This field is required'),
        bank_name: yup.string().required('Nama Bank wajib diisi'),
        bank_account: yup
          .number()
          .min(1, 'Cant be less than 1')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .required('This field is required'),
        bank_branch_name: yup.string(),
        bank_account_name: yup.string().required('Nama Rekening wajib diisi'),
        relatives_name: yup.string().required('Nama Keluarga wajib diisi'),
        relatives_relation: yup
          .string()
          .required('Hubungan Keluarga wajib diisi'),
        disburse_date: yup.number().required('Tanggal Pencairan wajib diisi'),
      }),
      user_idir: yup.object().shape({
        gmv: yup
          .number()
          .min(1, 'Cant be less than 1')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .required('This field is required'),
        purchase: yup
          .number()
          .min(1, 'Cant be less than 1')
          .max(2147483647, 'Must be less than or equal to 2147483647')
          .required('This field is required'),
        operational_expense: yup.number().required('This field is required'),
        household_expense: yup.number().required('This field is required'),
        another_expense: yup.number().required('This field is required'),
        another_loan: yup.number().required('This field is required'),
        requested_limit: yup.number().required('This field is required'),
        agreed_fee: yup.number().required('This field is required'),
        net_income: yup.number().required('This field is required'),
        idir_score: yup.number().required('This field is required'),
        idir_notes: yup.string(),
      }),
    }),
  });
  return {
    ...formik,
  };
}
