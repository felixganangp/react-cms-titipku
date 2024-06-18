/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import KurIcon from 'components/Icon/Kur';
import AdminPanelIcon from 'components/Icon/AdminPanel';
import { Child, FilteredMenu } from 'models/Menu';
import B2B from 'components/Icon/B2B';
import DepoAndalan from 'components/Icon/DepoAndalan';

export const sidebarDataDev: FilteredMenu[] = [
  {
    id: 56,
    title: 'Serpong Fresh',
    path: '',
    icon: <B2B />,
    child: [
      {
        id: 57,
        title: 'Inventory',
        path: '/b2b/inventory',
        child: [],
      },
      {
        id: 63,
        title: 'Inbound',
        path: '/b2b/inbound',
        child: [],
      },
      {
        id: 64,
        title: 'Setting',
        path: '',
        child: [
          {
            id: 60,
            title: 'Category Management',
            path: '/b2b/category',
          },
          {
            id: 61,
            title: 'Unit of Measurement',
            path: '/b2b/uom',
          },
          {
            id: 62,
            title: 'Supplier Management',
            path: '/b2b/supplier',
          },
          {
            id: 77,
            title: 'Driver Management',
            path: '/b2b/driver',
          },
          {
            id: 78,
            title: 'Customer Management',
            path: '/b2b/customer',
          },
        ],
      },
    ],
  },
  {
    id: 70,
    title: 'Andalan & Depo',
    path: '',
    icon: <DepoAndalan />,
    child: [
      {
        id: 71,
        title: 'Dashboard',
        path: '/depo/dashboard',
      },
      {
        id: 72,
        title: 'Merchants',
        path: '/depo/merchants',
      },
      {
        id: 73,
        title: 'Disburse',
        path: '/depo/disburse',
      },
      {
        id: 74,
        title: 'QRIS',
        path: '/depo/qris',
      },
      {
        id: 75,
        title: 'Request Transfer',
        path: '/depo/req-transfer',
      },
    ],
  },
  {
    id: 66,
    title: 'Financing',
    path: '',
    icon: <KurIcon />,
    child: [
      {
        id: 69,
        title: 'Payment',
        path: '/finance/payment',
        child: [],
      },
      {
        id: 68,
        title: 'Invoice',
        path: '/finance/invoice',
        child: [],
      },
      {
        id: 67,
        title: 'Merchant',
        path: '',
        child: [
          {
            id: 79,
            title: 'Merchant',
            path: '/finance/customer',
          },
          {
            id: 80,
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

          {
            id: 70,
            title: 'Driver Management',
            path: '/b2b/driver',
          },
          {
            id: 71,
            title: 'Customer Management',
            path: '/b2b/customer',
          },
        ],
      },
    ],
  },
<<<<<<< HEAD

=======
>>>>>>> 58a3c6e255d7f7ec05e8d8180e5de6aeea404d02
  {
    id: 63,
    title: 'Andalan & Depo',
    path: '',
    icon: <DepoAndalan />,
    child: [
      {
        id: 64,
        title: 'Dashboard',
        path: '/depo/dashboard',
        child: [],
      },
      {
        id: 65,
        title: 'Merchants',
        path: '/depo/merchants',
        child: [],
      },
      {
        id: 66,
        title: 'Disburse',
        path: '/depo/disburse',
        child: [],
      },
      {
        id: 67,
        title: 'QRIS',
        path: '/depo/qris',
        child: [],
      },
      {
        id: 69,
        title: 'Request Transfer',
        path: '/depo/req-transfer',
        child: [],
      },
    ],
  },
  {
    id: 59,
    title: 'Financing',
    path: '',
    icon: <KurIcon />,
    child: [
      {
        id: 62,
        title: 'Payment',
        path: '/finance/payment',
        child: [],
      },
      {
        id: 61,
        title: 'Invoice',
        path: '/finance/invoice',
        child: [],
      },
      {
        id: 60,
        title: 'Merchant',
        path: '',
        child: [
          {
            id: 72,
            title: 'Merchant',
            path: '/finance/customer',
          },
          {
            id: 73,
            title: 'Verification',
            path: '/finance/verification',
          },
        ],
      },
    ],
  },
  {
    id: 43,
    title: 'Admin Panel',
    path: '',
    icon: <AdminPanelIcon />,
    child: [
      {
        id: 45,
        title: 'Role User',
        path: '/role-user',
        child: [],
      },
      {
        id: 46,
        title: 'Role Access',
        path: '/role-access',
        child: [],
      },
    ],
  },
];
