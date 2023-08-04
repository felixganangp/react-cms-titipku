import { useCallback, useState } from 'react';
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

const UnitDummy = [
  {
    id: 1,
    name: 'Ekor',
  },
  {
    id: 2,
    name: 'Gram',
  },
  {
    id: 3,
    name: 'Liter',
  },
];
interface FormTypes {
  onClose?: () => void;
  EditProduct?: Product | null;
  isDetail?: boolean;
  processProduct?: boolean;
}

export default function Form({ processProduct, ...props }: FormTypes) {
  const [isNameExist, setIsNameExist] = useState(false);
  const {
    formik,
    categories,
    types,
    currentGrade,
    setCurrentGrade,
    loadingForm,
    isEdit,
  } = useFormProduct(props);

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

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
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
            type="text"
            name="name"
            placeholder="Insert Name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e);
              if (e.target.value) {
                debounceCheckIsName({ name: e.target.value });
              }
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
                    type="text"
                    name="low_stock_limit"
                    placeholder="Insert Low Stock"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        color: '#929395',
                        '& .MuiSvgIcon-root': {
                          color: '#929395',
                        },
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
                  options={UnitDummy}
                  onChange={(e, value) => {
                    formik.setFieldValue('unit_measurement_id', value?.id);
                  }}
                  // isOptionEqualToValue={(option, values) => {
                  //   return option.id === values.id;
                  // }}
                  getOptionLabel={(option) => option.name}
                  value={
                    UnitDummy.filter(
                      (val) => val.id === formik.values.unit_measurement_id,
                    )[0] || null
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="unit_measurement_id"
                      onBlur={formik.handleBlur}
                      placeholder="Choose Unit"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#fff',
                          color: '#929395',
                          '& .MuiSvgIcon-root': {
                            color: '#929395',
                          },
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
                type="text"
                name="stock"
                placeholder="Insert Low Stock"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                    color: '#929395',
                    '& .MuiSvgIcon-root': {
                      color: '#929395',
                    },
                  },
                }}
                onBlur={formik.handleBlur}
                fullWidth
                value={formik.values.stock}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {UnitDummy.filter(
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
              type="text"
              name="description"
              placeholder="Insert Description"
              multiline
              minRows={3}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                  color: '#929395',
                  '& .MuiSvgIcon-root': {
                    color: '#929395',
                  },
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
          display: processProduct ? 'none' : 'unset',
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
        >
          {!loadingForm
            ? `${isEdit ? 'Save Changes' : 'Create'}`
            : 'Loading...'}
        </Button>
      </Box>
    </Box>
  );
}
