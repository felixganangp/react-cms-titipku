import { ListParams } from 'models/fetch';
import {
  getAllAreaMerchantDepo,
  getAllFilterMerchant,
  getAllFilterMerchantDepo,
  getAllTypeMerchantDepo,
} from 'service/merchantDepo/Config';
import { useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';

export function UseTypeListService() {
  const query = useQuery({
    queryKey: ['merchant-depo/type'],
    queryFn: () => getAllTypeMerchantDepo(),
  });
  return { ...query, listData: query?.data?.data || [] };
}

export function UseAreaListService(setParams?: ListParams) {
  const params = UseParams(setParams);

  const query = useQuery({
    queryKey: ['merchant-depo/area', params.params],
    queryFn: () => getAllAreaMerchantDepo(params.params),
  });
  return { ...query, ...params, listData: query?.data?.data || [] };
}

export function UseFilterMerchentDepoListService(setParams?: ListParams) {
  const params = UseParams(setParams);

  const query = useQuery({
    queryKey: ['merchant-depo/merchant-depo/filter', params.params],
    queryFn: () => getAllFilterMerchantDepo(params.params),
  });
  return { ...query, ...params, listData: query?.data?.data || [] };
}

export function UseFilterMerchentListService(setParams?: ListParams) {
  const params = UseParams(setParams);

  const query = useQuery({
    queryKey: ['merchant-depo/merchant/filter', params.params],
    queryFn: () => getAllFilterMerchant(params.params),
  });
  return { ...query, ...params, listData: query?.data?.data || [] };
}
