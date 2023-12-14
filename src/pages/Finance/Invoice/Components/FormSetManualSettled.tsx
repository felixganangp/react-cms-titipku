/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import FormControl from 'components/FormLabel';
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';
import { InvoiceListType } from 'models/finance/invoice';
import * as yup from 'yup';
import moment from 'moment';
import useToast from 'hooks/useToast';
import numberSeperator from 'utils/numberSeperator';

import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import {
  UseGetInstalmentSimulation,
  UseSetManualSettled,
  useInvoiceDetails,
} from '../../hooks/useInvoiceService';

type Props = {
  typeId: number;
  invoiceDetail: InvoiceListType;
  onClose: () => void;
};
export default function FormSetManualSettled({
  typeId,
  invoiceDetail,
  onClose,
}: Props) {
  const invoiceDetailsQuery = useInvoiceDetails(invoiceDetail.id);

  const toast = useToast();
  const mutationSetManualSettled = UseSetManualSettled();

  const [simulation, setSimulation] = useState([]);
  const simulationInstalment = UseGetInstalmentSimulation();

  const validationSchema = {
    1: yup.object({
      notes: yup.string().required('Notes Required'),
    }),
    2: yup.object({
      discount_type_id: yup
        .number()
        .nullable()
        .required('Discount Type Required'),
      amount: yup.number().required('Amount Required'),
      notes: yup.string().required('Notes Required'),
    }),
    3: yup.object({
      loan_amount: yup.number().required('Loan Amount Required'),
      installment_period: yup.number().required('Installment Period Required'),
      transfer_date: yup.string().required('Transfer Date Required'),
      notes: yup.string().required('Notes Required'),
    }),
  };
  const formik = useFormik({
    initialValues: {
      notes: '',
      discount_type_id: null,
      amount: null,
      loan_amount: null,
      installment_period: null,
      transfer_date: null,
    },
    onSubmit: (values) => {
      mutationSetManualSettled.mutate(
        {
          id: invoiceDetail.id,
          data: {
            ...(typeId === 1
              ? {
                  cut_loss_request: { notes: values.notes },
                }
              : {}),
            ...(typeId === 2
              ? {
                  memo_internal_request: {
                    discount_type_id: values.discount_type_id,
                    amount: Number(values.amount),
                    notes: values.notes,
                  },
                }
              : {}),
            ...(typeId === 3
              ? {
                  restructure_request: {
                    loan_amount: Number(values.loan_amount),
                    installment_period: values.installment_period,
                    transfer_date: moment(values.transfer_date || 0).unix(),
                    notes: values.notes,
                  },
                }
              : {}),
          },
        },
        {
          onSuccess: () => {
            const message =
              typeId === 1
                ? 'Cut Loss'
                : typeId === 2
                ? 'Memo Internal'
                : typeId === 3
                ? 'Restructure'
                : 'Set Manual lunas';
            toast.openToast({
              severity: 'success',
              headMsg: `Success ${message}`,
            });
            onClose();
          },
          onError: (error) => {
            toast.openToast({
              severity: 'error',
              headMsg: 'Error Set Manual Settled',
            });
          },
        },
      );
    },
    // @ts-ignore
    validationSchema: validationSchema[typeId] || yup.object({}),
  });

  const setInstallmentSimulation = useCallback(
    debounce((value: number) => {
      simulationInstalment.mutate(
        {
          // @ts-ignore
          amount: formik.values.loan_amount,
          period: value,
          start_date: moment(formik.values.transfer_date).unix(),
        },
        {
          onSuccess: (data) => {
            // @ts-ignore
            setSimulation(data.data || []);
          },
        },
      );
    }, 2000),
    [formik.values],
  );
  const { touched, errors } = formik;
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <Stack
          direction="row"
          mb={2}
          py={1}
          borderBottom="1px solid #cecece"
          spacing={2}
          justifyContent="space-between"
        >
          <Stack>
            <Typography>Invoice Number</Typography>
            <Typography color="info.main">
              {invoiceDetail.invoice_number ||
                `INV/${moment(invoiceDetail.created_at * 1000).format(
                  'YYYY',
                )}/${invoiceDetail.user?.user_number}/${invoiceDetail.id}`}
            </Typography>
          </Stack>
          <Stack alignItems="end">
            <Typography>Remaining Bill</Typography>
            <Typography color="error.main">
              Rp.{' '}
              {numberSeperator(
                invoiceDetailsQuery?.details?.outstanding_amount || 0,
              )}
            </Typography>
          </Stack>
        </Stack>
        {typeId === 1 && (
          <FormControl
            text="Notes"
            required
            error={touched.notes && Boolean(errors.notes)}
            helperText={touched.notes && errors.notes && `${errors.notes}`}
          >
            <TextField
              fullWidth
              placeholder="Notes"
              minRows={4}
              rows={4}
              multiline
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="notes"
            />
          </FormControl>
        )}
        {typeId === 2 && (
          <>
            <FormControl
              text="Type"
              required
              error={
                touched.discount_type_id && Boolean(errors.discount_type_id)
              }
              helperText={
                touched.discount_type_id &&
                errors.discount_type_id &&
                `${errors.discount_type_id}`
              }
            >
              <Autocomplete
                data-testid="form-customer-list-bank"
                options={[
                  { value: 1, name: 'Discount' },
                  { value: 2, name: 'Denda' },
                ]}
                onChange={(e, value) => {
                  formik.setFieldValue('discount_type_id', value?.value);
                }}
                isOptionEqualToValue={(option: {
                  name: string;
                  value: string | number;
                }) => {
                  // @ts-ignore
                  return option.name === formik.values.discount_type_id;
                }}
                getOptionLabel={(option) => `${option.name}`}
                value={[
                  { value: 1, name: 'Discount' },
                  { value: 2, name: 'Denda' },
                ].find((item) => item.value === formik.values.discount_type_id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="discount_type_id"
                    onBlur={formik.handleBlur}
                    placeholder="Select Type Memo"
                  />
                )}
              />
            </FormControl>
            <FormControl
              text="Amount"
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
                placeholder="Insert Amount"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                }}
                fullWidth
                autoComplete="off"
                value={numberSeperator(formik.values.amount || '')}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\..*/g, '$1');

                  formik.setFieldValue('amount', value);
                }}
              />
            </FormControl>
            <FormControl
              text="Notes"
              required
              error={touched.notes && Boolean(errors.notes)}
              helperText={touched.notes && errors.notes && `${errors.notes}`}
            >
              <TextField
                fullWidth
                placeholder="Notes"
                minRows={4}
                rows={4}
                multiline
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="notes"
              />
            </FormControl>
          </>
        )}
        {typeId === 3 && (
          <>
            <FormControl
              text="Loan Amount"
              required
              error={
                formik.touched.loan_amount && Boolean(formik.errors.loan_amount)
              }
              helperText={
                formik.touched.loan_amount &&
                formik.errors.loan_amount &&
                `${formik.errors.loan_amount}`
              }
            >
              <TextField
                type="text"
                name="selling_price"
                placeholder="Insert Loan Amount"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                }}
                fullWidth
                autoComplete="off"
                value={numberSeperator(formik.values.loan_amount || '')}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\..*/g, '$1');

                  formik.setFieldValue('loan_amount', value);
                }}
              />
            </FormControl>
            <FormControl
              text="Date"
              required
              error={
                formik.touched.transfer_date &&
                Boolean(formik.errors.transfer_date)
              }
              helperText={
                formik.touched.transfer_date &&
                formik.errors.transfer_date &&
                `${formik.errors.transfer_date}`
              }
            >
              <DesktopDatePicker
                value={formik.values.transfer_date}
                inputFormat="MMM DD, YYYY"
                onChange={(value) => {
                  formik.setFieldValue('transfer_date', value);
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      name="grade"
                      placeholder="Select Grade"
                      variant="outlined"
                      fullWidth
                    />
                  );
                }}
              />
            </FormControl>
            <FormControl
              text="Installment Period"
              required
              error={
                formik.touched.installment_period &&
                Boolean(formik.errors.installment_period)
              }
              helperText={
                formik.touched.installment_period &&
                formik.errors.installment_period &&
                `${formik.errors.installment_period}`
              }
            >
              <>
                <TextField
                  fullWidth
                  placeholder="Insert Installment Period"
                  value={formik.values.installment_period}
                  onChange={(e) => {
                    formik.handleChange(e);
                    const { value } = e.target;

                    if (
                      formik.values.loan_amount &&
                      formik.values.transfer_date
                    ) {
                      // @ts-ignore
                      setInstallmentSimulation(value as number);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  name="installment_period"
                  type="number"
                />
                <Stack spacing={2} mt={2}>
                  {simulationInstalment.isLoading && (
                    <Typography>Loading...</Typography>
                  )}
                  {simulation.map((item: any, index: number) => (
                    <Stack
                      key={index}
                      alignItems="center"
                      justifyContent="space-between"
                      direction="row"
                      spacing={2}
                      p={1}
                      bgcolor="#dedede"
                    >
                      <Stack>
                        <Typography>Due Data</Typography>
                        <Typography>
                          {moment(item.due_date * 1000).format('DD-MM-YYYY')}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography>Installment per Amount</Typography>
                        <Typography>
                          Rp. {numberSeperator(item?.amount || 0)}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </>
            </FormControl>
            <FormControl
              text="Notes"
              required
              error={touched.notes && Boolean(errors.notes)}
              helperText={touched.notes && errors.notes && `${errors.notes}`}
            >
              <TextField
                fullWidth
                placeholder="Notes"
                minRows={4}
                rows={4}
                multiline
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="notes"
              />
            </FormControl>
          </>
        )}
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
        <Button variant="text" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
