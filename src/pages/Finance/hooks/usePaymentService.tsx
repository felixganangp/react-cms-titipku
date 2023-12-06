import { useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';
import { SettlementParams } from 'models/finance/payment';
import { getSettlementeAll } from 'service/Finance/payment';

export const useGetSettlements = (setParams?: SettlementParams) => {
  const params = UseParams<SettlementParams>(setParams);
  const querySettlement = useQuery({
    queryKey: ['invoice', params.params],
    queryFn: () => getSettlementeAll(params.params),
  });
  return {
    ...params,
    ...querySettlement,
    listData: querySettlement.data?.data || [],
  };
};
