import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormLabel from 'components/FormLabel';
import { Box, TextField, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ReviewCustomer } from 'models/kur/Customer';
import { customerAction } from 'store/slice/kur/Customer';

interface FormTypes {
  id: number | undefined;
  status: number;
  onClose: () => void;
}

const initialValues: ReviewCustomer = {
  new_status: 3,
  komite_notes: '',
  id: 0,
};

export default function Form({ id, status, onClose }: FormTypes) {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const payload: ReviewCustomer = {
        new_status: status,
        komite_notes: values.komite_notes,
        id,
      };
      dispatch(customerAction.updateStatusCustomer(payload));
      onClose();
    },
    validationSchema: yup.object({
      komite_notes: yup.string().required('Please Insert Notes'),
    }),
    enableReinitialize: true,
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormLabel
          required
          text="Notes"
          error={
            (formik.touched.komite_notes &&
              Boolean(formik.errors.komite_notes)) ||
            formik.touched.komite_notes
          }
          helperText={
            formik.touched.komite_notes &&
            formik.errors.komite_notes &&
            `${formik.errors.komite_notes}`
          }
        >
          <TextField
            type="text"
            name="komite_notes"
            placeholder="Insert Notes"
            value={formik.values.komite_notes}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            fullWidth
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
          type="submit"
          size="medium"
          onClick={() => {
            formik.handleSubmit();
          }}
          disabled={!formik.isValid}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
