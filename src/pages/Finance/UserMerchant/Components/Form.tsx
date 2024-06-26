/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable radix */
import {
  Box,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Autocomplete,
  Stack,
  Button,
  Switch,
  styled,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import FormControl from 'components/FormLabel';
import numberSeperator from 'utils/numberSeperator';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import useModal from 'hooks/useModal';
import InputImage from 'components/InputImage';
import UseParams from 'hooks/useParams';
import bankData from 'data/list-bank.json';
import { useQuery } from '@tanstack/react-query';
import {
  getAllAreaFinancing,
  getAllCategoryFinancing,
} from 'service/Finance/config';
import { SteperHeader } from '../../Customer/Components/SteperHeader';
import useUserMerchant from '../hooks/useUserMerchant';
import { Type } from '../../hooks/constumer.config';

export default function FormUserMerchant({
  id,
  handleClose,
  openModal,
}: {
  id?: string | number;
  handleClose: (isSubmited: boolean) => void;
  openModal?: boolean;
}) {
  // calendar
  const openCalender = useModal();
  const openCalenderDisburse = useModal();
  const [step, setStep] = useState<number>(1);

  const areaParams = UseParams({ count: 25 });
  const areaQuery = useQuery({
    queryKey: ['/area', areaParams.params],
    queryFn: () => getAllAreaFinancing(areaParams.params),
    // enabled: Boolean(areaParams.searchValue),
    keepPreviousData: true,
  });
  const categoryParams = UseParams({ count: 25 });
  const categoryQuery = useQuery({
    queryKey: ['/jelajah-category', categoryParams.params],
    queryFn: () => getAllCategoryFinancing(categoryParams.params),
    // enabled: Boolean(categoryParams.searchValue),
    keepPreviousData: true,
  });

  const formik = useUserMerchant({
    id,
    handleClose,
  });

  const backButton = () => {
    switch (step) {
      case 1:
        return {
          label: 'Cancel',
          onClick: () => {
            handleClose(false);
            // confirmCancelModal.on();
          },
        };
      default:
        return {
          label: 'Back',
          onClick: () => setStep(step - 1),
        };
    }
  };

  const nextButton = () => {
    switch (step) {
      case 1:
        return {
          label: 'Next',
          onClick: () => {
            // setStep(step + 1);
            formik.validateForm().then((errors) => {
              if (errors?.user_data) {
                Object.keys(errors.user_data).forEach((val: string) => {
                  formik.setFieldTouched(`user_data.${val}`);
                });
              } else {
                setStep(step + 1);
              }
            });
          },
          disabled: Boolean(formik.errors?.user_data),
        };
      case 2:
        return {
          label: 'Submit',
          onClick: () => {
            // console.log(formik.errors);
            // onCancelRef.current = true;
            formik.handleSubmit();
          },
          disabled: Boolean(formik.errors?.idir_data),
        };
      default:
        return {
          label: 'Next',
          onClick: () => setStep(step + 1),
        };
    }
  };

  useEffect(() => {
    const element = document.getElementById('to');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  useEffect(() => {
    if (!openModal) {
      formik.resetForm();
      setStep(1);
    }
  }, [openModal]);

  const totalIncome = useMemo(() => {
    try {
      const result =
        // @ts-ignore
        // eslint-disable-next-line no-unsafe-optional-chaining
        formik.values.idir_data?.gmv - formik.values.idir_data?.purchase;
      return result;
    } catch (error) {
      return 0;
    }
  }, [formik.values.idir_data]);

  const totalExpenses = useMemo(() => {
    try {
      const result =
        // @ts-ignore
        // eslint-disable-next-line no-unsafe-optional-chaining
        formik.values.idir_data?.operational_expense +
        formik.values.idir_data?.household_expense +
        formik.values.idir_data?.another_expense +
        formik.values.idir_data?.another_loan;
      return result;
    } catch (error) {
      return 0;
    }
  }, [formik.values.idir_data]);

  const totalNetIncome = useMemo(() => {
    try {
      const result =
        // @ts-ignore
        totalIncome - totalExpenses - formik.values.idir_data.agreed_fee;
      formik.setFieldValue('idir_data.net_income', result);
      return result;
    } catch (error) {
      return 0;
    }
  }, [totalIncome, totalExpenses, formik.values.idir_data.agreed_fee]);

  const scoreIdir = useMemo(() => {
    try {
      const result =
        // @ts-ignore
        totalNetIncome / formik.values.idir_data.agreed_fee;
      return result;
    } catch (error) {
      return 0;
    }
  }, [totalExpenses, formik.values.idir_data.agreed_fee]);

  console.log('scoreIdir', formik.errors);
  return (
    <Box p="24px">
      <div id="top" />
      <SteperHeader
        currentStep={step}
        stepList={['Basic Info', 'Calculator IDIR']}
      />
      <Box mt={2} />
      <Box display={step === 1 ? 'block' : 'none'}>
        <FormControl
          text="Debtor Name"
          required
          error={
            formik.touched?.user_data?.debtor_name &&
            Boolean(formik.errors?.user_data?.debtor_name)
          }
          helperText={
            formik.touched?.user_data?.debtor_name
              ? formik.errors?.user_data?.debtor_name
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input Debtor name"
            name="user_data.debtor_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.user_data?.debtor_name}
            error={
              formik.touched?.user_data?.debtor_name &&
              Boolean(formik.errors?.user_data?.debtor_name)
            }
          />
        </FormControl>
        <FormControl
          text="Merchant Name"
          required
          error={
            formik.touched?.user_data?.merchant_name &&
            Boolean(formik.errors?.user_data?.merchant_name)
          }
          helperText={
            formik.touched?.user_data?.merchant_name
              ? formik.errors?.user_data?.merchant_name
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input merchant name"
            name="user_data.merchant_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.user_data?.merchant_name}
            error={
              formik.touched?.user_data?.merchant_name &&
              Boolean(formik.errors?.user_data?.merchant_name)
            }
          />
        </FormControl>
        <FormControl
          text="Phone Number"
          required
          error={
            formik.touched?.user_data?.phone_number &&
            Boolean(formik.errors?.user_data?.phone_number)
          }
          helperText={
            formik.touched?.user_data?.phone_number
              ? formik.errors?.user_data?.phone_number
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input phone number"
            name="user_data.phone_number"
            onBlur={(e) => {
              formik.handleBlur(e);
            }}
            value={formik.values.user_data?.phone_number}
            error={
              formik.touched?.user_data?.phone_number &&
              Boolean(formik.errors?.user_data?.phone_number)
            }
            onChange={(e) => {
              let { value } = e.target;
              if (value[0] === '0') value = value.replace('0', '');
              formik.setFieldValue(
                'user_data.phone_number',
                value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'),
              );
            }}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+62</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl
          text="Family Name"
          error={
            formik.touched?.user_data?.relatives_name &&
            Boolean(formik.errors?.user_data?.relatives_name)
          }
          helperText={
            formik.touched?.user_data?.relatives_name &&
            formik.errors?.user_data?.relatives_name &&
            `${formik.errors?.user_data?.relatives_name}`
          }
        >
          <TextField
            fullWidth
            placeholder="Insert Family Name"
            value={formik.values.user_data?.relatives_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="user_data.relatives_name"
          />
        </FormControl>
        <FormControl
          text="Family Relation Name"
          error={
            formik.touched?.user_data?.relatives_relation &&
            Boolean(formik.errors?.user_data?.relatives_relation)
          }
          helperText={
            formik.touched?.user_data?.relatives_relation &&
            formik.errors?.user_data?.relatives_relation &&
            `${formik.errors?.user_data?.relatives_relation}`
          }
        >
          <TextField
            fullWidth
            placeholder="Insert Relation Name"
            value={formik.values.user_data?.relatives_relation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="user_data.relatives_relation"
          />
        </FormControl>
        <FormControl
          text="Family Number"
          required
          error={
            formik.touched?.user_data?.family_phone_number &&
            Boolean(formik.errors?.user_data?.family_phone_number)
          }
          helperText={
            formik.touched?.user_data?.family_phone_number
              ? formik.errors?.user_data?.family_phone_number
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input family phone number"
            name="user_data.family_phone_number"
            onBlur={(e) => {
              formik.handleBlur(e);
            }}
            value={formik.values.user_data?.family_phone_number}
            error={
              formik.touched?.user_data?.family_phone_number &&
              Boolean(formik.errors?.user_data?.family_phone_number)
            }
            onChange={(e) => {
              let { value } = e.target;
              if (value[0] === '0') value = value.replace('0', '');
              formik.setFieldValue(
                'user_data.family_phone_number',
                value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'),
              );
            }}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+62</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl
          text="Area"
          error={
            formik.touched?.user_data?.area &&
            Boolean(formik.errors?.user_data?.area)
          }
          helperText={
            formik.touched?.user_data?.area
              ? formik.errors?.user_data?.area
              : ''
          }
        >
          <Autocomplete
            options={
              areaQuery.data?.data.map((val) => ({
                id: val.id,
                name: val.title,
              })) || []
            }
            noOptionsText={
              !areaParams.searchValue ? 'Type to search area' : 'No option'
            }
            inputValue={areaParams.searchValue}
            onInputChange={(_, newInputValue) => {
              areaParams.handleSearch(newInputValue);
            }}
            loading={areaQuery.isFetching}
            getOptionLabel={(item) => item.name}
            value={formik.values.user_data?.area}
            onChange={(e, value) =>
              formik.setFieldValue('user_data.area', value)
            }
            onBlur={() => {
              formik.setFieldTouched('user_data.area');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="user_data.area"
                placeholder="Example: Pasar Modern BSD"
                error={
                  formik.touched?.user_data?.area &&
                  Boolean(formik.errors?.user_data?.area)
                }
              />
            )}
          />
        </FormControl>
        {/* @ts-ignore */}
        {formik.values.user_data?.area?.id === 1 && (
          <FormControl
            text="Area Name"
            required
            error={
              formik.touched?.user_data?.area_name &&
              Boolean(formik.errors?.user_data?.area_name)
            }
            helperText={
              formik.touched?.user_data?.area_name
                ? formik.errors?.user_data?.area_name
                : ''
            }
          >
            <TextField
              fullWidth
              placeholder="Input Area Name"
              name="user_data.area_name"
              onBlur={formik.handleBlur}
              value={formik.values.user_data?.area_name}
              onChange={formik.handleChange}
              error={
                formik.touched?.user_data?.area_name &&
                Boolean(formik.errors?.user_data?.area_name)
              }
            />
          </FormControl>
        )}
        <FormControl
          text="Category"
          error={
            formik.touched?.user_data?.category_jelajah &&
            Boolean(formik.errors?.user_data?.category_jelajah)
          }
          helperText={
            formik.touched?.user_data?.category_jelajah
              ? formik.errors?.user_data?.category_jelajah
              : ''
          }
        >
          <Autocomplete
            options={
              categoryQuery.data?.data.map((val) => ({
                id: val.id,
                name: decodeURIComponent(val.name),
              })) || []
            }
            noOptionsText={
              !categoryParams.searchValue
                ? 'Type to search category'
                : 'No option'
            }
            inputValue={categoryParams.searchValue}
            onInputChange={(_, newInputValue) => {
              categoryParams.handleSearch(newInputValue);
            }}
            loading={categoryQuery.isFetching}
            getOptionLabel={(item) => item.name}
            value={formik.values.user_data?.category_jelajah}
            onChange={(e, value) =>
              formik.setFieldValue('user_data.category_jelajah', value)
            }
            onBlur={() => {
              formik.setFieldTouched('user_data.category_jelajah');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="user_data.category_jelajah"
                placeholder="Example: Pasar Modern BSD"
                error={
                  formik.touched?.user_data?.category_jelajah &&
                  Boolean(formik.errors?.user_data?.category_jelajah)
                }
              />
            )}
          />
        </FormControl>
        <FormControl
          text="Business lifetime"
          required
          error={
            formik.touched?.user_data?.business_lifetime &&
            Boolean(formik.errors?.user_data?.business_lifetime)
          }
          helperText={
            formik.touched?.user_data?.business_lifetime
              ? formik.errors?.user_data?.business_lifetime
              : ''
          }
        >
          <DesktopDatePicker
            maxDate={moment()}
            open={openCalender.open}
            onOpen={() => {
              formik.setFieldTouched('user_data.business_lifetime');
            }}
            onClose={openCalender.closeModal}
            onChange={(value) => {
              formik.setFieldValue(
                'user_data.business_lifetime',
                value?.unix(),
              );
            }}
            value={
              formik.values.user_data?.business_lifetime
                ? moment.unix(
                    // @ts-ignore
                    formik.values.user_data?.business_lifetime || moment.unix(),
                  )
                : null
            }
            // slotProps={{
            //   textField: {
            //     fullWidth: true,
            //     onBlur: () => {
            //       formik.setFieldTouched('business_lifetime');
            //     },
            //   },
            // }}
            // onClose={openDateSelect.toggleModal}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  onClick={openCalender.toggleModal}
                  name="user_data.business_lifetime"
                  onBlur={formik.handleBlur}
                  placeholder="Select Grade"
                  variant="outlined"
                  fullWidth
                  // onClick={openDateSelect.toggleModal}
                />
              );
            }}
          />
        </FormControl>
        <FormControl
          text="User type"
          required
          error={
            formik.touched?.user_data?.user_type_id &&
            Boolean(formik.errors?.user_data?.user_type_id)
          }
          helperText={
            formik.touched?.user_data?.user_type_id
              ? formik.errors?.user_data?.user_type_id
              : ''
          }
        >
          <Autocomplete
            options={Object.keys(Type)}
            // @ts-ignore
            getOptionLabel={(item) => Type[item]}
            value={formik.values.user_data?.user_type_id}
            onChange={(e, value) => {
              formik.setFieldValue(
                'user_data.user_type_id',
                parseInt(value || '1'),
              );
            }}
            onBlur={() => {
              formik.setFieldTouched('user_data.user_type_id');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="user_data.user_type_id"
                placeholder="Select user type"
                error={
                  formik.touched?.user_data?.user_type_id &&
                  Boolean(formik.errors?.user_data?.user_type_id)
                }
              />
            )}
          />
        </FormControl>
        <FormControl text="Merchant Titipku">
          <Autocomplete
            options={['Yes', 'No']}
            // @ts-ignore
            value={formik.values.user_data?.is_merchant_titipku ? 'Yes' : 'No'}
            onChange={(e, value) => {
              formik.setFieldValue(
                'user_data.is_merchant_titipku',
                value === 'Yes',
              );
            }}
            onBlur={() => {
              formik.setFieldTouched('user_data.is_merchant_titipku');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="user_data.is_merchant_titipku"
                placeholder="Select user type"
                error={
                  formik.touched?.user_data?.is_merchant_titipku &&
                  Boolean(formik.errors?.user_data?.is_merchant_titipku)
                }
              />
            )}
          />
        </FormControl>
        <FormControl
          text="Destination Bank"
          error={
            formik.touched?.user_data?.bank_name &&
            Boolean(formik.errors?.user_data?.bank_name)
          }
          helperText={
            formik.touched?.user_data?.bank_name &&
            formik.errors?.user_data?.bank_name &&
            `${formik.errors?.user_data?.bank_name}`
          }
        >
          <Autocomplete
            data-testid="form-customer-list-bank"
            id="list-bank"
            options={bankData.data}
            onChange={(e, value) => {
              formik.setFieldValue('user_data.bank_name', value?.code);
            }}
            isOptionEqualToValue={(option: { name: string; code: string }) => {
              // @ts-ignore
              return option.name === formik.values.user_data?.bank_name?.name;
            }}
            getOptionLabel={(option) => `${option.name}`}
            value={
              bankData.data.find(
                (val) => val.code === formik.values.user_data?.bank_name,
              ) || null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name="user_data.bank_name"
                onBlur={formik.handleBlur}
                placeholder="Seleck bank"
              />
            )}
          />
        </FormControl>
        <FormControl
          text="Branch Bank Name"
          error={
            formik.touched?.user_data?.bank_branch_name &&
            Boolean(formik.errors?.user_data?.bank_branch_name)
          }
          helperText={
            formik.touched?.user_data?.bank_branch_name &&
            formik.errors?.user_data?.bank_branch_name &&
            `${formik.errors?.user_data?.bank_branch_name}`
          }
        >
          <TextField
            fullWidth
            placeholder="Insert branch bank"
            value={formik.values.user_data?.bank_branch_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="user_data.bank_branch_name"
          />
        </FormControl>
        <FormControl
          text="Destination Bank Account"
          error={
            formik.touched?.user_data?.bank_account &&
            Boolean(formik.errors?.user_data?.bank_account)
          }
          helperText={
            formik.touched?.user_data?.bank_account &&
            formik.errors?.user_data?.bank_account &&
            `${formik.errors?.user_data?.bank_account}`
          }
        >
          <TextField
            fullWidth
            placeholder="Insert destination bank"
            value={formik.values.user_data?.bank_account}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="user_data.bank_account"
          />
        </FormControl>
        <FormControl
          text="Destination Bank Account Name"
          error={
            formik.touched?.user_data?.bank_account_name &&
            Boolean(formik.errors?.user_data?.bank_account_name)
          }
          helperText={
            formik.touched?.user_data?.bank_account_name &&
            formik.errors?.user_data?.bank_account_name &&
            `${formik.errors?.user_data?.bank_account_name}`
          }
        >
          <TextField
            fullWidth
            placeholder="Insert destination bank name"
            value={formik.values.user_data?.bank_account_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="user_data.bank_account_name"
          />
        </FormControl>
        <FormControl
          text="Limit request plafon"
          required
          error={
            formik.touched?.user_data?.limit_request_plafon &&
            Boolean(formik.errors?.user_data?.limit_request_plafon)
          }
          helperText={
            formik.touched?.user_data?.limit_request_plafon
              ? formik.errors?.user_data?.limit_request_plafon
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input request plafo"
            name="user_data.limit_request_plafon"
            onBlur={formik.handleBlur}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
            }
            error={
              formik.touched?.user_data?.limit_request_plafon &&
              Boolean(formik.errors?.user_data?.limit_request_plafon)
            }
            value={numberSeperator(
              formik.values.user_data?.limit_request_plafon,
            )}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue(
                'user_data.limit_request_plafon',
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
            formik.touched?.user_data?.limit_request_cash &&
            Boolean(formik.errors?.user_data?.limit_request_cash)
          }
          helperText={
            formik.touched?.user_data?.limit_request_cash
              ? formik.errors?.user_data?.limit_request_cash
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input limit cash"
            name="user_data.limit_request_cash"
            onBlur={formik.handleBlur}
            value={numberSeperator(formik.values.user_data?.limit_request_cash)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue(
                'user_data.limit_request_cash',
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
          text="Disburse Date"
          required
          error={
            formik.touched?.user_data?.disburse_date &&
            Boolean(formik.errors?.user_data?.disburse_date)
          }
          helperText={
            formik.touched?.user_data?.disburse_date
              ? formik.errors?.user_data?.disburse_date
              : ''
          }
        >
          <DesktopDatePicker
            maxDate={moment()}
            open={openCalenderDisburse.open}
            onOpen={() => {
              formik.setFieldTouched('user_data.disburse_date');
            }}
            onClose={openCalenderDisburse.closeModal}
            onChange={(value) => {
              formik.setFieldValue('user_data.disburse_date', value?.unix());
            }}
            value={
              formik.values.user_data?.disburse_date
                ? moment.unix(
                    // @ts-ignore
                    formik.values.user_data?.disburse_date || moment.unix(),
                  )
                : null
            }
            // slotProps={{
            //   textField: {
            //     fullWidth: true,
            //     onBlur: () => {
            //       formik.setFieldTouched('disburse_date');
            //     },
            //   },
            // }}
            // onClose={openDateSelect.toggleModal}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  onClick={openCalenderDisburse.toggleModal}
                  name="user_data.disburse_date"
                  onBlur={formik.handleBlur}
                  placeholder="Select Grade"
                  variant="outlined"
                  fullWidth
                  // onClick={openDateSelect.toggleModal}
                />
              );
            }}
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
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <SwitchCostum
            checked={formik.values.user_data?.has_qris}
            name="user_data.has_qris"
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.handleChange(e);
            }}
          />
        </FormControl>
      </Box>
      <Box display={step === 2 ? 'block' : 'none'}>
        <Typography fontWeight="500">
          1. Pembelian dan Pendapatan Hasil Lapak
        </Typography>
        <Box pl={2} pb={2} mb={2} borderBottom="1px solid #cecece">
          <FormControl
            styleText={{ fontWeight: 400, color: 'rgba(0,0,0,.6)' }}
            text="Jumlah Pendapatan Per Bulan"
            required
            error={
              formik.touched.idir_data?.gmv &&
              Boolean(formik.errors.idir_data?.gmv)
            }
            helperText={
              formik.touched.idir_data?.gmv ? formik.errors.idir_data?.gmv : ''
            }
          >
            <TextField
              fullWidth
              placeholder="Input Jumlah Pendapatan Per Bulan"
              name="idir_data.gmv"
              onBlur={formik.handleBlur}
              value={numberSeperator(formik.values.idir_data?.gmv)}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue('idir_data.gmv', parseInt(value || '0'));
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
            styleText={{ fontWeight: 400, color: 'rgba(0,0,0,.6)' }}
            text="Jumlah Pembelian atau Stock Lapak Per Bulan"
          >
            <TextField
              fullWidth
              placeholder="Input Jumlah Pembelian atau Stock Lapak Per Bulan"
              name="idir_data.purchase"
              onBlur={formik.handleBlur}
              value={numberSeperator(formik.values.idir_data?.purchase)}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue(
                  'idir_data.purchase',
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
          <TextField
            fullWidth
            label="Jumlah Pendapatan Lapak"
            placeholder="Input Jumlah Pendapatan Lapak"
            name="idir_data.purchase"
            value={numberSeperator(totalIncome)}
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
          />
        </Box>
        <Typography fontWeight="500">
          2. Jumlah Pengeluaran Penunjang Usaha dan Hidup Per Bulan
        </Typography>
        <Box pl={2} pb={2} mb={2} borderBottom="1px solid #cecece">
          <FormControl
            styleText={{ fontWeight: 400, color: 'rgba(0,0,0,.6)' }}
            text="Biaya Operasional Tempat Usaha (Listrik Kios, Transportasi, Sewa Lapak) Per Bulan"
            required
            error={
              formik.touched.idir_data?.operational_expense &&
              Boolean(formik.errors.idir_data?.operational_expense)
            }
            helperText={
              formik.touched.idir_data?.operational_expense
                ? formik.errors.idir_data?.operational_expense
                : ''
            }
          >
            <TextField
              fullWidth
              placeholder="Input operational expense"
              name="idir_data.operational_expense"
              onBlur={formik.handleBlur}
              value={numberSeperator(
                formik.values.idir_data?.operational_expense,
              )}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue(
                  'idir_data.operational_expense',
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
            styleText={{ fontWeight: 400, color: 'rgba(0,0,0,.6)' }}
            text="Total Biaya Rumah Tangga (Pendidikan, Konsumsi,  Listrik, Air, Pulsa / Internet) Per Bulan"
            required
            error={
              formik.touched.idir_data?.household_expense &&
              Boolean(formik.errors.idir_data?.household_expense)
            }
            helperText={
              formik.touched.idir_data?.household_expense
                ? formik.errors.idir_data?.household_expense
                : ''
            }
          >
            <TextField
              fullWidth
              placeholder="Input household expense"
              name="idir_data.household_expense"
              onBlur={formik.handleBlur}
              value={numberSeperator(
                formik.values.idir_data?.household_expense,
              )}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue(
                  'idir_data.household_expense',
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
            styleText={{ fontWeight: 400, color: 'rgba(0,0,0,.6)' }}
            text="Total Biaya di Luar Rumah Tangga (Iuran sekitar tempat tinggal, arisan) Per Bulan"
            required
            error={
              formik.touched.idir_data?.another_expense &&
              Boolean(formik.errors.idir_data?.another_expense)
            }
            helperText={
              formik.touched.idir_data?.another_expense
                ? formik.errors.idir_data?.another_expense
                : ''
            }
          >
            <TextField
              fullWidth
              placeholder="Input Another expense"
              name="idir_data.another_expense"
              onBlur={formik.handleBlur}
              value={numberSeperator(formik.values.idir_data?.another_expense)}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue(
                  'idir_data.another_expense',
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
            styleText={{ fontWeight: 400, color: 'rgba(0,0,0,.6)' }}
            text="Angsuran di Bank/ BPR/ Fintech/ Leasing, dll. Per Bulan"
            required
            error={
              formik.touched.idir_data?.another_loan &&
              Boolean(formik.errors.idir_data?.another_loan)
            }
            helperText={
              formik.touched.idir_data?.another_loan
                ? formik.errors.idir_data?.another_loan
                : ''
            }
          >
            <TextField
              fullWidth
              placeholder="Input Another loan"
              name="idir_data.another_loan"
              onBlur={formik.handleBlur}
              value={numberSeperator(formik.values.idir_data?.another_loan)}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue(
                  'idir_data.another_loan',
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
          <TextField
            fullWidth
            label="Jumlah Biaya Pengeluaran "
            placeholder="Input Purchase"
            name="idir_data.purchase"
            value={numberSeperator(totalExpenses)}
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
          />
        </Box>
        <Typography fontWeight="500">3. Perhitungan Pengajuan</Typography>
        <Box pl={2} pb={2} mb={2} borderBottom="1px solid #cecece">
          <FormControl
            styleText={{ fontWeight: 400, color: 'rgba(0,0,0,.6)' }}
            text="Jumlah Limit Belanja yang Diajukan"
            required
            error={
              formik.touched.idir_data?.requested_limit &&
              Boolean(formik.errors.idir_data?.requested_limit)
            }
            helperText={
              formik.touched.idir_data?.requested_limit
                ? formik.errors.idir_data?.requested_limit
                : ''
            }
          >
            <TextField
              fullWidth
              placeholder="Input Requested Limit"
              name="idir_data.requested_limit"
              onBlur={formik.handleBlur}
              value={numberSeperator(formik.values.idir_data?.requested_limit)}
              onChange={(e) => {
                const value = e.target.value
                  // @ts-ignore
                  .replaceAll('.', '')
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                formik.setFieldValue(
                  'idir_data.requested_limit',
                  parseInt(value || '0'),
                );

                /// agreed_fee
                formik.setFieldValue(
                  'idir_data.agreed_fee',
                  parseInt(value || '0') * 0.03,
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
          <Box my={2}>
            <TextField
              label="Total kewajiaban ke Titipku yang disanggupi"
              variant="filled"
              fullWidth
              placeholder="Input Agreed Fee"
              name="idir_data.agreed_fee"
              onBlur={formik.handleBlur}
              value={numberSeperator(formik.values.idir_data?.agreed_fee)}
              // onChange={(e) => {
              //   const value = e.target.value
              //     // @ts-ignore
              //     .replaceAll('.', '')
              //     .replace(/[^0-9.]/g, '')
              //     .replace(/(\..*?)\..*/g, '$1');

              //   formik.setFieldValue(
              //     'idir_data.agreed_fee',
              //     parseInt(value || '0'),
              //   );
              // }}
              onKeyDown={(evt) =>
                ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">Note: 3%</InputAdornment>
                ),
              }}
            />
          </Box>
          <Box my={1}>
            <TextField
              label="Total Pendapatan Bersih (Asumsi sudah dibebani admin fee Titipku)"
              variant="filled"
              fullWidth
              placeholder="Input Net Income"
              name="idir_data.net_income"
              onBlur={formik.handleBlur}
              value={numberSeperator(totalNetIncome)}
              // onChange={(e) => {
              //   const value = e.target.value
              //     // @ts-ignore
              //     .replaceAll('.', '')
              //     .replace(/[^0-9.]/g, '')
              //     .replace(/(\..*?)\..*/g, '$1');

              //   formik.setFieldValue(
              //     'idir_data.net_income',
              //     parseInt(value || '0'),
              //   );
              // }}
              onKeyDown={(evt) =>
                ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
            />
          </Box>
          <Box my={2}>
            <TextField
              label="Total IDIR (harus dibawah 60%)"
              fullWidth
              variant="filled"
              placeholder="Input IDIR Score"
              name="idir_data.idir_score"
              onBlur={formik.handleBlur}
              value={scoreIdir}
              // onChange={(e) => {
              //   const value = e.target.value
              //     // @ts-ignore
              //     .replaceAll('.', '')
              //     .replace(/[^0-9.]/g, '')
              //     .replace(/(\..*?)\..*/g, '$1');

              //   formik.setFieldValue(
              //     'idir_data.idir_score',
              //     parseInt(value || '0'),
              //   );
              // }}
              onKeyDown={(evt) =>
                ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
              }
            />
          </Box>
        </Box>
        <FormControl
          styleText={{ fontWeight: 400, color: 'rgba(0,0,0,.6)' }}
          text="IDIR notes"
          error={
            formik.touched.idir_data?.idir_notes &&
            Boolean(formik.errors.idir_data?.idir_notes)
          }
          helperText={
            formik.touched.idir_data?.idir_notes
              ? formik.errors.idir_data?.idir_notes
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input IDIR notes"
            name="idir_data.idir_notes"
            onBlur={formik.handleBlur}
            value={formik.values.idir_data?.idir_notes}
            onChange={formik.handleChange}
            multiline
            rows={4}
          />
        </FormControl>
      </Box>
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button variant="text" color="error" onClick={backButton().onClick}>
          {backButton().label}
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={nextButton()?.disabled}
          onClick={nextButton().onClick}
        >
          {nextButton().label}
        </Button>
      </Stack>
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
