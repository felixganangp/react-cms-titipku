import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';

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
