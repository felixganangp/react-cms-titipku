/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SideBarProfile from './Profile';
import SubMenu from './SubMenu';

interface SideBarProps {
  open: boolean;
  setOpen(arg0: boolean): void;
  userDetails: { fullName: string; email: string };
}

const drawerWidthOpen = 236;
const paddingIconButton = 10;
const marginIconButton = 14;
const iconFontSize = 20;
const drawerWidthClose =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize;

function SideBar(props: SideBarProps) {
  const { open, setOpen, userDetails } = props;

  const theme = useTheme();
  const profileData = {
    name: userDetails.fullName,
    email: userDetails.email,
  };

  const sidebarData = [
    {
      id: 1,
      title: 'User',
      path: '/cms/user',
      icon: <PeopleIcon />,
      subNav: [
        {
          id: 12,
          title: 'Child User',
          path: '/cms/child-user',
        },
      ],
    },
    {
      id: 2,
      title: 'Jatiper',
      path: '/cms/jatiper',
      icon: <PersonIcon />,
      subNav: [
        {
          id: 13,
          title: 'Child Jatiper',
          path: '/cms/child-jatiper',
        },
      ],
    },
    {
      id: 3,
      title: 'Lapak',
      path: '/cms/lapak',
      icon: <StoreIcon />,
      subNav: [
        {
          id: 14,
          title: 'Child Lapak',
          path: '/cms/child-lapak',
        },
      ],
    },
    {
      id: 4,
      title: 'Product',
      path: '/cms/product',
      icon: <StoreIcon />,
      subNav: [
        {
          id: 15,
          title: 'Child Product',
          path: '/cms/child-product',
        },
      ],
    },
    {
      id: 5,
      title: 'Transaction',
      path: '/cms/transaction',
      icon: <StoreIcon />,
      subNav: [
        {
          id: 16,
          title: 'Child Transaction',
          path: '/cms/child-transaction',
        },
      ],
    },
    {
      id: 6,
      title: 'Application',
      path: '/cms/application',
      icon: <PhonelinkSetupIcon />,
      subNav: [
        {
          id: 17,
          title: 'Child Application',
          path: '/cms/child-appl',
        },
      ],
    },
    {
      id: 7,
      title: 'Promo & Voucher',
      path: '/cms/promo-voucher',
      icon: <ConfirmationNumberIcon />,
      subNav: [
        {
          id: 18,
          title: 'Child Promo',
          path: '/cms/child-promo',
        },
      ],
    },
    {
      id: 8,
      title: 'Service & Request',
      path: '/cms/service-request',
      icon: <HeadsetMicIcon />,
      subNav: [
        {
          id: 19,
          title: 'Child Service',
          path: '/cms/child-service',
        },
      ],
    },
    {
      id: 9,
      title: 'Admin Panel',
      path: '',
      icon: <PersonIcon />,
      subNav: [
        {
          id: 10,
          title: 'Role User',
          path: '/cms/role-user',
        },
        {
          id: 11,
          title: 'Role Management',
          path: '/cms/role-management',
        },
      ],
    },
  ];

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
      <SubMenu value={sidebarData} />
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
  );
}

export default SideBar;
