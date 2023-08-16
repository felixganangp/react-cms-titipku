import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  InputAdornment,
  Stack,
  Typography,
  Button,
  Collapse,
  Grid,
} from '@mui/material';
import FormLabel from 'components/FormLabel';
import InputImage from 'components/InputImage';
import debounce from 'utils/debounce';
import { Product } from 'models/b2b/Product';
import { IsExistName } from 'service/B2B/ProductParent';
import { Response } from 'models/fetch';
import numberSeperator, { typeNumberValidate } from 'utils/numberSeperator';
// icon
// import TrashIcon from 'components/Icon/Trash';

import useFormProduct from '../hooks/useFormProduct';

interface FormTypes {
  onClose?: () => void;
  EditProduct?: Product | null;
  isDetail?: boolean;
  processProduct?: boolean;
  isSubmitedProcess?: boolean;
  onChangeFormProces?: (value: any, error: any) => void;
  handleDeleteButton?: () => void;
  enableDeleteButton?: boolean;
}

export default function Form({
  processProduct,
  isSubmitedProcess,
  onChangeFormProces,
  ...props
}: FormTypes) {
  const [isNameExist, setIsNameExist] = useState(false);
  const { formik, categories, loadingForm, uom, isEdit } =
    useFormProduct(props);

  const handleCheckIsNameExist = async (value: {
    name: string;
    exclude_id?: number | string;
  }) => {
    const respon = (await IsExistName(value)) as Response<boolean>;
    setIsNameExist(respon.data);
  };

  const debounceCheckIsName = useCallback(
    debounce(handleCheckIsNameExist, 1000),
    [],
  );

  // Function for Proces Product =====
  const callOnChange = useCallback(() => {
    if (onChangeFormProces) onChangeFormProces(formik.values, formik.errors);
    console.log(formik.errors);
  }, [formik.values, formik.errors]);

  useEffect(() => {
    if (processProduct) {
      formik.validateForm();
    }
  }, []);

  useEffect(() => {
    if (processProduct) {
      callOnChange();
    }
  }, [processProduct, formik.values, formik.errors]);

  useEffect(() => {
    if (isSubmitedProcess) {
      Object.keys(formik.values).forEach((val) => {
        formik.setFieldTouched(val, true);
      });
    }
  }, [isSubmitedProcess]);

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
    >
      <Box p={processProduct ? 'unset' : '24px'}>
        <FormLabel
          text="Input Image"
          required
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={
            formik.touched.image &&
            formik.errors.image &&
            `${formik.errors.image}`
          }
        >
          <InputImage
            label="an Image"
            value={formik.values.image}
            onChange={(e: any) => formik.setFieldValue('image', e)}
            onClear={() => formik.setFieldValue('image', null)}
            width={720}
            height={720}
          />
        </FormLabel>
        <FormLabel
          required
          text="Product Name (SKU)"
          error={
            (formik.touched.name && Boolean(formik.errors.name)) ||
            (formik.touched.name && Boolean(isNameExist))
          }
          helperText={
            (formik.touched.name &&
              formik.errors.name &&
              `${formik.errors.name}`) ||
            (formik.touched.name && isNameExist && `Name is exist`)
          }
        >
          <TextField
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
            type="text"
            name="name"
            placeholder="Insert Name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
              // if (e.target.value) {
              //   debounceCheckIsName({ name: e.target.value });
              // }
            }}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </FormLabel>
        <FormLabel
          required
          text="Price"
          error={
            formik.touched.selling_price && Boolean(formik.errors.selling_price)
          }
          helperText={
            formik.touched.selling_price &&
            formik.errors.selling_price &&
            `${formik.errors.selling_price}`
          }
        >
          <TextField
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
            type="text"
            name="selling_price"
            placeholder="Insert Price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            onBlur={formik.handleBlur}
            fullWidth
            value={numberSeperator(formik.values.selling_price)}
            onChange={(e) => {
              const value = e.target.value
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('selling_price', value);
            }}
          />
        </FormLabel>
        <FormLabel
          required
          text="Category"
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={
            formik.touched.category &&
            formik.errors.category &&
            `${formik.errors.category}`
          }
        >
          <Autocomplete
            data-testid="form-category"
            id="category"
            options={categories}
            onChange={(e, value) => {
              formik.setFieldValue('category', value?.id);
            }}
            // isOptionEqualToValue={(option, values) => {
            //   return option.id === values.id;
            // }}
            getOptionLabel={(option) => option.name}
            value={
              categories?.filter(
                (val) => val.id === formik.values.category,
              )[0] || null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name="category"
                onBlur={formik.handleBlur}
                placeholder="Choose Category"
              />
            )}
          />
        </FormLabel>
        <Box
          p={1}
          bgcolor="#F8F8F8"
          border="1px solid #e4e4e4"
          borderRadius="8px"
        >
          <Grid container spacing="10px">
            <Grid item xs={8}>
              <FormLabel
                required
                text="Low Stock"
                error={
                  formik.touched.low_stock_limit &&
                  Boolean(formik.errors.low_stock_limit)
                }
                helperText={
                  formik.touched.low_stock_limit &&
                  formik.errors.low_stock_limit &&
                  `${formik.errors.low_stock_limit}`
                }
              >
                <>
                  <TextField
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') e.preventDefault();
                    }}
                    type="text"
                    name="low_stock_limit"
                    placeholder="Insert Low Stock"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                      },
                    }}
                    onBlur={formik.handleBlur}
                    fullWidth
                    value={formik.values.low_stock_limit}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*?)\..*/g, '$1');

                      formik.setFieldValue('low_stock_limit', value);
                    }}
                  />
                  <Typography fontSize={12} color="#929395" p={0.1}>
                    The quantity at which you will be notified about low stock
                  </Typography>
                </>
              </FormLabel>
            </Grid>
            <Grid item xs={4}>
              <FormLabel
                text="Unit"
                required
                error={
                  formik.touched.unit_measurement_id &&
                  Boolean(formik.errors.unit_measurement_id)
                }
                helperText={
                  formik.touched.unit_measurement_id &&
                  formik.errors.unit_measurement_id &&
                  `${formik.errors.unit_measurement_id}`
                }
              >
                <Autocomplete
                  data-testid="form-category"
                  id="unit_measurement_id"
                  options={uom}
                  onChange={(e, value) => {
                    formik.setFieldValue('unit_measurement_id', value?.id);
                  }}
                  // isOptionEqualToValue={(option, values) => {
                  //   return option.id === values.id;
                  // }}
                  getOptionLabel={(option) => option.name}
                  value={
                    uom.filter(
                      (val) => val.id === formik.values.unit_measurement_id,
                    )[0] || null
                  }
                  renderInput={(params) => (
                    <TextField
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') e.preventDefault();
                      }}
                      {...params}
                      name="unit_measurement_id"
                      onBlur={formik.handleBlur}
                      placeholder="Choose Unit"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#fff',
                        },
                      }}
                    />
                  )}
                />
              </FormLabel>
            </Grid>
          </Grid>
          <FormLabel
            required
            text="In Stock"
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={
              formik.touched.stock &&
              formik.errors.stock &&
              `${formik.errors.stock}`
            }
          >
            <>
              <TextField
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                type="text"
                name="stock"
                placeholder="Insert Low Stock"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isEdit ? '#e4e4e4' : '#fff',
                  },
                }}
                disabled={isEdit}
                onBlur={formik.handleBlur}
                fullWidth
                value={formik.values.stock}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {uom.filter(
                        (val) => val.id === formik.values.unit_measurement_id,
                      )[0]?.name || '-'}
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\..*/g, '$1');

                  formik.setFieldValue('stock', value);
                }}
              />
              <Typography fontSize={12} color="#929395" p={0.1}>
                Editing “In Stock” can only be done in stock opname menu
              </Typography>
            </>
          </FormLabel>
          <FormLabel
            text="Description"
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={
              formik.touched.description &&
              formik.errors.description &&
              `${formik.errors.description}`
            }
          >
            <TextField
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
              }}
              type="text"
              name="description"
              placeholder="Insert Description"
              multiline
              minRows={3}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                },
              }}
              fullWidth
              onBlur={formik.handleBlur}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </FormLabel>
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        gap="10px"
        justifyContent="end"
        // mt="50px"
        sx={{
          display: processProduct ? 'none' : 'flex',
          padding: '24px',
          boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {props?.enableDeleteButton && props?.handleDeleteButton && (
          <Button
            variant="text"
            color="error"
            onClick={props.handleDeleteButton}
          >
            Delete Item
          </Button>
        )}

        <Button
          type="submit"
          size="medium"
          disabled={loadingForm || !formik.isValid}
          // onClick={() => {
          //   formik.handleSubmit();
          // }}
        >
          {!loadingForm ? `${isEdit ? 'Edit' : 'Create'}` : 'Loading...'}
        </Button>
      </Box>
    </Box>
  );
}
