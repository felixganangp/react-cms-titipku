/* eslint-disable @typescript-eslint/no-shadow */
import { AdjustInvoice } from 'models/kur/Invoice';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Modal,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormLabel from 'components/FormLabel';
import { NumericFormat, NumberFormatValues } from 'react-number-format';
import { useAppDispatch } from 'store/hooks';
import { invoiceKurAction } from 'store/slice/kur/Invoice';
import useModal from 'hooks/useModal';
import PaidOff from './paidOff';

interface Props {
  kurUserId: number;
  id: number;
  invoiceNumber: string;
  outstanding: number;
  onClose: () => void;
}

export default function AdjustInvoiceModal({
  kurUserId,
  id,
  invoiceNumber,
  outstanding,
  onClose,
}: Props) {
  const dispatch = useAppDispatch();
  const paidOffModal = useModal();

  // formik
  const initialValues: AdjustInvoice = {
    kur_user_id: kurUserId,
    kur_invoice_id: id,
    final_outstanding_amount: outstanding || undefined,
    remarks: '',
  };

  const handleSubmitForm = async (values: any, resetForm: () => void) => {
    await dispatch(
      invoiceKurAction.adjust({
        kur_user_id: kurUserId,
        kur_invoice_id: id,
        final_outstanding_amount: values.final_outstanding_amount,
        remarks: values.remarks,
      }),
    );
    await resetForm();
    await onClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      if (values.final_outstanding_amount === 0) paidOffModal.openModal();
      else handleSubmitForm(values, resetForm);
    },
    validationSchema: yup.object({
      remarks: yup.string().required('Reason is required'),
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
    resetForm,
  } = formik;

  // paid off confirmation
  const handlePaidOff = async () => {
    await handleSubmitForm(values, resetForm);
    await paidOffModal.closeModal();
  };

  return (
    <Box>
      <Box sx={{ margin: 0 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ padding: '24px' }}>
            {/* invoice id */}
            <Typography fontSize="20px" fontWeight={500} marginBottom="24px">
              {invoiceNumber}
            </Typography>
            <FormLabel
              text="Outstanding Amount"
              error={
                Boolean(errors.final_outstanding_amount) ||
                values.final_outstanding_amount === undefined ||
                values.final_outstanding_amount < 0
              }
              helperText={
                (errors.final_outstanding_amount &&
                  `${errors.final_outstanding_amount}`) ||
                (values.final_outstanding_amount === undefined &&
                  `Outstanding Amount is required`) ||
                (values.final_outstanding_amount !== undefined &&
                  values.final_outstanding_amount < 0 &&
                  `Outstanding Amount can't be less than zero`)
              }
            >
              <NumericFormat
                name="amount"
                customInput={TextField}
                placeholder="Input outstanding amount"
                onValueChange={(values) => {
                  setFieldValue('final_outstanding_amount', values.floatValue);
                }}
                onBlur={handleBlur}
                value={values.final_outstanding_amount}
                allowLeadingZeros
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fullWidth
                allowNegative
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp.</InputAdornment>
                  ),
                }}
              />
            </FormLabel>
            {/* reason */}
            <FormLabel
              text="Reason"
              error={(touched.remarks || !isValid) && Boolean(errors.remarks)}
              helperText={
                (touched.remarks || !isValid) &&
                errors.remarks &&
                `${errors.remarks}`
              }
            >
              <TextField
                id="remarks"
                value={values.remarks}
                fullWidth
                rows={4}
                multiline
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Input reason"
                inputProps={{ maxLength: 100 }}
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
            <Button
              sx={{ width: '20%' }}
              type="submit"
              disabled={
                !isValid ||
                values.final_outstanding_amount === undefined ||
                values.final_outstanding_amount < 0
              }
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
      <Modal open={paidOffModal.open} onClose={paidOffModal.closeModal}>
        <PaidOff
          onSubmit={handlePaidOff}
          invoiceNumber={invoiceNumber}
          onClose={paidOffModal.closeModal}
        />
      </Modal>
    </Box>
  );
}
