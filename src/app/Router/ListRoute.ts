import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const NotFound = lazy(() => import('pages/NotFound'));
const Login = lazy(() => import('pages/Auth/login'));
const googleOauth = lazy(() => import('pages/Auth/googleOauth'));
const RoleUser = lazy(() => import('pages/RoleUser'));
const RoleAccess = lazy(() => import('pages/RoleAccess'));
const RoleAccessDetails = lazy(() => import('pages/RoleAccess/Details'));
const SkuManagement = lazy(() => import('pages/SkuManagement'));
const KurPaymentManagement = lazy(() => import('pages/KurManagement/Payment'));
const KurPaymentDetails = lazy(
  () => import('pages/KurManagement/Payment/Details'),
);
const KurRequestManagement = lazy(() => import('pages/KurManagement/Request'));
const KurRequestDetails = lazy(
  () => import('pages/KurManagement/Request/Details'),
);
const KurCustomerManagement = lazy(
  () => import('pages/KurManagement/Customer'),
);
const KurCustomerDetailsManagement = lazy(
  () => import('pages/KurManagement/Customer/Details'),
);

const KurInvoiceManagement = lazy(() => import('pages/KurManagement/Invoice'));
const KurInvoiceDetailsManagement = lazy(
  () => import('pages/KurManagement/Invoice/Details'),
);

const InventoryManagement = lazy(() => import('pages/B2B/InventoryManagement'));
const InventoryDetailsManagement = lazy(
  () => import('pages/B2B/InventoryManagement/Details'),
);

const RawManagement = lazy(() => import('pages/B2B/RawManagement'));

interface RouteProps {
  path: string;
  index: boolean;
  comp: React.LazyExoticComponent<(props: any) => JSX.Element>;
  auth: string;
  name: string;
}

const ListRoute: RouteProps[] = [
  {
    name: 'Home',
    comp: Home,
    path: '/',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Login',
    comp: Login,
    path: '/sign-in',
    index: true,
    auth: 'Public',
  },
  {
    name: 'Google auth',
    comp: googleOauth,
    path: '/oauth',
    index: true,
    auth: 'Public',
  },
  {
    name: 'Role User',
    comp: RoleUser,
    path: '/role-user',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Role Management',
    comp: RoleAccess,
    path: '/role-access',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Role Management',
    comp: RoleAccessDetails,
    path: '/role-access/:id',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Sku Management',
    comp: SkuManagement,
    path: '/sku-management',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Customer',
    comp: KurCustomerManagement,
    path: '/kur/customer',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Customer',
    comp: KurCustomerDetailsManagement,
    path: '/kur/customer/:id',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Settlement',
    comp: KurPaymentManagement,
    path: '/kur/payment',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Settlement',
    comp: KurPaymentDetails,
    path: '/kur/payment/:id',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Request',
    comp: KurRequestManagement,
    path: '/kur/request',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Request',
    comp: KurRequestDetails,
    path: '/kur/request/:id',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Invoice Management',
    comp: KurInvoiceManagement,
    path: '/kur/invoice',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Invoice Management',
    comp: KurInvoiceDetailsManagement,
    path: '/kur/invoice/:id',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Inventory Management',
    comp: InventoryManagement,
    path: '/b2b/inventory',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Inventory Management',
    comp: InventoryDetailsManagement,
    path: '/b2b/inventory/:id',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Raw Management',
    comp: RawManagement,
    path: '/b2b/raw',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Not Found',
    comp: NotFound,
    path: '*',
    index: false,
    auth: 'Public',
  },
];

export default ListRoute;
