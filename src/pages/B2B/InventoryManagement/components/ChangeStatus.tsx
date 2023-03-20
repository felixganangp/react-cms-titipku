import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ChangeStatusProps {
  totalItem: number;
  selectedProduct: string;
  onSubmit: () => void;
  onClose: () => void;
  newStatus: boolean;
}

export default function ChangeStatus({
  totalItem,
  selectedProduct,
  onSubmit,
  onClose,
  newStatus,
}: ChangeStatusProps) {
  const getHeader = () => {
    if (newStatus) {
      // active
      if (totalItem > 1)
        // batch
        return `Mark ${totalItem} Items as active?`;
      return `Mark ${selectedProduct} as active?`; // single
    }
    if (totalItem > 1)
      // inactive batch
      return `Mark ${totalItem} Items as inactive?`;
    return `Mark ${selectedProduct} as inactive?`; // single
  };

  const getDescription = () => {
    if (newStatus) {
      if (totalItem > 1)
        return (
          <>
            You will be able to edit and change stock <b>{selectedProduct}</b>
          </>
        );
      return `By marking this item as active, you will be able to edit and change stock opname. Any previous data associated with the item will not be modified.`;
    }
    if (totalItem > 1)
      return (
        <>
          You need to re-active and edit stock <b>{selectedProduct}</b> when you
          need this item in the future.
        </>
      );
    return `By marking this item as inactive, you will not be able to edit and change stock opname. Re-activate this item to make changes in the future.`;
  };
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
          {getHeader()}
        </Typography>
        <Typography>{getDescription()}</Typography>
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
          Yes, Mark {newStatus ? 'Active' : 'Inactive'}
        </Button>
        <Button onClick={onClose}>Back to List</Button>
      </Box>
    </Box>
  );
}
