import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Product } from 'models/b2b/Product';
import Content from './PopupSelected/Content';

interface Props {
  onClose: () => void;
  selectedItem: Product[];
  onSubmit: () => void;
}

function MoveStockForm({ onClose, selectedItem, onSubmit }: Props) {
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
            // onChange={handleChange}
            // onBlur={handleBlur}
            // name={`product_${item.id}`}
            // placeholder="Stock Weight"
            // value={values[`product_${item.id}`]}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">gram</InputAdornment>
              ),
            }}
          />
          {/* {Boolean(errors[`product_${item.id}`]) && (
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
                  )} */}
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
        <Button onClick={onSubmit}>Move Stock</Button>
      </Box>
    </Box>
  );
}

export default MoveStockForm;
