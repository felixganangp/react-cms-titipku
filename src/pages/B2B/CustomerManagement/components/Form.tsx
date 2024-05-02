/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormLabel from 'components/FormLabel';
import {
  Box,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Autocomplete,
  Switch,
  styled,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import useToast from 'hooks/useToast';
import useCustomer, {
  useArea,
  useCreateCustomer,
  useCustomerType,
  useUpdateCustomer,
} from '../hooks/useCustomer';

interface FormTypes {
  selected: any | null;
  onClose: (isSubmitted: boolean) => void;
}

export default function FormCustomer({ selected, onClose }: FormTypes) {
  const isEdit = Boolean(selected);
  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer();
  const areaQuery = useArea();
  const customerType = useCustomerType();
  const { openToast } = useToast();

  const formik = useFormik({
    initialValues: {
      name: '',
      phone_number: '',
      merchant_name: '',
      notes: '',
      area_id: null,
      is_kur: true,
      customer_type_id: 1,
      email: '',
      merchant_address: '',
      merchant_address_detail: '',
    },
    onSubmit: (values) => {
      if (isEdit && selected?.id) {
        updateCustomer.mutate(
          {
            id: selected.id,
            data: values,
          },
          {
            onSuccess: () => {
              openToast({
                severity: 'success',
                headMsg: 'Customer Updated',
              });
              onClose(true);
            },
            onError: () => {
              openToast({
                severity: 'error',
                headMsg: 'Failed to update customer',
              });
            },
          },
        );
      } else {
        createCustomer.mutate(values, {
          onSuccess: () => {
            openToast({
              severity: 'success',
              headMsg: 'Customer Created',
            });
            onClose(true);
          },
          onError: (e) => {
            openToast({
              severity: 'error',
              // @ts-ignore
              headMsg: e || 'Failed to create customer',
            });
          },
        });
      }
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Name is required')
        .max(255, 'must be at most 255 characters'),
      email: yup
        .string()
        .email('Invalid email format')
        .max(255, 'must be at most 255 characters'),
      // .required('Email is required'),
      area_id: yup.mixed().required('Area is required'),
      merchant_name: yup
        .string()
        .required('Merchant Name is required')
        .max(255, 'must be at most 255 characters'),
      merchant_address: yup
        .string()
        .required('Merchant Address is required')
        .max(2147483647, 'Must be less than or equal to 2147483647'),
      customer_type_id: yup.number().required('Customer Type is required'),
      phone_number: yup
        .number()
        .required('Phone Number is required')
        .test(
          'len',
          'Maximal digit for phone number is 14',
          (val) => val !== undefined && val.toString().length < 15,
        )
        .test(
          'len',
          'Minimal digit for phone number is 10',
          (val) => val !== undefined && val.toString().length > 9,
        )
        .typeError('Phone number should be a number'),
    }),
    enableReinitialize: true,
  });
  console.log(formik.errors);

  useEffect(() => {
    if (selected) {
      formik.setValues({
        name: selected.name,
        phone_number: selected.phone_number,
        merchant_name: selected.merchant_name,
        notes: selected.notes,
        area_id: selected.area_id,
        is_kur: selected.is_kur,
        customer_type_id: selected.customer_type_id,
        email: selected.email,
        merchant_address: selected.merchant_address,
        merchant_address_detail: selected.merchant_address_detail,
      });
    }
  }, [selected]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormLabel
          text="Merchant Name"
          error={
            formik.touched.merchant_name && Boolean(formik.errors.merchant_name)
          }
          required
          helperText={
            formik.touched.merchant_name &&
            formik.errors.merchant_name &&
            `${formik.errors.merchant_name}`
          }
        >
          <TextField
            type="text"
            name="merchant_name"
            placeholder="Insert Merchant Name"
            value={formik.values.merchant_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </FormLabel>
        <FormLabel
          required
          text="Customer Name"
          error={
            (formik.touched.name && Boolean(formik.errors.name)) ||
            formik.touched.name
          }
          helperText={
            formik.touched.name && formik.errors.name && `${formik.errors.name}`
          }
        >
          <TextField
            type="text"
            name="name"
            placeholder="Insert Customer Name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </FormLabel>
        <FormLabel
          text="Phone Number"
          required
          error={
            formik.touched.phone_number && Boolean(formik.errors.phone_number)
          }
          helperText={
            formik.touched.phone_number &&
            formik.errors.phone_number &&
            `${formik.errors.phone_number}`
          }
        >
          <TextField
            type="text"
            name="phone_number"
            placeholder="Insert active phone number"
            value={formik.values.phone_number}
            onChange={(e) => {
              let number = e.target.value;
              if (number.startsWith('0')) {
                number = number.slice(1);
              }
              formik.handleChange({
                target: {
                  name: 'phone_number',
                  value: number,
                },
              });
            }}
            fullWidth
            onBlur={formik.handleBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+62</InputAdornment>
              ),
            }}
          />
        </FormLabel>
        <FormLabel
          text="Email"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email &&
            formik.errors.email &&
            `${formik.errors.email}`
          }
        >
          <TextField
            type="email"
            name="email"
            placeholder="Insert email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </FormLabel>
        <FormLabel
          text="Area"
          required
          error={formik.touched.area_id && Boolean(formik.errors.area_id)}
          helperText={formik.touched.area_id ? formik.errors.area_id : ''}
        >
          <Autocomplete
            options={areaQuery.listData}
            noOptionsText={
              areaQuery.searchValue ? 'Type to search area' : 'No option'
            }
            // inputValue={areaQuery.searchValue}
            // onInputChange={(_, newInputValue) => {
            //   areaQuery.handleSearch(newInputValue);
            // }}
            loading={areaQuery.isFetching}
            getOptionLabel={(item) => item.name}
            value={
              areaQuery.listData.find(
                (val) => val.id === formik.values.area_id,
              ) || null
            }
            onChange={(e, value) => {
              formik.setFieldValue('area_id', value.id);
            }}
            onBlur={() => {
              formik.setFieldTouched('area');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="area"
                placeholder="Example: Pasar Modern BSD"
                error={formik.touched.area_id && Boolean(formik.errors.area_id)}
              />
            )}
          />
        </FormLabel>
        <FormLabel
          required
          text="Customer Type"
          error={
            formik.touched.customer_type_id &&
            Boolean(formik.errors.customer_type_id)
          }
          helperText={
            formik.touched.customer_type_id &&
            formik.errors.customer_type_id &&
            `${formik.errors.customer_type_id}`
          }
        >
          <Autocomplete
            options={customerType.listData}
            getOptionLabel={(item) => item.name}
            value={
              customerType.listData.find(
                (val) => val.id === formik.values.customer_type_id,
              ) || null
            }
            onChange={(e, value) => {
              formik.setFieldValue('customer_type_id', value.id);
            }}
            onBlur={() => {
              formik.setFieldTouched('customer_type_id');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="area"
                placeholder="Customer Type"
                error={
                  formik.touched.customer_type_id &&
                  Boolean(formik.errors.customer_type_id)
                }
              />
            )}
          />
        </FormLabel>
        <FormLabel
          text="Is QRIS Ready?"
          // error={
          //   formik.touched.bank_account_number &&
          //   Boolean(formik.errors.bank_account_number)
          // }
          // helperText={
          //   formik.touched.bank_account_number &&
          //   formik.errors.bank_account_number &&
          //   `${formik.errors.bank_account_number}`
          // }
        >
          <SwitchCostum
            checked={formik.values.is_kur}
            name="is_kur"
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.handleChange(e);
            }}
          />
        </FormLabel>
        <FormLabel
          text="Merchant Address"
          required
          helperText={
            formik.touched.merchant_address &&
            formik.errors.merchant_address &&
            `${formik.errors.merchant_address}`
          }
          error={
            formik.touched.merchant_address &&
            Boolean(formik.errors.merchant_address)
          }
        >
          <TextField
            type="text"
            name="merchant_address"
            placeholder="Insert Merchant Address"
            value={formik.values.merchant_address}
            onChange={(e) => {
              formik.handleChange(e);
              // @ts-ignore
              formik.setFieldTouched('merchant_address_detail', e.target.value);
            }}
            onBlur={formik.handleBlur}
            fullWidth
            multiline
            rows={3}
          />
        </FormLabel>
        <FormLabel text="notes">
          <TextField
            type="text"
            name="notes"
            placeholder="Insert notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            multiline
            rows={3}
          />
        </FormLabel>
      </Box>
      <Box
        width="100%"
        display="flex"
        gap="10px"
        justifyContent="end"
        // mt="50px"
        sx={{
          padding: '24px',
          boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Button
          type="submit"
          size="medium"
          // onClick={() => {
          //   formik.handleSubmit();
          // }}
          disabled={
            createCustomer.isLoading ||
            updateCustomer.isLoading ||
            !formik.isValid
          }
        >
          {!createCustomer.isLoading || !updateCustomer.isLoading
            ? `${isEdit ? 'Save Changes' : 'Create'}`
            : 'Loading...'}
        </Button>
      </Box>
    </Box>
  );
}

const SwitchCostum = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));
