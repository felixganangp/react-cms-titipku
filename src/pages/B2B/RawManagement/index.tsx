import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

export default function RawPage() {
  return (
    <Box p="20px" bgcolor="#f8f8f8">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Raw Management</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
