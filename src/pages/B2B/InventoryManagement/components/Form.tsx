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
import { SwitchStyle } from '../inventory.styled';

interface TypesError {
  lowStock: string | number;
  stock: string | number;
}
interface FormTypes {
  onClose: () => void;
  EditProductParent: Product | null;
  isDetail?: boolean;
}

export default function Form(props: FormTypes) {
  const [isNameExist, setIsNameExist] = useState(false);
  const {
    formik,
    categories,
    types,
    currentGrade,
    setCurrentGrade,
    loadingForm,
    handleSubmit,
    isEdit,
  } = useFormProduct(props);

  const indexGrade = formik.values.productList.findIndex(
    (val) => val.grade.id === currentGrade.currentID,
  );

  const gradeList = formik.values.productList
    .filter((val) => val.grade.id !== 1)
    .filter((val) => val.is_exist !== false);

  const onOffCostumeGrade = () => {
    if (!currentGrade.isCostume) {
      setCurrentGrade({
        isCostume: true,
        currentID: formik.values.productList[1].grade.id,
      });
    } else {
      setCurrentGrade({ isCostume: false, currentID: 1 });
    }
  };

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

  const touchedProductList = (formik.touched?.productList ?? [])[indexGrade];
  const errorProductList = formik.errors?.productList as TypesError[];
  const isValid = () => {
    let valid = false;
    // check valid product parent
    const data = Object.values(formik.errors).filter(
      (val) => typeof val === 'string',
    );
    // check is valid product
    if (!currentGrade.isCostume) {
      valid =
        (errorProductList ?? [])[0] === undefined &&
        data.length === 0 &&
        !isNameExist;
    } else {
      const listGradeActiveIndex = formik.values.productList
        .filter((val) => val.grade.id !== 1)
        .map((val, index) => {
          if (val.is_exist !== true) {
            return true;
          }
          return (errorProductList ?? [])[index + 1] === undefined;
        });

      valid =
        listGradeActiveIndex.findIndex((val) => val === false) === -1 &&
        data.length === 0 &&
        !isNameExist;
    }

    return valid;
  };
  return (
    <>
      <Box p="24px">
        <FormLabel
          text="Input Image"
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
          text="Price"
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={
            formik.touched.price &&
            formik.errors.price &&
            `${formik.errors.price}`
          }
        >
          <TextField
            type="text"
            name="price"
            placeholder="Insert Price"
            // onChange={(e) => {
            //   formik.handleChange(e);
            // }}
            onBlur={formik.handleBlur}
            fullWidth
            value={numberSeperator(formik.values.price)}
            onChange={(e) => {
              const value = e.target.value
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('price', value);
            }}
          />
        </FormLabel>
        <FormLabel
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
            multiple
            options={
              categories?.length > 0
                ? categories.map((val) => ({ id: val.id, name: val.name }))
                : []
            }
            onChange={(e, value) => {
              formik.setFieldValue('category', value);
            }}
            isOptionEqualToValue={(option, values) => {
              return option.id === values.id;
            }}
            getOptionLabel={(option) => `${option.name}`}
            value={formik.values.category}
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
              <FormLabel text="Low Stock">
                <>
                  <TextField
                    type="text"
                    name="low_stock"
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
                    fullWidth
                  />
                  <Typography fontSize={12} color="#929395" p={0.1}>
                    The quantity at which you will be notified about low stock
                  </Typography>
                </>
              </FormLabel>
            </Grid>
            <Grid item xs={4}>
              <FormLabel text="Unit">
                <Autocomplete
                  data-testid="form-category"
                  id="category"
                  multiple
                  options={[]}
                  onChange={(e, value) => {
                    // formik.setFieldValue('category', value);
                  }}
                  // isOptionEqualToValue={(option, values) => {
                  //   return option.id === values.id;
                  // }}
                  // getOptionLabel={(option) => `${option.name}`}
                  // value={formik.values.category}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="category"
                      // onBlur={formik.handleBlur}
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
          <FormLabel text="In Stock">
            <TextField
              type="text"
              name="low_stock"
              placeholder="Insert In Stock"
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
            />
          </FormLabel>
          <FormLabel text="Description">
            <TextField
              type="text"
              name="Description"
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
          padding: '24px',
          boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Button
          type="submit"
          size="medium"
          disabled={loadingForm || (formik.submitCount > 0 && !isValid())}
          onClick={() => {
            formik.handleSubmit();
            if (isValid()) {
              handleSubmit(formik.values);
            }
          }}
        >
          {!loadingForm
            ? `${isEdit ? 'Save Changes' : 'Create'}`
            : 'Loading...'}
        </Button>
      </Box>
    </>
  );
}
