import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface VerifyProps {
  selectedItemDesc?: string;
  onSubmit: () => void;
  onClose: () => void;
}

export default function Verify({
  selectedItemDesc,
  onSubmit,
  onClose,
}: VerifyProps) {
  return (
    <Box>
      <Box p="20px 24px" gap="16px" display="flex" flexDirection="column">
        <Typography>Verify this Customer?</Typography>
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
        <Button variant="text" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Verify</Button>
      </Box>
    </Box>
  );
}
