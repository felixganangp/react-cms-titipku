/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormik } from 'formik';

import * as yup from 'yup';
import useToast from 'hooks/useToast';
import useModal from 'hooks/useModal';
import moment from 'moment';
import FormControl from 'components/FormLabel';
import numberSeperator from 'utils/numberSeperator';
import {
  Autocomplete,
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import InputImage from 'components/InputImage';
import { UseCreatePayment } from '../../hooks/usePaymentService';

import SelectCustomer from '../../Components/SelectCustomer';
import { KurType } from '../../hooks/useConfigFinance';

const paymentMethod = [
  { name: 'Transfer', value: 'transfer' },
  { name: 'Cash', value: 'cash' },
];
type Props = {
  onClose: () => void;
};
export default function FormPayment({ onClose }: Props) {
  const toast = useToast();
  const createPayment = UseCreatePayment();
  const customerModal = useModal();

  const formik = useFormik({
    initialValues: {
      user: null,
      amount: '',
      payment_date: null,
      payment_method: null,
      proof_of_payment: '',
    },
    validationSchema: yup.object({
      user: yup.object().nullable().required('Required'),
      amount: yup.string().required('Required'),
      payment_date: yup.mixed().nullable().required('Required'),
      payment_method: yup.object().nullable().required('Required'),
      proof_of_payment: yup.mixed().required('Required'),
    }),
    onSubmit: async (values) => {
      const fd = new FormData();
      const promises = Object.keys(values).map(async (key) => {
        switch (key) {
          case 'payment_date':
            // @ts-ignore
            await fd.append('payment_date', moment(values[key]).unix());
            break;
          case 'user':
            // @ts-ignore
            await fd.append('user_id', values.user.id);
            break;
          case 'payment_method':
            // @ts-ignore
            await fd.append('payment_method', values.payment_method.value);
            break;
          default:
            // @ts-ignore
            await fd.append(key, values[key]);
            break;
        }
      });

      await Promise.all(promises);
      createPayment.mutate(fd, {
        onSuccess: (data) => {
          onClose();
          formik.resetForm();
          toast.openToast({
            severity: 'success',
            headMsg: 'Success create payment',
          });
        },
        onError: (error) => {
          toast.openToast({
            severity: 'error',
            headMsg: 'Failed create paymen',
          });
        },
      });
    },
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormControl
          text="Merchant"
          required
          error={formik.touched.user && Boolean(formik.errors.user)}
          helperText={
            formik.touched.user && formik.errors.user && `${formik.errors.user}`
          }
        >
          {formik.values.user ? (
            <Stack alignItems="center" direction="row" spacing="20px">
              <Stack flex="1">
                <Typography>
                  {/* @ts-ignore */}
                  {KurType?.[formik.values.user.user_type_id]}
                </Typography>
                {/* @ts-ignore */}
                <Typography>{formik.values.user.merchant_name}</Typography>
              </Stack>
              <Stack>
                <Typography>Available Limit</Typography>
                <Typography color="error">
                  {/* @ts-ignore */}
                  Rp. {numberSeperator(formik.values.user?.limit_cash || 0)}
                </Typography>
              </Stack>
              <IconButton
                onClick={() => {
                  formik.setFieldValue('user', null);
                }}
              >
                <Delete color="error" />
              </IconButton>
            </Stack>
          ) : (
            <TextField
              disabled
              fullWidth
              placeholder="Select Merchant"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ButtonBase onClick={() => customerModal.toggleModal()}>
                      <Box
                        bgcolor="primary.main"
                        p="5px"
                        borderRadius="4px"
                        display="flex"
                        alignContent="center"
                        justifyContent="center"
                      >
                        <Add sx={{ color: '#fff' }} />
                      </Box>
                    </ButtonBase>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </FormControl>
        <FormControl
          text="Payment Date"
          required
          error={
            formik.touched.payment_date && Boolean(formik.errors.payment_date)
          }
          helperText={
            formik.touched.payment_date &&
            formik.errors.payment_date &&
            `${formik.errors.payment_date}`
          }
        >
          <DesktopDatePicker
            value={formik.values.payment_date}
            inputFormat="MMM DD, YYYY"
            onChange={(value) => {
              formik.setFieldValue('payment_date', value);
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  name="grade"
                  placeholder="Select Payment Date"
                  variant="outlined"
                  fullWidth
                />
              );
            }}
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
          text="Payment Method"
          error={
            formik.touched.payment_method &&
            Boolean(formik.errors.payment_method)
          }
          helperText={
            formik.touched.payment_method &&
            formik.errors.payment_method &&
            `${formik.errors.payment_method}`
          }
        >
          <Autocomplete
            data-testid="form-customer-list-bank"
            id="list-bank"
            options={paymentMethod}
            onChange={(e, value) => {
              formik.setFieldValue('payment_method', value);
            }}
            isOptionEqualToValue={(option: { name: string; value: string }) => {
              // @ts-ignore
              return option.name === formik.values.payment_method?.name;
            }}
            getOptionLabel={(option) => `${option.name}`}
            value={formik.values.payment_method}
            renderInput={(params) => (
              <TextField
                {...params}
                name="bankName"
                onBlur={formik.handleBlur}
                placeholder="Select your bank account"
              />
            )}
          />
        </FormControl>
        <FormControl
          text="Proof Payment"
          required
          error={
            formik.touched.proof_of_payment &&
            Boolean(formik.errors.proof_of_payment)
          }
          helperText={
            formik.touched.proof_of_payment &&
            formik.errors.proof_of_payment &&
            `${formik.errors.proof_of_payment}`
          }
        >
          <InputImage
            label="Please upload an Image  "
            width={200}
            height={200}
            value={formik.values.proof_of_payment}
            onChange={(e) => {
              formik.setFieldValue('proof_of_payment', e);
            }}
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
            onClose();
            formik.resetForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Box>
      <SelectCustomer
        open={customerModal.open}
        onClose={customerModal.closeModal}
        setSelected={(e) => {
          formik.setFieldValue('user', e);
        }}
      />
    </Box>
  );
}
