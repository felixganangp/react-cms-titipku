import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import BaseLogo from '../../../assets/base-logo.svg';
import expand from '../../../assets/sidebar.svg';
import logo from '../../../assets/mini-logo-white.svg';

// styled
const VectorSmall = styled.img`
  width: 16px;
  height: 16px;
  flex-grow: 0;
  margin: 5px 0 0 0;
  object-fit: contain;
`;

interface SideBarHeaderProps {
  open: boolean;
  onLogoClick(): void;
}

function SideBarHeader(props: SideBarHeaderProps) {
  const { open, onLogoClick } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: '56px',
        width: '236px',
        backgroundColor: '#232933',
        padding: '20px 16px 20px 24px',
        alignSelf: 'stretch',
        '& .MuiBox-root': {
          display: 'flex',
        },
        flexGrow: '0',
        boxShadow: '0 3px 10px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      {!open && (
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          <img src={BaseLogo} alt="logo titipku" />
        </Box>
      )}

      <Button
        onClick={onLogoClick}
        sx={{
          minWidth: 'initial',
          padding: '10px',
          borderRadius: '10px',
          marginLeft: open ? '-15px' : '0px',
          backgroundColor: open ? 'transparent' : 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.20)',
          },
        }}
      >
        {!open ? (
          <VectorSmall alt="expand" src={expand} />
        ) : (
          <IconButton size="large" color="inherit">
            <img src={logo} alt="Titipku" />
          </IconButton>
        )}
      </Button>
    </Box>
  );
}

export default SideBarHeader;
