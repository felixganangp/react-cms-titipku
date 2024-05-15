/* eslint-disable radix */
import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  InputAdornment,
  TextField,
} from '@mui/material';
import FormControl from 'components/FormLabel';
import {
  useCreateCustomer,
  useCustomerDetails,
} from 'pages/Finance/hooks/useCustomer';
import numberSeperator from 'utils/numberSeperator';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { postCreateUser, putCreateUser } from 'service/Finance/customer';
import useToast from 'hooks/useToast';
import {
  docDataKey,
  idirDataKey,
  initialValues,
  userDataKey,
  Document,
} from '@/pages/Finance/hooks/constumer.config';

interface VerifyProps {
  id?: number;
  onSubmit: (isSubmited: boolean) => void;
  onClose: () => void;
}

export default function VerifyUpdateData({
  id,
  onSubmit,
  onClose,
}: VerifyProps) {
  const { openToast } = useToast();
  const detailQuery = useCustomerDetails(id);
  const updateUser = useMutation<any, string, { id?: number; data: FormData }>(
    // @ts-ignore
    putCreateUser,
  );
  const formik = useFormik({
    initialValues: {
      limit_request_plafon: 0,
      limit_request_cash: 0,
      limit_plafon: 0,
      limit_cash: 0,
      new_status: 6,
    },
    onSubmit: async (value) => {
      const formData = new FormData();

      /// user_data ====================
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const user_data = {
        new_status: 6,
      };

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
          // case 'geotag_image':
          //   // @ts-ignore
          //   user_data.new_status = 4;
          //   break;
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
      // eslint-disable-next-line @typescript-eslint/naming-convention
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
      updateUser.mutate(
        {
          id,
          data: formData,
        },
        {
          onSuccess: () => {
            onSubmit(true);
            openToast({
              severity: 'success',
              headMsg: 'Success update user',
            });
          },
          onError: (e) => {
            openToast({
              severity: 'error',
              headMsg: 'Failed update user',
              message: e,
            });
          },
        },
      );
    },
    validationSchema: yup.object().shape({
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
      limit_plafon: yup
        .number()
        .min(1, 'Cant be less than 1')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('This field is required'),
      limit_cash: yup
        .number()
        .min(1, 'Cant be less than 1')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('This field is required'),
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
        limit_plafon: detail.limit_plafon || 0,
        limit_cash: detail.limit_cash || 0,
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
      };
      // eslint-disable-next-line array-callback-return
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

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="20px 24px" gap="16px" display="flex" flexDirection="column">
        <FormControl
          text="Limit request plafon"
          required
          error={
            formik.touched.limit_request_plafon &&
            Boolean(formik.errors.limit_request_plafon)
          }
          helperText={
            formik.touched.limit_request_plafon
              ? formik.errors.limit_request_plafon
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input request plafon"
            name="limit_request_plafon"
            onBlur={formik.handleBlur}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
            }
            error={
              formik.touched.limit_request_plafon &&
              Boolean(formik.errors.limit_request_plafon)
            }
            value={numberSeperator(formik.values.limit_request_plafon)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue(
                'limit_request_plafon',
                parseInt(value || '0'),
              );
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl
          text="Limit request cash"
          required
          error={
            formik.touched.limit_request_cash &&
            Boolean(formik.errors.limit_request_cash)
          }
          helperText={
            formik.touched.limit_request_cash
              ? formik.errors.limit_request_cash
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input limit cash"
            name="limit_request_cash"
            onBlur={formik.handleBlur}
            value={numberSeperator(formik.values.limit_request_cash)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue(
                'limit_request_cash',
                parseInt(value || '0'),
              );
            }}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl
          text="Limit plafon"
          required
          error={
            formik.touched.limit_plafon && Boolean(formik.errors.limit_plafon)
          }
          helperText={
            formik.touched.limit_plafon ? formik.errors.limit_plafon : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input limit plafon"
            name="limit_plafon"
            onBlur={formik.handleBlur}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
            }
            error={
              formik.touched.limit_plafon && Boolean(formik.errors.limit_plafon)
            }
            value={numberSeperator(formik.values.limit_plafon)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('limit_plafon', parseInt(value || '0'));
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl
          text="Limit cash"
          required
          error={formik.touched.limit_cash && Boolean(formik.errors.limit_cash)}
          helperText={formik.touched.limit_cash ? formik.errors.limit_cash : ''}
        >
          <TextField
            fullWidth
            placeholder="Input cash"
            name="limit_cash"
            onBlur={formik.handleBlur}
            value={numberSeperator(formik.values.limit_cash)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('limit_cash', parseInt(value || '0'));
            }}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        padding="24px"
        gap="10px"
        boxShadow="3px 0 10px 0 rgba(0, 0, 0, 0.1)"
      >
        <Button variant="text" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={!formik.isValid}>
          Verify
        </Button>
      </Box>
    </Box>
  );
}
