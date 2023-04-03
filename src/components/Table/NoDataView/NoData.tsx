import React from 'react';
import EmptyProduct from 'assets/empty-product.svg';
import { Box, Button, Typography } from '@mui/material';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';

interface NoDataProps {
  onAdd: () => void;
  headMsg: string;
  message: string;
}

export default function NoDataWithAddBtn({
  onAdd,
  headMsg,
  message,
}: NoDataProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="12px"
    >
      <img src={EmptyProduct} width="200px" height="200px" alt={headMsg} />
      <Box textAlign="center">
        <Typography fontSize="16px" fontWeight="bold" color="#303030">
          {headMsg}
        </Typography>
        <Typography fontSize="14px" color="#303030">
          {message}
        </Typography>
      </Box>
      <Button endIcon={<ArrowIcon />} onClick={onAdd}>
        Add New
      </Button>
    </Box>
  );
}
