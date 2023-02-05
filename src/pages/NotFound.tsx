import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import notfound from 'assets/page-not-found.svg';
import Button from '@mui/material/Button';

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        padding: 20,
        height: 'calc(100vh - 54px)',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <Box>
          <Typography variant="h1" fontSize="36px" fontWeight="500">
            Ooopss...
            <br />
            Something went wrong
          </Typography>
          <Typography
            variant="h1"
            fontSize="14px"
            fontWeight="500"
            lineHeight="40px"
          >
            page not found
          </Typography>
          <Button
            sx={{ mt: 2, fontSize: '16px' }}
            size="medium"
            onClick={() => navigate('/')}
          >
            Back to Homepage
          </Button>
        </Box>
        <Box
          component="img"
          src={notfound}
          alt="you'r online"
          height={450}
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 100,
          }}
        />
      </Box>
    </Box>
  );
}
