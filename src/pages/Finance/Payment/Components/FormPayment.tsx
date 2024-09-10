/* eslint-disable radix */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useState } from 'react';
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
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  debounce,
} from '@mui/material';
import { Add, Delete, KeyboardArrowDown } from '@mui/icons-material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import DateTimePicker from 'components/DateTimePicker';
import InputImage from 'components/InputImage';
import {
  UseCreatePayment,
  UseGetPeyement,
  UseGetSimulationPayment,
} from '../../hooks/usePaymentService';
import SelectCustomer from '../../Components/SelectCustomer';
import {
  KurType,
  UsePaymentMethodListService,
} from '../../hooks/useConfigFinance';

const paymentMethod = [
  { name: 'Bank Transfer', value: 'transfer' },
  { name: 'Qris', value: 'qris' },
  { name: 'Cash', value: 'cash' },
];
type Props = {
  onClose: (isSubmited: boolean) => void;
};
export default function FormPayment({ onClose }: Props) {
  const toast = useToast();
  const createPayment = UseCreatePayment();
  const [simulation, setSimulation] = useState<any[]>([]);
  const useGetPaymentSimulation = UseGetSimulationPayment();
  const customerModal = useModal();
  const openDateSelect = useModal();
  const queryPaymentMethod = UsePaymentMethodListService();

  const formik = useFormik({
    initialValues: {
      invoice_type_id: '1',
      user: null,
      amount: '',
      payment_date: null,
      payment_method: null,
      proof_of_payment: '',
    },
    validationSchema: yup.object({
      user: yup.object().nullable().required('Required'),
      amount: yup
        .string()
        .min(2, 'Amonth cant be less than 10')
        .max(12, 'Must be 12 characters or less')
        .required('Required'),
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
            await fd.append('payment_method_id', values.payment_method.id);
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
          onClose(true);
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

  const setSimulationPayment = useCallback(
    debounce((values: any) => {
      useGetPaymentSimulation.mutate(
        {
          amount: values.amount,
          // @ts-ignore
          user_id: values?.user?.id || 0,
          payment_date: moment(values.payment_date).unix(),
          invoice_type_id: values.invoice_type_id,
        },
        {
          onSuccess: (data) => {
            // @ts-ignore
            // setSimulation(data.data || []);c
            setSimulation(data.data);
          },
        },
      );
    }, 1000),
    [],
  );

  useEffect(() => {
    if (
      formik.values.amount &&
      formik.values.user &&
      formik.values.payment_date
    ) {
      setSimulationPayment(formik.values);
    }
  }, [
    formik.values.amount,
    formik.values.user,
    formik.values.payment_date,
    formik.values.invoice_type_id,
  ]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormControl
          text="Invoice Type"
          required
          // error={touched.name && Boolean(errors.name)}
          // helperText={touched.name && errors.name && `${errors.name}`}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="invoice_type_id"
            value={formik.values.invoice_type_id}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Normal" />
            <FormControlLabel value="2" control={<Radio />} label="Cash" />
          </RadioGroup>
        </FormControl>
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
                <Typography>Balance</Typography>
                <Typography color="primary.main">
                  {/* @ts-ignore */}
                  Rp. {numberSeperator(formik.values.user?.balance || 0)}
                </Typography>
              </Stack>
              <IconButton
                onClick={() => {
                  formik.setFieldValue('user', null);
                  setSimulation([]);
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
          <DateTimePicker
            onChange={(value) => {
              formik.setFieldValue('payment_date', value);
            }}
            value={formik.values.payment_date}
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
          <>
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
              onBlur={formik.handleBlur}
            />
          </>
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
            // options={paymentMethod}
            options={queryPaymentMethod.listData}
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
                placeholder="Seleck bank account"
              />
            )}
          />
        </FormControl>
        {simulation === null && (
          <Stack
            p={1}
            mt={2}
            bgcolor="#cecece"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Tidak ada tagihan berjalan</Typography>
          </Stack>
        )}
        <Stack
          gap={1}
          my={2}
          display={simulation?.length > 0 ? 'block' : 'none'}
        >
          <Typography mb={1}>Payment Simulation</Typography>
          {simulation?.map((item, index) => (
            <Stack key={index}>
              <Stack
                gap="10px"
                p={1}
                bgcolor="#cecece"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography fontSize={14}>Invoice number</Typography>
                  <Typography>{item.invoice_number}</Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                  <Box>
                    <Typography fontSize={14}>Invoice Total</Typography>
                    <Typography>
                      Rp {numberSeperator(item?.invoice_total || 0)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize={14}>Status</Typography>
                    <Typography>{item.status}</Typography>
                  </Box>
                </Stack>
              </Stack>
              <Box bgcolor="#dedede" p={1}>
                <table>
                  <tr>
                    <td>Bank Transfer</td>
                    <td>:</td>
                    <td>Rp {numberSeperator(item?.bank_transfer || 0)}</td>
                  </tr>
                  <tr>
                    <td>Remain</td>
                    <td>:</td>
                    <td>Rp {numberSeperator(item?.detail?.remain || 0)}</td>
                  </tr>
                  <tr>
                    <td>DPD</td>
                    <td>:</td>
                    <td>Rp {numberSeperator(item?.detail?.dpd || 0)}</td>
                  </tr>
                  <tr>
                    <td>Interest</td>
                    <td>:</td>
                    <td>Rp {numberSeperator(item?.detail?.interest || 0)}</td>
                  </tr>
                  <tr>
                    <td>Principal</td>
                    <td>:</td>
                    <td>Rp {numberSeperator(item?.detail?.principal || 0)}</td>
                  </tr>
                </table>
              </Box>
            </Stack>
          ))}
        </Stack>
        <FormControl
          text="Proof of Payment"
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
            onClose(false);
            formik.resetForm();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={!formik.isValid || useGetPaymentSimulation.isLoading}
        >
          Submit
        </Button>
      </Box>
      <SelectCustomer
        open={customerModal.open}
        onClose={customerModal.closeModal}
        status={6}
        setSelected={(e) => {
          formik.setFieldValue('user', e);
        }}
      />
    </Box>
  );
}
