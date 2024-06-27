/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useToast from 'hooks/useToast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRemainingBillyUserId } from 'service/Finance/invoice';
import { postCreateUser, putCreateUser } from 'service/Finance/customer';
import { useCustomerDetails } from '../../hooks/useCustomer';

const defaultValidation = yup.object().shape({
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
    area: yup.mixed().nullable().required('This field is required'),
    area_name: yup.string().when('area', {
      is: (val: { id: string | number; name: string }) => val?.id === 1,
      then: yup.string().required('This field is required'),
    }),
    category_jelajah: yup.mixed().nullable().required('This field is required'),
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
    user_type_id: yup.string().nullable().required('This field is required'),
    bank_name: yup.string().required('Nama Bank wajib diisi'),
    bank_account: yup
      .string()
      .typeError('Must be a number')
      .min(5, 'Cant be less than 8')
      .max(16, 'Must be less than or equal to 20')
      .required('This field is required'),
    bank_branch_name: yup.string(),
    bank_account_name: yup.string().required('Nama Rekening wajib diisi'),
    relatives_name: yup.string().required('Nama Keluarga wajib diisi'),
    relatives_relation: yup.string().required('Hubungan Keluarga wajib diisi'),
    disburse_date: yup.mixed(),
  }),
  idir_data: yup.object().shape({
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
    operational_expense: yup
      .number()
      .min(1, 'Cant be less than 1')
      .max(2147483647, 'Must be less than or equal to 2147483647')
      .required('This field is required'),
    household_expense: yup
      .number()
      .min(1, 'Cant be less than 1')
      .max(2147483647, 'Must be less than or equal to 2147483647')
      .required('This field is required'),
    another_expense: yup
      .number()
      .min(1, 'Cant be less than 1')
      .max(2147483647, 'Must be less than or equal to 2147483647')
      .required('This field is required'),
    another_loan: yup
      .number()
      .min(1, 'Cant be less than 1')
      .max(2147483647, 'Must be less than or equal to 2147483647')
      .required('This field is required'),
    requested_limit: yup
      .number()
      .min(1, 'Cant be less than 1')
      .max(2147483647, 'Must be less than or equal to 2147483647')
      .required('This field is required'),
    agreed_fee: yup
      .number()
      .min(1, 'Cant be less than 1')
      .max(2147483647, 'Must be less than or equal to 2147483647')
      .required('This field is required'),
    net_income: yup
      .number()
      .min(1, 'Cant be less than 1')
      .max(2147483647, 'Must be less than or equal to 2147483647')
      .required('This field is required'),
    idir_score: yup.number(),
    // .min(1, 'Cant be less than 1')
    // .max(2147483647, 'Must be less than or equal to 2147483647'),
    // .required('This field is required'),
    idir_notes: yup.string(),
  }),
});
export default function useUserMerchant({
  id,
  handleClose,
  costumValidation,
  new_status,
  sendDocument,
}: {
  id?: string | number;
  handleClose: (isSubmited: boolean) => void;
  costumValidation?: any;
  new_status?: number;
  sendDocument?: boolean;
}) {
  const { openToast } = useToast();
  const isUpdate = Boolean(id);
  const detailQuery = useCustomerDetails(id);
  const createUser = useMutation(postCreateUser);
  const updateUser = useMutation(putCreateUser);

  const formik = useFormik({
    initialValues: {
      user_data: {
        debtor_name: '',
        merchant_name: '',
        phone_number: '',
        family_phone_number: '',
        area: null,
        category_jelajah: null,
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
        disburse_date: null,
        limit_plafon: '',
        limit_cash: '',
        interest_rate: '',
        has_qris: false,
        area_name: undefined,
        // nik: undefined,
        // nib: undefined,
        // npwp: undefined,
        // sku: undefined,
        // nik_partner: undefined,
        // divorce_papers: undefined,
        // marriage_status: undefined,
        // marriage_partner_name: undefined,
      },
      idir_data: {
        gmv: '', // Jumlah pendapatan per bulan
        purchase: '', // Jumlah pembelian atau stock lapak per bulan
        // total: gmv - purchase
        operational_expense: '', // Biaya Operasional Tempat Usaha Per bulan
        household_expense: '', // Total Biaya Rumah Tangga per bulan
        another_expense: '', // Total Biaya di Luar Rumah Tangga
        another_loan: '', // Angsuran di Bank/ BPR/ Fintech/ Leasing, dll. Per Bulan
        // total: operational_expense + household_expense + another_expense + another_loan
        requested_limit: '', // Limit Belanja yang diajukan
        agreed_fee: '', // Total kewajiban yang disanggupi
        net_income: '', // Total Pendapatan Bersih,
        idir_score: '',
        idir_notes: '',
      },
      document: {
        nik_image: '',
        npwp_image: '',
        nib_image: '',
        sku_image: '',
        divorce_papers_image: '',
        marriage_papers_image: '',
        kk_image: '',
        kur_form: '',
        financing_form: '',
      },
    },
    onSubmit: async (values) => {
      const payload: any = {
        user_data: {},
        idir_data: {},
      };
      const { user_data, idir_data } = values;
      const { area, category_jelajah, area_name, ...rest_user_data } =
        user_data;

      Object.keys(user_data).forEach((key) => {
        // @ts-ignore
        if (user_data[key]) {
          switch (key) {
            case 'area':
              // @ts-ignore
              payload.user_data.area_id = area.id;
              payload.user_data.area_name =
                // @ts-ignore
                area?.id === 1 ? area_name : area?.name;
              break;
            case 'category_jelajah':
              // @ts-ignore
              payload.user_data.category_jelajah_id = category_jelajah.id;
              // @ts-ignore
              payload.user_data.category_jelajah_name = category_jelajah.name;
              break;
            default:
              // @ts-ignore
              payload.user_data[key] = user_data[key];
              break;
          }
        }
      });

      if (new_status) {
        payload.user_data.new_status = new_status;
      }

      payload.idir_data = idir_data;

      const formData = new FormData();
      await formData.append(
        'user_data',
        JSON.stringify(payload.user_data, null, 2),
      );
      await formData.append(
        'idir_data',
        JSON.stringify(payload.idir_data, null, 2),
      );
      if (sendDocument) {
        Object.keys(values.document).forEach((key) => {
          // @ts-ignore
          if (values.document[key]) {
            // @ts-ignore
            formData.append(key, values.document[key]);
          }
        });
      }

      if (isUpdate) {
        updateUser.mutate(
          { id: String(id), data: formData },
          {
            onSuccess: () => {
              openToast({
                severity: 'success',
                headMsg: 'Success update merchant',
              });
              handleClose(true);
            },
            onError: (err) => {
              openToast({
                severity: 'error',
                headMsg: 'Error update merchant',
              });
            },
          },
        );
      } else {
        createUser.mutate(formData, {
          onSuccess: () => {
            openToast({
              severity: 'success',
              headMsg: 'Success create merchant',
            });
            handleClose(true);
          },
          onError: (err) => {
            openToast({
              severity: 'error',
              headMsg: 'Failed create merchant',
            });
          },
        });
      }
    },
    validationSchema: costumValidation || defaultValidation,
  });

  useEffect(() => {
    const detail = detailQuery.data?.data;

    if (detail) {
      const payload: any = {
        ...formik.values,
        user_data: {
          debtor_name: detail.debtor_name,
          merchant_name: detail.merchant_name,
          phone_number: detail.phone_number,
          family_phone_number: detail.family_phone_number,
          area: {
            id: detail.area_id,
            name: detail.area_id ? 'Tidak Masuk Area' : detail.area_name,
          },
          area_name: detail.area_id === 1 ? detail.area_name : undefined,
          category_jelajah: {
            id: detail.category_jelajah_id,
            name: detail.category_jelajah_name,
          },
          limit_request_plafon: detail.limit_request_plafon,
          limit_request_cash: detail.limit_request_plafon,
          business_lifetime: detail.business_lifetime,
          user_type_id: detail.user_type_id,
          is_merchant_titipku: detail.is_merchant_titipku,
          bank_name: detail.bank_name,
          bank_account: detail.bank_account,
          bank_branch_name: detail.bank_branch_name,
          bank_account_name: detail.bank_account_name,
          relatives_name: detail.relatives_name,
          relatives_relation: detail.relatives_relation,
          disburse_date: detail.disburse_date,
          limit_plafon: detail.limit_plafon,
          limit_cash: detail.limit_cash,
          interest_rate: detail.interest_rate,
        },
        idir_data: {
          gmv: detail.user_idir.GMV,
          purchase: detail.user_idir.Purchase,
          operational_expense: detail.user_idir.OperationalExpense,
          household_expense: detail.user_idir.HouseholdExpense,
          another_expense: detail.user_idir.AnotherExpense,
          another_loan: detail.user_idir.AnotherLoan,
          requested_limit: detail.user_idir.RequestedLimit,
          agreed_fee: detail.user_idir.AgreedFee,
          net_income: detail.user_idir.NetIncome,
          idir_score: detail.user_idir.IdirScore,
          idir_notes: detail.user_idir.IdirNotes,
        },
      };
      formik.setValues(payload);
    }
  }, [id, detailQuery.data]);
  return {
    ...formik,
  };
}

export function useUserRemainingBill(id?: string) {
  const queryCostumer = useQuery({
    queryKey: [`financing/user/${id}/remaining-bill`],
    queryFn: () => getRemainingBillyUserId(id || ''),
    enabled: !!id,
  });

  // @ts-ignore
  const details = queryCostumer.data?.data?.remaining_bill || 0;
  return {
    ...queryCostumer,
    details,
  };
}
