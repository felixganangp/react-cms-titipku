import React from 'react';
import { Stack, Typography } from '@mui/material';

export default function Default() {
  return (
    <Stack alignItems="center">
      <img src="/images/no-data.svg" alt="no-data" width="133px" />
      <Typography fontWeight="500" fontSize="16px" color="#232933" my="10px">
        No Results Found
      </Typography>
      <Typography
        sx={{
          fontWeight: 'normal',
          fontSize: '14px',
          color: '#626b79',
        }}
      >
        Try adjusting your keywords and try again
      </Typography>
    </Stack>
  );
}
