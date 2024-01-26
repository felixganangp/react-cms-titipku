import { lazy } from 'react';
import type { RouteProps } from './ListRoute';

const MerchantsList = lazy(() => import('pages/MerchantsDepo/Merchants'));

export const MerchantsRouters: RouteProps[] = [
  {
    name: 'Invoice',
    comp: MerchantsList,
    path: '/depo/merchants',
    index: true,
    auth: 'Private',
  },
];
