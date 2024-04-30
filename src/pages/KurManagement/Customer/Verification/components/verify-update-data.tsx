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
      new_status: 6,
    },
    onSubmit: (value) => {
      const formData = new FormData();
      formData.append(
        'limit_request_plafon',
        value.limit_request_plafon.toString(),
      );
      formData.append(
        'limit_request_cash',
        value.limit_request_cash.toString(),
      );
      formData.append('new_status', value.new_status.toString());

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
    }),
  });

  useEffect(() => {
    const detail = detailQuery.data?.data;
    if (detail) {
      const editValue = {
        ...formik.values,
        limit_request_plafon: detail.limit_request_plafon,
        limit_request_cash: detail.limit_request_cash,
      };

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
            placeholder="Input request plafo"
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
