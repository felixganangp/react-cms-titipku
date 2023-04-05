import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ChangeStatusProps {
  total: number;
  selectedItemDesc: string;
  onSubmit: () => void;
  onClose: () => void;
}

export default function Delete({
  total,
  selectedItemDesc,
  onSubmit,
  onClose,
}: ChangeStatusProps) {
  const getHeader = () =>
    total > 1 ? `Delete ${total} Items?` : `Delete ${selectedItemDesc}?`;

  const getDescription = () =>
    total > 1 ? (
      <>
        You are about to delete: <b>{selectedItemDesc}.</b> <br />
        Are you sure you want to proceed? This action cannot be undone.
      </>
    ) : (
      <>
        You will need to recreate <b>{selectedItemDesc}</b> when you need this
        item in the future.
      </>
    );
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
      <Box p="32px 24px" gap="16px" display="flex" flexDirection="column">
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
          Delete Item
        </Button>
        <Button onClick={onClose}>Back to List</Button>
      </Box>
    </Box>
  );
}
