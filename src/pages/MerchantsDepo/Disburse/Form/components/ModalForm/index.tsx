/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  Switch,
  SwitchProps,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import FormControl from 'components/FormLabel';
import { UseTypeListService } from 'pages/MerchantsDepo/hooks/useConfigMerchant';
import numberSeperator from 'utils/numberSeperator';
import bankData from 'data/list-bank.json';
import { useMerchantDetails } from 'pages/MerchantsDepo/hooks/useMerchant';
import {
  UseListDisburseStatus,
  useCreateDisburse,
  useUpdateDisburse,
  useDisburseDetails,
} from 'pages/MerchantsDepo/hooks/useDisburse';
import { useNavigate } from 'react-router-dom';

type ModalFormDisburseDepoProps = {
  handleClose: (isSubmited?: boolean) => void;
  id?: string;
  id_jelajah?: number;
};
type BankAccounts = {
  id: number;
  bank: string;
  string: string;
  bank_account_name: string;
};
export default function ModalFormDisburseDepo({
  id,
  id_jelajah,
  handleClose,
}: ModalFormDisburseDepoProps) {
  const navigate = useNavigate();
  const isUpdate = id;
  const merchantDetails = useMerchantDetails(id_jelajah);
  const disburseDetails = useDisburseDetails(id);
  const createDisburse = useCreateDisburse();
  const updateDisburse = useUpdateDisburse();
  const disburseStatus = UseListDisburseStatus();

  const merchantName = `${merchantDetails.data?.data.merchant_name} (${merchantDetails.data?.data.area_name})`;
  const adminFee = merchantDetails?.data?.data.admin_fee;
  const limit = merchantDetails?.data?.data.limit;
  const balance = merchantDetails?.data?.data.balance;
  // Set Bank Account List
  const bankAccounts: BankAccounts[] = [];
  bankAccounts.push({
    id: merchantDetails.data?.data.bank_account_number,
    string: `${merchantDetails.data?.data.bank_name} - ${merchantDetails.data?.data.bank_account_number}`,
    bank: merchantDetails.data?.data.bank_name,
    bank_account_name: merchantDetails.data?.data.bank_account_name,
  });
  if (merchantDetails.data?.data.nobu_account_number) {
    bankAccounts.push({
      id: merchantDetails.data?.data.nobu_account_number,
      string: `Nobu - ${merchantDetails.data?.data.nobu_account_number}`,
      bank: 'Nobu',
      bank_account_name: merchantDetails.data?.data.nobu_account_name,
    });
  }

  if (
    disburseDetails?.data?.data.bank_name !==
      merchantDetails?.data?.data?.bank_name ||
    disburseDetails?.data?.data.bank_account_number !==
      merchantDetails?.data?.data?.bank_account_number
  ) {
    console.log('blah', disburseDetails?.data.data);
    bankAccounts.push({
      id: disburseDetails?.data.data.bank_account_number,
      string: `${disburseDetails?.data.data.bank_name} - ${disburseDetails?.data.data.bank_account_number}`,
      bank: disburseDetails?.data.data.bank_name,
      bank_account_name: disburseDetails?.data.data.bank_account_name,
    });
  }

  console.log('merchdetail', merchantDetails, bankAccounts);

  const formik = useFormik({
    initialValues: {
      jelajah_id: id_jelajah,
      bank_name: '',
      bank_account_name: '',
      bank_account_number: '',
      amount: 0,
      transfer_amount: 0,
      status: 1,
    },
    onSubmit: (values) => {
      const payload = {
        ...values,
      };
      if (isUpdate) {
        updateDisburse.mutate(
          { data: payload, id },
          {
            onSuccess: () => {
              handleClose();
            },
          },
        );
      } else {
        createDisburse.mutate(payload, {
          onSuccess: () => {
            navigate(-1);
          },
        });
      }
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .min(5000, 'Must be more than or equal to 5000')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .required('Required'),
      status: Yup.number().required('Select status'),
      bank_account_number: Yup.string().required('Select bank account'),
    }),
  });

  useEffect(() => {
    const detailData = disburseDetails.data?.data;
    if (detailData) {
      formik.setValues({
        // @ts-ignore
        jelajah_id: id_jelajah,
        bank_name: detailData?.bank_name,
        bank_account_name: detailData?.bank_account_name,
        bank_account_number: detailData?.bank_account_number.toString(),
        amount: detailData?.amount,
        transfer_amount: detailData?.transfer_amount,
        status: detailData?.status?.id,
      });
    }
  }, [disburseDetails.data]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormControl text="Merchant Name" required>
          <TextField
            type="text"
            name="amount"
            placeholder="Input Merchant name"
            fullWidth
            autoComplete="off"
            disabled
            value={merchantName}
          />
        </FormControl>
        <FormControl text="Limit" required>
          <TextField
            type="text"
            name="amount"
            placeholder="Input Merchant name"
            fullWidth
            autoComplete="off"
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            value={numberSeperator(limit)}
          />
        </FormControl>
        <FormControl text="Balance" required>
          <TextField
            type="text"
            name="amount"
            placeholder="Input Balance"
            fullWidth
            autoComplete="off"
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            value={numberSeperator(balance)}
          />
        </FormControl>
        <FormControl
          text="Account Number"
          required
          error={
            formik.touched.bank_account_number &&
            Boolean(formik.errors.bank_account_number)
          }
          helperText={
            formik.touched.bank_account_number &&
            formik.errors.bank_account_number &&
            `${formik.errors.bank_account_number}`
          }
        >
          <Autocomplete
            id="bank_account_number"
            options={bankAccounts}
            getOptionLabel={(option) => option.string}
            value={
              bankAccounts.find(
                // @ts-ignore
                (val) => val.id === formik.values.bank_account_number,
              ) || null
            }
            onChange={(e, value) => {
              formik.setFieldValue(
                'bank_account_number',
                value === null ? '' : value?.id,
              );
              formik.setFieldValue(
                'bank_account_name',
                value?.bank_account_name,
              );
              formik.setFieldValue('bank_name', value?.bank);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                onBlur={formik.handleBlur}
                name="bank_account_number"
                placeholder="Select Bank Account"
              />
            )}
          />
        </FormControl>
        <FormControl
          text="Top Up Value"
          required
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={
            formik.touched.amount &&
            formik.errors.amount &&
            `${formik.errors.amount}`
          }
        >
          <TextField
            type="text"
            name="amount"
            placeholder="Input Top Up Value"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            onChange={(e) => {
              const value = e.target.value
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('amount', +value);
              const precentage = +value - +value * (adminFee / 100);
              formik.setFieldValue('transfer_amount', +precentage);
            }}
            fullWidth
            autoComplete="off"
            value={numberSeperator(formik.values.amount || '')}
            onBlur={formik.handleBlur}
          />
        </FormControl>
        <FormControl text="Admin Fee" required>
          <TextField
            type="text"
            name="amount"
            placeholder="Input Merchant name"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            fullWidth
            autoComplete="off"
            disabled
            value={adminFee}
          />
        </FormControl>
        <Box bgcolor="#CDE3F6" p="14px" borderRadius="8px">
          <Typography fontSize="14px">Amount Transferred</Typography>
          <Typography fontSize="24px" fontWeight="bold">
            Rp. {numberSeperator(formik.values.transfer_amount || 0)}
          </Typography>
        </Box>
        <FormControl
          text="Status"
          required
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={
            formik.touched.status &&
            formik.errors.status &&
            `${formik.errors.status}`
          }
        >
          <Autocomplete
            options={disburseStatus.listData}
            getOptionLabel={(option) => option.description}
            value={
              disburseStatus.listData.find(
                // @ts-ignore
                (val) => val.id === formik.values.status,
              ) || null
            }
            onChange={(e, value) => {
              formik.setFieldValue('status', value?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="Status"
                placeholder="Select Status"
              />
            )}
          />
        </FormControl>
      </Box>
      <Box
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
          variant="text"
          color="error"
          onClick={() => {
            handleClose(false);
            formik.resetForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" color="primary" disabled={!formik.isValid}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
