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
import Menu from './Menu';

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
      path: '',
      icon: <PeopleIcon />,
      child: [
        {
          id: 12,
          title: 'Nitiper',
          path: '/nitiper',
          child: [],
        },
        {
          id: 13,
          title: 'Jatiper',
          path: '/jatiper',
          child: [
            {
              id: 13,
              title: 'Jatiper Management',
              path: '/jatiper-management',
            },
            {
              id: 14,
              title: 'Jatiper Registration',
              path: '/jatiper-registration',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Lapak',
      path: '',
      icon: <StoreIcon />,
      child: [
        {
          id: 14,
          title: 'Area',
          path: '/area',
          child: [],
        },
        {
          id: 14,
          title: 'Lapak',
          path: '/lapak',
          child: [],
        },
      ],
    },
    {
      id: 4,
      title: 'Products',
      path: '',
      icon: <StoreIcon />,
      child: [
        {
          id: 15,
          title: 'Product Mangement',
          path: '/product-management',
          child: [],
        },
        {
          id: 15,
          title: 'SKU Mangement',
          path: '/sku-management',
          child: [],
        },
        {
          id: 15,
          title: 'Category Mangement',
          path: '/category-management',
          child: [],
        },
      ],
    },
    {
      id: 5,
      title: 'Transaction',
      path: '',
      icon: <StoreIcon />,
      child: [
        {
          id: 16,
          title: 'Transaction',
          path: '/transaction',
          child: [],
        },
        {
          id: 16,
          title: 'Urgent Order',
          path: '/urgent-order',
          child: [],
        },
      ],
    },
    {
      id: 6,
      title: 'Application',
      path: '',
      icon: <PhonelinkSetupIcon />,
      child: [
        {
          id: 17,
          title: 'Notification',
          path: '/notification',
          child: [],
        },
        {
          id: 17,
          title: 'Banner',
          path: '/banner',
          child: [],
        },
        {
          id: 17,
          title: 'Event',
          path: '/event',
          child: [],
        },
        {
          id: 17,
          title: 'Giveaway',
          path: '/giveaway',
          child: [],
        },
      ],
    },
    {
      id: 7,
      title: 'Promo & Voucher',
      path: '',
      icon: <ConfirmationNumberIcon />,
      child: [
        {
          id: 18,
          title: 'Promo Product',
          path: '/promo-product',
          child: [],
        },
        {
          id: 17,
          title: 'Join Promo',
          path: '/join-promo',
          child: [],
        },
        {
          id: 17,
          title: 'Voucher',
          path: '/voucher',
          child: [],
        },
        {
          id: 17,
          title: 'Mass Voucher',
          path: '/mass-voucher',
          child: [],
        },
        {
          id: 17,
          title: 'Giveaway',
          path: '/giveaway',
          child: [],
        },
      ],
    },
    {
      id: 8,
      title: 'Service & Request',
      path: '',
      icon: <HeadsetMicIcon />,
      child: [
        {
          id: 19,
          title: 'Withdraw Request',
          path: '/withdraw-request',
          child: [],
        },
        {
          id: 19,
          title: 'Join Promo Request',
          path: '/join-promo-request',
          child: [],
        },
        {
          id: 19,
          title: 'New Product Request',
          path: '/new-product-request',
          child: [],
        },
        {
          id: 19,
          title: 'Master Data Config',
          path: '/master-data-config',
          child: [],
        },
        {
          id: 19,
          title: 'App Service',
          path: '/app-service',
          child: [],
        },
      ],
    },
    {
      id: 9,
      title: 'Admin Panel',
      path: '',
      icon: <PersonIcon />,
      child: [
        {
          id: 10,
          title: 'Role User',
          path: '/role-user',
          child: [],
        },
        {
          id: 11,
          title: 'Role Access',
          path: '/role-access',
          child: [],
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
      <Menu listOfMenu={sidebarData} open={open} />
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
        height="calc(100% - 56px)"
        boxShadow="0 3px 10px 0 rgba(0, 0, 0, 0.1)"
      />
      <Box position="absolute" height="calc(100% - 56px)">
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
