import { ListParams } from 'models/fetch';
import {
  getAllAreaMerchantDepo,
  getAllFilterMerchant,
  getAllFilterMerchantDepo,
  getAllTypeMerchantDepo,
  getAllMutationTypeMerchantDepo,
  getAllBankListMerchant,
} from 'service/MerchantDepo/Config';
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

export function UseBankListService(setParams?: ListParams) {
  const params = UseParams(setParams);

  const query = useQuery({
    queryKey: ['merchant-depo/bank-list', params.params],
    queryFn: () => getAllBankListMerchant(params.params),
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

export function UseMutationTypeListService(setParams?: ListParams) {
  const params = UseParams(setParams);

  const query = useQuery({
    queryKey: ['merchant-depo/merchant-depo/mutation-types', params.params],
    queryFn: () => getAllMutationTypeMerchantDepo(params.params),
  });
  return { ...query, ...params, listData: query?.data?.data || [] };
}
