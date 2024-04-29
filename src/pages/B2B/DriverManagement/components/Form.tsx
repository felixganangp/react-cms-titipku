import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormLabel from 'components/FormLabel';
import {
  Box,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import useToast from 'hooks/useToast';
import { useCreateDriver, useUpdateDriver } from '../hooks/useDriver';

interface FormTypes {
  selected: any | null;
  onClose: (isSubmitted: boolean) => void;
}

export default function FormDriver({ selected, onClose }: FormTypes) {
  const isEdit = Boolean(selected);
  const createDriver = useCreateDriver();
  const updateDriver = useUpdateDriver();
  const { openToast } = useToast();

  const formik = useFormik({
    initialValues: {
      name: '',
      phone_number: '',
      gender: 'laki-laki',
    },
    onSubmit: (values) => {
      if (isEdit && selected?.id) {
        updateDriver.mutate(
          {
            id: selected.id,
            data: values,
          },
          {
            onSuccess: () => {
              openToast({
                severity: 'success',
                headMsg: 'Driver Updated',
              });
              onClose(true);
            },
            onError: () => {
              openToast({
                severity: 'error',
                headMsg: 'Failed to update driver',
              });
            },
          },
        );
      } else {
        createDriver.mutate(values, {
          onSuccess: () => {
            openToast({
              severity: 'success',
              headMsg: 'Driver Created',
            });
            onClose(true);
          },
          onError: (e) => {
            openToast({
              severity: 'error',
              // @ts-ignore
              headMsg: e || 'Failed to create driver',
            });
          },
        });
      }
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
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
    }),
    enableReinitialize: true,
  });

  useEffect(() => {
    if (selected) {
      formik.setValues({
        name: selected.name,
        phone_number: selected.phone_number,
        gender: selected.gender,
      });
    }
  }, [selected]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormLabel
          required
          text="Name"
          error={
            (formik.touched.name && Boolean(formik.errors.name)) ||
            formik.touched.name
          }
          helperText={
            formik.touched.name && formik.errors.name && `${formik.errors.name}`
          }
        >
          <TextField
            type="text"
            name="name"
            placeholder="Insert driver name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </FormLabel>
        <FormControl>
          <FormLabel text="Gender">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={formik.values.gender}
              onChange={(e) => {
                formik.setFieldValue('gender', e.target.value);
              }}
            >
              <FormControlLabel
                value="perempuan"
                control={<Radio />}
                label="perempuan"
              />
              <FormControlLabel
                value="laki-laki"
                control={<Radio />}
                label="laki-laki"
              />
            </RadioGroup>
          </FormLabel>
        </FormControl>
        <FormLabel
          text="Phone Number"
          required
          error={
            formik.touched.phone_number && Boolean(formik.errors.phone_number)
          }
          helperText={
            formik.touched.phone_number &&
            formik.errors.phone_number &&
            `${formik.errors.phone_number}`
          }
        >
          <TextField
            type="text"
            name="phone_number"
            placeholder="Insert active phone number"
            value={formik.values.phone_number}
            onChange={(e) => {
              let number = e.target.value;
              if (number.startsWith('0')) {
                number = number.slice(1);
              }
              formik.handleChange({
                target: {
                  name: 'phone_number',
                  value: number,
                },
              });
            }}
            onBlur={formik.handleBlur}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+62</InputAdornment>
              ),
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
          size="medium"
          // onClick={() => {
          //   formik.handleSubmit();
          // }}
          disabled={
            createDriver.isLoading || updateDriver.isLoading || !formik.isValid
          }
        >
          {!createDriver.isLoading || !updateDriver.isLoading
            ? `${isEdit ? 'Save Changes' : 'Create'}`
            : 'Loading...'}
        </Button>
      </Box>
    </Box>
  );
}
