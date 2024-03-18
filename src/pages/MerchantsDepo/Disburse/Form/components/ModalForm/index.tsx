/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
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
  bank_code?: string;
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
  const [bankAccounts, setBankAccounts] = useState<BankAccounts[]>([]);

  useEffect(() => {
    if (merchantDetails.data?.data) {
      formik.setFieldValue(
        'is_auto_disburse',
        merchantDetails.data?.data.is_auto_disburse,
      );
    }

    // bankData
    const resultBank: BankAccounts[] = [];
    resultBank.push({
      // @ts-ignore
      id: merchantDetails.data?.data.bank_account_number,
      string: `${merchantDetails.data?.data.bank_name} - ${merchantDetails.data?.data.bank_account_number}`,
      // @ts-ignore
      bank: merchantDetails.data?.data.bank_name,
      // @ts-ignore
      bank_account_name: merchantDetails.data?.data.bank_account_name,
    });
    if (merchantDetails.data?.data.nobu_account_number) {
      resultBank.push({
        // @ts-ignore
        id: merchantDetails.data?.data.nobu_account_number,
        string: `Nobu - ${merchantDetails.data?.data.nobu_account_number}`,
        bank: 'Nobu',
        bank_account_name: merchantDetails.data?.data.nobu_account_name,
      });
    }

    if (
      isUpdate &&
      (disburseDetails?.data?.data.bank_name !==
        merchantDetails?.data?.data?.bank_name ||
        disburseDetails?.data?.data.bank_account_number !==
          merchantDetails?.data?.data?.bank_account_number)
    ) {
      resultBank.push({
        // @ts-ignore
        id: disburseDetails?.data?.data?.bank_account_number,
        string: `${disburseDetails?.data?.data?.bank_name} - ${disburseDetails?.data?.data?.bank_account_number}`,
        // @ts-ignore
        bank: disburseDetails?.data?.data?.bank_name,
        // @ts-ignore
        bank_account_name: disburseDetails?.data?.data?.bank_account_name,
      });
    }
    setBankAccounts(resultBank);
  }, [merchantDetails.data]);

  const formik = useFormik({
    initialValues: {
      jelajah_id: id_jelajah,
      bank_name: '',
      bank_account_name: '',
      bank_code: '',
      bank_account_number: '',
      amount: 0,
      transfer_amount: 0,
      status: 1,
      is_auto_disburse: false,
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
              handleClose(true);
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
    const accountBank: BankAccounts[] = [];
    accountBank.push({
      // @ts-ignore
      id: merchantDetails.data?.data.bank_account_number || '',
      string: `${merchantDetails.data?.data.bank_name} - ${merchantDetails.data?.data.bank_account_number}`,
      bank: merchantDetails.data?.data.bank_name || '',
      bank_account_name: merchantDetails.data?.data.bank_account_name || '',
      bank_code: merchantDetails.data?.data.bank_code || '',
    });
    if (merchantDetails.data?.data.nobu_account_number) {
      accountBank.push({
        // @ts-ignore
        id: merchantDetails.data?.data.nobu_account_number || '',
        string: `Nobu - ${merchantDetails.data?.data.nobu_account_number}`,
        bank: 'Nobu',
        bank_account_name: merchantDetails.data?.data.nobu_account_name,
        bank_code: merchantDetails.data?.data.bank_code || '',
      });
    }

    if (
      isUpdate &&
      (disburseDetails?.data?.data.bank_name !==
        merchantDetails?.data?.data?.bank_name ||
        disburseDetails?.data?.data.bank_account_number !==
          merchantDetails?.data?.data?.bank_account_number)
    ) {
      accountBank.push({
        id: disburseDetails?.data?.data?.bank_account_number || 0,
        string: `${disburseDetails?.data?.data?.bank_name} - ${disburseDetails?.data?.data?.bank_account_number}`,
        bank: disburseDetails?.data?.data?.bank_name || '',
        bank_account_name: disburseDetails?.data?.data
          ?.bank_account_name as string,
        bank_code: disburseDetails?.data?.data?.bank_code as string,
      });
    }

    setBankAccounts(accountBank);
  }, [merchantDetails.data, disburseDetails.data]);

  const Branch =
    formik.values?.bank_account_number ===
    merchantDetails.data?.data?.bank_account_number
      ? merchantDetails.data?.data?.bank_branch_office
      : // @ts-ignore
      disburseDetails.data?.data?.bank_account_number ===
        formik.values?.bank_account_number
      ? // @ts-ignore
        disburseDetails.data?.data?.bank_branch_office
      : '';
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
            // @ts-ignore
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
            // @ts-ignore
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
              formik.setFieldValue('bank_code', value?.bank_code);
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
        {Branch && (
          <>
            <FormControl text="Branch" required>
              <TextField
                fullWidth
                placeholder="Branch bank"
                disabled
                value={Branch}
              />
            </FormControl>
          </>
        )}

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
              // @ts-ignore
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
        {!merchantDetails?.data?.data.is_auto_disburse && (
          <Stack
            border="solid 1px #e4e4e4"
            p="10px 20px"
            borderRadius="5px"
            bgcolor="#fdf1da"
            spacing={0.1}
            mt={1.5}
          >
            <Typography fontSize="14" fontWeight="500" color="error.main">
              Auto Disburse OFF
            </Typography>
            <Typography fontSize="14">
              <b>Reason :</b>{' '}
              {merchantDetails?.data?.data.auto_disburse_disable_reason}
            </Typography>
          </Stack>
        )}
        {merchantDetails?.data?.data.is_auto_disburse && (
          <FormControl
            text="Auto Disburse"
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
              checked={formik.values.is_auto_disburse}
              name="is_auto_disburse"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.handleChange(e);
              }}
            />
          </FormControl>
        )}
        {!formik.values.is_auto_disburse && (
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
              options={disburseStatus.listData.filter(
                (val) => !val.description.includes('By System'),
              )}
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
        )}
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
        <Button
          type="submit"
          color="primary"
          disabled={
            !formik.isValid ||
            updateDisburse.isLoading ||
            createDisburse.isLoading
          }
          startIcon={
            (updateDisburse.isLoading || createDisburse.isLoading) && (
              <CircularProgress size={20} />
            )
          }
        >
          Submit
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
