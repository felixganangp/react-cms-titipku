import React from 'react';
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
// icon
import DeleteIcon from '@mui/icons-material/Delete';

import useFormProduct from '../hooks/useFormProduct';
import { SwitchStyle } from '../inventory.styled';

interface FormTypes {
  onClose: () => void;
}

export default function Form(props: FormTypes) {
  const {
    formik,
    categories,
    types,
    currentGrade,
    setCurrentGrade,
    loadingForm,
  } = useFormProduct(props);

  const indexGrade = formik.values.productList.findIndex(
    (val) => val.grade.id === currentGrade.currentID,
  );

  const gradeList = formik.values.productList
    .filter((val) => val.grade.id !== 1)
    .filter((val) => val.is_active !== false);

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

  return (
    <form onSubmit={formik.handleSubmit}>
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
            width={720}
            height={720}
          />
        </FormLabel>
        <FormLabel
          text="Product Name (SKU)"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={
            formik.touched.name && formik.errors.name && `${formik.errors.name}`
          }
        >
          <TextField
            type="text"
            name="name"
            placeholder="Insert Name"
            value={formik.values.name}
            onChange={formik.handleChange}
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
          text="Low Stock (Gram)"
          // error={touched.name && Boolean(errors.name)}
          // helperText={touched.name && errors.name && `${errors.name}`}
        >
          <TextField
            type="number"
            name="lowStock"
            placeholder="Insert Low Stock (Gram)"
            value={formik.values.productList[indexGrade].lowStock}
            onChange={(e) => {
              const product = formik.values.productList;
              // eslint-disable-next-line radix
              product[indexGrade].lowStock = parseInt(e.target.value);

              formik.setFieldValue('productList', product);
            }}
            // onBlur={handleBlur}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Gram</InputAdornment>
              ),
            }}
          />
        </FormLabel>
        <FormLabel
          text="In Stock (Gram)"
          // error={touched.name && Boolean(errors.name)}
          // helperText={touched.name && errors.name && `${errors.name}`}
        >
          <TextField
            type="number"
            name="stock"
            placeholder="Insert In Stock (Gram)"
            value={formik.values.productList[indexGrade].stock}
            onChange={(e) => {
              const product = formik.values.productList;
              // eslint-disable-next-line radix
              product[indexGrade].stock = parseInt(e.target.value);

              formik.setFieldValue('productList', product);
            }}
            // onBlur={handleBlur}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Gram</InputAdornment>
              ),
            }}
          />
        </FormLabel>
        <FormLabel
          text="Description"
          // error={touched.name && Boolean(errors.name)}
          // helperText={touched.name && errors.name && `${errors.name}`}
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
              product[indexGrade].is_active = false;

              await formik.setFieldValue('productList', product);

              setCurrentGrade({
                isCostume: true,
                currentID: product
                  .filter((val) => val.grade.id !== 1)
                  .filter((val) => val.is_active !== false)[0].grade.id,
              });
            }}
          >
            <DeleteIcon sx={{ fontSize: '19px' }} />
            <Typography fontSize="14px">Delete Grade</Typography>
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
        <Button type="submit" size="medium" disabled={loadingForm}>
          {!loadingForm ? 'Create' : 'Loading...'}
        </Button>
      </Box>
    </form>
  );
}
