/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { UserDetails } from 'models/UserDetails';
import { useAppSelector } from 'store/hooks';
import { FilteredMenu } from 'models/Menu';
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

const sidebarData = [
  {
    id: 11,
    title: 'User',
    path: '',
    icon: <PeopleIcon />,
    child: [
      // {
      //   id: 12,
      //   title: 'Nitiper',
      //   path: '/nitiper',
      //   child: [],
      // },
      {
        id: 150,
        title: 'Jatiper',
        path: '/jatiper',
        child: [
          {
            id: 15,
            title: 'Jatiper Management',
            path: '/jatiper-management',
          },
          // {
          //   id: 14,
          //   title: 'Jatiper Registration',
          //   path: '/jatiper-registration',
          // },
        ],
      },
    ],
  },
  {
    id: 140,
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
      // {
      //   id: 14,
      //   title: 'Lapak',
      //   path: '/lapak',
      //   child: [],
      // },
    ],
  },
  {
    id: 320,
    title: 'Products',
    path: '',
    icon: <StoreIcon />,
    child: [
      {
        id: 32,
        title: 'Product Mangement',
        path: '/product-management',
        child: [],
      },
      {
        id: 33,
        title: 'SKU Mangement',
        path: '/sku-management',
        child: [],
      },
      {
        id: 31,
        title: 'Category Mangement',
        path: '/category-management',
        child: [],
      },
    ],
  },
  // {
  //   id: 5,
  //   title: 'Transaction',
  //   path: '',
  //   icon: <StoreIcon />,
  //   child: [
  //     {
  //       id: 16,
  //       title: 'Transaction',
  //       path: '/transaction',
  //       child: [],
  //     },
  //     {
  //       id: 16,
  //       title: 'Urgent Order',
  //       path: '/urgent-order',
  //       child: [],
  //     },
  //   ],
  // },
  {
    id: 190,
    title: 'Application',
    path: '',
    icon: <PhonelinkSetupIcon />,
    child: [
      {
        id: 19,
        title: 'Notification',
        path: '/notification',
        child: [],
      },
      {
        id: 20,
        title: 'Banner',
        path: '/banner',
        child: [],
      },
      {
        id: 22,
        title: 'Event',
        path: '/event',
        child: [],
      },
      // {
      //   id: 17,
      //   title: 'Giveaway',
      //   path: '/giveaway',
      //   child: [],
      // },
    ],
  },
  {
    id: 290,
    title: 'Promo & Voucher',
    path: '',
    icon: <ConfirmationNumberIcon />,
    child: [
      {
        id: 29,
        title: 'Promo Product',
        path: '/promo-product',
        child: [],
      },
      // {
      //   id: 17,
      //   title: 'Join Promo',
      //   path: '/join-promo',
      //   child: [],
      // },
      // {
      //   id: 17,
      //   title: 'Voucher',
      //   path: '/voucher',
      //   child: [],
      // },
      // {
      //   id: 17,
      //   title: 'Mass Voucher',
      //   path: '/mass-voucher',
      //   child: [],
      // },
      // {
      //   id: 17,
      //   title: 'Giveaway',
      //   path: '/giveaway',
      //   child: [],
      // },
    ],
  },
  {
    id: 80,
    title: 'Service & Request',
    path: '',
    icon: <HeadsetMicIcon />,
    child: [
      {
        id: 8,
        title: 'Withdraw Request',
        path: '/withdraw-request',
        child: [],
      },
      // {
      //   id: 19,
      //   title: 'Join Promo Request',
      //   path: '/join-promo-request',
      //   child: [],
      // },
      // {
      //   id: 19,
      //   title: 'New Product Request',
      //   path: '/new-product-request',
      //   child: [],
      // },
      // {
      //   id: 19,
      //   title: 'Master Data Config',
      //   path: '/master-data-config',
      //   child: [],
      // },
      // {
      //   id: 19,
      //   title: 'App Service',
      //   path: '/app-service',
      //   child: [],
      // },
    ],
  },
  {
    id: 14,
    title: 'KUR',
    path: '',
    icon: <LocalAtmIcon />,
    child: [
      {
        id: 15,
        title: 'Customer',
        path: '/kur/customer',
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
        id: 0,
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
    const filtered: FilteredMenu[] = sidebarData.filter(
      (item) => menuData.find((menu) => menu.id === item.id) !== undefined,
    );
    const filtered2: FilteredMenu[] = [...sidebarData];
    filtered2.map((menu, i) =>
      filtered2[i].child.filter(
        (child) => menuData.find((a) => a.id === child.id) !== undefined,
      ),
    );
    console.log(filteredMenu);
    setFilteredMenu(filtered);
  }, []);

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
