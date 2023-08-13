/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';

import ModalComp from 'components/Modal';
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Switch,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SelectItem from 'components/SelectItem';
import useModal from 'hooks/useModal';
import { Product } from 'models/b2b/Product';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import TrashIcon from 'components/Icon/Trash';
import Form from '../Form';
import { SwitchStyle } from '../../inventory.styled';

interface ProcessProductProps {
  open: boolean;
  EditProduct: Product | null;
  onClose: () => void;
}
export default function ProcessProduct({
  open,
  EditProduct,
  onClose,
}: ProcessProductProps) {
  const dispatch = useAppDispatch();
  const { loadingForm, isSuccessCreate } = useAppSelector(
    (state) => state.product,
  );
  const productSelect = useAppSelector((state) => state.product.productSelect);
  const modalSelectProduct = useModal();
  const [useExistingProduct, setUseExistingProduct] = useState(true);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [selectedExistingData, setSelectedExistingData] =
    useState<Product | null>(null);
  const [isErrorValue, setIsErroValue] = useState({
    useExisting: true,
    useNew: true,
  });

  const formik = useFormik({
    initialValues: {
      source_stock_amount: 0,
      target_stock_amount: 0,
    },
    onSubmit: (values) => {
      setIsSubmited(true);
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        source_stock_amount,
        // target_product_id,
        target_stock_amount,
        ...newProduct
      } = values;

      if (useExistingProduct) {
        if (!isErrorValue.useExisting) {
          dispatch(
            productAction.setProcesProduct({
              id: EditProduct?.id || 0,
              body: {
                source_stock_amount,
                target_stock_amount,
                target_product_id: selectedExistingData?.id || 0,
              },
            }),
          );
        }
      } else {
        const { category, ...body } = newProduct as any;
        if (!isErrorValue.useNew) {
          dispatch(
            productAction.setProcesProduct({
              id: EditProduct?.id || 0,
              body: {
                source_stock_amount,
                ...body,
                product_category_id: category || 0,
              },
            }),
          );
        }
      }
    },
    validationSchema: yup.object({
      source_stock_amount: yup
        .number()
        .min(1, 'Stock amount  must be greater than or equal to 1')
        .required('Stock is required'),
      target_stock_amount: yup.number(),
    }),
    enableReinitialize: true,
  });

  useEffect(() => {
    setUseExistingProduct(true);
    setIsSubmited(false);
    setIsErroValue({
      useExisting: true,
      useNew: true,
    });
    setSelectedExistingData(null);
    formik.resetForm();
    dispatch(productAction.resetProductForm());
  }, [open]);

  useEffect(() => {
    if (isSuccessCreate) {
      onClose();
    }
  }, [isSuccessCreate]);

  useEffect(() => {
    dispatch(productAction.fetchProductSelect(productSelect.params));
  }, [productSelect.params]);

  const ExistingProductView = useExistingProduct && (
    <Stack mt={3} gap={1} alignItems="start">
      <Typography fontWeight="500">Product Name (SKU)</Typography>
      {selectedExistingData ? (
        <Box width="100%">
          <Stack
            width="100%"
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" gap={1} alignItems="center">
              <Box
                component="img"
                alt="image"
                src={selectedExistingData.image}
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '100%',
                }}
              />
              <Typography>{selectedExistingData.name}</Typography>
            </Stack>
            <IconButton onClick={() => setSelectedExistingData(null)}>
              <TrashIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Stack>
          <Stack mt={3} gap={0.4}>
            <Typography fontWeight={500}>Amount</Typography>
            <TextField
              type="number"
              name="target_stock_amount"
              placeholder="Insert Stock Amount"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                },
              }}
              onBlur={(e) => {
                formik.handleBlur(e);
                setIsErroValue({
                  ...isErrorValue,
                  useExisting: formik.values.target_stock_amount < 1,
                });
              }}
              fullWidth
              value={formik.values.target_stock_amount}
              error={
                formik.touched.target_stock_amount &&
                formik.values.target_stock_amount < 1
              }
              helperText={
                formik.touched.target_stock_amount &&
                formik.values.target_stock_amount < 1 &&
                `Stock amount  must be greater than or equal to 1`
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {selectedExistingData?.unit_measurement}
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
            />
          </Stack>
        </Box>
      ) : (
        <Button startIcon={<AddIcon />} onClick={modalSelectProduct.openModal}>
          Select Product
        </Button>
      )}
    </Stack>
  );

  const CreateNewProductView = !useExistingProduct && (
    <Stack mt={3}>
      <Form
        processProduct
        isSubmitedProcess={isSubmited}
        onChangeFormProces={(value, error) => {
          formik.setValues({ ...formik.values, ...value });
          setIsErroValue({
            ...isErrorValue,
            useNew: Object.keys(error).length > 0,
          });
        }}
      />
    </Stack>
  );
  // console.log(isErrorValue);

  return (
    <ModalComp
      open={open}
      title="Process Product"
      onClose={() => {
        onClose();
      }}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Box p={3}>
          <Typography fontWeight="500">Product Origin</Typography>
          <Grid container spacing="20px" alignItems="center">
            <Grid item xs={6}>
              <Stack direction="row" alignItems="center" gap={2}>
                <Box
                  component="img"
                  src={EditProduct?.image}
                  alt="image"
                  sx={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '100%',
                    my: 3,
                  }}
                />
                <Typography>{EditProduct?.name}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Typography>in Stock</Typography>
              <Typography fontWeight={500}>
                {EditProduct?.stock} {EditProduct?.unit_measurement}
              </Typography>
            </Grid>
          </Grid>
          <Stack mt={3} gap={0.4}>
            <Typography fontWeight={500}>
              Enter stock amount that you want to process to a new product{' '}
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Typography>
            <TextField
              type="number"
              name="source_stock_amount"
              placeholder="Insert Low Stock"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fff',
                },
              }}
              onBlur={formik.handleBlur}
              fullWidth
              value={formik.values.source_stock_amount}
              error={
                formik.touched.source_stock_amount &&
                Boolean(formik.errors.source_stock_amount)
              }
              helperText={
                formik.touched.source_stock_amount &&
                formik.errors.source_stock_amount &&
                `${formik.errors.source_stock_amount}`
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {EditProduct?.unit_measurement}
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
            />
          </Stack>
          <Stack mt={3} direction="row" gap={1} alignItems="center">
            <SwitchStyle
              checked={!useExistingProduct}
              onChange={() => setUseExistingProduct((prev) => !prev)}
            />
            <Typography>Create new product</Typography>
          </Stack>
          {ExistingProductView}
          {CreateNewProductView}
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
            size="large"
            disabled={
              useExistingProduct
                ? isErrorValue.useExisting
                : isErrorValue.useNew || loadingForm
            }
            // onClick={() => {
            //   // formik.handleSubmit();
            // }}
          >
            {loadingForm ? 'Loading...' : 'Create'}
          </Button>
        </Box>
        <SelectItem
          open={modalSelectProduct.open}
          onClose={() => {
            modalSelectProduct.closeModal();
            dispatch(
              productAction.setParamsProductSelect({ page: 1, search: '' }),
            );
          }}
          onChangeSearch={(e) => {
            dispatch(
              productAction.setParamsProductSelect({ page: 1, search: e }),
            );
          }}
          onSubmit={(e) => {
            setSelectedExistingData(
              productSelect.data.filter((val) => e.includes(val.id))[0],
            );
          }}
          loading={productSelect.isLoading}
          title="Product"
          // multiple
          value={selectedExistingData ? [selectedExistingData?.id] : []}
          data={productSelect.data}
          hidenData={[EditProduct?.id || 0]}
          renderItem={(val) => (
            <Stack direction="row" gap={1} alignItems="center">
              <Box
                component="img"
                alt="image"
                src={val.image}
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '100%',
                }}
              />
              <Typography>{val.name}</Typography>
            </Stack>
          )}
          showMore={
            Math.ceil(
              productSelect.totalProduct / (productSelect.params?.count || 0),
            ) > (productSelect.params?.page || 0)
          }
          onShowmore={() => {
            dispatch(
              productAction.setParamsProductSelect({
                page: 1 + (productSelect.params?.page || 0),
              }),
            );
          }}
        />
      </Box>
    </ModalComp>
  );
}
