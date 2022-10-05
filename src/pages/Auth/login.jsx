import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Login() {
  return (
    <Box>
      <Grid container width="100%" height="100vh">
        <Grid item xs={7}>
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              background: 'url(/images/bg-left.png)',
            }}
          >
            <Box color="#FFFF">
              <Typography fontSize="36px">Me Time Jalan terus</Typography>
              <Typography fontSize="46px">
                <span style={{ color: '#F7CC47', fontWeight: 'bold' }}>
                  Titipku
                </span>{' '}
                Kami Yang Urus
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              boxShadow="0px 4px 25px rgba(0, 0, 0, 0.25);"
              borderRadius="10px"
              p="20px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="20px"
            >
              <Box as="img" src="/images/logo_titipku.png" height="75px"  />
              <Typography>To continue, Sign in to Titipku account.</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
