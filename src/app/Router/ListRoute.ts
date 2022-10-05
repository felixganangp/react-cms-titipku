import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const NotFound = lazy(() => import('pages/NotFound'));
const Login = lazy(() => import('pages/Auth/login'));

const ListRoute = [
  {
    comp: Home,
    path: '/',
    index: true,
    auth: 'Public',
  },
  {
    comp: Login,
    path: '/sign-in',
    index: true,
    auth: 'Public',
  },
  {
    comp: NotFound,
    path: '*',
    index: false,
    auth: 'Public',
  },
];

export default ListRoute;
