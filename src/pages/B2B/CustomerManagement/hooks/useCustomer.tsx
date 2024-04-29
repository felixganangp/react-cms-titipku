import {
  createCustomer,
  deleteCustomer,
  fetchArea,
  fetchCustomer,
  fetchCustomerType,
  updateCustomer,
} from 'service/B2B/Customer';
import { useMutation, useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';

export default function useCustomer(setParams?: any) {
  const params = UseParams({ count: 5, ...setParams });
  const query = useQuery({
    queryKey: ['/serpong-fresh/customer', params.params],
    queryFn: () => fetchCustomer(params.params),
  });

  const listData = query.data?.data || [];
  return {
    ...query,
    ...params,
    listData,
  };
}

export function useArea(setParams?: any) {
  const params = UseParams({ count: 100, ...setParams });
  const query = useQuery({
    queryKey: ['/serpong-fresh/area', params.params],
    queryFn: () => fetchArea(),
  });

  const listData = query.data?.data || [];
  return {
    ...query,
    ...params,
    listData,
  };
}

export function useCustomerType(setParams?: any) {
  const query = useQuery({
    queryKey: ['/serpong-fresh/customer-type'],
    queryFn: () => fetchCustomerType(),
  });

  const listData = query.data?.data || [];
  return {
    ...query,
    listData,
  };
}

export function useDeleteCustomer() {
  const mutate = useMutation(deleteCustomer);
  return mutate;
}

export function useCreateCustomer() {
  const mutate = useMutation(createCustomer);
  return mutate;
}

export function useUpdateCustomer() {
  const mutate = useMutation(updateCustomer);
  return mutate;
}

// export
