import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Product } from 'models/b2b/Product';
import Content from './PopupSelected/Content';

interface Props {
  onClose: () => void;
  selectedItem: Product[];
  onSubmit: (val: { stock_change: number }) => void;
  prevItem: Product[];
  initData: number;
}

function MoveStockForm({
  onClose,
  selectedItem,
  onSubmit,
  prevItem,
  initData,
}: Props) {
  const [initialValues, setInitialValues] = React.useState({
    stock_change: initData,
  });
  const formik = useFormik({
    initialValues,
    onSubmit: async (value, { resetForm }) => {
      console.log('teset');
    },
    validationSchema: yup.object({
      stock_change: yup
        .number()
        .required('Weight is required')
        .min(1, 'Value weight should be more than 0')
        .max(prevItem[0].stock, `Max value weight is ${prevItem[0].stock}`),
    }),
    enableReinitialize: true,
  });

  const { values, handleBlur, handleChange, errors, isValid } = formik;
  return (
    <Box width="420px">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 3,
          paddingBottom: 2,
          paddingX: 2,
          gap: 2,
        }}
      >
        <Typography>Enter stock weight that you want to move</Typography>
        <Content item={selectedItem[0]} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography>Weight</Typography>
          <TextField
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
            name="stock_change"
            // placeholder="Stock Weight"
            value={values.stock_change}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">gram</InputAdornment>
              ),
            }}
          />
          {Boolean(errors.stock_change) && (
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
              {errors.stock_change?.toString()}
            </Typography>
          )}
        </Box>
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
        <Button
          disabled={!isValid || values.stock_change < 1}
          onClick={() => onSubmit(values)}
        >
          Move Stock
        </Button>
      </Box>
    </Box>
  );
}

export default MoveStockForm;
