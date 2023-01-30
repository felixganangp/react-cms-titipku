import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const NotFound = lazy(() => import('pages/NotFound'));
const Login = lazy(() => import('pages/Auth/login'));
const googleOauth = lazy(() => import('pages/Auth/googleOauth'));
const RoleUser = lazy(() => import('pages/RoleUser'));
const RoleAccess = lazy(() => import('pages/RoleAccess'));
const RoleAccessDetails = lazy(() => import('pages/RoleAccess/Details'));
const SkuManagement = lazy(() => import('pages/SkuManagement'));
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

interface RouteProps {
  path: string;
  index: boolean;
  comp: React.LazyExoticComponent<(props: any) => JSX.Element>;
  auth: string;
}

const ListRoute: RouteProps[] = [
  {
    comp: Home,
    path: '/',
    index: true,
    auth: 'Private',
  },
  {
    comp: Login,
    path: '/sign-in',
    index: true,
    auth: 'Public',
  },
  {
    comp: googleOauth,
    path: '/oauth',
    index: true,
    auth: 'Public',
  },
  {
    comp: RoleUser,
    path: '/role-user',
    index: true,
    auth: 'Private',
  },
  {
    comp: RoleAccess,
    path: '/role-access',
    index: true,
    auth: 'Private',
  },
  {
    comp: RoleAccessDetails,
    path: '/role-access/:id',
    index: true,
    auth: 'Private',
  },
  {
    comp: SkuManagement,
    path: '/sku-management',
    index: true,
    auth: 'Private',
  },
  {
    comp: KurCustomerManagement,
    path: '/kur/customer',
    index: true,
    auth: 'Private',
  },
  {
    comp: KurCustomerDetailsManagement,
    path: '/kur/customer/:id',
    index: true,
    auth: 'Private',
  },
  {
    comp: KurRequestManagement,
    path: '/kur/request',
    index: true,
    auth: 'Private',
  },
  {
    comp: KurRequestDetails,
    path: '/kur/request/:id',
    index: true,
    auth: 'Private',
  },
  {
    comp: NotFound,
    path: '*',
    index: false,
    auth: 'Public',
  },
];

export default ListRoute;
