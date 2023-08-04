import React, { useState } from 'react';

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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SelectItem from 'components/SelectItem';
import useModal from 'hooks/useModal';
import { SwitchStyle } from '../../inventory.styled';
import Form from '../Form';

interface ProcessProductProps {
  open: boolean;
}
export default function ProcessProduct({ open }: ProcessProductProps) {
  const modalSelectProduct = useModal();
  const [useExistingProduct, setUseExistingProduct] = useState(true);

  const ExistingProductView = useExistingProduct && (
    <Stack mt={3} gap={1} alignItems="start">
      <Typography fontWeight="500">Product Name (SKU)</Typography>
      <Button startIcon={<AddIcon />} onClick={modalSelectProduct.openModal}>
        Select Product
      </Button>
    </Stack>
  );

  const CreateNewProductView = !useExistingProduct && (
    <Stack mt={3}>
      <Form processProduct />
    </Stack>
  );

  return (
    <ModalComp
      open={open}
      title="Process Product"
      onClose={() => {
        //   formProductModal.closeModal();
        //   setEditProduct(null);
      }}
    >
      <Box>
        <Box p={3}>
          <Typography fontWeight="500">Product Origin</Typography>
          <Grid container spacing="20px" alignItems="center">
            <Grid item xs={6}>
              <Stack direction="row" alignItems="center" gap={2}>
                <Box
                  component="img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWje_gjVcmi-wks5nTRnW_xv5W2l3MVnk7W1QDcZuhNg&s"
                  alt="image"
                  sx={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '100%',
                    my: 3,
                  }}
                />
                <Typography>Ayam Boiler</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Typography>in Stock</Typography>
              <Typography fontWeight={500}>34 Ekor</Typography>
            </Grid>
          </Grid>
          <Stack mt={3} gap={0.4}>
            <Typography fontWeight={500}>
              Enter stock amount that you want to process to a new product
            </Typography>
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
              // onBlur={formik.handleBlur}
              fullWidth
              // value={formik.values.stock}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    Ekor
                    {/* {UnitDummy.filter(
                    (val) => val.id === formik.values.unit_measurement_id,
                  )[0]?.name || '-'} */}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\..*/g, '$1');

                //   formik.setFieldValue('stock', value);
              }}
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
            // onClick={() => {
            //   formik.handleSubmit();
            // }}
          >
            Create
          </Button>
        </Box>
        <SelectItem
          open={modalSelectProduct.open}
          onClose={modalSelectProduct.closeModal}
          title="Product"
          // multiple
          value={[2, 4]}
          data={[
            {
              id: 1,
              name: 'anggur',
              image:
                'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQobQWbL4wP3-885e3HCN6G7bAxDGBGTzHn_p3abVaRRZoZNC6yXfWhfvGQ9INPzC9j',
            },
            {
              id: 2,
              name: 'midhat',
              image:
                'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQobQWbL4wP3-885e3HCN6G7bAxDGBGTzHn_p3abVaRRZoZNC6yXfWhfvGQ9INPzC9j',
            },
            {
              id: 4,
              name: 'ayam',
              image:
                'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQobQWbL4wP3-885e3HCN6G7bAxDGBGTzHn_p3abVaRRZoZNC6yXfWhfvGQ9INPzC9j',
            },
          ]}
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
        />
      </Box>
    </ModalComp>
  );
}
