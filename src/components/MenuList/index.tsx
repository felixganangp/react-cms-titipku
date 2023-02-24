import { Menu, MenuItem } from '@mui/material';
import React, {
  cloneElement,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useState,
} from 'react';

interface MenuListProps {
  menu: {
    label: string;
    color?: string;
    onClick(): void;
    dataId?: string;
  }[];
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

export default function MenuList(props: MenuListProps) {
  const { menu, children } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (open: string, event: React.MouseEvent<HTMLElement>) => {
    if (open === 'open') setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };

  return (
    <>
      {cloneElement(children, {
        onClick: (e: React.MouseEvent<HTMLElement>) => handleClick('open', e),
      })}
      <Menu
        data-testid="basic-menu"
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={(e: React.MouseEvent<HTMLElement>) => handleClick('close', e)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menu.map((val, key) => (
          <MenuItem
            data-testid={val.dataId}
            sx={{ color: val.color ? val.color : '#000' }}
            key={String(key)}
            onClick={(e) => {
              val.onClick();
              handleClick('close', e);
            }}
          >
            {val.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
