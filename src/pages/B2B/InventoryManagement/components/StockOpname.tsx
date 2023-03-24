import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
} from '@mui/material';
import { Product } from 'models/b2b/Product';
import NoImage from 'assets/no-image.svg';
import { GradingColor } from '../inventory.styled';

interface Props {
  items: Product[];
}

function StockOpname({ items }: Props) {
  return (
    <Box>
      <form>
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
                    }}
                  >
                    <GradingColor
                      sx={{ padding: '2px !important' }}
                      grade={item.product_grade.id}
                    >{`Grade ${item.product_grade.name}`}</GradingColor>
                    <Typography fontSize="17px">
                      {item.product_parent.name}
                    </Typography>
                  </Box>
                  <Box sx={{ backgroundColor: '#e4e4e4', paddingX: '1em' }}>
                    <Typography>
                      {item.product_parent.product_parent_category
                        ? item.product_parent.product_parent_category[0].name
                        : '-'}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography fontSize="14px" fontWeight="500">
                    Stock Weight (Gram)
                  </Typography>
                  <TextField
                    type="number"
                    name="stockWeight"
                    placeholder="Stock Weight"
                    value={item.stock}
                    fullWidth
                  />
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
          <Button variant="text" color="error">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </Box>
      </form>
    </Box>
  );
}

export default StockOpname;
