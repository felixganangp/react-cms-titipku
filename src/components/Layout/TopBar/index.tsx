import React, { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import SideBarHeader from '../SideBar/Header';
import { UserDetails } from '../../../models/UserDetails';
import Notification from './Notification';
import FullScreen from './FullScreen';
import Search from './Search';
import {
  ContentContainer,
  EmailDetails,
  EmailHeader,
  Expand,
  // FullScreen,
  // FullscreenExit,
  LogoutButton,
  // Notification,
  Role,
  // Search,
  // StyledListbox,
  // StyledMenuItem,
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
  const [openProfile, setOpenProfile] = useState(null);

  const handleOpenProfile = (event: any) => {
    setOpenProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const logout = () => {
    localStorage.clear();
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
              <Stack direction="row" mr="15px">
                <Search openSidebar={open} />
                <Notification />
                <FullScreen />
              </Stack>

              {/* account description on top right */}
              <Box right={0} marginRight="24px" sx={{ cursor: 'pointer' }}>
                <Tooltip title="Open account details">
                  <UserContainer onClick={handleOpenProfile}>
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
                <Popover
                  open={Boolean(openProfile)}
                  anchorEl={openProfile}
                  onClose={handleCloseProfile}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      mt: 1.8,
                      ml: 0.75,
                      borderRadius: '10px',
                      boxShadow:
                        'rgb(145 158 171 / 20%) 0px 5px 5px -3px, rgb(145 158 171 / 14%) 0px 8px 10px 1px, rgb(145 158 171 / 12%) 0px 3px 14px 2px',
                    },
                  }}
                >
                  <Box>
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
                    <Box>
                      <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                        <LogoutButton onClick={() => logout()}>
                          Sign Out
                          <PowerSettingsNewOutlinedIcon />
                        </LogoutButton>
                      </Link>
                    </Box>
                  </Box>
                </Popover>
              </Box>
            </ContentContainer>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default TopBar;
