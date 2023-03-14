import * as React from 'react';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import BaseLogo from 'assets/base-logo.svg';
import expand from 'assets/sidebar.svg';
import logo from 'assets/mini-logo-green.svg';

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
        height: '63px',
        width: '236px',
        backgroundColor: '#fff',
        padding: '20px 16px 20px 18px',
        boxShadow: !open ? '8px 3px 10px -7px rgba(0, 0, 0, 0.1)' : 'none',
        alignSelf: 'stretch',
        '& .MuiBox-root': {
          display: 'flex',
        },
        flexGrow: '0',
      }}
    >
      {/* show titipku full logo when open */}
      {!open && (
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          <img src={BaseLogo} alt="logo titipku" height="43px" />
        </Box>
      )}
      <Box
        onClick={onLogoClick}
        sx={{
          minWidth: 'initial',
          padding: '3px',
          borderRadius: '10px',
          marginLeft: open ? '-15px' : '0px',
          backgroundColor: open ? 'transparent' : 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        {!open ? (
          <VectorSmall
            alt="expand"
            style={{ marginLeft: '8px', marginBottom: '3px' }}
            src={expand}
          />
        ) : (
          <Box
            width="62px"
            margin={0}
            height="63px"
            boxShadow="8px 3px 10px -7px rgba(0, 0, 0, 0.1)"
          >
            <IconButton
              onClick={onLogoClick}
              onMouseEnter={onLogoClick}
              sx={{
                width: '28px',
                backgroundColor: 'transparent',
                padding: 0,
                paddingLeft: '14px',
                marginLeft: '7px',
              }}
            >
              <img src={logo} alt="Titipku" height="36px" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SideBarHeader;
