import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import GooleIcon from 'components/Icon/Google';

export default function Login() {
  const [errMessage, setErrMessage] = useState('');
  useEffect(() => {
    if (window.location.search) {
      let getSuccess = window.location.search.split('success=');
      getSuccess = getSuccess[1].split('&');
      if (getSuccess[0] === 'false') {
        let getErrMessage = getSuccess[1].split('message=');
        getErrMessage = getErrMessage[1].split('%20');
        const strErrMsg = getErrMessage.join(' ');
        setErrMessage(strErrMsg);
      }
    }
  }, []);
  const link = `https://cms.titipku.space/api-dev/v2/auth/login/google?account_type=cms&redirect_url=${window.location.origin}/oauth`;
  const openPopUp = (popUpWidth: number, popUpHeight: number) => {
    // eslint-disable-next-line no-restricted-globals
    const left: number = (screen.width - popUpWidth) / 2;
    // eslint-disable-next-line no-restricted-globals
    const top: number = (screen.height - popUpHeight) / 2;
    window.open(
      link,
      '_blank',
      `width=${popUpWidth},height=${popUpHeight},scrollbars=1,left=${left},top=${top}`,
    );
    // w?.focus();
  };

  const authToken = localStorage.getItem('auth');
  const parsAuthToken = JSON.parse(authToken || '{}');
  const isAuth = parsAuthToken.token;
  if (isAuth) {
    return <Navigate to="/" />;
  }

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
              <Typography fontSize="36px">Me Time Gagal Terus</Typography>
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
                onClick={() => openPopUp(400, 400)}
              >
                Sign in with Google
              </Button>
              {errMessage ? (
                <Box bgcolor="#EC6470" p="10px" color="#fff" borderRadius="5px">
                  <Typography>Login failed: {errMessage}</Typography>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
