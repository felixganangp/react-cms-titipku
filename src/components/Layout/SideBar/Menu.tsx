/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { userDetailsAction } from 'store/slice/UserDetails';
import { FilteredMenu } from 'models/Menu';
import ChildMenu from './ChildMenu';
import { ItemButton, ItemText } from './sidebar.styled';

const IconButton = styled.nav`
  background-color: transparent;
  font-size: 20px;
  color: #303030;
`;

interface MenuProps {
  listOfMenu: FilteredMenu[];
  open: boolean;
}

function Menu(props: MenuProps) {
  const { listOfMenu, open } = props;
  const [openList, setOpenList] = useState(0);
  const dispatch = useAppDispatch();
  const currentActiveMenu = useAppSelector(
    (state) => state.userDetails.currentActiveMenu,
  );

  const iconOpened = <ExpandMore sx={{ fontSize: '20px', color: '#303030' }} />;
  const iconClosed = <ExpandLess sx={{ fontSize: '20px', color: '#303030' }} />;

  const toggleOpenList = (item: { id: number }) => {
    if (item.id !== openList) setOpenList(item.id);
    else setOpenList(0);
  };

  const handleChangeActiveMenu = (id: number) => {
    dispatch(userDetailsAction.setCurrentActiveMenu({ id }));
  };

  return (
    <List dense>
      {listOfMenu?.map((menu) =>
        menu?.child?.length === 0 ? (
          <Link
            data-testid="sidebar-menulist"
            key={menu.id + menu.title}
            style={{
              textDecoration: 'none',
            }}
            to={menu.path}
            onClick={() => handleChangeActiveMenu(menu.id)}
          >
            <ItemButton key={menu.id + menu.title}>
              <ListItemIcon>
                <IconButton style={{ marginTop: '5px' }}>
                  {menu.icon}
                </IconButton>
              </ListItemIcon>
              <ItemText
                data-testid="side-bar-parentmenu"
                primary={menu.title}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
              />
              <Box position="absolute" top="30%" right="5px">
                {menu.child.length > 0 && openList !== menu.id && open
                  ? iconOpened
                  : menu.child.length > 0 && openList === menu.id && open
                  ? iconClosed
                  : null}
              </Box>
            </ItemButton>
          </Link>
        ) : (
          // have child
          <div key={menu.id + menu.title}>
            <ItemButton
              onClick={() =>
                menu.child.length === 0 ? (
                  <Link to={menu.path} />
                ) : (
                  toggleOpenList(menu)
                )
              }
              key={menu.id + menu.title}
            >
              <ListItemIcon>
                <IconButton style={{ marginTop: '5px' }}>
                  {menu.icon}
                </IconButton>
              </ListItemIcon>
              <ItemText
                primary={menu.title}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
              />
              <Box position="absolute" top="30%" right="5px">
                {
                  // eslint-disable-next-line no-nested-ternary
                  menu.child.length > 0 && openList !== menu.id && !open
                    ? iconOpened
                    : menu.child.length > 0 && openList === menu.id && !open
                    ? iconClosed
                    : null
                }
              </Box>
            </ItemButton>
            <Collapse in={openList === menu.id && !open}>
              <Box margin="-9px" marginLeft="0px">
                <ChildMenu
                  key={menu.id + menu.title}
                  child={menu.child}
                  open={open}
                  onSetCurrentMenu={handleChangeActiveMenu}
                  currentActiveMenu={currentActiveMenu}
                />
              </Box>
            </Collapse>
          </div>
        ),
      )}
    </List>
  );
}

export default Menu;
