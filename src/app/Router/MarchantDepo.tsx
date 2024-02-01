import { lazy } from 'react';
import type { RouteProps } from './ListRoute';

const MerchantsList = lazy(() => import('pages/MerchantsDepo/Merchants'));
const MerchantsForm = lazy(() => import('pages/MerchantsDepo/Merchants/Form'));
const MercheantsDetails = lazy(
  () => import('pages/MerchantsDepo/Merchants/details'),
);
const QrisList = lazy(() => import('pages/MerchantsDepo/Qris'));
const DisburseList = lazy(() => import('pages/MerchantsDepo/Disburse'));
const DisburseForm = lazy(() => import('pages/MerchantsDepo/Disburse/Form'));

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
  {
    name: 'Disburse',
    comp: DisburseList,
    path: '/depo/disburse',
    index: true,
    auth: 'Private',
  },

  {
    name: 'Disburse Form',
    comp: DisburseForm,
    path: '/depo/disburse/form',
    index: true,
    auth: 'Private',
  },
];
