/* eslint-disable radix */
import * as React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  InputAdornment,
  TextField,
  Button,
  Autocomplete,
  Modal,
} from '@mui/material';
import FormLabel from 'components/FormLabel';
import AddIcon from '@mui/icons-material/Add';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { InitialCreatePayment } from 'models/kur/Payment';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { paymentKURAction } from 'store/slice/kur/Payment';
import moment from 'moment';
import InputImage from 'components/InputImage/index';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { Customer } from 'models/kur/Customer';
import KurCustomer from './KurCustomer';
import { AddButton } from '../payment.styled';

interface PaymentFormProps {
  onClose: () => void;
}

export default function PaymentForm({ onClose }: PaymentFormProps) {
  const payment = useAppSelector((state) => state.payment);
  const dispatch = useAppDispatch();

  // date picker
  const [openDate, setOpenDate] = useState<{
    open: boolean;
    touched: boolean;
  }>({ open: false, touched: false });

  // formik
  const initialValues: InitialCreatePayment = {
    kur_user_id: null,
    decision_date: null,
    amount: '',
    paid_to_bank: '',
    paid_to_account_number: '',
    description: '',
    remarks: '',
    file: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(
        paymentKURAction.createPayment({
          body: {
            data: {
              kur_user_id: values.kur_user_id?.id,
              amount: Number(
                parseFloat(
                  values.amount.split('.').join('').replace(/,/g, '.'),
                ).toFixed(2),
              ),
              paid_to_account_number: values.paid_to_account_number,
              paid_to_bank: values.paid_to_bank,
              description: values.description,
              decision_date: moment(values.decision_date).unix(),
              remarks: '',
            },
            file: values.file,
          },
        }),
      );
      await resetForm();
      await setOpenDate({ open: false, touched: false });
      await onClose();
    },
    validationSchema: yup.object({
      kur_user_id: yup.mixed().required('KUR Customer is required'),
      decision_date: yup.mixed().required('Payment Date is required'),
      amount: yup.string().required('Amount is required'),
      file: yup.mixed().required('Attachment is required'),
    }),
    enableReinitialize: true,
  });
  const {
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    setFieldValue,
    isValid,
  } = formik;

  // KUR Customer Modal
  const [customerModal, setCustomerModal] = useState<{
    open: boolean;
  }>({
    open: false,
  });

  const handleCloseModal = (customer: Customer) => {
    setCustomerModal({ open: false });
    dispatch(
      paymentKURAction.setCustomerDataParams({
        search: '',
        order_by: 'id',
        order_type: 'asc',
      }),
    );
    if (customer.id) setFieldValue('kur_user_id', customer);
  };

  return (
    <Box sx={{ margin: 0 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: '24px' }}>
          {/* KUR Customer */}
          <FormLabel
            text="KUR Customer"
            error={Boolean(errors.kur_user_id)}
            helperText={errors.kur_user_id && `${errors.kur_user_id}`}
          >
            <TextField
              type="text"
              name="kur_user_id"
              placeholder="Input KUR customer"
              value={values.kur_user_id?.name}
              disabled
              fullWidth
              sx={{
                '.MuiInputBase-root': {
                  paddingRight: '5px',
                  backgroundColor: values.kur_user_id ? '#f5f8ff' : '#ffff',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AddButton
                      style={{ backgroundColor: '#008E58' }}
                      onClick={() => setCustomerModal({ open: true })}
                    >
                      <AddIcon sx={{ margin: 0 }} />
                    </AddButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormLabel>
          {/* Payment Date */}
          <FormLabel
            text="Payment Date"
            error={
              (openDate.touched && Boolean(errors.decision_date)) ||
              (!values.decision_date && !isValid)
            }
            helperText={
              (openDate.touched &&
                Boolean(errors.decision_date) &&
                `${errors.decision_date}`) ||
              (!values.decision_date && !isValid && `Payment Date is required`)
            }
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                open={openDate.open}
                onClose={() => {
                  if (values.decision_date)
                    setOpenDate({ open: false, touched: false });
                  else setOpenDate({ open: false, touched: true });
                }}
                onOpen={() => {
                  setOpenDate({ open: true, touched: true });
                }}
                value={values.decision_date}
                inputFormat="MMMM DD, YYYY"
                onChange={(e) => {
                  setFieldValue('decision_date', e, true);
                }}
                InputAdornmentProps={{ style: { display: 'none' } }}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: '100%' }}
                    {...params}
                    onClick={() => setOpenDate({ open: true, touched: true })}
                    onFocus={() => setOpenDate({ open: false, touched: true })}
                    onKeyDown={() =>
                      setOpenDate({ open: false, touched: true })
                    }
                    inputProps={{
                      ...params.inputProps,
                      placeholder: 'Input payment date',
                    }}
                  />
                )}
                maxDate={new Date()}
              />
            </LocalizationProvider>
          </FormLabel>
          {/* Amount */}
          <FormLabel
            text="Amount"
            error={
              (touched.amount || !isValid) &&
              (parseInt(values.amount) <= 0 || Boolean(errors.amount))
            }
            helperText={
              (touched.amount || !isValid) &&
              ((errors.amount && `${errors.amount}`) ||
                (parseInt(values.amount) <= 0 && `Please input valid amount`))
            }
          >
            <NumericFormat
              name="amount"
              customInput={TextField}
              placeholder="Input amount"
              onChange={(e) => setFieldValue('amount', e.target.value)}
              onBlur={handleBlur}
              value={values.amount}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              minLength={2}
              fullWidth
              allowNegative={false}
              isAllowed={(val: NumberFormatValues) => {
                const { floatValue } = val;
                return (
                  floatValue !== undefined &&
                  floatValue >= 1 &&
                  floatValue <= 9999999999.99
                );
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp.</InputAdornment>
                ),
              }}
            />
          </FormLabel>
          {/* Transfer bank */}
          <FormLabel
            text="Transfer to"
            error={!isValid && !values.paid_to_bank}
            helperText={
              !isValid && !values.paid_to_bank && 'Transfer to is required'
            }
          >
            <Autocomplete
              id="transferTo"
              options={payment.bankAccounts}
              onChange={(e, value) => {
                setFieldValue('paid_to_bank', value?.bank);
                setFieldValue('paid_to_account_number', value?.account_number);
              }}
              onInputChange={(e, value) => {
                setFieldValue('paid_to_bank', value);
              }}
              isOptionEqualToValue={(option: {
                bank: string;
                account_number: string;
              }) => {
                return option.bank === values.paid_to_bank;
              }}
              getOptionLabel={(option) => `${option.bank}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="paid_to_bank"
                  onBlur={handleBlur}
                  placeholder="Select bank transfer"
                />
              )}
            />
          </FormLabel>
          {/* description */}
          <FormLabel text="Description (Optional)">
            <TextField
              id="description"
              value={values.description}
              fullWidth
              rows={4}
              multiline
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Input description"
              inputProps={{ maxLength: 100 }}
            />
          </FormLabel>
          {/* attachment */}
          <FormLabel
            text="Attachment"
            error={Boolean(errors.file)}
            helperText={errors.file && `${errors.file}`}
          >
            <InputImage
              label="an Image"
              value={values.file}
              width={720}
              height={720}
              onChange={(e: any) => setFieldValue('file', e)}
            />
          </FormLabel>
        </Box>
        <Box
          width="100%"
          display="flex"
          gap="10px"
          justifyContent="end"
          sx={{
            padding: '24px',
            boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Button sx={{ width: '20%' }} type="submit" disabled={!isValid}>
            Create
          </Button>
        </Box>
      </form>
      <Modal open={customerModal.open} onClose={handleCloseModal}>
        <KurCustomer onClose={handleCloseModal} />
      </Modal>
    </Box>
  );
}
