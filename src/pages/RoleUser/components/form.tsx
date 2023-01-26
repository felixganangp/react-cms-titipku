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
import { CreateRoleUser, CheckValidResponse } from 'models/RoleUser';
import { RoleAccess } from 'models/RoleAccess';
import {
  createAdministrator,
  editAdministrator,
  checkValidEmail,
} from 'service/Administrator';
import debounce from 'utils/debounce';

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
        await resetForm();
        await onClose();
      } catch (error: any) {
        let errMsg = error;
        if (errMsg === 'Email already exist') {
          errMsg = 'Email address already registered';
        }
        setErrorRsp({ error: true, message: errMsg });
      }
      // dispatch(roleUserAction.addRoleUser(payload));
      // if (!roleUserSelector.loadingForm) {
      //   onClose();
      // }
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .test(
          'len',
          'Maximal character length for name is 100',
          (val: string | undefined) => val !== undefined && val?.length < 101,
        )
        .required('Please input name'),
      email: yup
        .string()
        .email('Please input a valid email address')
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@titipku([\.])com/g,
          'Email domain should be @titipku',
        )
        .required('Please input email'),
      roleAccess: yup.mixed().required('Please select role access'),
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
    if (!isEdit) {
      const response: CheckValidResponse = await checkValidEmail({
        email: value,
        account_type: 'cms',
        excluded_id: 0,
      });
      if (response.data) {
        await setErrorRsp({
          error: true,
          message: 'Email address already registered',
        });
      } else {
        await setLoadingEmailValid(false);
      }
    }
  };
  const debounceValidEmail = useCallback(debounce(handleValidEmail, 1000), []);
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: '24px', margin: 0 }}>
          <FormLabel
            text="Name"
            required
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name && `${errors.name}`}
          >
            <TextField
              type="text"
              name="name"
              placeholder="Input Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              disabled={isEdit}
              inputProps={{
                maxLength: 100,
              }}
              sx={{
                '& .MuiInputBase-input': {
                  backgroundColor: (isEdit && '#f5f7fa') || '',
                },
              }}
            />
          </FormLabel>
          <FormLabel
            text="Email"
            required
            error={(touched.email && Boolean(errors.email)) || errorRsp.error}
            helperText={
              (touched.email && errors.email && `${errors.email}`) ||
              errorRsp.message
            }
          >
            <TextField
              type="text"
              name="email"
              placeholder="Input Email"
              value={values.email}
              onChange={(event) => {
                setLoadingEmailValid(true);
                debounceValidEmail(event.target.value);
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
            required
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
              !(isValid && (dirty || isEdit)) ||
              roleUserSelector.loadingForm ||
              errorRsp.error ||
              (!isEdit && loadingEmailValid)
            }
            color="primary"
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
