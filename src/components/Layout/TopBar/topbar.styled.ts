import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';
import { Box, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationIcon from '@mui/icons-material/NotificationsNoneOutlined';
import FullscreenIcon from '@mui/icons-material/FullscreenOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ExpandIcon from '@mui/icons-material/KeyboardArrowDown';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

export const UsernameHeader = styled(Typography)`
  text-align: left;
  font-size: 14px;
  color: #303030;
  margin-left: 7px;
  text-align: left;
  font-family: 'Roboto';
`;

export const EmailHeader = styled(Typography)`
  font-size: 12px;
  text-align: left;
  color: #8b95a5;
  margin-left: 7px;
  font-family: 'Roboto';
`;

export const StyledListbox = styled.ul`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 5px;
  margin: 10px 0;
  overflow: auto;
  outline: 0px;
  border-radius: 10px;
  border: none !important;
`;

export const StyledMenuItem = styled(MenuItemUnstyled)`
  list-style: none;
  border: none !important;
  cursor: default;
  user-select: none;
  width: 260px;
  height: 100px;
  border-radius: 10px;
  background-color: #ffff;
  margin-right: 25px;
  float: left;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
`;

export const Username = styled(Typography)`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 15px;
  color: #303030;
  margin-left: 7px;
  text-align: left;
`;

export const EmailDetails = styled(Typography)`
  text-align: left;
  font-size: 14px;
  color: #8b95a5;
  margin-left: 7px;
`;

export const Role = styled.div`
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

export const LogoutButton = styled.div`
  width: 260px;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 15px 0 0;
  padding: 0;
  background-color: #303030;
  border-radius: 0px 0px 10px 10px;
  color: white;
`;

export const ContentContainer = styled(Box)`
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const Search = styled(SearchIcon)`
  color: #303030;
`;

export const Notification = styled(NotificationIcon)`
  color: #303030;
`;

export const FullScreen = styled(FullscreenIcon)`
  color: #303030;
`;

export const FullscreenExit = styled(FullscreenExitIcon)`
  color: #303030;
`;

export const UserContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    background-color: #fafafa;
  }
  border-radius: 4px;
`;

export const UserIcon = styled(PersonIcon)`
  background-color: #303030;
  border-radius: 50%;
  border: 3px #303030 solid;
  color: #fff;
  width: 32px;
  height: 32px;
`;

export const UserStack = styled(Stack)`
  margin-left: 8px;
  gap: 2px;
`;

export const Expand = styled(ExpandIcon)`
  color: #303030;
  margin-left: 20px;
`;

export const UserIconDetails = styled(PersonIcon)`
  background-color: #303030;
  border-radius: 50%;
  border: 2px white solid;
  color: #fff;
  width: 60px;
  height: 60px;
  margin-left: 8px;
  margin-top: 9.5px;
`;
