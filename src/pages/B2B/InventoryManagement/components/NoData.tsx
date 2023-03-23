import React from 'react';
import EmptyProduct from 'assets/empty-product.svg';
import { Box, Button, Typography } from '@mui/material';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';

interface NoDataProps {
  onAdd: () => void;
}

export default function NoDataInventory({ onAdd }: NoDataProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="12px"
    >
      <img
        src={EmptyProduct}
        width="200px"
        height="200px"
        alt="No Product Available"
      />
      <Box textAlign="center">
        <Typography fontSize="16px" fontWeight="bold" color="#303030">
          No Product Available
        </Typography>
        <Typography fontSize="14px" color="#303030">
          Please add new product to make a change
        </Typography>
      </Box>
      <Button endIcon={<ArrowIcon />} onClick={onAdd}>
        Add New
      </Button>
    </Box>
  );
}
