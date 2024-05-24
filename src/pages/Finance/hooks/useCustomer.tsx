/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getAllCustomers, getCustomersDetails } from 'service/Kur/Customer';
import UseParams from 'hooks/useParams';
import { postCreateUser, putCreateUser } from 'service/Finance/customer';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useToast from 'hooks/useToast';
import {
  docDataKey,
  idirDataKey,
  initialValues,
  userDataKey,
  Document,
} from './constumer.config';

export default function useCustomer(setParams: any) {
  const params = UseParams({ count: 5, ...setParams });
  const queryCostumer = useQuery({
    queryKey: ['/finance/customer', params.params],
    queryFn: () => getAllCustomers(params.params),
  });

  const listData = queryCostumer.data?.data || [];
  return {
    ...queryCostumer,
    ...params,
    listData,
  };
}

export function useCustomerDetails(id?: string | number) {
  const queryCostumer = useQuery({
    queryKey: ['/finance/customer', id],
    queryFn: () => getCustomersDetails(id || ''),
    enabled: !!id,
  });

  // const listData = queryCostumer.data?.data || [];
  const details = queryCostumer.data?.data;
  return {
    ...queryCostumer,
    details,
  };
}

export function useCreateCustomer({
  id,
  handleClose,
}: {
  id?: string | number;
  handleClose: (isSubmited: boolean) => void;
}) {
  const { openToast } = useToast();
  const detailQuery = useCustomerDetails(id);
  const isUpdate = Boolean(id);
  const createUser = useMutation<any, string, FormData>(postCreateUser);
  const updateUser = useMutation<any, string, { id: string; data: FormData }>(
    putCreateUser,
  );
  const isLoading =
    createUser.isLoading || updateUser.isLoading || detailQuery.isFetching;

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    onSubmit: async (value) => {
      const formData = new FormData();
      /// user_data ====================
      let user_data = {};

      userDataKey.forEach((val) => {
        switch (val) {
          case 'area_id':
            // @ts-ignore
            user_data.area_id = value.area.id;
            break;
          case 'area_name':
            // @ts-ignore
            user_data.area_name = value.area.name;
            break;
          case 'category_jelajah_id':
            // @ts-ignore
            user_data.category_jelajah_id = value.category_jelajah.id;
            break;
          case 'category_jelajah_name':
            // @ts-ignore
            user_data.category_jelajah_name = value.category_jelajah.name;
            break;
          case 'user_type_id':
            // @ts-ignore
            user_data.user_type_id = parseInt(value.user_type_id);
            break;
          case 'geotag_image':
            // @ts-ignore
            user_data.new_status = 4;
            break;
          default:
            // @ts-ignore
            user_data[val] = value[val];
            break;
        }
      });
      // @ts-ignore
      // if (profile.type === 'co') {
      //   // @ts-ignore
      //   user_data.new_status = 4;
      // }
      await formData.append('user_data', JSON.stringify(user_data, null, 2));

      /// idir_data ====================
      const idir_data = {};
      idirDataKey.forEach((val) => {
        // @ts-ignore
        idir_data[val] = value[val];
      });
      await formData.append('idir_data', JSON.stringify(idir_data, null, 2));

      /// Doc Data ====================
      await Promise.all(
        docDataKey.map(async (val) => {
          // @ts-ignore
          if (value[val] && typeof value[val] !== 'string') {
            // if (val === 'geotag_image') {
            //   return await Promise.all(
            //     value[val].map(async (val: any) => {
            //       await formData.append('geotag_image', val);
            //     }),
            //   );
            // }
            // @ts-ignore
            await formData.append(val, value[val]);
          }
        }),
      );

      if (isUpdate) {
        updateUser.mutate(
          { id: id as string, data: formData },
          {
            onSuccess: (value) => {
              openToast({
                headMsg: 'Success update user',
                message: '',
                severity: 'success',
              });
              handleClose(true);
              console.log(value);
            },
            onError: (value) => {
              openToast({
                headMsg: 'Failed update user',
                message: '',
                severity: 'error',
              });
              console.log(value);
            },
          },
        );
      } else {
        createUser.mutate(formData, {
          onSuccess: (value) => {
            openToast({
              headMsg: 'Success create new user',
              message: '',
              severity: 'success',
            });
            handleClose(true);
            console.log(value);
          },
          onError: (value) => {
            openToast({
              headMsg: 'Failed update user',
              message: '',
              severity: 'error',
            });
            console.log(value);
          },
        });
      }
    },
    validationSchema: yup.object({
      debtor_name: yup
        .string()
        .max(255, 'must be at most 255 characters')
        .required('This field is required'),
      merchant_name: yup
        .string()
        .max(255, 'must be at most 255 characters')
        .required('This field is required'),
      nik: yup
        .string()
        .min(16, 'must be at least 16 characters')
        .max(16, 'must be at least 16 characters')
        .required('This field is required'),
      nib: yup
        .string()
        .min(13, 'Nib must be at least 13 characters')
        .max(13, 'Nib must be at least 13 characters')
        .required('This field is required'),
      npwp: yup
        .string()
        .min(16, 'must be at least 16 characters')
        .max(16, 'must be at least 16 characters')
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
      category_jelajah: yup
        .mixed()
        .nullable()
        .required('This field is required'),
      marriage_status: yup
        .string()
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
      user_type_id: yup.string().nullable().required('This field is required'),
      gmv: yup
        .number()
        .min(1, 'Cant be less than 1')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('This field is required'),
      office_rent: yup
        .number()
        .min(1, 'Cant be less than 1')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('This field is required'),
      electricity: yup
        .number()
        .min(1, 'Cant be less than 1')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('This field is required'),
      education_expenses: yup
        .number()
        .min(1, 'Cant be less than 1')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('This field is required'),
      household_expenses: yup
        .number()
        .min(1, 'Cant be less than 1')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('This field is required'),
      employee_expenses: yup
        .number()
        .min(1, 'Cant be less than 1')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('This field is required'),
      another_loan: yup
        .number()
        .min(0, 'Cant be less than 0')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('This field is required'),
      cash_out_purpose: yup
        .string()
        .max(255, 'must be at most 255 characters')
        .required('This field is required'),
      nik_image: yup.mixed().nullable().required('This field is required'),
      npwp_image: yup.mixed().nullable().required('This field is required'),
      sku_image: yup.mixed().nullable().required('This field is required'),
      nib_image: yup.mixed().nullable().required('This field is required'),
      nik_partner: yup.string().when('marriage_status', {
        is: 'kawin',
        then: () =>
          yup
            .string()
            .min(16, 'must be at least 16 characters')
            .max(16, 'must be at least 16 characters')
            .required('This field is required'),
      }),
      nik_partner_image: yup.mixed().when('marriage_status', {
        is: 'kawin',
        then: () => yup.mixed().required('This field is required'),
      }),
      divorce_papers: yup.string().when('marriage_status', {
        is: 'cerai',
        then: () => yup.string().required('This field is required'),
      }),
      divorce_papers_image: yup.mixed().when('marriage_status', {
        is: 'cerai',
        then: () => yup.mixed().required('This field is required'),
      }),
      marriage_partner_name: yup.string().when('marriage_status', {
        is: 'kawin',
        then: () =>
          yup
            .string()
            .max(255, 'must be at most 255 characters')
            .required('This field is required'),
      }),
    }),
  });

  useEffect(() => {
    const detail = detailQuery.data?.data;
    if (detail) {
      const editValue = {
        ...formik.values,
        debtor_name: detail.debtor_name,
        merchant_name: detail.merchant_name,
        // nik: detail.nik,
        // nib: detail.area_id,
        // npwp: detail.area_id,
        // nik_partner: detail.area_id,
        // divorce_papers: detail.area_id,
        phone_number: detail.phone_number,
        family_phone_number: detail.family_phone_number,
        // @ts-ignore
        area: { id: detail.area_id, name: detail.area_name },
        category_jelajah: {
          id: detail.category_jelajah_id,
          name: detail.category_jelajah_name,
        },
        marriage_status: detail.marriage_status,
        marriage_partner_name: detail.marriage_partner_name,
        limit_request_plafon: detail.limit_request_plafon,
        limit_request_cash: detail.limit_request_cash,
        business_lifetime: detail.business_lifetime,
        user_type_id: detail.user_type.id,
        is_merchant_titipku: detail.is_merchant_titipku,
        gmv: detail.user_idir.GMV,
        office_rent: detail.user_idir.OfficeRent,
        electricity: detail.user_idir.Electricity,
        education_expenses: detail.user_idir.EducationExpense,
        household_expenses: detail.user_idir.HouseholdExpense,
        employee_expenses: detail.user_idir.EmployeeExpense,
        another_loan: detail.user_idir.AnotherLoan,
        cash_out_purpose: detail.user_idir.CashOutPurpose,
        // geotag_image: detail.user_geotag_images.map(
        //   (val) => val.image_filepath,
        // ),
        bank_account: detail.bank_account,
        bank_name: detail.bank_name,
      };
      Object.keys(Document).map((val) => {
        const doc = detail.user_documents.find(
          (_val) => val === _val.document_type_id.toString(),
        );

        // @ts-ignore
        switch (Document[val]) {
          case 'KTP':
            // @ts-ignore
            editValue.nik = doc?.document_number;
            // @ts-ignore
            editValue.nik_image = doc?.image_filepath;
            break;
          case 'NIB':
            // @ts-ignore
            editValue.nib = doc?.document_number;
            // @ts-ignore
            editValue.nib_image = doc?.image_filepath;
            break;
          // case "NPWP":
          //   // @ts-ignore
          //   editValue.npwp = doc?.document_number;
          //   editValue.npwp_image =  doc?.image_filepath;
          //   break;
          case 'NPWP':
            // @ts-ignore
            editValue.npwp = doc?.document_number;
            // @ts-ignore
            editValue.npwp_image = doc?.image_filepath;
            break;
          case 'KTP Pasangan':
            // @ts-ignore
            editValue.nik_partner = doc?.document_number;
            // @ts-ignore
            // @ts-ignore
            editValue.nik_partner_image = doc?.image_filepath;
            break;
          case 'SKU':
            // @ts-ignore
            editValue.sku_image = doc?.image_filepath;
            break;
          case 'Surat Cerai':
            // @ts-ignore
            editValue.divorce_papers = doc?.document_number;
            // @ts-ignore
            editValue.divorce_papers_image = doc?.image_filepath;
            break;
          default:
            break;
        }
      });

      // detail.user_documents.forEach((val) => {});
      // @ts-ignore
      formik.setValues(editValue);
    }
  }, [id, detailQuery.isLoading]);
  return { ...formik, isLoading };
}
