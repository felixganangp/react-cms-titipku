import { lazy } from 'react';
import type { RouteProps } from './ListRoute';

const InvoicePage = lazy(() => import('pages/Finance/Invoice'));
const InvoiceDetailsPage = lazy(() => import('pages/Finance/Invoice/details'));

export const FinaceRouters: RouteProps[] = [
  {
    name: 'Invoice',
    comp: InvoicePage,
    path: '/finance/invoice',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Invoice',
    comp: InvoiceDetailsPage,
    path: '/finance/invoice/:idInvoice',
    index: true,
    auth: 'Private',
  },
];
