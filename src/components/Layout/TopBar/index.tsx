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
import { UserDetails } from '../../../models/UserDetails';
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
  userDetails: UserDetails | null;
}

const TopBar = ({ open, onLogoClick, userDetails }: TopBarInterface) => {
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
      display="flex"
      flexDirection="row"
      justifyContent="center"
      boxShadow="0px 3px 10px rgba(0, 0, 0, 0.1)"
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '0px',
          paddingLeft: '0px',
          height: '63px',
        },
        '& .MuiToolbar-root': {
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
          minHeight: '63px',
          paddingLeft: '0px',
        },
        '& .MuiContainer-root': {
          padding: '0',
        },
      }}
    >
      <AppBar
        style={{
          backgroundColor: '#ffff',
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
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <SearchIcon sx={{ color: '#303030', marginRight: '10px' }} />
              <NotificationsNoneOutlinedIcon
                sx={{ color: '#303030', marginRight: '10px' }}
              />
              <FullscreenOutlinedIcon
                sx={{ color: '#303030', marginRight: '25px' }}
              />
              {/* account description on top right */}
              <Box right={0} marginRight="24px">
                <Tooltip title="Open account details">
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    onClick={handleOpenUserMenu}
                    sx={{
                      ':hover': {
                        backgroundColor: '#fafafa',
                      },
                    }}
                  >
                    <PersonIcon
                      sx={{
                        backgroundColor: '#303030',
                        borderRadius: '50%',
                        border: '3px #303030 solid',
                        color: '#fff',
                        width: '32px',
                        height: '32px',
                      }}
                    />

                    <Stack sx={{ marginLeft: '8px', gap: '2px' }}>
                      <UsernameHeader>
                        {userDetails ? userDetails.full_name : 'loading...'}
                      </UsernameHeader>
                      <EmailHeader>
                        {userDetails ? userDetails.email : 'loading...'}
                      </EmailHeader>
                    </Stack>
                    <KeyboardArrowDownIcon
                      sx={{ color: '#303030', marginLeft: '20px' }}
                    />
                  </Box>
                </Tooltip>
                {/* pop up  */}
                <MenuUnstyled
                  actions={menuActions}
                  open={isOpen}
                  // onClose={close}
                  anchorEl={anchorElUser}
                  components={{ Root: Popper, Listbox: StyledListbox }}
                  componentsProps={{ listbox: { id: 'simple-menu' } }}
                >
                  <StyledMenuItem onClick={close}>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <PersonIcon
                        sx={{
                          backgroundColor: '#303030',
                          borderRadius: '50%',
                          border: '2px white solid',
                          color: '#fff',
                          width: '60px',
                          height: '60px',
                          marginLeft: '8px',
                          marginTop: '9.5px',
                        }}
                      />
                      <Stack style={{ marginTop: '5%', paddingLeft: '2%' }}>
                        <Username>
                          {userDetails?.full_name || 'loading...'}
                        </Username>
                        <EmailDetails ml="7px">
                          {userDetails?.email || 'loading...'}
                        </EmailDetails>
                        <Role>
                          {userDetails
                            ? `\u2022  ${userDetails?.administrator_detail[0].administrator_role.name}`
                            : 'loading...'}
                        </Role>
                      </Stack>
                    </Box>
                    <Box style={{ bottom: 0, position: 'absolute' }}>
                      <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                        <LogoutButton onClick={() => logout()}>
                          Sign Out
                          <PowerSettingsNewOutlinedIcon />
                        </LogoutButton>
                      </Link>
                    </Box>
                  </StyledMenuItem>
                </MenuUnstyled>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default TopBar;
