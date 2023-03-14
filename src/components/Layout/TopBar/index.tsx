import React, { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import Popper from '@mui/material/Popper';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import SideBarHeader from '../SideBar/Header';
import { UserDetails } from '../../../models/UserDetails';
import {
  ContentContainer,
  EmailDetails,
  EmailHeader,
  Expand,
  FullScreen,
  LogoutButton,
  Notification,
  Role,
  Search,
  StyledListbox,
  StyledMenuItem,
  UserContainer,
  UserIcon,
  UserIconDetails,
  Username,
  UsernameHeader,
  UserStack,
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

            <ContentContainer>
              <Search />
              <Notification />
              <FullScreen />
              {/* account description on top right */}
              <Box right={0} marginRight="24px">
                <Tooltip title="Open account details">
                  <UserContainer onClick={handleOpenUserMenu}>
                    <UserIcon />
                    <UserStack>
                      <UsernameHeader>
                        {userDetails ? userDetails.full_name : 'loading...'}
                      </UsernameHeader>
                      <EmailHeader>
                        {userDetails ? userDetails.email : 'loading...'}
                      </EmailHeader>
                    </UserStack>
                    <Expand />
                  </UserContainer>
                </Tooltip>
                {/* pop up  */}
                <MenuUnstyled
                  actions={menuActions}
                  open={isOpen}
                  anchorEl={anchorElUser}
                  components={{ Root: Popper, Listbox: StyledListbox }}
                  componentsProps={{ listbox: { id: 'simple-menu' } }}
                >
                  <StyledMenuItem onClick={close}>
                    <Box display="flex" flexDirection="row">
                      <UserIconDetails />
                      <Stack marginTop="5%" paddingLeft="2%">
                        <Username>
                          {userDetails?.full_name || (
                            <Skeleton width={120} height={20} />
                          )}
                        </Username>
                        <EmailDetails ml="7px">
                          {userDetails?.email || (
                            <Skeleton width={120} height={15} />
                          )}
                        </EmailDetails>
                        <Role>
                          {userDetails ? (
                            `\u2022  ${userDetails?.administrator_detail[0].administrator_role.name}`
                          ) : (
                            <Skeleton width={120} height={25} />
                          )}
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
            </ContentContainer>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default TopBar;
