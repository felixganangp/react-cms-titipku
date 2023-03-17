import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ChangeStatusProps {
  totalItem: number;
  selectedProduct: string;
  onSubmit: () => void;
  onClose: () => void;
}

export default function ChangeStatus({
  totalItem,
  selectedProduct,
  onSubmit,
  onClose,
}: ChangeStatusProps) {
  return (
    <Box
      minWidth="50vw"
      bgcolor="#fff"
      top="50%"
      left="50%"
      position="absolute"
      sx={{
        objectFit: 'contain',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box p="32px 24px" gap="16px">
        <Typography fontSize="20px" fontWeight="bold" color="#303030">
          Mark {totalItem} items as inactive
        </Typography>
        <Typography>
          You need to re-active and edit stock <b>{selectedProduct}</b> when you
          need this item in the future.
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        padding="24px"
        gap="10px"
        boxShadow="3px 0 10px 0 rgba(0, 0, 0, 0.1)"
      >
        <Button variant="text" color="error" onClick={onSubmit}>
          Yes, Mark Inactive
        </Button>
        <Button onClick={onClose}>Back to List</Button>
      </Box>
    </Box>
  );
}
