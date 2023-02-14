/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ManageAccountIcon from '@mui/icons-material/ManageAccountsOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { UserDetails } from 'models/UserDetails';
import { useAppSelector } from 'store/hooks';
import { Child, FilteredMenu } from 'models/Menu';
import SideBarProfile from './Profile';
import Menu from './Menu';

interface SideBarProps {
  open: boolean;
  setOpen(arg0: boolean): void;
  userDetails: UserDetails | null;
}

const drawerWidthOpen = 236;
const paddingIconButton = 10;
const marginIconButton = 14;
const iconFontSize = 20;
const drawerWidthClose =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize;

const sidebarData: FilteredMenu[] = [
  {
    id: 48,
    title: 'KUR',
    path: '',
    icon: <LocalAtmIcon />,
    child: [
      {
        id: 52,
        title: 'Request',
        path: '/kur/request',
        child: [],
      },
      {
        id: 53,
        title: 'Payment',
        path: '/kur/payment',
        child: [],
      },
      {
        id: 54,
        title: 'Invoice Management',
        path: '/kur/invoice',
        child: [],
      },
      {
        id: 51,
        title: 'Customer',
        path: '/kur/customer',
        child: [],
      },
    ],
  },
  {
    id: 47,
    title: 'Admin Panel',
    path: '',
    icon: <ManageAccountIcon />,
    child: [
      {
        id: 49,
        title: 'Role User',
        path: '/role-user',
        child: [],
      },
      {
        id: 50,
        title: 'Role Access',
        path: '/role-access',
        child: [],
      },
    ],
  },
];

function SideBar({ open, setOpen, userDetails }: SideBarProps) {
  const theme = useTheme();
  const menuData = useAppSelector((state) => state.userDetails.menuData);
  const [filteredMenu, setFilteredMenu] = useState<FilteredMenu[]>([]);

  const profileData = {
    name: userDetails?.full_name,
    email: userDetails?.email,
  };

  useEffect(() => {
    const filtered: FilteredMenu[] = [...sidebarData];
    if (menuData && menuData.length > 0) {
      sidebarData.map((menu, i = 0) => {
        if (menuData.find((item) => item.id === menu.id) === undefined) {
          filtered.splice(i, 1);
        } else {
          const filteredChild: Child[] = sidebarData[i].child.filter(
            (a) =>
              menuData.find((subitem) => subitem.id === a.id) !== undefined,
          );
          if (filteredChild.length > 0)
            filtered[filtered.findIndex((a) => a.id === menu.id)].child = [
              ...filteredChild,
            ];
        }
      });
    }
    setFilteredMenu(filtered);
  }, [menuData]);

  const drawerContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignContents: 'center',
          margin: '2px 14px 14px',
          padding: '16px 4px',
          borderBottom: '1px solid #ebeff3',
        }}
      >
        <SideBarProfile value={profileData} />
      </Box>
      <Menu listOfMenu={filteredMenu} open={open} />
    </>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        '& .MuiPaper-root': { position: 'relative' },
        backgroundColor: '#fafafa',
      }}
    >
      <Box
        width={drawerWidthClose}
        height="100%"
        boxShadow="0 3px 10px 0 rgba(0, 0, 0, 0.1)"
      />
      <Box
        position="absolute"
        height="100%"
        boxShadow="0 3px 10px 0 rgba(0, 0, 0, 0.1)"
      >
        <Drawer
          variant="permanent"
          open={open}
          onMouseEnter={() => {
            setOpen(false);
          }}
          onMouseLeave={() => {
            setOpen(true);
          }}
          sx={{
            height: '100%',
            width: open
              ? { xs: '0px', sm: drawerWidthClose }
              : { xs: drawerWidthClose, sm: drawerWidthOpen },
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
            '& .MuiDrawer-paper': {
              justifyContent: 'flex-start',
              overflowX: 'hidden',
              width: open
                ? { xs: '0px', sm: drawerWidthClose }
                : { xs: drawerWidthClose, sm: drawerWidthOpen },
              borderRight: '0px',
              boxShadow: theme.shadows[0],
              backgroundColor: open ? '#fafafa' : '#fafafa',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: open
                  ? theme.transitions.duration.leavingScreen
                  : theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </Box>
  );
}

export default SideBar;
