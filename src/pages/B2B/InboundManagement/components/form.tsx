import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import useToast from 'hooks/useToast';
import FormLabel from 'components/FormLabel';

import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import { CreateSupplier } from 'models/b2b/Supplier';
// import { createSupplier } from 'service/B2B/Supplier';
// import { SupplierAction } from 'store/slice/b2b/Supplier';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CreateInbound, CreateInboundParams } from 'models/b2b/Inbound';
import { Supplier } from 'models/b2b/Supplier';
import { createInbound } from 'service/B2B/Inbound';
import { InboundAction } from 'store/slice/b2b/Inbound';
import { PointOfSaleTwoTone } from '@mui/icons-material';

const initial: CreateInboundParams = {
  supplier: {
    id: 0,
    total_inbound: 0,
    name: '',
    address: '',
    phone_number: 0,
    created_at: 0,
    updated_at: 0,
  },
  code: '',
  date: 0,
  description: '',
  // products: [],
};

interface FormProps {
  onClose: () => void;
}

export default function Form({ onClose }: FormProps) {
  const dispatch = useAppDispatch();
  const inboundSelector = useAppSelector((state) => state.inbound);
  const supplier = useAppSelector((state) => state.supplier);
  const [initialValues, setInitialValues] = useState(initial);
  useEffect(() => {
    setInitialValues(initial);
  }, []);

  // date picker
  const [openDate, setOpenDate] = useState<{
    open: boolean;
    touched: boolean;
  }>({ open: false, touched: false });

  const toast = useToast();
  const [errorRsp, setErrorRsp] = useState({ error: false, message: '' });
  const formik = useFormik({
    initialValues,
    onSubmit: async (value, { resetForm }) => {
      const payload = {
        supplier_id: value.supplier.id,
        code: value.code,
        // date: 0,
        // description: '',
        // products: [
        //   {
        //     id: 0,
        //     supplier_price: 0,
        //     quantity: 0,
        //   },
        // ],
      };
      try {
        await dispatch(InboundAction.createInbound(value));
        await resetForm();
        await onClose();
      } catch (error: any) {
        const errMsg = error;
        setErrorRsp({ error: true, message: errMsg });
      }
    },
    validationSchema: yup.object({
      supplier_id: yup.mixed().required('Supplier is required'),
      code: yup
        .string()
        .required('Please input inbound code / number')
        .test(
          'len',
          'Maximal character length for inbounc code / number is 50',
          (val: string | undefined) => val !== undefined && val?.length < 51,
        ),
      date: yup.mixed().required('Date is required'),
      description: yup
        .string()
        .test(
          'len',
          'Maximal character for description is 500',
          (val) => val !== undefined && val.toString().length < 500,
        ),
      // phone_number: yup
      //   .string()
      //   .matches(
      //     // eslint-disable-next-line no-useless-escape
      //     /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/gm,
      //     'Please enter valid phone number',
      //   )
      //   .test(
      //     'len',
      //     'Maximal digit for phone number is 14',
      //     (val) => val !== undefined && val.toString().length < 15,
      //   )
      //   .test(
      //     'len',
      //     'Minimal digit for phone number is 10',
      //     (val) => val !== undefined && val.toString().length > 9,
      //   )
      //   .required('Please input phone number'),
      // address: yup.string().required('Please input address'),
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
    dirty,
  } = formik;

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: '24px', margin: 0 }}>
          <FormLabel
            text="Supplier Name"
            required
            error={touched.supplier && Boolean(errors.supplier)}
            helperText={
              touched.supplier && errors.supplier && `${errors.supplier}`
            }
          >
            <Autocomplete
              id="supplier_id"
              options={supplier.data}
              onChange={(e, value) => {
                setFieldValue('supplier_id', value);
              }}
              isOptionEqualToValue={(option: Supplier) => {
                return option.id === values.supplier.id;
              }}
              getOptionLabel={(option) => `${option.name}`}
              value={values.supplier}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="supplier_id"
                  onBlur={handleBlur}
                  placeholder="Select Supplier Name"
                />
              )}
            />
          </FormLabel>
          <FormLabel
            text="Inbound Code / Number"
            required
            error={touched.code && Boolean(errors.code)}
            helperText={touched.code && errors.code && `${errors.code}`}
          >
            <TextField
              type="text"
              name="code"
              placeholder="Insert inbound code / number"
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              inputProps={{
                maxLength: 50,
              }}
            />
          </FormLabel>
          <FormLabel
            text="Inbound Date"
            required
            error={
              (openDate.touched && Boolean(errors.date)) ||
              (!values.date && !isValid)
            }
            helperText={
              (openDate.touched && Boolean(errors.date) && `${errors.date}`) ||
              (!values.date && !isValid && `Date is required`)
            }
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                open={openDate.open}
                onClose={() => {
                  if (values.date) setOpenDate({ open: false, touched: false });
                  else setOpenDate({ open: false, touched: true });
                }}
                onOpen={() => {
                  setOpenDate({ open: true, touched: true });
                }}
                value={values.date}
                inputFormat="MMMM DD, YYYY"
                onChange={(e) => {
                  setFieldValue('date', e, true);
                }}
                InputAdornmentProps={{ style: { display: 'none' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
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
                      placeholder: 'Input date',
                    }}
                  />
                )}
                maxDate={new Date()}
              />
            </LocalizationProvider>
          </FormLabel>

          <FormLabel
            text="Note/Description"
            required
            error={touched.description && Boolean(errors.description)}
            helperText={
              touched.description &&
              errors.description &&
              `${errors.description}`
            }
          >
            <TextField
              type="text"
              name="description"
              placeholder="Insert some Additional note"
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              inputProps={{
                maxLength: 500,
              }}
              multiline
              rows={2}
            />
          </FormLabel>
          <Box
            height="200px"
            sx={{
              border: 'solid 1px #e4e4e4',
              borderRadius: '4px',
              padding: '12px',
            }}
          >
            <Box>ygyg</Box>
          </Box>
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
            type="submit"
            disabled={
              !(isValid && dirty) ||
              inboundSelector.loadingForm ||
              errorRsp.error
            }
            color="primary"
          >
            {inboundSelector.loadingForm ? (
              <CircularProgress size="1rem" />
            ) : (
              'Save'
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
