import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormLabel from 'components/FormLabel';
import { UomTypes, CreateUomTypes } from 'models/b2b/Uom';
import { Box, TextField, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';

interface FormTypes {
  isEdit: boolean;
  selected: UomTypes | null;
  onClose: () => void;
}

const initialValues: CreateUomTypes = {
  name: '',
};
export default function Form({ isEdit, selected, onClose }: FormTypes) {
  const dispatch = useAppDispatch();
  const { isSuccessUom, loadingFormUom } = useAppSelector(
    (state) => state.product,
  );

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (isEdit && selected?.id) {
        dispatch(productAction.updateUom({ id: selected.id, body: values }));
      } else {
        dispatch(productAction.createUom(values));
      }
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
    }),
    enableReinitialize: true,
  });

  useEffect(() => {
    if (selected) {
      formik.setValues({ name: selected.name });
    } else {
      formik.setValues({ name: '' });
    }
  }, [selected]);

  useEffect(() => {
    if (isSuccessUom) {
      onClose();
      dispatch(productAction.resetUomform());
    }
  }, [isSuccessUom]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box p="24px">
        <FormLabel
          required
          text="Category Name"
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
            placeholder="Insert Category Name"
            value={formik.values.name}
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
          disabled={loadingFormUom || !formik.isValid}
        >
          {!loadingFormUom
            ? `${isEdit ? 'Save Changes' : 'Create'}`
            : 'Loading...'}
        </Button>
      </Box>
    </Box>
  );
}
