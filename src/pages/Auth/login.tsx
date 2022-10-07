import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GooleIcon from 'components/Icon/Google';

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
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
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
              p="40px 20px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="20px"
              minWidth="80%"
            >
              <img src="/images/logo_titipku.png" height="75px" alt="icon" />
              <Typography>To continue, Sign in to Titipku account.</Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ borderRadius: '20px' }}
                startIcon={<GooleIcon />}
              >
                Sign in with Google
              </Button>
              <Box bgcolor="#EC6470" p="10px" color="#fff" borderRadius="5px">
                <Typography>
                  Login failed, please try again later or contact support
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
