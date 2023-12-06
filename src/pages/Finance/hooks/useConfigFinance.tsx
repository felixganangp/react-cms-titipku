import { ListParams } from 'models/fetch';
import {
  getAllAreaFinancing,
  getAllCategoryFinancing,
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
