import { useQuery } from '@tanstack/react-query';
import { getAllCustomers } from 'service/Kur/Customer';
import UseParams from 'hooks/useParams';

export default function useCustomer(setParams: any) {
  const params = UseParams({ count: 5, ...setParams });
  const queryCostumer = useQuery({
    queryKey: ['/finance/customer', params.params],
    queryFn: () => getAllCustomers(params.params),
  });

  const listData = queryCostumer.data?.data || [];
  return {
    ...queryCostumer,
    ...params,
    listData,
  };
}
