import { useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';
import { MerchantParams } from 'models/Merchant';
import {
  getMerchantDepoList,
  getMerchantList,
} from 'service/MerchantDepo/Merchant';

export const useMerchantDepoList = (setParams?: MerchantParams) => {
  const params = UseParams<MerchantParams>(setParams);
  const querySettlement = useQuery({
    queryKey: ['settelment', params.params],
    queryFn: () => getMerchantDepoList(params.params),
  });
  return {
    ...params,
    ...querySettlement,
    listData: querySettlement.data?.data || [],
  };
};

export const useMerchantList = (setParams?: MerchantParams) => {
  const params = UseParams<MerchantParams>(setParams);
  const querySettlement = useQuery({
    queryKey: ['settelment', params.params],
    queryFn: () => getMerchantList(params.params),
  });
  return {
    ...params,
    ...querySettlement,
    listData: querySettlement.data?.data || [],
  };
};
