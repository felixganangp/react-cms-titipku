import React from 'react';
import { Box, Dialog, DialogContent, Button, Typography } from '@mui/material';

interface Props {
  onClose: () => void;
}

function ConfirmMoveStock({ onClose }: Props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 3,
        }}
      >
        <Box sx={{ paddingX: 2 }}>
          <Typography variant="h3" fontWeight={600}>
            Move Stock?
          </Typography>
          <Box
            sx={{
              paddingY: 3,
            }}
          >
            <Typography fontSize="16px">
              You are about to move stock: 200,000 g{' '}
              <span style={{ fontWeight: 'bold' }}>[Grade A][B2B] Buncis</span>{' '}
              to{' '}
              <span style={{ fontWeight: 'bold' }}>
                [Grade B][B2B-Horeca] Buncis
              </span>
            </Typography>
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
            paddingRight: '50px',
            boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Button onClick={onClose} variant="text" color="error">
            Cancel
          </Button>
          <Button>Yes, Move Stock</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ConfirmMoveStock;
