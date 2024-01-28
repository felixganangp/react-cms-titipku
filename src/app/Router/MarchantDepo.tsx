import { lazy } from 'react';
import type { RouteProps } from './ListRoute';

const MerchantsList = lazy(() => import('pages/MerchantsDepo/Merchants'));
const MerchantsForm = lazy(() => import('pages/MerchantsDepo/Merchants/Form'));
const MercheantsDetails = lazy(
  () => import('pages/MerchantsDepo/Merchants/details'),
);
const QrisList = lazy(() => import('pages/MerchantsDepo/Qris'));

export const MerchantsRouters: RouteProps[] = [
  {
    name: 'Merchants',
    comp: MerchantsList,
    path: '/depo/merchants',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Merchants Info',
    comp: MercheantsDetails,
    path: '/depo/merchants/:id',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Merchants Form',
    comp: MerchantsForm,
    path: '/depo/merchants/form',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Merchants Edit',
    comp: MerchantsForm,
    path: '/depo/merchants/form/:id',
    index: true,
    auth: 'Private',
  },
  {
    name: 'Merchants Qris',
    comp: QrisList,
    path: '/depo/qris',
    index: true,
    auth: 'Private',
  },
];
