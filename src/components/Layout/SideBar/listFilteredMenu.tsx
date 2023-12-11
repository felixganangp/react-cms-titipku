/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import KurIcon from 'components/Icon/Kur';
import AdminPanelIcon from 'components/Icon/AdminPanel';
import { Child, FilteredMenu } from 'models/Menu';
import B2B from 'components/Icon/B2B';

export const sidebarDataDev: FilteredMenu[] = [
  {
    id: 51,
    title: 'Serpong Fresh',
    path: '',
    icon: <B2B />,
    child: [
      {
        id: 52,
        title: 'Inventory',
        path: '/b2b/inventory',
        child: [],
      },
      {
        id: 57,
        title: 'Inbound',
        path: '/b2b/inbound',
        child: [],
      },
      {
        id: 58,
        title: 'Setting',
        path: '',
        child: [
          {
            id: 54,
            title: 'Category Management',
            path: '/b2b/category',
          },
          {
            id: 55,
            title: 'Unit of Measurement',
            path: '/b2b/uom',
          },
          {
            id: 56,
            title: 'Supplier Management',
            path: '/b2b/supplier',
          },
        ],
      },
    ],
  },
  // {
  //   id: 48,
  //   title: 'KUR',
  //   path: '',
  //   icon: <KurIcon />,
  //   child: [
  //     {
  //       id: 52,
  //       title: 'Request',
  //       path: '/kur/request',
  //       child: [],
  //     },
  //     {
  //       id: 53,
  //       title: 'Payment',
  //       path: '/kur/payment',
  //       child: [],
  //     },
  //     {
  //       id: 54,
  //       title: 'Invoice Management',
  //       path: '/kur/invoice',
  //       child: [],
  //     },
  //     {
  //       id: 51,
  //       title: 'Customer Management',
  //       path: '',
  //       child: [
  //         {
  //           id: 54,
  //           title: 'Customer',
  //           path: '/kur/customer',
  //         },
  //         {
  //           id: 54,
  //           title: 'Verification',
  //           path: '/kur/verification',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    id: 48,
    title: 'Finance',
    path: '',
    icon: <KurIcon />,
    child: [
      {
        id: 53,
        title: 'Payment',
        path: '/finance/payment',
        child: [],
      },
      {
        id: 54,
        title: 'Invoice Management',
        path: '/finance/invoice',
        child: [],
      },
      {
        id: 51,
        title: 'Customer Management',
        path: '',
        child: [
          {
            id: 54,
            title: 'Customer',
            path: '/finance/customer',
          },
          {
            id: 54,
            title: 'Verification',
            path: '/finance/verification',
          },
        ],
      },
    ],
  },
  {
    id: 47,
    title: 'Admin Panel',
    path: '',
    icon: <AdminPanelIcon />,
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

export const sidebarDataProd: FilteredMenu[] = [
  {
    id: 51,
    title: 'Serpong Fresh',
    path: '',
    icon: <B2B />,
    child: [
      {
        id: 52,
        title: 'Inventory',
        path: '/b2b/inventory',
        child: [],
      },
      {
        id: 57,
        title: 'Inbound',
        path: '/b2b/inbound',
        child: [],
      },
      {
        id: 58,
        title: 'Setting',
        path: '',
        child: [
          {
            id: 54,
            title: 'Category Management',
            path: '/b2b/category',
          },
          {
            id: 55,
            title: 'Unit of Measurement',
            path: '/b2b/uom',
          },
          {
            id: 56,
            title: 'Supplier Management',
            path: '/b2b/supplier',
          },
        ],
      },
    ],
  },
  {
    id: 48,
    title: 'KUR',
    path: '',
    icon: <KurIcon />,
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
    icon: <AdminPanelIcon />,
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
