import * as React from 'react';
import Box from '@mui/material/Box';
import BaseLogo from 'assets/base-logo.svg';
import expand from 'assets/sidebar.svg';
import logo from 'assets/mini-logo-green.svg';
import {
  BoxSmallLogo,
  HeaderContainer,
  MinimizeSideBar,
  ShadowMinimizeHeader,
  SmallLogo,
} from './sidebar.styled';

interface SideBarHeaderProps {
  open: boolean;
  onLogoClick(): void;
}

function SideBarHeader(props: SideBarHeaderProps) {
  const { open, onLogoClick } = props;

  return (
    <HeaderContainer
      open={!open}
      sx={{
        '& .MuiBox-root': {
          display: 'flex',
        },
      }}
    >
      {/* show titipku full logo when open */}
      {!open && (
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          <img
            src={BaseLogo}
            alt="logo titipku"
            height="53px"
            style={{ marginTop: '5px' }}
          />
        </Box>
      )}
      <BoxSmallLogo open={open} onClick={onLogoClick}>
        {!open ? (
          <MinimizeSideBar
            alt="expand"
            style={{ marginLeft: '8px', marginBottom: '3px' }}
            src={expand}
          />
        ) : (
          <ShadowMinimizeHeader>
            <SmallLogo onClick={onLogoClick} onMouseEnter={onLogoClick}>
              <img src={logo} alt="Titipku" height="43px" />
            </SmallLogo>
          </ShadowMinimizeHeader>
        )}
      </BoxSmallLogo>
    </HeaderContainer>
  );
}

export default SideBarHeader;
