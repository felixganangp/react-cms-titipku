import { lazy } from 'react';
import type { RouteProps } from './ListRoute';

const InvoicePage = lazy(() => import('pages/Finance/Invoice'));
const InvoiceDetailsPage = lazy(() => import('pages/Finance/Invoice/details'));
const PaymentPage = lazy(() => import('pages/Finance/Payment'));
const KurCustomerManagement = lazy(
  () => import('pages/KurManagement/Customer/Customer'),
);
const KurCustomerDetailsManagement = lazy(
  () => import('pages/KurManagement/Customer/Customer/Details'),
);
const KurCustomerVerification = lazy(
  () => import('pages/KurManagement/Customer/Verification'),
);

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
  {
    name: 'Invoice',
    comp: PaymentPage,
    path: '/finance/payment',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Customer',
    comp: KurCustomerManagement,
    path: '/finance/customer',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Customer',
    comp: KurCustomerDetailsManagement,
    path: '/finance/customer/:id',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Verification',
    comp: KurCustomerVerification,
    path: '/finance/verification',
    index: true,
    auth: 'Private',
  },
];
