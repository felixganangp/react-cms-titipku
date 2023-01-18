import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { roleUserAction } from 'store/slice/RoleUser';
import useToast from 'hooks/useToast';
import FormLabel from 'components/FormLabel';

interface FormValue {
  name: string;
  email: string;
  roleAccess: any | null;
}

const initial: FormValue = {
  name: '',
  email: '',
  roleAccess: null,
};
interface FormProps {
  onClose: () => void;
}

export default function Form({ onClose }: FormProps) {
  // fetching role user
  const dispatch = useAppDispatch();
  const roleUserSelector = useAppSelector((state) => state.roleUser);
  console.log(
    '🚀 ~ file: form.tsx:30 ~ Form ~ roleUserSelector',
    roleUserSelector,
  );
  useEffect(() => {
    dispatch(
      roleUserAction.fetchData({
        account_type: 'cms',
      }),
    );
  }, []);

  const [initialValues, setInitialValues] = useState(initial);
  const toast = useToast();
  const formik = useFormik({
    initialValues,
    onSubmit: async (value) => {
      const payload = {
        full_name: value.name,
        email: value.email,
        id_role: value.roleAccess.id,
        id_status: 1,
        account_type: 'cms',
      };
      await dispatch(roleUserAction.addRoleUser(payload));
      if (!roleUserSelector.error) {
        await onClose();
      }
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
      roleAccess: yup.mixed().required('Role access is required'),
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
            text="Name"
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name && `${errors.name}`}
          >
            <TextField
              type="text"
              name="name"
              placeholder="Input Category name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Email"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email && `${errors.email}`}
          >
            <TextField
              type="text"
              name="email"
              placeholder="Input Category name"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
          </FormLabel>
          <FormLabel
            text="Role Access"
            error={touched.roleAccess && Boolean(errors.roleAccess)}
            helperText={
              touched.roleAccess && errors.roleAccess && `${errors.roleAccess}`
            }
          >
            <Autocomplete
              id="role"
              options={roleUserSelector.data}
              onChange={(e, value) => {
                setFieldValue('roleAccess', value);
              }}
              isOptionEqualToValue={(option) => option === values.roleAccess}
              getOptionLabel={(option: any) => `${option.name}`}
              value={values.roleAccess}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="roleAccess"
                  onBlur={handleBlur}
                  placeholder="Select Role Access"
                />
              )}
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
          <Button variant="text" color="error">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!(isValid && dirty) || roleUserSelector.loadingForm}
          >
            {roleUserSelector.loadingForm ? (
              <CircularProgress size="1rem" />
            ) : (
              'Add'
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
