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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormControl from 'components/FormLabel';
import numberSeperator from 'utils/numberSeperator';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import useModal from 'hooks/useModal';
import { useFormik } from 'formik';
import InputImage from 'components/InputImage';
import UseParams from 'hooks/useParams';
import bankData from 'data/list-bank.json';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getAllAreaFinancing,
  getAllCategoryFinancing,
} from 'service/Finance/config';
import { Person } from '@mui/icons-material';
import { postRestructre } from 'service/Finance/invoice';
import * as yup from 'yup';
import useToast from 'hooks/useToast';
import InputFile from 'components/InputFile';
import { SteperHeader } from '../../Customer/Components/SteperHeader';
import useUserMerchant, {
  useUserRemainingBill,
} from '../hooks/useUserMerchant';
import { Type } from '../../hooks/constumer.config';
import { useCustomerDetails } from '../../hooks/useCustomer';
import { UseCategoryRestructure } from '../../hooks/useConfigFinance';

export default function FormFormRestructure({
  id,
  handleClose,
  openModal,
}: {
  id?: string | number;
  handleClose: (isSubmited: boolean) => void;
  openModal?: boolean;
}) {
  const { openToast } = useToast();
  const openCalender = useModal();
  const remainingBill = useUserRemainingBill(id as string);
  const detailQuery = useCustomerDetails(id as string);
  const mutation = useMutation(postRestructre);
  const category = UseCategoryRestructure();

  const formik = useFormik({
    initialValues: {
      loan_amount: '',
      transfer_date: null,
      notes: '',
      installments: null,
      invoice_restructure_category_id: null,
    },
    onSubmit: async (values) => {
      const payload = { ...values };
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const text = e.target.result;
        const rows = text.split('\n');
        const parsedData = rows
          .map((row: any) => {
            return row.split(',').map((cell: any) => cell.trim());
          })
          .filter((_: any, index: number) => index !== 0);
        const installments = parsedData.map((data: any) => ({
          due_date: moment(data[1]).unix(),
          amount: parseInt(data[2]),
        }));

        mutation.mutate(
          {
            userId: id as string,
            data: { ...values, installments },
          },
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
                headMsg: 'Failed update merchant',
              });
            },
          },
        );
      };
      // @ts-ignore
      await reader.readAsText(values.installments);
    },
    validationSchema: yup.object().shape({
      loan_amount: yup
        .number()
        .required('Limit plafon is required')
        .max(2147483647, 'Must be less than or equal to 2147483647')
        .min(1, 'Limit plafon must be greater than 0'),
      transfer_date: yup.mixed().required('Limit cash is required'),
      notes: yup.string(),
      installments: yup.mixed().required('Installments is required'),
    }),
  });

  useEffect(() => {
    if (!openModal) {
      formik.resetForm();
    }
  }, [openModal]);

  // console.log(formik.values.installments)
  return (
    <Box p="24px">
      <div id="top" />
      <Box mt={2} />
      <FormControl text="Merchant">
        <TextField
          fullWidth
          value={`${detailQuery.data?.data.debtor_name} (${detailQuery.data?.data.merchant_name})`}
          disabled
          InputProps={{
            startAdornment: <Person />,
          }}
        />
      </FormControl>
      <FormControl text="Remaining Bill">
        <TextField
          fullWidth
          value={numberSeperator(remainingBill.details)}
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Rp</InputAdornment>
            ),
          }}
        />
      </FormControl>
      <FormControl
        text="Category"
        required
        error={
          formik.touched?.invoice_restructure_category_id &&
          Boolean(formik.errors?.invoice_restructure_category_id)
        }
        helperText={
          formik.touched?.invoice_restructure_category_id
            ? formik.errors?.invoice_restructure_category_id
            : ''
        }
      >
        <Autocomplete
          options={category.listData}
          // @ts-ignore
          getOptionLabel={(item) => item.name}
          value={
            category.listData?.find(
              (val) => val.id === formik.values.invoice_restructure_category_id,
            ) || null
          }
          onChange={(e, value) => {
            formik.setFieldValue(
              'user_data.user_type_id',
              // @ts-ignore
              parseInt(value.id || '1'),
            );
          }}
          onBlur={() => {
            formik.setFieldTouched('user_data.user_type_id');
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="user_data.user_type_id"
              placeholder="Select Category"
              error={
                formik.touched?.invoice_restructure_category_id &&
                Boolean(formik.errors?.invoice_restructure_category_id)
              }
            />
          )}
        />
      </FormControl>
      <FormControl
        text="Loan Amount"
        required
        error={
          formik.touched?.loan_amount && Boolean(formik.errors?.loan_amount)
        }
        helperText={
          formik.touched?.loan_amount ? formik.errors?.loan_amount : ''
        }
      >
        <TextField
          fullWidth
          placeholder="Input Loan Amount"
          name="loan_amount"
          onBlur={formik.handleBlur}
          onKeyDown={(evt) =>
            ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
          }
          error={
            formik.touched?.loan_amount && Boolean(formik.errors?.loan_amount)
          }
          value={numberSeperator(formik.values?.loan_amount || '')}
          onChange={(e) => {
            const value = e.target.value
              // @ts-ignore
              .replaceAll('.', '')
              .replace(/[^0-9.]/g, '')
              .replace(/(\..*?)\..*/g, '$1');

            formik.setFieldValue('loan_amount', parseInt(value || '0'));
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Rp</InputAdornment>
            ),
          }}
        />
      </FormControl>
      <FormControl
        text="Transfer Date"
        required
        error={
          formik.touched?.transfer_date && Boolean(formik.errors?.transfer_date)
        }
        helperText={
          formik.touched?.transfer_date ? formik.errors?.transfer_date : ''
        }
      >
        <DesktopDatePicker
          maxDate={moment()}
          open={openCalender.open}
          onOpen={() => {
            formik.setFieldTouched('transfer_date');
          }}
          onClose={openCalender.closeModal}
          onChange={(value) => {
            formik.setFieldValue('transfer_date', value?.unix());
          }}
          value={moment.unix(
            // @ts-ignore
            formik.values?.transfer_date || moment.unix(),
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
                name="transfer_date"
                onBlur={formik.handleBlur}
                placeholder="Select transfer date"
                variant="outlined"
                fullWidth
                // onClick={openDateSelect.toggleModal}
              />
            );
          }}
        />
      </FormControl>
      <FormControl
        text="Notes"
        error={formik.touched.notes && Boolean(formik.errors.notes)}
        helperText={formik.touched.notes ? formik.errors.notes : ''}
      >
        <TextField
          fullWidth
          placeholder="Input notes"
          name="notes"
          onBlur={formik.handleBlur}
          value={formik.values.notes}
          onChange={formik.handleChange}
          multiline
          rows={4}
        />
      </FormControl>
      <FormControl
        text="Installments"
        error={
          formik.touched.installments && Boolean(formik.errors.installments)
        }
        helperText={
          formik.touched.installments ? formik.errors.installments : ''
        }
      >
        <>
          <InputFile
            // @ts-ignore
            value={formik.values?.installments || null}
            onChange={(e: File) => {
              formik.setFieldValue(`installments`, e);
              formik.setFieldTouched(`installments`).then(() => {
                formik.validateForm();
              });
            }}
          />
        </>
      </FormControl>
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button
          variant="text"
          color="error"
          onClick={() => {
            handleClose(false);
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={!formik.isValid}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
