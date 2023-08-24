import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import useToast from 'hooks/useToast';
import FormLabel from 'components/FormLabel';
import { CreateSupplier } from 'models/b2b/Supplier';
import { createSupplier, updateSupplier } from 'service/B2B/Supplier';
import { SupplierAction } from 'store/slice/b2b/Supplier';

const initial: CreateSupplier = {
  name: '',
  address: '',
  phone_number: '',
};
interface FormProps {
  onClose: () => void;
  isEdit?: boolean;
  data: CreateSupplier;
}

export default function Form({ onClose, isEdit, data }: FormProps) {
  const dispatch = useAppDispatch();
  const supplierSelector = useAppSelector((state) => state.supplier);

  const [textButton, setTextButton] = useState('Create');
  const [initialValues, setInitialValues] = useState(initial);
  useEffect(() => {
    if (isEdit) {
      setInitialValues(data);
      setTextButton('Save');
    } else {
      setInitialValues(initial);
    }
  }, []);
  const toast = useToast();
  const [errorRsp, setErrorRsp] = useState({ error: false, message: '' });
  const formik = useFormik({
    initialValues,
    onSubmit: async (value, { resetForm }) => {
      const payload = {
        name: value.name,
        address: value.address,
        phone_number: value.phone_number,
        id: data.id,
      };
      try {
        if (isEdit) {
          // await dispatch(SupplierAction.updateSupplier(payload));
          const updateUser = await updateSupplier(payload);
          toast.openToast({
            headMsg: 'Supplier Edited',
            severity: 'success',
          });
        } else {
          const addUser = await createSupplier(payload);
          toast.openToast({
            headMsg: 'New Supplier Added',
            severity: 'success',
          });
        }
        await resetForm();
        await onClose();
      } catch (error: any) {
        const errMsg = error;
        console.log('errmsg', errMsg);
        setErrorRsp({ error: true, message: errMsg });
      }
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Please input name')
        .test(
          'len',
          'Maximal character length for name is 50',
          (val: string | undefined) => val !== undefined && val?.length < 51,
        ),
      phone_number: yup
        .number()
        .required('Phone Number is required')
        .test(
          'len',
          'Maximal digit for phone number is 14',
          (val) => val !== undefined && val.toString().length < 15,
        )
        .test(
          'len',
          'Minimal digit for phone number is 10',
          (val) => val !== undefined && val.toString().length > 9,
        )
        .typeError('Phone number should be a number'),
      address: yup.string().required('Please input address'),
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
            error={(touched.name && Boolean(errors.name)) || errorRsp.error}
            helperText={
              (touched.name && errors.name && `${errors.name}`) ||
              errorRsp.message
            }
          >
            <TextField
              type="text"
              name="name"
              placeholder="Insert Supplier Name"
              value={values.name}
              onChange={(event) => {
                handleChange(event);
                setErrorRsp({ error: false, message: '' });
              }}
              onBlur={handleBlur}
              fullWidth
              inputProps={{
                maxLength: 50,
              }}
              sx={{
                '& .MuiInputBase-input': {
                  backgroundColor: (isEdit && '#f5f7fa') || '',
                },
              }}
            />
          </FormLabel>
          <FormLabel
            text="Phone Number"
            required
            error={touched.phone_number && Boolean(errors.phone_number)}
            helperText={
              touched.phone_number &&
              errors.phone_number &&
              `${errors.phone_number}`
            }
          >
            <TextField
              type="text"
              name="phone_number"
              placeholder="Insert active phone number"
              value={values.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  backgroundColor: (isEdit && '#f5f7fa') || '',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+62</InputAdornment>
                ),
              }}
            />
          </FormLabel>
          <FormLabel
            text="Address"
            required
            error={touched.address && Boolean(errors.address)}
            helperText={
              touched.address && errors.address && `${errors.address}`
            }
          >
            <TextField
              type="text"
              name="address"
              placeholder="Insert Business Address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  backgroundColor: (isEdit && '#f5f7fa') || '',
                },
              }}
            />
          </FormLabel>
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
          <Button
            type="submit"
            disabled={
              !(isValid && (dirty || isEdit)) ||
              supplierSelector.loadingForm ||
              errorRsp.error
            }
            color="primary"
          >
            {supplierSelector.loadingForm ? (
              <CircularProgress size="1rem" />
            ) : (
              textButton
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

Form.defaultProps = {
  isEdit: false,
};
