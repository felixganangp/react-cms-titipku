import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { CurrentActiveMenu } from 'models/Menu';
import { userDetailsAction } from 'store/slice/UserDetails';

interface ChildMenuProps {
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
  open: boolean;
  onSetCurrentMenu: (id: number) => void;
  currentActiveMenu: number;
}

export default function ChildMenu({
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
        item.child.length === 0 ? (
          <Link
            style={{
              textDecoration: 'none',
            }}
            to={item.path}
            key={item.path + item.id}
            onClick={() => onSetCurrentMenu(item.id)}
          >
            <ListItemButton
              sx={{
                margin: '6px 20px',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor:
                  currentActiveMenu === item.id ? '#ebeff3' : 'transparent',
              }}
            >
              <ListItemIcon sx={{ minWidth: '46px', fontSize: '20px' }} />
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
                key={item.id + item.title}
              />
            </ListItemButton>
          </Link>
        ) : (
          <div key={item.path + item.id}>
            <ListItemButton
              sx={{
                margin: '6px 14px',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor:
                  currentActiveMenu === item.id ? '#ebeff3' : 'transparent',
              }}
              onClick={() =>
                item.child.length === 0 ? (
                  <Link to={item.path} />
                ) : (
                  toggleOpenList(item)
                )
              }
              key={item.id + item.title}
            >
              <ListItemIcon sx={{ minWidth: '46px', fontSize: '20px' }} />
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
                sx={{
                  display: 'inline',
                  margin: '0px',
                  marginLeft: '7px',
                  overflowX: 'hidden',
                  color: '#626b79',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  minWidth: '126px',
                }}
              />
              <Box position="absolute" top="25%" right="5px">
                {
                  // eslint-disable-next-line no-nested-ternary
                  item.child.length > 0 && openList !== item.id
                    ? iconOpened
                    : item.child.length > 0 && openList === item.id
                    ? iconClosed
                    : null
                }
              </Box>
            </ListItemButton>
            <Collapse in={openList === item.id && !open}>
              <Box
                sx={{
                  margin: '-9px',
                }}
              >
                <List dense>
                  {item.child.map((superchild) => (
                    <Link
                      key={superchild.id + superchild.title}
                      style={{
                        textDecoration: 'none',
                      }}
                      to={superchild.path}
                      onClick={() => onSetCurrentMenu(superchild.id)}
                    >
                      <ListItemButton
                        sx={{
                          margin: '6px 20px',
                          padding: '10px',
                          borderRadius: '8px',
                          backgroundColor:
                            currentActiveMenu === superchild.id
                              ? '#ebeff3'
                              : 'transparent',
                        }}
                      >
                        <ListItemIcon
                          sx={{ minWidth: '46px', fontSize: '20px' }}
                        />
                        <ListItemText
                          primary={superchild.title}
                          primaryTypographyProps={{
                            variant: 'body2',
                          }}
                          sx={{
                            display: 'inline',
                            margin: '0px',
                            marginLeft: '21px',
                            overflowX: 'hidden',
                            color: '#626b79',
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                            minWidth: '126px',
                          }}
                        />
                      </ListItemButton>
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
