import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Online from 'assets/Online.svg';
import { greating } from 'utils/greating';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 54px)',
      }}
    >
      <Box textAlign="center">
        <img src={Online} alt="you'r online" height={200} />
        <Typography variant="h1">Hi, {greating()}!</Typography>
      </Box>
    </Box>
  );
}
