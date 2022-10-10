import React, { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';
import Popper from '@mui/material/Popper';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { Link } from 'react-router-dom';
import SideBarHeader from '../SideBar/Header';

interface TopBarInterface {
  open: boolean;
  onLogoClick(): void;
  userDetails: {
    email: string;
    fullName: string;
    roleName: string;
  };
}

const UsernameHeader = styled(Typography)`
  text-align: left;
  font-size: 12px;
  color: #ffff;
  margin-left: 7px;
  text-align: left;
  font-family: 'Roboto';
`;

const EmailHeader = styled(Typography)`
  font-size: 12px;
  text-align: left;
  color: #8b95a5;
  margin-left: 7px;
  font-family: 'Roboto';
`;

const StyledListbox = styled.ul`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 5px;
  margin: 10px 0;
  min-width: 200px;
  overflow: auto;
  outline: 0px;
  border-radius: 10px;
  border: none !important;
`;

const StyledMenuItem = styled(MenuItemUnstyled)`
  list-style: none;
  border: none !important;
  cursor: defaulimport { useRef } from 'react';
t;
  user-select: none;
  width: 285px;
  height: 126px;
  border-radius: 10px;
  background-color: #232933;
  margin-right: 25px;
`;

const Username = styled(Typography)`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 15px;
  color: #ffff;
  margin-left: 7px;
  text-align: left;
`;

const EmailDetails = styled(Typography)`
  text-align: left;
  font-size: 14px;
  color: #8b95a5;
  margin-left: 7px;
`;

const Role = styled.div`
  text-align: left;
  font-size: 9.3px;
  height: fit-content;
  margin: 2px 2px 2px 6.7px;
  background-color: #008e58;
  border-radius: 6.7px;
  padding: 2.7px 6.7px;
  color: white;
  width: fit-content;
`;

const LogoutButton = styled.div`
  width: 285px;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 15px 0 0;
  padding: 0;
  background-color: #626b79;
  border-radius: 0px 0px 10px 10px;
  color: white;
`;

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
        <Container maxWidth="xl">
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
                  <Link to="login" style={{ textDecoration: 'none' }}>
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
