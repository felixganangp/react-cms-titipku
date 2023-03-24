import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
} from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import { Product } from 'models/b2b/Product';
import NoImage from 'assets/no-image.svg';
import { GradingColor } from '../inventory.styled';

interface Props {
  items: Product[];
  onClose: () => void;
}

function StockOpname({ items, onClose }: Props) {
  const dispatch = useAppDispatch();

  const initData: any = {};
  items.forEach((el) => {
    initData[`product_${el.id}`] = el.stock;
  });
  const SchemaObjectTeset = Object.fromEntries(
    items.map((el) => [
      `product_${el.id}`,
      yup
        .number()
        .required('Field is required')
        .min(0, 'Please input valid value')
        .max(100000000, 'Max value is 100.000.000'),
    ]),
  );
  const [initialValues, setInitialValues] = React.useState(initData);
  const formik = useFormik({
    initialValues,
    onSubmit: async (value, { resetForm }) => {
      console.log('teset');
    },
    validationSchema: yup.object().shape(SchemaObjectTeset),
    enableReinitialize: true,
  });

  const { values, handleBlur, handleChange, errors, isValid } = formik;
  const handleOnSubmit = async () => {
    const payload: any = [];
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const prop in values) {
      const splitProp = prop.split('_');
      const result = {
        stock: +values[prop],
        id: +splitProp[1],
      };
      payload.push(result);
    }
    console.log(payload);
    await dispatch(productAction.stockOpname(payload));
    await onClose();
  };
  return (
    <Box>
      {/* <form onSubmit={handle}> */}
      <Box sx={{ padding: '20px 24px' }}>
        {items.map((item, i) => (
          <Box
            key={`stock-opname-item-${i}`}
            sx={{
              backgroundColor: '#f8f8f8',
              padding: '16px 24px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = NoImage;
              }}
              src={item.product_parent.image_filepath}
              style={{ height: '48px', width: '48px', borderRadius: '50%' }}
              alt={item.product_parent.name}
            />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 0,
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '12px',
                    gap: 0.8,
                    width: '280px',
                  }}
                >
                  <GradingColor
                    sx={{ padding: '2px !important' }}
                    grade={item.product_grade.name as string}
                  >
                    {item.product_grade.name}
                  </GradingColor>
                  <Typography fontSize="17px">
                    {item.product_parent.name}
                  </Typography>
                </Box>
                <Box sx={{ backgroundColor: '#e4e4e4', paddingX: '1em' }}>
                  <Typography>
                    {item.product_parent.product_parent_category?.name || '-'}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography
                  fontSize="14px"
                  fontWeight="500"
                  sx={{ width: '135px' }}
                >
                  Stock Weight (Gram)
                </Typography>
                <TextField
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name={`product_${item.id}`}
                  placeholder="Stock Weight"
                  value={values[`product_${item.id}`]}
                  sx={{ width: '135px' }}
                />
                {Boolean(errors[`product_${item.id}`]) && (
                  <Typography
                    sx={{
                      mt: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.7rem',
                      color: '#c10000',
                    }}
                  >
                    <ReportIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
                    {errors[`product_${item.id}`]?.toString()}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        width="100%"
        display="flex"
        gap="2em"
        justifyContent="end"
        // mt="50px"
        sx={{
          padding: '24px',
          boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Button onClick={onClose} variant="text" color="error">
          Cancel
        </Button>
        <Button disabled={!isValid} onClick={handleOnSubmit}>
          Save Changes
        </Button>
      </Box>
      {/* </form> */}
    </Box>
  );
}

export default StockOpname;
