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

interface RouteProps {
  path: string;
  index: boolean;
  comp: React.LazyExoticComponent<(props: any) => JSX.Element>;
  auth: string;
  id: number;
}

const ListRoute: RouteProps[] = [
  {
    id: 0,
    comp: Home,
    path: '/',
    index: true,
    auth: 'Private',
  },
  {
    id: 0,
    comp: Login,
    path: '/sign-in',
    index: true,
    auth: 'Public',
  },
  {
    id: 0,
    comp: googleOauth,
    path: '/oauth',
    index: true,
    auth: 'Public',
  },
  {
    id: 49,
    comp: RoleUser,
    path: '/role-user',
    index: true,
    auth: 'Private',
  },
  {
    id: 50,
    comp: RoleAccess,
    path: '/role-access',
    index: true,
    auth: 'Private',
  },
  {
    id: 50,
    comp: RoleAccessDetails,
    path: '/role-access/:id',
    index: true,
    auth: 'Private',
  },
  {
    id: 1,
    comp: SkuManagement,
    path: '/sku-management',
    index: true,
    auth: 'Private',
  },
  {
    id: 51,
    comp: KurCustomerManagement,
    path: '/kur/customer',
    index: true,
    auth: 'Private',
  },
  {
    id: 51,
    comp: KurCustomerDetailsManagement,
    path: '/kur/customer/:id',
    index: true,
    auth: 'Private',
  },
  {
    id: 53,
    comp: KurPaymentManagement,
    path: '/kur/payment',
    index: true,
    auth: 'Private',
  },
  {
    id: 52,
    comp: KurRequestManagement,
    path: '/kur/request',
    index: true,
    auth: 'Private',
  },
  {
    id: 52,
    comp: KurRequestDetails,
    path: '/kur/request/:id',
    index: true,
    auth: 'Private',
  },
  {
    id: 52,
    comp: KurInvoiceManagement,
    path: '/kur/invoice',
    index: true,
    auth: 'Private',
  },
  {
    id: 0,
    comp: NotFound,
    path: '*',
    index: false,
    auth: 'Public',
  },
];

export default ListRoute;
