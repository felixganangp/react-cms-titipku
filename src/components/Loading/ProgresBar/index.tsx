import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function ProgresBar() {
  return (
    <Box position="absolute" top="0" left="0" zIndex="99" width="100vw">
      <LinearProgress color="success" />
    </Box>
  );
}
