/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { useEffect, useState } from 'react';
import {
  Box,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Autocomplete,
  Stack,
  Button,
} from '@mui/material';
import FormControl from 'components/FormLabel';
import numberSeperator from 'utils/numberSeperator';
import UseParams from 'hooks/useParams';
import { useQuery } from '@tanstack/react-query';
import {
  getAllAreaFinancing,
  getAllCategoryFinancing,
} from 'service/Finance/config';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import useModal from 'hooks/useModal';
import InputImage from 'components/InputImage';
import { useCreateCustomer, useCustomerDetails } from '../../hooks/useCustomer';
import { step1Key, step2Key, Type } from '../../hooks/constumer.config';
import { SteperHeader } from './SteperHeader';

export default function FormCustomer({
  id,
  handleClose,
}: {
  id?: string | number;
  handleClose: (isSubmited: boolean) => void;
}) {
  const openCalender = useModal();
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
  const formik = useCreateCustomer({
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
          onClick: () => setStep(step + 1),
          disabled: step1Key
            .map((val) => Object.keys(formik.errors).includes(val))
            .includes(true),
        };
      case 2:
        return {
          label: 'Next',
          onClick: () => setStep(step + 1),
          disabled: step2Key
            .map((val) => Object.keys(formik.errors).includes(val))
            .includes(true),
        };
      case 3:
        return {
          label: 'Submit',
          onClick: () => {
            // console.log(formik.errors);
            // onCancelRef.current = true;
            formik.handleSubmit();
          },
          disabled: !formik.isValid,
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

  return (
    <Box p="24px">
      <div id="top" />
      <SteperHeader
        currentStep={step}
        stepList={['Basic Info', 'IDIR', 'Documents']}
      />

      <Box mt={2} />
      <Box display={step === 1 ? 'block' : 'none'}>
        <FormControl
          text="Debtor Name"
          required
          error={
            formik.touched.debtor_name && Boolean(formik.errors.debtor_name)
          }
          helperText={
            formik.touched.debtor_name ? formik.errors.debtor_name : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input Debtor name"
            name="debtor_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.debtor_name}
            error={
              formik.touched.debtor_name && Boolean(formik.errors.debtor_name)
            }
          />
        </FormControl>
        <FormControl
          text="Merchant Name"
          required
          error={
            formik.touched.merchant_name && Boolean(formik.errors.merchant_name)
          }
          helperText={
            formik.touched.merchant_name ? formik.errors.merchant_name : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input merchant name"
            name="merchant_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.merchant_name}
            error={
              formik.touched.merchant_name &&
              Boolean(formik.errors.merchant_name)
            }
          />
        </FormControl>
        <FormControl
          text="Phone Number"
          required
          error={
            formik.touched.phone_number && Boolean(formik.errors.phone_number)
          }
          helperText={
            formik.touched.phone_number ? formik.errors.phone_number : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input phone number"
            name="phone_number"
            onBlur={(e) => {
              formik.handleBlur(e);
            }}
            value={formik.values.phone_number}
            error={
              formik.touched.phone_number && Boolean(formik.errors.phone_number)
            }
            onChange={(e) => {
              let { value } = e.target;
              if (value[0] === '0') value = value.replace('0', '');
              formik.setFieldValue(
                'phone_number',
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
          text="Family Number"
          required
          error={
            formik.touched.family_phone_number &&
            Boolean(formik.errors.family_phone_number)
          }
          helperText={
            formik.touched.family_phone_number
              ? formik.errors.family_phone_number
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input family phone number"
            name="family_phone_number"
            onBlur={(e) => {
              formik.handleBlur(e);
            }}
            value={formik.values.family_phone_number}
            error={
              formik.touched.family_phone_number &&
              Boolean(formik.errors.family_phone_number)
            }
            onChange={(e) => {
              let { value } = e.target;
              if (value[0] === '0') value = value.replace('0', '');
              formik.setFieldValue(
                'family_phone_number',
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
          error={formik.touched.area && Boolean(formik.errors.area)}
          helperText={formik.touched.area ? formik.errors.area : ''}
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
            value={formik.values.area}
            onChange={(e, value) => formik.setFieldValue('area', value)}
            onBlur={() => {
              formik.setFieldTouched('area');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="area"
                placeholder="Example: Pasar Modern BSD"
                error={formik.touched.area && Boolean(formik.errors.area)}
              />
            )}
          />
        </FormControl>
        <FormControl
          text="Category"
          error={
            formik.touched.category_jelajah &&
            Boolean(formik.errors.category_jelajah)
          }
          helperText={
            formik.touched.category_jelajah
              ? formik.errors.category_jelajah
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
            value={formik.values.category_jelajah}
            onChange={(e, value) =>
              formik.setFieldValue('category_jelajah', value)
            }
            onBlur={() => {
              formik.setFieldTouched('category_jelajah');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="category_jelajah"
                placeholder="Example: Pasar Modern BSD"
                error={
                  formik.touched.category_jelajah &&
                  Boolean(formik.errors.category_jelajah)
                }
              />
            )}
          />
        </FormControl>
        <FormControl
          text="Business lifetime"
          required
          error={
            formik.touched.business_lifetime &&
            Boolean(formik.errors.business_lifetime)
          }
          helperText={
            formik.touched.business_lifetime
              ? formik.errors.business_lifetime
              : ''
          }
        >
          <DesktopDatePicker
            maxDate={moment()}
            open={openCalender.open}
            onOpen={() => {
              formik.setFieldTouched('business_lifetime');
            }}
            onClose={openCalender.closeModal}
            onChange={(value) => {
              formik.setFieldValue('business_lifetime', value?.unix());
            }}
            value={moment.unix(
              // @ts-ignore
              formik.values.business_lifetime || moment.unix(),
            )}
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
                  name="business_lifetime"
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
            formik.touched.user_type_id && Boolean(formik.errors.user_type_id)
          }
          helperText={
            formik.touched.user_type_id ? formik.errors.user_type_id : ''
          }
        >
          <Autocomplete
            options={Object.keys(Type)}
            // @ts-ignore
            getOptionLabel={(item) => Type[item]}
            value={formik.values.user_type_id}
            onChange={(e, value) => {
              formik.setFieldValue('user_type_id', value);
            }}
            onBlur={() => {
              formik.setFieldTouched('user_type_id');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="user_type_id"
                placeholder="Select user type"
                error={
                  formik.touched.user_type_id &&
                  Boolean(formik.errors.user_type_id)
                }
              />
            )}
          />
        </FormControl>
        <FormControl text="Merchant Titipku">
          <Autocomplete
            options={['Yes', 'No']}
            // @ts-ignore
            value={formik.values.is_merchant_titipku ? 'Yes' : 'No'}
            onChange={(e, value) => {
              formik.setFieldValue('is_merchant_titipku', value === 'Yes');
            }}
            onBlur={() => {
              formik.setFieldTouched('is_merchant_titipku');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="is_merchant_titipku"
                placeholder="Select user type"
                error={
                  formik.touched.is_merchant_titipku &&
                  Boolean(formik.errors.is_merchant_titipku)
                }
              />
            )}
          />
        </FormControl>
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
      <Box display={step === 2 ? 'block' : 'none'}>
        <FormControl
          text="GVM"
          required
          error={formik.touched.gmv && Boolean(formik.errors.gmv)}
          helperText={formik.touched.gmv ? formik.errors.gmv : ''}
        >
          <TextField
            fullWidth
            placeholder="Input GVM"
            name="gmv"
            onBlur={formik.handleBlur}
            value={numberSeperator(formik.values.gmv)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('gmv', parseInt(value || '0'));
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
          text="Office Rent"
          required
          error={
            formik.touched.office_rent && Boolean(formik.errors.office_rent)
          }
          helperText={
            formik.touched.office_rent ? formik.errors.office_rent : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input office rent"
            name="office_rent"
            onBlur={formik.handleBlur}
            value={numberSeperator(formik.values.office_rent)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('office_rent', parseInt(value || '0'));
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
          text="Electricity"
          required
          error={
            formik.touched.electricity && Boolean(formik.errors.electricity)
          }
          helperText={
            formik.touched.electricity ? formik.errors.electricity : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input Electricity"
            name="electricity"
            onBlur={formik.handleBlur}
            value={numberSeperator(formik.values.electricity)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('electricity', parseInt(value || '0'));
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
          text="Education Expenses"
          required
          error={
            formik.touched.education_expenses &&
            Boolean(formik.errors.education_expenses)
          }
          helperText={
            formik.touched.education_expenses
              ? formik.errors.education_expenses
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input education expenses"
            name="education_expenses"
            onBlur={formik.handleBlur}
            value={numberSeperator(formik.values.education_expenses)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue(
                'education_expenses',
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
          text="Household Expenses"
          required
          error={
            formik.touched.household_expenses &&
            Boolean(formik.errors.household_expenses)
          }
          helperText={
            formik.touched.household_expenses
              ? formik.errors.household_expenses
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input household expenses"
            name="household_expenses"
            onBlur={formik.handleBlur}
            value={numberSeperator(formik.values.household_expenses)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue(
                'household_expenses',
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
          text="Employee Expenses"
          required
          error={
            formik.touched.employee_expenses &&
            Boolean(formik.errors.employee_expenses)
          }
          helperText={
            formik.touched.employee_expenses
              ? formik.errors.employee_expenses
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input employee expenses"
            name="employee_expenses"
            onBlur={formik.handleBlur}
            value={numberSeperator(formik.values.employee_expenses)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('employee_expenses', parseInt(value || '0'));
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
          text="Another Loan"
          required
          error={
            formik.touched.another_loan && Boolean(formik.errors.another_loan)
          }
          helperText={
            formik.touched.another_loan ? formik.errors.another_loan : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input another loan"
            name="another_loan"
            onBlur={formik.handleBlur}
            value={numberSeperator(formik.values.another_loan)}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('another_loan', parseInt(value || '0'));
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
          text="Cash Out Purpose"
          required
          error={
            formik.touched.cash_out_purpose &&
            Boolean(formik.errors.cash_out_purpose)
          }
          helperText={
            formik.touched.cash_out_purpose
              ? formik.errors.cash_out_purpose
              : ''
          }
        >
          <TextField
            fullWidth
            placeholder="Input Cash Out Purpose"
            name="cash_out_purpose"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cash_out_purpose}
            error={
              formik.touched.cash_out_purpose &&
              Boolean(formik.errors.cash_out_purpose)
            }
          />
        </FormControl>
      </Box>
      <Box display={step === 3 ? 'block' : 'none'}>
        <FormControl
          text="NIK"
          required
          error={formik.touched.nik && Boolean(formik.errors.nik)}
          helperText={formik.touched.nik ? formik.errors.nik : ''}
        >
          <TextField
            fullWidth
            placeholder="Input NIK"
            name="nik"
            onBlur={formik.handleBlur}
            value={formik.values.nik}
            onChange={(e) => {
              const value = e.target.value
                // @ts-ignore
                .replaceAll('.', '')
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('nik', value);
            }}
            onKeyDown={(evt) =>
              ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
            }
          />
        </FormControl>
        <FormControl
          text="KTP"
          required
          error={Boolean(formik.errors.nik_image)}
          helperText={formik.errors.nik_image}
        >
          <InputImage
            label="an Image"
            value={formik.values.nik_image}
            onChange={(e: any) => formik.setFieldValue('nik_image', e)}
            onClear={() => formik.setFieldValue('nik_image', null)}
            // width={720}
            // height={720}
          />
        </FormControl>
        <FormControl
          text="NPWP"
          required
          error={formik.touched.npwp && Boolean(formik.errors.npwp)}
          helperText={formik.touched.npwp ? formik.errors.npwp : ''}
        >
          <TextField
            fullWidth
            placeholder="Input npwp"
            name="npwp"
            onBlur={formik.handleBlur}
            value={formik.values.npwp}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl
          text="NPWP"
          required
          error={Boolean(formik.errors.npwp_image)}
          helperText={formik.errors.npwp_image}
        >
          <InputImage
            label="an Image"
            value={formik.values.npwp_image}
            onChange={(e: any) => formik.setFieldValue('npwp_image', e)}
            onClear={() => formik.setFieldValue('npwp_image', null)}
            // width={720}
            // height={720}
          />
        </FormControl>
        <FormControl
          text="NIB"
          required
          error={formik.touched.nib && Boolean(formik.errors.nib)}
          helperText={formik.touched.nib ? formik.errors.nib : ''}
        >
          <TextField
            fullWidth
            placeholder="Input NIB"
            name="nib"
            onBlur={formik.handleBlur}
            value={formik.values.nib}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl
          text="NIB"
          required
          error={Boolean(formik.errors.nib_image)}
          helperText={formik.errors.nib_image}
        >
          <InputImage
            label="an Image"
            value={formik.values.nib_image}
            onChange={(e: any) => formik.setFieldValue('nib_image', e)}
            onClear={() => formik.setFieldValue('nib_image', null)}
            // width={720}
            // height={720}
          />
        </FormControl>
        <FormControl
          text="SKU"
          required
          error={Boolean(formik.errors.sku_image)}
          helperText={formik.errors.sku_image}
        >
          <InputImage
            label="an Image"
            value={formik.values.sku_image}
            onChange={(e: any) => formik.setFieldValue('sku_image', e)}
            onClear={() => formik.setFieldValue('sku_image', null)}
            // width={720}
            // height={720}
          />
        </FormControl>
        <FormControl
          text="Merriage Status"
          required
          error={
            formik.touched.marriage_status &&
            Boolean(formik.errors.marriage_status)
          }
          helperText={
            formik.touched.marriage_status ? formik.errors.marriage_status : ''
          }
        >
          <Autocomplete
            options={['kawin', 'belum kawin', 'cerai']}
            // @ts-ignore
            value={formik.values.marriage_status}
            getOptionLabel={(item) => item?.toUpperCase()}
            onChange={(e, value) => {
              formik.setFieldValue('marriage_status', value);
            }}
            onBlur={() => {
              formik.setFieldTouched('marriage_status');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="marriage_status"
                placeholder="Select user type"
                error={
                  formik.touched.marriage_status &&
                  Boolean(formik.errors.marriage_status)
                }
              />
            )}
          />
        </FormControl>
        {formik.values.marriage_status === 'cerai' && (
          <>
            <FormControl
              text="Divorce Papers"
              required
              error={
                formik.touched.divorce_papers &&
                Boolean(formik.errors.divorce_papers)
              }
              helperText={
                formik.touched.divorce_papers
                  ? formik.errors.divorce_papers
                  : ''
              }
            >
              <TextField
                fullWidth
                placeholder="Input divorce papers"
                name="divorce_papers"
                onBlur={formik.handleBlur}
                value={formik.values.divorce_papers}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl
              text="Divorce Paper"
              required
              error={Boolean(formik.errors.divorce_papers_image)}
              helperText={formik.errors.divorce_papers_image}
            >
              <InputImage
                label="an Image"
                value={formik.values.divorce_papers_image}
                onChange={(e: any) =>
                  formik.setFieldValue('divorce_papers_image', e)
                }
                onClear={() =>
                  formik.setFieldValue('divorce_papers_image', null)
                }
                // width={720}
                // height={720}
              />
            </FormControl>
          </>
        )}
        {formik.values.marriage_status === 'kawin' && (
          <>
            <FormControl
              text="Marriage Partner Name"
              required
              error={
                formik.touched.marriage_partner_name &&
                Boolean(formik.errors.marriage_partner_name)
              }
              helperText={
                formik.touched.marriage_partner_name
                  ? formik.errors.marriage_partner_name
                  : ''
              }
            >
              <TextField
                fullWidth
                placeholder="Input marriage partner name"
                name="marriage_partner_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.marriage_partner_name}
                error={
                  formik.touched.marriage_partner_name &&
                  Boolean(formik.errors.marriage_partner_name)
                }
              />
            </FormControl>
            <FormControl
              text="NIK Partner"
              required
              error={
                formik.touched.nik_partner && Boolean(formik.errors.nik_partner)
              }
              helperText={
                formik.touched.nik_partner ? formik.errors.nik_partner : ''
              }
            >
              <TextField
                fullWidth
                placeholder="Input nik partner"
                name="nik_partner"
                onBlur={formik.handleBlur}
                value={formik.values.nik_partner}
                onChange={(e) => {
                  const value = e.target.value
                    // @ts-ignore
                    .replaceAll('.', '')
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\..*/g, '$1');

                  formik.setFieldValue('nik_partner', value);
                }}
                onKeyDown={(evt) =>
                  ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
                }
              />
            </FormControl>
            <FormControl
              text="KTP Partner"
              required
              error={Boolean(formik.errors.nik_partner_image)}
              helperText={formik.errors.nik_partner_image}
            >
              <InputImage
                label="an Image"
                value={formik.values.nik_partner_image}
                onChange={(e: any) =>
                  formik.setFieldValue('nik_partner_image', e)
                }
                onClear={() => formik.setFieldValue('nik_partner_image', null)}
                // width={720}
                // height={720}
              />
            </FormControl>
          </>
        )}
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
