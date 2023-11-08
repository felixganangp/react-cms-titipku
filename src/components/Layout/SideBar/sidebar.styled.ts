import styled from '@emotion/styled';
import { Box, ListItemButton, ListItemText, IconButton } from '@mui/material';

interface ItemTextProps {
  currentActive: boolean;
}

interface HeaderProps {
  open: boolean;
}

export const ItemText = styled(ListItemText)`
  color: #303030;
  display: inline;
  margin: 0px;
  margin-left: -12px;
  overflow-x: hidden;
  font-size: 14px;
  font-family: 'Roboto-Regular';
  white-space: nowrap;
  min-width: 126px;
`;

export const ItemButton = styled(ListItemButton)`
  margin: 6px 14px 0 14px;
  padding: 10px;
  border-radius: 8px;
`;

export const ItemButtonChild = styled(ListItemButton)`
  margin: 6px 20px;
  padding: 10px;
  border-radius: 8px;
`;

export const ItemTextChild = styled(ListItemText)<
  Pick<ItemTextProps, 'currentActive'>
>`
  display: inline;
  margin: 0px;
  margin-left: -8px;
  overflow-x: hidden;
  color: ${(p) => (p.currentActive ? '#0774d1' : '#303030')};
  font-size: 14px;
  font-family: 'Roboto-Regular';
  white-space: nowrap;
  min-width: 126px;
`;

export const ItemButtonChildAsParent = styled(ListItemButton)`
  margin: 6px 14px;
  padding: 10px;
  border-radius: 8px;
`;

export const ItemTextChildAsParent = styled(ListItemText)<
  Pick<ItemTextProps, 'currentActive'>
>`
  display: inline;
  color: ${(p) => (p.currentActive ? '#0774d1' : '#303030')};
  margin: 0px;
  margin-left: 7px;
  overflow-x: hidden;
  font-size: 14px;
  white-space: nowrap;
  min-width: 126px;
`;

export const ItemButtonSuperChild = styled(ListItemButton)`
  margin: 6px 20px;
  padding: 10px;
  border-radius: 8px;
  padding-left: 0px;
`;

export const ItemTextSuperChild = styled(ListItemText)<
  Pick<ItemTextProps, 'currentActive'>
>`
  color: ${(p) => (p.currentActive ? '#0774d1' : '#303030')};
  display: inline;
  margin: 0px;
  margin-left: 21px;
  overflow-x: hidden;
  font-size: 14px;
  white-space: nowrap;
  min-width: 126px;
`;

export const HeaderContainer = styled(Box)<Pick<HeaderProps, 'open'>>`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 63px;
  width: 266px;
  background-color: #fff;
  padding: 20px 16px 20px 18px;
  box-shadow: ${(p) =>
    p.open ? '8px 3px 10px -7px rgba(0, 0, 0, 0.1)' : 'none'};
  align-self: stretch;
  flex-grow: 0;
`;

export const BoxSmallLogo = styled(Box)<Pick<HeaderProps, 'open'>>`
  min-width: initial;
  padding: 3px;
  border-radius: 10px;
  margin-left: ${(p) => (p.open ? '-15px' : '0px')};
  background-color: transparent;
  :hover {
    background-color: transparent;
  }
`;

export const SmallLogo = styled(IconButton)`
  width: 28px;
  background-color: transparent;
  padding: 0;
  padding-left: 14px;
  margin-left: 7px;
  margin-top: 5px;
`;

export const ShadowMinimizeHeader = styled(Box)`
  width: 62px;
  margin: 0;
  height: 63px;
  box-shadow: 8px 3px 10px -7px rgba(0, 0, 0, 0.1);
`;

export const MinimizeSideBar = styled.img`
  width: 16px;
  height: 16px;
  flex-grow: 0;
  margin: 5px 0 0 0;
  object-fit: contain;
`;
