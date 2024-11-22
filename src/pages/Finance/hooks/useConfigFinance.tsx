import { ListParams } from 'models/fetch';
import {
  getAllAreaFinancing,
  getAllCategoryFinancing,
  getAllJelajah,
  getAllUserTypeFinancing,
  getInvoiceType,
  getPaymentMethod,
  getRestructureCategory,
} from 'service/Finance/config';
import { useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';

export const KurType = {
  1: 'KUR WC',
  2: 'WC Titipku',
};

export const InvoiceType = {
  1: 'Normal',
  2: 'Cash',
  3: 'Provisi',
};

export function UseAreaListService(setParams?: ListParams) {
  const params = UseParams(setParams);

  const areaInvoice = useQuery({
    queryKey: ['area', params.params],
    queryFn: () => getAllAreaFinancing(params.params),
  });
  return { ...areaInvoice, ...params, listData: areaInvoice?.data?.data || [] };
}

export function UseCategoryListService(setParams?: ListParams) {
  const params = UseParams(setParams);

  const areaInvoice = useQuery({
    queryKey: ['category', params.params],
    queryFn: () => getAllCategoryFinancing(params.params),
  });
  return { ...areaInvoice, ...params, listData: areaInvoice?.data?.data || [] };
}

export function UseJelajahListService(setParams?: ListParams) {
  const params = UseParams(setParams);

  const jelajah = useQuery({
    queryKey: ['jelajah', params.params],
    queryFn: () => getAllJelajah(params.params),
  });
  return { ...jelajah, ...params, listData: jelajah?.data?.data || [] };
}

export function UsePaymentMethodListService(setParams?: ListParams) {
  const params = UseParams(setParams);

  const paymenyMethods = useQuery({
    queryKey: ['payment-method', params.params],
    queryFn: () => getPaymentMethod(params.params),
  });
  return {
    ...paymenyMethods,
    ...params,
    listData: paymenyMethods?.data?.data || [],
  };
}

export function UseUserTypeListService(setParams?: ListParams) {
  // const params = UseParams(setParams);

  const paymenyMethods = useQuery({
    queryKey: ['User-Type-List', {}],
    queryFn: () => getAllUserTypeFinancing({}),
  });
  return {
    // ...paymenyMethods,
    // ...params,
    listData: paymenyMethods?.data?.data || [],
  };
}

export function UseCategoryRestructure(setParams?: ListParams) {
  const params = UseParams(setParams);

  const category = useQuery({
    queryKey: ['/financing/restructure-category', params.params],
    queryFn: () => getRestructureCategory(params.params),
  });
  return { ...category, ...params, listData: category?.data?.data || [] };
}

export function UseInvoiceType(setParams?: ListParams) {
  const params = UseParams(setParams);

  const category = useQuery({
    queryKey: ['/financing/payment-invoice-type', params.params],
    queryFn: () => getInvoiceType(params.params),
  });
  return { ...category, ...params, listData: category?.data?.data || [] };
}
