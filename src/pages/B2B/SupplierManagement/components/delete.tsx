import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ChangeStatusProps {
  headerText?: JSX.Element | string;
  desc: JSX.Element | string;
  onSubmit: () => void;
  onClose: () => void;
}

export default function Delete({
  headerText,
  desc,
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
      <Box p="32px 24px" gap="16px" display="flex" flexDirection="column">
        <Typography fontSize="20px" fontWeight="bold" color="#303030">
          {headerText}
        </Typography>
        <Typography>{desc}</Typography>
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
