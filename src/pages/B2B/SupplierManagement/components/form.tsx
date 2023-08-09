import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { roleUserAction } from 'store/slice/RoleUser';
import { roleAccessAction } from 'store/slice/RoleAccess';
import useToast from 'hooks/useToast';
import FormLabel from 'components/FormLabel';
// import { CreateRoleUser, CheckValidResponse } from 'models/RoleUser';
import { CreateSupplier, CheckValidResponse } from 'models/b2b/Supplier';
import { RoleAccess } from 'models/RoleAccess';
import { createSupplier, updateSupplier } from 'service/B2B/Supplier';
import debounce from 'utils/debounce';
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
  // fetching role user
  const dispatch = useAppDispatch();
  const supplierSelector = useAppSelector((state) => state.supplier);
  // const roleAccessSelector = useAppSelector((state) => state.roleAccess);

  const [textButton, setTextButton] = useState('Add');
  const [initialValues, setInitialValues] = useState(initial);
  useEffect(() => {
    // dispatch(
    //   roleAccessAction.fetchData({
    //     account_type: 'cms',
    //     is_exist: true,
    //   }),
    // );
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
          await dispatch(SupplierAction.updateSupplier(payload));
          toast.openToast({
            headMsg: 'Supplier Edited',
            severity: 'success',
          });
        } else {
          const addUser = await createSupplier(payload);
          toast.openToast({
            headMsg: 'New Supplier Added',
            // message: 'New Role User Added',
            severity: 'success',
          });
        }
        await resetForm();
        await onClose();
      } catch (error: any) {
        const errMsg = error;
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
        .string()
        .matches(
          // eslint-disable-next-line no-useless-escape
          /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/gm,
          'Please enter valid phone number',
        )
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
        .required('Please input phone number'),
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
  const [loadingEmailValid, setLoadingEmailValid] = useState(true);
  const handleValidEmail = async (value: string) => {
    // await dispatch(
    //   await roleUserAction.checkEmailValid({
    //     email: value,
    //     account_type: 'cms',
    //     excluded_id: 0,
    //   }),
    // );
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: '24px', margin: 0 }}>
          <FormLabel
            text="Supplier Name"
            required
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name && `${errors.name}`}
          >
            <TextField
              type="text"
              name="name"
              placeholder="Insert Supplier Name"
              value={values.name}
              onChange={handleChange}
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
            error={
              (touched.phone_number && Boolean(errors.phone_number)) ||
              errorRsp.error
            }
            helperText={
              (touched.phone_number &&
                errors.phone_number &&
                `${errors.phone_number}`) ||
              errorRsp.message
            }
          >
            <TextField
              type="text"
              name="phone_number"
              placeholder="Insert active phone number"
              value={values.phone_number}
              onChange={(event) => {
                handleChange(event);
                setErrorRsp({ error: false, message: '' });
              }}
              onBlur={handleBlur}
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  backgroundColor: (isEdit && '#f5f7fa') || '',
                },
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
          <Button variant="text" color="error" onClick={onClose}>
            Cancel
          </Button>
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
