import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

interface ProfileProps {
  value: {
    name: string;
    email: string;
  };
}

function SideBarProfile(props: ProfileProps) {
  const { value } = props;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          marginRight: '18px',
          paddingLeft: '0px',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Box>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="standard"
          >
            <Avatar>
              <PersonIcon
                sx={{
                  backgroundColor: '#ffff',
                  borderRadius: '50%',
                  border: '2px white solid',
                  color: '#000',
                  width: '32px',
                  height: '32px',
                }}
              />
            </Avatar>
          </StyledBadge>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography
          component="span"
          variant="body2"
          sx={{
            display: 'block',
            whiteSpace: 'nowrap',
            lineHeight: 'inherit',
            fontWeight: 500,
            fontSize: '14px',
            // fontFamily: 'Roboto',
            color: '#192a3e',
          }}
        >
          {value.name}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          sx={{
            display: 'block',
            whiteSpace: 'nowrap',
            lineHeight: 'inherit',
            color: '#8b95a5',
            fontSize: '12px',
            // fontFamily: 'Poppins',
          }}
        >
          {value.email}
        </Typography>
      </Box>
    </>
  );
}

export default SideBarProfile;
