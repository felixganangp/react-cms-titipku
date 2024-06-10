/* eslint-disable no-nested-ternary */
import List from '@mui/material/List';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';
import { Child } from 'models/Menu';
import {
  ItemButtonChild,
  ItemButtonChildAsParent,
  ItemButtonSuperChild,
  ItemTextChild,
  ItemTextChildAsParent,
  ItemTextSuperChild,
} from './sidebar.styled';

interface ChildMenuProps {
  child: Child[];
  open: boolean;
  onSetCurrentMenu: (id: number) => void;
  currentActiveMenu: number;
}

export default function ChildrenMenu({
  child,
  open,
  onSetCurrentMenu,
  currentActiveMenu,
}: ChildMenuProps) {
  const [openList, setOpenList] = useState<number | null>(null);

  const toggleOpenList = (item: { id: number }) => {
    if (item.id !== openList) setOpenList(item.id);
    else setOpenList(null);
  };

  const iconOpened = <ExpandMore sx={{ fontSize: '20px', color: '#626b79' }} />;
  const iconClosed = <ExpandLess sx={{ fontSize: '20px', color: '#626b79' }} />;

  return (
    <List dense>
      {child.map((item) =>
        (item.child?.length || 0) === 0 ? (
          <Link
            style={{
              textDecoration: 'none',
            }}
            to={item.path}
            key={item.path + item.id}
            onClick={() => onSetCurrentMenu(item.id)}
          >
            <ItemButtonChild data-testid="sidebar-childmenu-button">
              <ListItemIcon sx={{ minWidth: '46px', fontSize: '20px' }} />
              <ItemTextChild
                currentActive={currentActiveMenu === item.id}
                data-testid="side-bar-childmenu"
                primary={item.title}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
                key={item.id + item.title}
              />
            </ItemButtonChild>
          </Link>
        ) : (
          <div key={item.path + item.id}>
            <ItemButtonChildAsParent
              onClick={() =>
                (item.child?.length || 0) === 0 ? (
                  <Link to={item.path} />
                ) : (
                  toggleOpenList(item)
                )
              }
              key={item.id + item.title}
            >
              <ListItemIcon
                sx={{ minWidth: '46px', fontSize: '20px', ml: '-10px' }}
              />
              <ItemTextChildAsParent
                currentActive={currentActiveMenu === item.id}
                primary={item.title}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
              />
              <Box position="absolute" top="25%" right="5px">
                {item.child && item.child?.length > 0 && openList !== item.id
                  ? iconOpened
                  : item.child && item.child?.length > 0 && openList === item.id
                  ? iconClosed
                  : null}
              </Box>
            </ItemButtonChildAsParent>
            <Collapse in={openList === item.id && !open}>
              <Box
                sx={{
                  margin: '-9px',
                }}
              >
                <List dense>
                  {item.child?.map((superchild) => (
                    <Link
                      key={superchild.id + superchild.title}
                      style={{
                        textDecoration: 'none',
                      }}
                      to={superchild.path}
                      onClick={() => onSetCurrentMenu(superchild.id)}
                    >
                      <ItemButtonSuperChild>
                        <ListItemIcon
                          sx={{ minWidth: '46px', fontSize: '20px' }}
                        />
                        <ItemTextSuperChild
                          currentActive={currentActiveMenu === superchild.id}
                          primary={superchild.title}
                          primaryTypographyProps={{
                            variant: 'body2',
                          }}
                        />
                      </ItemButtonSuperChild>
                    </Link>
                  ))}
                </List>
              </Box>
            </Collapse>
          </div>
        ),
      )}
    </List>
  );
}
