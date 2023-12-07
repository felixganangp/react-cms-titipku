/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormik } from 'formik';

import * as yup from 'yup';
import useToast from 'hooks/useToast';
import useModal from 'hooks/useModal';
import moment from 'moment';
import FormControl from 'components/FormLabel';
import numberSeperator from 'utils/numberSeperator';
import {
  Box,
  ButtonBase,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { UseCreatePayment } from '../../hooks/usePaymentService';

import SelectCustomer from '../../Components/SelectCustomer';
import { KurType } from '../../hooks/useConfigFinance';

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
