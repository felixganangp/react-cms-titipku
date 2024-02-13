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
import {
  useCreateMerchantDepo,
  useMerchantDetails,
  useUpdateMerchantDepo,
} from 'pages/MerchantsDepo/hooks/useMerchant';
import { useNavigate } from 'react-router-dom';
import useModal from 'hooks/useModal';
import Modal from 'components/Modal';
import HistoryLimit from '../HistoryLimit';

type ModalFormMerchantDepoProps = {
  handleClose: (isSubmited?: boolean) => void;
  id?: string;
  initCreateData?: {
    id: number;
    area_name: string;
    last_month_total_trx: number;
    last_month_gmv: number;
    merchant_name: string;
  };
};
export default function ModalFormMerchantDepo({
  id,
  handleClose,
  initCreateData,
}: ModalFormMerchantDepoProps) {
  const navigate = useNavigate();
  const isUpdate = !initCreateData;
  const typeMerchantList = UseTypeListService();
  const createMerchant = useCreateMerchantDepo();
  const updateMerchant = useUpdateMerchantDepo();
  const merchantDetails = useMerchantDetails(id);

  const showHistory = useModal();

  const formik = useFormik({
    initialValues: {
      jelajah_id: 0,
      merchant_depo_type_id: 2,
      limit: '',
      depo_discount: '',
      admin_fee: '',
      bank_name: '',
      bank_branch_office: '',
      bank_account_name: '',
      bank_account_number: '',
      nobu_account_name: '',
      nobu_account_number: '',
      merchant_qris_id: '',
      qris_ready: false,
    },
    onSubmit: (values) => {
      const payload = {
        ...values,
        jelajah_id: initCreateData?.id || id,
        limit: isUpdate || isDepo ? parseInt(values.limit, 10) : 0,
        depo_discount:
          isUpdate || isAndalan
            ? parseInt(
                values.depo_discount === '0' ? '5' : values.depo_discount,
                10,
              )
            : 0,
        admin_fee:
          isUpdate || isDepo
            ? parseInt(values.admin_fee === '0' ? '5' : values.admin_fee, 10)
            : 0,
        bank_name: isUpdate || isDepo ? values.bank_name : '',
        bank_branch_office: isUpdate || isDepo ? values.bank_branch_office : '',
        bank_account_name: isUpdate || isDepo ? values.bank_account_name : '',
        bank_account_number:
          isUpdate || isDepo ? values.bank_account_number : '',
        nobu_account_name: isUpdate || isDepo ? values.nobu_account_name : '',
        nobu_account_number:
          isUpdate || isDepo ? values.nobu_account_number : '',
      };
      if (isUpdate) {
        updateMerchant.mutate(
          { data: payload, id },
          {
            onSuccess: () => {
              navigate(-1);
            },
          },
        );
      } else {
        createMerchant.mutate(payload, {
          onSuccess: () => {
            navigate(-1);
          },
        });
      }
    },
    validationSchema: Yup.object().shape({
      limit: Yup.number()
        .nullable()
        .when('merchant_depo_type_id', {
          is: (val: number) => val === 1 || val === 3,
          then: Yup.number()
            .nullable()
            .min(1, 'Cant be less than 1')
            .max(2147483647, 'Must be less than or equal to 2147483647')
            .required('This field is required'),
        }),
      depo_discount: Yup.number()
        .nullable()
        .when('merchant_depo_type_id', {
          is: (val: number) => val === 2 || val === 3,
          then: Yup.number()
            .nullable()
            .min(0, 'Cant be less than 1')
            .max(100, 'Must be less than or equal to 100%')
            .required('This field is required'),
        }),
      admin_fee: Yup.number()
        .nullable()
        .when('merchant_depo_type_id', {
          is: (val: number) => val === 1 || val === 3,
          then: Yup.number()
            .nullable()
            .min(0, 'Cant be less than 1')
            .max(100, 'Must be less than or equal to 100%')
            .required('This field is required'),
        }),
      bank_name: Yup.mixed()
        .nullable()
        .when('merchant_depo_type_id', {
          is: (val: number) => val === 1 || val === 3,
          then: Yup.mixed().nullable().required('This field is required'),
        }),
      bank_branch_office: Yup.string()
        .nullable()
        .test((val) => {
          if (
            formik.values.merchant_depo_type_id === 1 ||
            formik.values.merchant_depo_type_id === 3
          ) {
            if (val !== 'BCA (Bank Central Asia)') {
              return val !== '';
            }
          }
          return true;
        }),
      bank_account_name: Yup.string().when('merchant_depo_type_id', {
        is: (val: number) => val === 1 || val === 3,
        then: Yup.string()
          .min(3, 'must be at least 3 characters')
          .max(255, 'must be at most 255 characters')
          .required('This field is required'),
      }),
      bank_account_number: Yup.string().when('merchant_depo_type_id', {
        is: (val: number) => val === 1 || val === 3,
        then: Yup.string()
          .min(5, 'must be at least 5 characters')
          .max(25, 'must be at most 25 characters')
          .required('This field is required'),
      }),
      nobu_account_name: Yup.string().when('merchant_depo_type_id', {
        is: (val: number) => val === 1 || val === 3,
        then: Yup.string()
          .min(3, 'must be at least 3 characters')
          .max(255, 'must be at most 255 characters'),
        // .required('This field is required'),
      }),
      nobu_account_number: Yup.string().when('merchant_depo_type_id', {
        is: (val: number) => val === 1 || val === 3,
        then: Yup.string()
          .min(5, 'must be at least 5 characters')
          .max(25, 'must be at most 25 characters'),
        // .required('This field is required'),
      }),
      merchant_qris_id: Yup.string()
        .nullable()
        .test((val) => {
          if (
            formik.values.merchant_depo_type_id === 1 ||
            formik.values.merchant_depo_type_id === 3
          ) {
            if (formik.values.qris_ready) {
              return val !== '';
            }
          }
          return true;
        }),
    }),
  });

  useEffect(() => {
    const detailData = merchantDetails.data?.data;
    if (detailData) {
      formik.setValues({
        // @ts-ignore
        limit: detailData?.limit,
        // @ts-ignore
        depo_discount: detailData?.depo_discount,
        // @ts-ignore
        admin_fee: detailData?.admin_fee,
        bank_name: detailData?.bank_name,
        bank_branch_office: detailData?.bank_branch_office || '',
        bank_account_name: detailData?.bank_account_name || '',
        bank_account_number: detailData?.bank_account_number || '',
        nobu_account_name: detailData?.nobu_account_name || '',
        nobu_account_number: detailData?.nobu_account_number || '',
        qris_ready: detailData?.qris_ready,
        // @ts-ignore
        merchant_qris_id: detailData?.qris_merchant_id,
        merchant_depo_type_id: detailData?.depo_type_id || 2,
      });
    }
  }, [merchantDetails.data]);
  const isDepo =
    formik.values?.merchant_depo_type_id === 1 ||
    formik.values?.merchant_depo_type_id === 3;
  const isAndalan =
    formik.values?.merchant_depo_type_id === 2 ||
    formik.values?.merchant_depo_type_id === 3;

  const merchantName = `${
    initCreateData?.merchant_name || merchantDetails.data?.data.merchant_name
  } ${
    initCreateData?.area_name || merchantDetails.data?.data.area_name
      ? `(${initCreateData?.area_name || merchantDetails.data?.data.area_name})`
      : ''
  }`;

  console.log(formik.errors);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormControl
          text={
            formik.values.merchant_depo_type_id === 2 ? 'Name' : 'Merchant Name'
          }
          required
        >
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
        <FormControl
          text={
            formik.values.merchant_depo_type_id === 2
              ? 'Month GMV'
              : 'Last Month GMV'
          }
          required
        >
          <TextField
            type="text"
            name="amount"
            placeholder="Input Month GMV"
            fullWidth
            autoComplete="off"
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            value={numberSeperator(
              initCreateData?.last_month_gmv ||
                merchantDetails.data?.data.last_month_gmv ||
                0,
            )}
          />
        </FormControl>
        <FormControl
          text={
            formik.values.merchant_depo_type_id === 2
              ? 'Month Transaction'
              : 'Last Month Transaction'
          }
          required
        >
          <TextField
            type="text"
            name="amount"
            placeholder="Input Last Month Transaction"
            fullWidth
            autoComplete="off"
            disabled
            value={
              initCreateData?.last_month_total_trx ||
              merchantDetails.data?.data?.last_month_trx ||
              0
            }
          />
        </FormControl>
        <FormControl text="Merchant Type">
          <Autocomplete
            options={typeMerchantList.listData}
            getOptionLabel={(option) =>
              option.description.replace('Andalan', 'Andalan Titipku')
            }
            value={
              typeMerchantList.listData.find(
                // @ts-ignore
                (val) => val.id === formik.values.merchant_depo_type_id,
              ) || null
            }
            onChange={(e, value) =>
              formik.setFieldValue('merchant_depo_type_id', value?.id)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name="Type"
                placeholder="Select Type"
                // error={
                //   formik.touched.area && Boolean(formik.errors.area)
                // }
              />
            )}
          />
        </FormControl>
        {isDepo && (
          <FormControl
            text="Limit"
            required
            error={formik.touched.limit && Boolean(formik.errors.limit)}
            helperText={
              formik.touched.limit &&
              formik.errors.limit &&
              `${formik.errors.limit}`
            }
          >
            <TextField
              type="text"
              name="limit"
              // placeholder="Input Limt"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
                endAdornment: isUpdate && (
                  <InputAdornment
                    position="end"
                    onClick={showHistory.toggleModal}
                  >
                    <Button variant="text">History</Button>
                  </InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={numberSeperator(formik.values.limit || '')}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue('limit', value);
              }}
              onBlur={formik.handleBlur}
            />
          </FormControl>
        )}
        {isAndalan && (
          <FormControl
            text="Discount"
            required
            error={
              formik.touched.depo_discount &&
              Boolean(formik.errors.depo_discount)
            }
            helperText={
              formik.touched.depo_discount &&
              formik.errors.depo_discount &&
              `${formik.errors.depo_discount}`
            }
          >
            <TextField
              type="text"
              name="depo_discount"
              placeholder="Input value discount"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={numberSeperator(formik.values.depo_discount || '')}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue('depo_discount', value);
              }}
              onBlur={formik.handleBlur}
              helperText="Base discount 5%"
            />
          </FormControl>
        )}
        {isDepo && (
          <>
            <FormControl
              text="Admin Fee"
              required
              error={
                formik.touched.admin_fee && Boolean(formik.errors.admin_fee)
              }
              helperText={
                formik.touched.admin_fee &&
                formik.errors.admin_fee &&
                `${formik.errors.admin_fee}`
              }
            >
              <TextField
                type="text"
                name="admin_fee"
                placeholder="Input admin fee"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                fullWidth
                autoComplete="off"
                value={numberSeperator(formik.values.admin_fee || '')}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\..*/g, '$1');

                  formik.setFieldValue('admin_fee', value);
                }}
                onBlur={formik.handleBlur}
                helperText="Base admin fee 5%"
              />
            </FormControl>
            <Box
              sx={{ borderBottom: '1px solid #cecece', my: 2 }}
              width="100%"
            />
            <Typography variant="h3" fontWeight="500" mb={1}>
              Account Number
            </Typography>
            <FormControl
              text="Bank"
              required
              error={
                formik.touched.bank_name && Boolean(formik.errors.bank_name)
              }
              helperText={
                formik.touched.bank_name &&
                formik.errors.bank_name &&
                `${formik.errors.bank_name}`
              }
            >
              <Autocomplete
                data-testid="form-customer-list-bank"
                id="list-bank"
                options={bankData.data}
                onChange={(e, value) => {
                  formik.setFieldValue('bank_name', value?.name);
                }}
                // isOptionEqualToValue={(option: {
                //   name: string;
                //   code: string;
                // }) => {
                //   // @ts-ignore
                //   return option.name === formik.values.destination_bank?.name;
                // }}
                getOptionLabel={(option) => `${option.name}`}
                value={
                  // @ts-ignore
                  bankData.data.find(
                    (val) => val.name === formik.values.bank_name,
                  ) || null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="bank_name"
                    onBlur={formik.handleBlur}
                    placeholder="Select bank"
                  />
                )}
              />
            </FormControl>
            <FormControl
              text="Branch Office"
              required={formik.values.bank_name !== 'BCA (Bank Central Asia)'}
              error={
                formik.touched.bank_branch_office &&
                Boolean(formik.errors.bank_branch_office)
              }
              helperText={
                formik.touched.bank_branch_office &&
                formik.errors.bank_branch_office &&
                `${formik.errors.bank_branch_office}`
              }
            >
              <TextField
                fullWidth
                placeholder="Input Branch Office bank"
                value={formik.values.bank_branch_office}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="bank_branch_office"
              />
            </FormControl>
            <FormControl
              text="Account Name"
              required
              error={
                formik.touched.bank_account_name &&
                Boolean(formik.errors.bank_account_name)
              }
              helperText={
                formik.touched.bank_account_name &&
                formik.errors.bank_account_name &&
                `${formik.errors.bank_account_name}`
              }
            >
              <TextField
                fullWidth
                placeholder="Input Account Name"
                value={formik.values.bank_account_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="bank_account_name"
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
              <TextField
                type="text"
                name="bank_account_number"
                placeholder="Input Account Number"
                fullWidth
                autoComplete="off"
                value={formik.values.bank_account_number}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\..*/g, '$1');

                  formik.setFieldValue('bank_account_number', value);
                }}
                onBlur={formik.handleBlur}
              />
            </FormControl>
            <FormControl
              text="NOBU Account Name"
              // required
              error={
                formik.touched.nobu_account_name &&
                Boolean(formik.errors.nobu_account_name)
              }
              helperText={
                formik.touched.nobu_account_name &&
                formik.errors.nobu_account_name &&
                `${formik.errors.nobu_account_name}`
              }
            >
              <TextField
                fullWidth
                placeholder="Input NOBU Account Name"
                value={formik.values.nobu_account_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="nobu_account_name"
              />
            </FormControl>
            <FormControl
              text="NOBU Account Number"
              // required
              error={
                formik.touched.nobu_account_number &&
                Boolean(formik.errors.nobu_account_number)
              }
              helperText={
                formik.touched.nobu_account_number &&
                formik.errors.nobu_account_number &&
                `${formik.errors.nobu_account_number}`
              }
            >
              <TextField
                type="text"
                name="nobu_account_number"
                placeholder="Input NOBU Account Number"
                fullWidth
                autoComplete="off"
                value={formik.values.nobu_account_number || ''}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\..*/g, '$1');

                  formik.setFieldValue('nobu_account_number', value);
                }}
                onBlur={formik.handleBlur}
              />
            </FormControl>
            <FormControl
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
                checked={formik.values.qris_ready}
                name="qris_ready"
                onChange={formik.handleChange}
              />
            </FormControl>
            {formik.values.qris_ready && (
              <FormControl
                text=""
                // required
                error={
                  formik.touched.merchant_qris_id &&
                  Boolean(formik.errors.merchant_qris_id)
                }
                helperText={
                  formik.touched.merchant_qris_id &&
                  formik.errors.merchant_qris_id &&
                  `${formik.errors.merchant_qris_id}`
                }
              >
                <TextField
                  fullWidth
                  placeholder="Merchant ID NOBU"
                  value={formik.values.merchant_qris_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="merchant_qris_id"
                />
              </FormControl>
            )}
          </>
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
          sx={{ borderRadius: '2px' }}
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
          disabled={!formik.isValid}
          sx={{ borderRadius: '2px' }}
        >
          {isUpdate ? 'Update' : 'Submit'}
        </Button>
      </Box>
      <Modal
        title="Limit History"
        open={showHistory.open}
        onClose={showHistory.closeModal}
      >
        <HistoryLimit merchantName={merchantName} id={id} />
      </Modal>
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
