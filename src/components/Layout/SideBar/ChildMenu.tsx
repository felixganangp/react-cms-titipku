import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import React from 'react';
import { Link } from 'react-router-dom';
import { ListItemIcon, ListItemText } from '@mui/material';

interface ChildMenuProps {
  subNav: {
    id: number;
    path: string;
    title: string;
  }[];
}

export default function ChildMenu(props: ChildMenuProps) {
  const { subNav } = props;

  return (
    <List dense>
      {subNav.map((item) => (
        <Link
          style={{
            textDecoration: 'none',
          }}
          to={item.path}
          key={item.path}
        >
          <ListItemButton
            sx={{
              margin: '6px 20px',
              padding: '10px',
              borderRadius: '8px',
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
              key={item.id}
            />
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
}
