import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GooleIcon from 'components/Icon/Google';

export default function Login() {
  useEffect(() => {
    // window.addEventListener('message', (evt) => {
    //   console.log('listen-login', evt);
    //   // window.location.href = 'http://127.0.0.1:3000/ssdfcasdf';
    // });
  }, []);

  const openPopUp = () => {
    const popup = window.open(
      'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=1091036882687-dkacgde26l3167obt07136si6q9equf1.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fcms.titipku.space%2Fapi-dev%2Fv1%2Fauth%2Fgoogle%2Fcallback&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=c3BtIyMjaHR0cDovL2xvY2FsaG9zdDozMDAwIyMjYmF3MDk4Y3Z5QVMqJlQxMnJl&service=lso&o2v=1&flowName=GeneralOAuthFlow',
      '_blank',
      'width=400,height=400,scrollbars=1',
    );
    // w?.focus();
  };

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
                onClick={() => openPopUp()}
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
