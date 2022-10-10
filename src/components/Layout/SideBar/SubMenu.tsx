import React, { useState } from 'react';
import styled from '@emotion/styled';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const IconButton = styled.nav`
  background-color: transparent;
  font-size: 20px;
  color: #626b79;
`;

interface SubMenuProps {
  value: {
    id: number;
    title: string;
    path: string;
    icon: any;
    subNav: {
      id: number;
      path: string;
      title: string;
    }[];
  }[];
}

function SubMenu(props: SubMenuProps) {
  const { value } = props;
  const [openList, setOpenList] = useState(0);

  const iconOpened = <ExpandMore sx={{ fontSize: '20px', color: '#626b79' }} />;
  const iconClosed = <ExpandLess sx={{ fontSize: '20px', color: '#626b79' }} />;

  const toggleOpenList = (item: { id: number }) => {
    if (item.id !== openList) setOpenList(item.id);
    else setOpenList(0);
  };
  const handleClickItem = (item: {
    id: number;
    subNav: [] | null;
    path: string;
  }) => {
    return item?.subNav?.length === 0 ? (
      <Link to={item.path} />
    ) : (
      toggleOpenList(item)
    );
  };

  return (
    <List dense>
      {value?.map((item) =>
        item?.subNav?.length === 0 ? (
          <Link key={item.id} style={{ textDecoration: 'none' }} to={item.path}>
            <ListItemButton
              sx={{
                margin: '6px 14px',
                padding: '10px',
                borderRadius: '8px',
              }}
              key={item.id}
            >
              <ListItemIcon sx={{ minWidth: '46px', fontSize: '20px' }}>
                <IconButton>{item.icon}</IconButton>
              </ListItemIcon>
              <ListItemText
                primary={item.title}
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
              {
                // eslint-disable-next-line no-nested-ternary
                item.subNav.length > 0 && openList !== item.id
                  ? iconOpened
                  : item.subNav.length > 0 && openList === item.id
                  ? iconClosed
                  : null
              }
              {/* {item.subNav.length > 0 &&
              (openList !== item.id ? iconOpened : iconClosed)} */}
              {/* {item.subNav.length === 0 && null} */}
            </ListItemButton>
          </Link>
        ) : (
          <ListItemButton
            sx={{
              margin: '6px 14px',
              padding: '10px',
              borderRadius: '8px',
            }}
            onClick={() => handleClickItem}
            key={item.id}
          >
            <ListItemIcon sx={{ minWidth: '46px', fontSize: '20px' }}>
              <IconButton>{item.icon}</IconButton>
            </ListItemIcon>
            <ListItemText
              primary={item.title}
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
            {
              // eslint-disable-next-line no-nested-ternary
              item.subNav.length > 0 && openList !== item.id
                ? iconOpened
                : item.subNav.length > 0 && openList === item.id
                ? iconClosed
                : null
            }
          </ListItemButton>
        ),
      )}
    </List>
  );
}

export default SubMenu;
