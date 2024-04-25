import UseParams from 'hooks/useParams';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  fetchDriver,
  deleteDriver,
  createDriver,
  updateDriver,
} from 'service/B2B/Driver';

export default function useGetDriver(setParams?: any) {
  const params = UseParams({ count: 5, ...setParams });
  const query = useQuery({
    queryKey: ['/serpong-fresh/driver', params.params],
    queryFn: () => fetchDriver(params.params),
  });

  const listData = query.data?.data || [];
  return {
    ...query,
    ...params,
    listData,
  };
}

export function useDeleteDriver() {
  const mutate = useMutation(deleteDriver);
  return mutate;
}

export function useCreateDriver() {
  const mutate = useMutation(createDriver);
  return mutate;
}

export function useUpdateDriver() {
  const mutate = useMutation(updateDriver);
  return mutate;
}

// export function useCustomerDetails(id?: string | number) {
//   const query = useQuery({
//     queryKey: ['/finance/customer', id],
//     queryFn: () => getCustomersDetails(id || ''),
//     enabled: !!id,
//   });

//   // const listData = query.data?.data || [];
//   const details = query.data?.data;
//   return {
//     ...query,
//     details,
//   };
// }
