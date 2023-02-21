import React from 'react';
import { Typography, Box, Button } from '@mui/material';

interface Props {
  onSubmit: () => void;
  invoiceNumber: string;
  onClose: () => void;
}

export default function PaidOff({ onSubmit, invoiceNumber, onClose }: Props) {
  const childModalStyle = {
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
  };

  return (
    <Box sx={{ ...childModalStyle, width: '50%', height: '40%' }}>
      <Box sx={{ padding: '24px', backgroundColor: '#ffff' }}>
        <Typography>
          This adjustment will be paid off invoice <b>{invoiceNumber}</b>.{' '}
          <br /> Are you sure?
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        gap="10px"
        justifyContent="end"
        sx={{
          backgroundColor: '#fff',
          padding: '24px',
          boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Button variant="text" color="error" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button onClick={() => onSubmit()}>Save</Button>
      </Box>
    </Box>
  );
}
