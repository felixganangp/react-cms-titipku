import React, { useState } from 'react';
import styled from '@emotion/styled';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import ChildMenu from './ChildMenu';

const IconButton = styled.nav`
  background-color: transparent;
  font-size: 20px;
  color: #626b79;
`;

interface MenuProps {
  listOfMenu: {
    id: number;
    title: string;
    path: string;
    icon: any;
    child: {
      id: number;
      path: string;
      title: string;
      child:
        | {
            id: number;
            path: string;
            title: string;
          }[]
        | [];
    }[];
  }[];
  open: boolean;
}

function Menu(props: MenuProps) {
  const { listOfMenu, open } = props;
  const [openList, setOpenList] = useState(0);

  const iconOpened = <ExpandMore sx={{ fontSize: '20px', color: '#626b79' }} />;
  const iconClosed = <ExpandLess sx={{ fontSize: '20px', color: '#626b79' }} />;

  const toggleOpenList = (item: { id: number }) => {
    if (item.id !== openList) setOpenList(item.id);
    else setOpenList(0);
  };

  return (
    <List dense>
      {listOfMenu?.map((menu) =>
        menu?.child?.length === 0 ? (
          <Link key={menu.id} style={{ textDecoration: 'none' }} to={menu.path}>
            <ListItemButton
              sx={{
                margin: '6px 14px',
                padding: '10px',
                borderRadius: '8px',
              }}
              key={menu.id}
            >
              <ListItemIcon sx={{ minWidth: '46px', fontSize: '20px' }}>
                <IconButton>{menu.icon}</IconButton>
              </ListItemIcon>
              <ListItemText
                primary={menu.title}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
                sx={{
                  display: 'inline',
                  margin: '0px',
                  overflowX: 'hidden',
                  color: '#626b79',
                  fontSize: '14px',
                  fontFamily: 'Roboto-Regular',
                  whiteSpace: 'nowrap',
                  minWidth: '126px',
                }}
              />
              <Box position="absolute" top="30%" right="5px">
                {
                  // eslint-disable-next-line no-nested-ternary
                  menu.child.length > 0 && openList !== menu.id
                    ? iconOpened
                    : menu.child.length > 0 && openList === menu.id
                    ? iconClosed
                    : null
                }
              </Box>

              {/* {item.subNav.length > 0 &&
              (openList !== item.id ? iconOpened : iconClosed)} */}
              {/* {item.subNav.length === 0 && null} */}
            </ListItemButton>
          </Link>
        ) : (
          <>
            <ListItemButton
              sx={{
                margin: '6px 14px',
                padding: '10px',
                borderRadius: '8px',
              }}
              onClick={() =>
                menu.child.length === 0 ? (
                  <Link to={menu.path} />
                ) : (
                  toggleOpenList(menu)
                )
              }
              key={menu.id}
            >
              <ListItemIcon sx={{ minWidth: '46px', fontSize: '20px' }}>
                <IconButton>{menu.icon}</IconButton>
              </ListItemIcon>
              <ListItemText
                primary={menu.title}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
                sx={{
                  display: 'inline',
                  margin: '0px',
                  overflowX: 'hidden',
                  color: '#626b79',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  minWidth: '126px',
                }}
              />
              <Box position="absolute" top="30%" right="5px">
                {
                  // eslint-disable-next-line no-nested-ternary
                  menu.child.length > 0 && openList !== menu.id
                    ? iconOpened
                    : menu.child.length > 0 && openList === menu.id
                    ? iconClosed
                    : null
                }
              </Box>
            </ListItemButton>
            <Collapse in={openList === menu.id && !open}>
              <Box
                sx={{
                  margin: '-9px',
                  marginLeft: '0px',
                }}
              >
                <ChildMenu key={menu.id} child={menu.child} open={open} />
              </Box>
            </Collapse>
          </>
        ),
      )}
    </List>
  );
}

export default Menu;
