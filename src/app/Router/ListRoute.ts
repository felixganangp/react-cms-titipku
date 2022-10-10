import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const NotFound = lazy(() => import('pages/NotFound'));
const Layout = lazy(() => import('components/Layout'));

const ListRoute = [
  {
    comp: Home,
    path: '/',
    index: true,
    auth: 'Public',
  },
  {
    comp: Layout,
    path: '/layout',
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
