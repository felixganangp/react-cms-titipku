import { lazy } from 'react';
import type { RouteProps } from './ListRoute';

const InvoicePage = lazy(() => import('pages/Finance/Invoice'));

export const FinaceRouters: RouteProps[] = [
  {
    name: 'Invoice',
    comp: InvoicePage,
    path: '/finance/invoice',
    index: true,
    auth: 'Private',
  },
];
