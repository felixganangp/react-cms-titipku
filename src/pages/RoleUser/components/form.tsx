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
import { roleAccessAction } from 'store/slice/RoleAccess';
import useToast from 'hooks/useToast';
import FormLabel from 'components/FormLabel';
import { CreateRoleUser } from 'models/RoleUser';
import { RoleAccess } from 'models/RoleAccess';
import { createAdministrator, editAdministrator } from 'service/Administrator';

const initial: CreateRoleUser = {
  name: '',
  email: '',
  roleAccess: null,
  id_status: 1,
  account_type: 'cms',
};
interface FormProps {
  onClose: () => void;
  isEdit?: boolean;
  data: CreateRoleUser;
}

export default function Form({ onClose, isEdit, data }: FormProps) {
  // fetching role user
  const dispatch = useAppDispatch();
  const roleUserSelector = useAppSelector((state) => state.roleUser);
  const roleAccessSelector = useAppSelector((state) => state.roleAccess);

  const [textButton, setTextButton] = useState('Add');
  const [initialValues, setInitialValues] = useState(initial);
  useEffect(() => {
    dispatch(
      roleAccessAction.fetchData({
        account_type: 'cms',
        is_exist: true,
      }),
    );
    if (isEdit) {
      setInitialValues(data);
      setTextButton('Edit');
    }
  }, []);
  const toast = useToast();
  const [errorRsp, setErrorRsp] = useState({ error: false, message: '' });
  const formik = useFormik({
    initialValues,
    onSubmit: async (value, { resetForm }) => {
      const payload = {
        full_name: value.name,
        email: value.email,
        id_role: value.roleAccess?.id,
        id_status: value.id_status,
        account_type: value.account_type,
        id: initialValues.id,
      };
      try {
        if (isEdit) {
          // const addUser = await editAdministrator(payload);
          await dispatch(roleUserAction.editRoleUser(payload));
          toast.openToast({
            headMsg: 'Role User Edited',
            // message: 'New Role User Added',
            severity: 'success',
          });
        } else {
          const addUser = await createAdministrator(payload);
          toast.openToast({
            headMsg: 'New Role User Added',
            // message: 'New Role User Added',
            severity: 'success',
          });
        }
        await onClose();
        await resetForm();
      } catch (error: any) {
        let errMsg = error;
        if (errMsg === 'Email already exist') {
          errMsg = 'Email address already registered';
        }
        setErrorRsp({ error: true, message: errMsg });
        console.log('🚀 ~ file: form.tsx:57 ~ onSubmit: ~ error', errMsg);
      }
      // dispatch(roleUserAction.addRoleUser(payload));
      // if (!roleUserSelector.loadingForm) {
      //   onClose();
      // }
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup
        .string()
        .email('Please input a valid email address')
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
              disabled={isEdit}
              sx={{
                '& .MuiInputBase-input': {
                  backgroundColor: (isEdit && '#f5f7fa') || '',
                },
              }}
            />
          </FormLabel>
          <FormLabel
            text="Email"
            error={(touched.email && Boolean(errors.email)) || errorRsp.error}
            helperText={
              (touched.email && errors.email && `${errors.email}`) ||
              errorRsp.message
            }
          >
            <TextField
              type="text"
              name="email"
              placeholder="Input Category name"
              value={values.email}
              onChange={(event) => {
                handleChange(event);
                setErrorRsp({ error: false, message: '' });
              }}
              onBlur={handleBlur}
              disabled={isEdit}
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  backgroundColor: (isEdit && '#f5f7fa') || '',
                },
              }}
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
              options={roleAccessSelector.data}
              onChange={(e, value) => {
                setFieldValue('roleAccess', value);
              }}
              isOptionEqualToValue={(option: RoleAccess) => {
                return option.id === values.roleAccess?.id;
              }}
              getOptionLabel={(option: RoleAccess) => `${option.name}`}
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
          <Button variant="text" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              (!(isValid && dirty) && !isEdit) ||
              roleUserSelector.loadingForm ||
              errorRsp.error
            }
          >
            {roleUserSelector.loadingForm ? (
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
