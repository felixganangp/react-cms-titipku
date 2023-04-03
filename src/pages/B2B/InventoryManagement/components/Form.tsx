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
} from '@mui/material';
import FormLabel from 'components/FormLabel';
import InputImage from 'components/InputImage';
import debounce from 'utils/debounce';
import { Product } from 'models/b2b/Product';
import { IsExistName } from 'service/B2B/ProductParent';
import { Response } from 'models/fetch';
import numberSeperator, { typeNumberValidate } from 'utils/numberSeperator';
// icon
import TrashIcon from 'components/Icon/Trash';

import useFormProduct from '../hooks/useFormProduct';
import { SwitchStyle } from '../inventory.styled';

interface TypesError {
  lowStock: string | number;
  stock: string | number;
}
interface FormTypes {
  onClose: () => void;
  EditProductParent: Product | null;
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
    setTypeUpdate,
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
      if (isEdit) {
        setTypeUpdate('to-costume');
      }
    } else {
      setCurrentGrade({ isCostume: false, currentID: 1 });
      if (isEdit) {
        setTypeUpdate('to-default');
      }
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
            options={categories}
            onChange={(e, value) => {
              formik.setFieldValue('category', value);
            }}
            // isOptionEqualToValue={(option: Type) => {
            //   return option.id === values.kurType?.id;
            // }}
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
        <FormLabel
          text="B2B Type"
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={
            formik.touched.type && formik.errors.type && `${formik.errors.type}`
          }
        >
          <Autocomplete
            data-testid="form-type"
            id="type"
            options={types}
            onChange={(e, value) => {
              formik.setFieldValue('type', value);
            }}
            // isOptionEqualToValue={(option: Type) => {
            //   return option.id === values.kurType?.id;
            // }}
            getOptionLabel={(option) => `${option.name}`}
            value={formik.values.type}
            renderInput={(params) => (
              <TextField
                {...params}
                name="type"
                onBlur={formik.handleBlur}
                placeholder="Choose Type"
              />
            )}
          />
        </FormLabel>
        <Stack
          direction="row"
          my={2}
          p="10px 5px"
          bgcolor={currentGrade.isCostume ? '#f1f1f1' : 'unset'}
          justifyContent="space-between"
        >
          <Box display="flex" gap="20px" alignItems="center">
            <SwitchStyle
              checked={currentGrade.isCostume}
              onChange={onOffCostumeGrade}
            />
            <Typography>Custom Grade</Typography>
          </Box>
        </Stack>
        {/* GRADE LIST  */}
        <Collapse in={currentGrade.isCostume}>
          <Box overflow="auto" display="flex" width="100%">
            {gradeList.map((val) => (
              <Box
                key={val.grade.id}
                m={0.5}
                p={1}
                borderRadius="4px"
                bgcolor={
                  val.grade.id === currentGrade.currentID
                    ? '#aad9c7'
                    : '#f8f8f8'
                }
                minWidth="100pxpx"
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setCurrentGrade({
                    ...currentGrade,
                    currentID: val.grade.id,
                  })
                }
              >
                <Typography fontSize="14px" color="#005f3b" whiteSpace="nowrap">
                  {val.grade.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>
        <FormLabel
          text="Low Stock (gram)"
          error={
            (touchedProductList?.lowStock || false) &&
            Boolean((errorProductList ?? [])[indexGrade]?.lowStock)
          }
          helperText={
            (touchedProductList?.lowStock || false) &&
            `${(errorProductList ?? [])[indexGrade]?.lowStock || ''}`
          }
        >
          <TextField
            type="text"
            name="lowStock"
            placeholder="Insert Low Stock (gram)"
            value={numberSeperator(
              formik.values.productList[indexGrade].lowStock,
            )}
            onChange={(e) => {
              const product = formik.values.productList;

              product[indexGrade].lowStock = e.target.value
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('productList', product);
            }}
            // onBlur={handleBlur}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">gram</InputAdornment>
              ),
            }}
            helperText={
              formik.values.productList[indexGrade].lowStock ? (
                <Typography
                  sx={{ fontSize: '12px', color: '#797979', ml: '-12px' }}
                >
                  The quantity at which you will be notified about low stock
                </Typography>
              ) : (
                false
              )
            }
          />
        </FormLabel>
        <FormLabel
          text="In Stock (gram)"
          error={
            (touchedProductList?.stock || false) &&
            Boolean((errorProductList ?? [])[indexGrade]?.stock)
          }
          helperText={
            (touchedProductList?.stock || false) &&
            `${(errorProductList ?? [])[indexGrade]?.stock || ''}`
          }
        >
          <TextField
            type="text"
            name="stock"
            placeholder="Insert In Stock (gram)"
            value={numberSeperator(formik.values.productList[indexGrade].stock)}
            onChange={(e) => {
              const product = formik.values.productList;
              // eslint-disable-next-line radix
              product[indexGrade].stock = e.target.value
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1');

              formik.setFieldValue('productList', product);
            }}
            // onBlur={handleBlur}
            disabled={!formik.values.productList[indexGrade].is_active}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">gram</InputAdornment>
              ),
            }}
            helperText={
              formik.values.productList[indexGrade].stock ? (
                <Typography
                  sx={{ fontSize: '12px', color: '#797979', ml: '-12px' }}
                >
                  <span style={{ color: '#008e58' }}>
                    <b>
                      {numberSeperator(
                        formik.values.productList[indexGrade].stock,
                      )}
                    </b>{' '}
                    Gram{' '}
                  </span>
                  is equivalent to{' '}
                  <span style={{ color: '#008e58' }}>
                    <b>
                      {numberSeperator(
                        typeNumberValidate(
                          formik.values.productList[indexGrade].stock as string,
                        ) / 1000,
                      )}
                    </b>{' '}
                    Kilogram
                  </span>
                </Typography>
              ) : (
                false
              )
            }
          />
        </FormLabel>
        <FormLabel
          text="Description"
          // error={
          //   (formik.touched?.productList ?? [])[indexGrade]?.description &&
          //   Boolean((formik.errors?.productList ?? [])[indexGrade]?.description)
          // }
          // helperText={
          //   (formik.touched?.productList ?? [])[indexGrade]?.description &&
          //   (formik.errors?.productList ?? [])[indexGrade]?.description &&
          //   `${(formik.errors?.productList ?? [])[indexGrade]?.description}`
          // }
        >
          <TextField
            type="text"
            multiline
            rows={3}
            name="description"
            placeholder="Grade Terbaik Sayap Ayam "
            value={formik.values.productList[indexGrade].description}
            onChange={(e) => {
              const product = formik.values.productList;
              product[indexGrade].description = e.target.value;

              formik.setFieldValue('productList', product);
            }}
            // onBlur={handleBlur}
            fullWidth
          />
        </FormLabel>
        {currentGrade.isCostume && gradeList.length > 1 ? (
          <Box
            color="error.main"
            bgcolor="#f9ebe7"
            display="inline-flex"
            alignItems="center"
            p="5px"
            gap="px"
            borderRadius="5px"
            sx={{ cursor: 'pointer' }}
            onClick={async () => {
              const product = formik.values.productList;
              product[indexGrade].is_exist = false;

              await formik.setFieldValue('productList', product);

              setCurrentGrade({
                isCostume: true,
                currentID: product
                  .filter((val) => val.grade.id !== 1)
                  .filter((val) => val.is_exist !== false)[0].grade.id,
              });
            }}
          >
            <TrashIcon sx={{ fontSize: '25px' }} />
            <Typography fontSize="14px">
              Clear {formik.values.productList[indexGrade].grade.name}
            </Typography>
          </Box>
        ) : (
          false
        )}
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
          {!loadingForm ? `${isEdit ? 'Update' : 'Create'}` : 'Loading...'}
        </Button>
      </Box>
    </>
  );
}
