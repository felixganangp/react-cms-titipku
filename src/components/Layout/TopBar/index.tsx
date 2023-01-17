import React, { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import Popper from '@mui/material/Popper';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { Link } from 'react-router-dom';
import SideBarHeader from '../SideBar/Header';
import {
  EmailDetails,
  EmailHeader,
  LogoutButton,
  Role,
  StyledListbox,
  StyledMenuItem,
  Username,
  UsernameHeader,
} from './topbar.styled';

interface TopBarInterface {
  open: boolean;
  onLogoClick(): void;
  userDetails: {
    email: string;
    fullName: string;
    roleName: string;
  };
}

const TopBar = (props: TopBarInterface) => {
  const { open, onLogoClick, userDetails } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const menuActions = useRef(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (isOpen) {
      setAnchorElUser(null);
      setIsOpen(!isOpen);
    } else {
      setIsOpen(!isOpen);
      setAnchorElUser(event.currentTarget);
    }
  };

  const logout = () => {
    localStorage.clear();
  };

  const close = () => {
    setAnchorElUser(null);
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        // flexGrow: 1,
        '& .MuiPaper-root': {
          borderRadius: '0px',
          boxShadow: '0 3px 10px 0 rgba(0, 0, 0, 0.1)',
          paddingLeft: '0px',
          height: '56px',
        },
        '& .MuiToolbar-root': {
          minHeight: '56px',
          paddingLeft: '0px',
        },
        '& .MuiContainer-root': {
          paddingLeft: '0px',
        },
      }}
    >
      <AppBar
        style={{
          backgroundColor: '#232933',
          boxShadow: '1',
        }}
        position="static"
      >
        <Container
          maxWidth="xl"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            maxWidth: 'inherit',
          }}
        >
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <SideBarHeader open={open} onLogoClick={onLogoClick} />
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <SearchIcon sx={{ color: '#ffff', marginRight: '10px' }} />
              <NotificationsNoneOutlinedIcon
                sx={{ color: '#ffff', marginRight: '10px' }}
              />
              <FullscreenOutlinedIcon
                sx={{ color: '#ffff', marginRight: '25px' }}
              />
              <Tooltip title="Open account details">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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

                  <Stack sx={{ marginLeft: '8px' }}>
                    <UsernameHeader>
                      {userDetails ? userDetails.fullName : 'loading...'}
                    </UsernameHeader>
                    <EmailHeader>
                      {userDetails ? userDetails.email : 'loading...'}
                    </EmailHeader>
                  </Stack>
                  <KeyboardArrowDownIcon
                    sx={{ color: '#ffff', marginLeft: '20px' }}
                  />
                </IconButton>
              </Tooltip>
              <MenuUnstyled
                actions={menuActions}
                open={isOpen}
                // onClose={close}
                anchorEl={anchorElUser}
                components={{ Root: Popper, Listbox: StyledListbox }}
                componentsProps={{ listbox: { id: 'simple-menu' } }}
              >
                <StyledMenuItem
                  onClick={close}
                  style={{
                    float: 'left',
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <PersonIcon
                      sx={{
                        backgroundColor: '#ffff',
                        borderRadius: '50%',
                        border: '2px white solid',
                        color: '#000',
                        width: '68px',
                        height: '68px',
                        marginLeft: '8px',
                        marginTop: '9.5px',
                      }}
                    />
                    <Stack style={{ marginTop: '5%', paddingLeft: '2%' }}>
                      <Username>
                        {userDetails ? userDetails.fullName : 'loading...'}
                      </Username>
                      <EmailDetails ml="7px">
                        {userDetails ? userDetails.email : 'loading...'}
                      </EmailDetails>
                      <Role>
                        {userDetails
                          ? `\u2022  ${userDetails.roleName}`
                          : 'loading...'}
                      </Role>
                    </Stack>
                  </Box>
                  <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                    <LogoutButton onClick={() => logout()}>
                      Sign Out
                      <PowerSettingsNewOutlinedIcon />
                    </LogoutButton>
                  </Link>
                </StyledMenuItem>
              </MenuUnstyled>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default TopBar;
