import useToast from 'hooks/useToast';
import { useMutation, useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';
import { MerchantParams } from 'models/Merchant';
import {
  deleteMerchant,
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

export const useDeleteMerchant = () => {
  const { openToast } = useToast();
  return useMutation(deleteMerchant, {
    onSuccess: () => {
      openToast({
        severity: 'success',
        headMsg: 'Delete Merchant Success',
      });
    },
    onError: (e) => {
      openToast({
        severity: 'error',
        headMsg: typeof e === 'string' ? e : 'Delete Merchant Success',
      });
    },
  });
};
