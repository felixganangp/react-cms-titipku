import { AdjustInvoice } from 'models/kur/Invoice';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormLabel from 'components/FormLabel';
import { NumericFormat, NumberFormatValues } from 'react-number-format';

interface Props {
  kurUserId: number;
  invoiceId: number;
  onClose: () => void;
}

export default function AdjustInvoiceModal({
  kurUserId,
  invoiceId,
  onClose,
}: Props) {
  // formik
  const initialValues: AdjustInvoice = {
    kur_user_id: kurUserId,
    kur_invoice_id: invoiceId,
    amount: '',
    remarks: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      console.log('values', values);
      await resetForm();
      await onClose();
    },
    validationSchema: yup.object({
      amount: yup.string().required('Outstanding Amount is required'),
      remarks: yup.string().required('Reason is requireed'),
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

  return (
    <Box sx={{ margin: 0 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: '24px' }}>
          {/* invoice id */}
          <Typography fontSize="20px" fontWeight={500}>
            {invoiceId}
          </Typography>
          <FormLabel text="Outstanding Amount">
            <NumericFormat
              name="amount"
              customInput={TextField}
              placeholder="Input outstanding amount"
              onChange={(e) => setFieldValue('amount', e.target.value)}
              onBlur={handleBlur}
              value={values.amount}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              minLength={2}
              fullWidth
              allowNegative
              isAllowed={(val: NumberFormatValues) => {
                const { floatValue } = val;
                return floatValue !== undefined && floatValue <= 9999999999.99;
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp.</InputAdornment>
                ),
              }}
            />
          </FormLabel>
          {/* reason */}
          <FormLabel text="Reason">
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
          <Button sx={{ width: '20px' }} type="submit" disabled={!isValid}>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
