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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 54px)',
      }}
    >
      <Box display="flex" gap="100px" alignItems="center">
        <img src={notfound} alt="you'r online" height={300} />
        <Box>
          <Typography variant="h1" fontSize="40px" fontWeight="400">
            Oops,
            <br />
            Page not found!
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
