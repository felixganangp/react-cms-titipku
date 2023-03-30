/* eslint-disable radix */
import React from 'react';
import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material';
import { useAppSelector } from 'store/hooks';
import { InitialCreateRaw } from 'models/b2b/ProductRaw';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormLabel from 'components/FormLabel';
import InputImage from 'components/InputImage';
import { Category } from 'models/b2b/Category';
import { NumberFormatValues, NumericFormat } from 'react-number-format';

interface RawProps {
  onClose: () => void;
}

export default function RawForm({ onClose }: RawProps) {
  const categories = useAppSelector((state) => state.raw.categories);

  // formik
  const initialValues: InitialCreateRaw = {
    file: '',
    name: '',
    category: null,
    stock: '',
    description: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
    },
    validationSchema: yup.object({
      file: yup.mixed().required('Please upload an image'),
      name: yup.string().required('Product Name is required'),
      category: yup.mixed().required('Category is required'),
      stock: yup.mixed().required('In Stock is required'),
    }),
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
    resetForm,
  } = formik;

  return (
    <Box m={0}>
      <form onSubmit={handleSubmit}>
        <Box p="24px">
          {/* INPUT IMAGE */}
          <FormLabel
            text="Input Image"
            required
            error={Boolean(errors.file)}
            helperText={errors.file && `${errors.file}`}
          >
            <InputImage
              label="Image"
              width={720}
              height={720}
              value={values.file}
              onChange={(e: any) => setFieldValue('file', e)}
            />
          </FormLabel>
          {/* PRODUCT NAME */}
          <FormLabel
            text="Product Name (SKU)"
            required
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name && `${errors.name}`}
          >
            <TextField
              type="text"
              name="name"
              placeholder="Insert Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              inputProps={{
                maxLength: 100,
              }}
            />
          </FormLabel>
          {/* CATEGORY */}
          <FormLabel
            text="Category"
            required
            error={touched.category && Boolean(errors.category)}
            helperText={
              touched.category && errors.category && `${errors.category}`
            }
          >
            <Autocomplete
              options={categories}
              onChange={(e, value) => {
                setFieldValue('category', value);
              }}
              isOptionEqualToValue={(option: Category) => {
                return option.id === values.category?.id;
              }}
              getOptionLabel={(option: Category) => `${option.name}`}
              value={values.category}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="category"
                  onBlur={handleBlur}
                  placeholder="Choose Category"
                />
              )}
            />
          </FormLabel>
          {/* stock */}
          <FormLabel
            text="In Stock (gram)"
            required
            error={
              touched.stock &&
              (Boolean(errors.stock) || parseInt(values.stock) <= 0)
            }
            helperText={
              touched.stock &&
              ((errors.stock && `${errors.stock}`) ||
                (parseInt(values.stock) <= 0 && `Please input valid stock`))
            }
          >
            <NumericFormat
              name="stock"
              customInput={TextField}
              placeholder="Insert In Stock"
              onChange={(e) => setFieldValue('stock', e.target.value)}
              onBlur={handleBlur}
              value={values.stock}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={0}
              minLength={2}
              fullWidth
              allowNegative={false}
              isAllowed={(val: NumberFormatValues) => {
                const { floatValue } = val;
                return (
                  floatValue !== undefined &&
                  floatValue >= 1 &&
                  floatValue <= 9999999999
                );
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">gram</InputAdornment>
                ),
              }}
            />
          </FormLabel>
          {/* description */}
          <FormLabel text="Description">
            <TextField
              id="description"
              value={values.description}
              fullWidth
              rows={4}
              multiline
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Insert description"
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
          <Button sx={{ width: '20%' }} type="submit" disabled={!isValid}>
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
}
