/* eslint-disable @typescript-eslint/ban-ts-comment */
import useToast from 'hooks/useToast';
import { useMutation, useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';
import { MerchantParams } from 'models/merchantDepo/Merchant';
import {
  deleteMerchant,
  detailsMerchant,
  getMerchantDepoList,
  getMerchantList,
  getMerchantFilterList,
  postMerchant,
  updateMerchant,
  getMerchantDepoLimitHistoryList,
  getAllTransactionMerchantDepo,
} from 'service/MerchantDepo/Merchant';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import moment from 'moment';
import { ListParams } from 'models/fetch';

export const useMerchantDepoList = (setParams?: MerchantParams) => {
  const params = UseParams<MerchantParams>(setParams);
  const query = useQuery({
    queryKey: ['merchant-depo/merchant-depo', params.params],
    queryFn: () => getMerchantDepoList(params.params),
  });

  const handleCondition = (value?: string) => {
    switch (value) {
      case 'New':
        return {
          is_new: 1,
        };
      case '100%':
        return {
          balance_condition: 100,
          balance_condition_operator: 'EQ',
        };

      case 'Less than 10%':
        return {
          balance_condition: 10,
          balance_condition_operator: 'LT',
        };
      case 'Less than 5%':
        return {
          balance_condition: 5,
          balance_condition_operator: 'LT',
        };
      default:
        return {};
        break;
    }
  };
  const formik = useFormik({
    initialValues: {
      start_join_date: undefined,
      end_join_date: undefined,
      depo_type_id: [],
      jelajah_id: [],
      area_id: undefined,
      condition: undefined,
    },
    onSubmit: (values) => {
      const newValue = {
        ...values,
        page: 1,
        search: params.params.search,
        start_join_date:
          // @ts-ignore
          values.start_join_date?.startOf('day').unix() || undefined,
        end_join_date:
          // @ts-ignore
          values.end_join_date?.endOf('day').unix() || undefined,
        // @ts-ignore
        jelajah_id:
          values.jelajah_id.length > 0
            ? // @ts-ignore
              values.jelajah_id.map((val) => val.id)
            : undefined,
        // @ts-ignore
        area_id: values.area_id?.id || undefined,
        depo_type_id:
          values.depo_type_id.length > 0 ? values.depo_type_id : undefined,
      };
      params.handleChangeParams({
        ...newValue,
        ...handleCondition(values.condition),
      });
      const queryParams = new URLSearchParams(
        Object.fromEntries(
          Object.entries({
            ...newValue,
            // @ts-ignore
            jelajah_name:
              values.jelajah_id.length > 0
                ? // @ts-ignore
                  values.jelajah_id.map((val) => val.name)
                : undefined,
            // @ts-ignore
            area_name: values.area_id?.name || undefined,
          }).filter(([key, value]) => value !== undefined),
        ),
      );

      // Set the search property of the current URL
      window.history.pushState({}, '', `?${queryParams.toString()}`);
    },
  });

  useEffect(() => {
    // Parse the URL search parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get all values from the URL search parameters
    const initialFilter = Array.from(urlParams).reduce(
      (values, [key, value]) => {
        // @ts-ignore
        if (key === 'depo_type_id') {
          // @ts-ignore
          value = value.split(',').map((item) => parseInt(item, 10));
        }
        // @ts-ignore
        if (key === 'jelajah_id') {
          // @ts-ignore
          value = value.split(',').map((item) => parseInt(item, 10));
        }
        if (key === 'jelajah_name') {
          // @ts-ignore
          value = value.split(',').map((item) => item);
        }
        // @ts-ignore
        if (key === 'area_id') {
          // @ts-ignore
          value = parseInt(value, 10);
        }
        if (key === 'area_name') {
          // @ts-ignore
        }
        // @ts-ignore
        values[key] = value;
        return values;
      },
      {},
    );
    if (Object.keys(initialFilter).length > 0) {
      const newValue = {
        ...formik.values,
        ...initialFilter,
      };
      formik.setValues({
        ...newValue,
        // @ts-ignore
        start_join_date: newValue.start_join_date
          ? moment(newValue.start_join_date * 1000)
          : undefined,
        // @ts-ignore
        end_join_date: newValue.end_join_date
          ? moment(newValue.end_join_date * 1000)
          : undefined,
        // @ts-ignore
        jelajah_id: newValue.jelajah_id.map((val, index) => {
          // @ts-ignore
          return { id: val, name: newValue.jelajah_name[index] };
        }),
        // @ts-ignore
        area_id: { id: newValue.area_id, name: newValue.area_name },
      });
      // @ts-ignore
      delete newValue.jelajah_name;
      // @ts-ignore
      delete newValue.area_name;
      params.handleChangeParams({
        ...newValue,
        // @ts-ignore
        ...handleCondition(initialFilter.condition),
      });
    }
  }, []);

  return {
    formik,
    ...params,
    ...query,
    listData: query.data?.data || [],
  };
};

export const useMerchantList = (setParams?: MerchantParams) => {
  const params = UseParams<MerchantParams>(setParams);
  const query = useQuery({
    queryKey: ['merchant-depo/merchant', params.params],
    queryFn: () => getMerchantList(params.params),
  });

  const formik = useFormik({
    initialValues: {
      area_id: undefined,
      jelajah_id: [],
    },
    onSubmit: (values) => {
      const newValue = {
        ...values,
        page: 1,
        search: params.params.search,
        // @ts-ignore
        jelajah_id: values.jelajah_id.map((val) => val.id),
      };
      params.handleChangeParams(newValue);
      // const queryParams = new URLSearchParams(
      //   // @ts-ignore
      //   Object.fromEntries(
      //     Object.entries(newValue).filter(
      //       ([key, value]) => value !== undefined,
      //     ),
      //   ),
      // );

      // Set the search property of the current URL
      // window.history.pushState({}, '', `?${queryParams.toString()}`);
    },
  });

  useEffect(() => {
    // Parse the URL search parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get all values from the URL search parameters
    const initialFilter = Array.from(urlParams).reduce(
      (values, [key, value]) => {
        // @ts-ignore
        if (key === 'jelajah_id') {
          // @ts-ignore
          value = value.split(',').map((item) => parseInt(item, 10));
        }
        // @ts-ignore
        values[key] = value;
        return values;
      },
      {},
    );
    if (Object.keys(initialFilter).length > 0) {
      const newValue = {
        ...formik.values,
        ...initialFilter,
      };
      formik.setValues(newValue);
      params.handleChangeParams(newValue);
    }
  }, []);
  return {
    formik,
    ...params,
    ...query,
    listData: query.data?.data || [],
  };
};

export const useDeleteMerchantDepo = () => {
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
        headMsg: typeof e === 'string' ? e : 'Delete Merchant Failed',
      });
    },
  });
};

export const useMerchantDetails = (id?: number | string) => {
  return useQuery({
    queryKey: ['merchant-depo/merchant', id],
    queryFn: () => detailsMerchant(id),
    enabled: !!id,
  });
};

export const useCreateMerchantDepo = () => {
  const { openToast } = useToast();
  return useMutation(postMerchant, {
    onSuccess: () => {
      openToast({
        severity: 'success',
        headMsg: 'Create Merchant Success',
      });
    },
    onError: (e) => {
      openToast({
        severity: 'error',
        headMsg: typeof e === 'string' ? e : 'Create Merchant Failed',
      });
    },
  });
};

export const useUpdateMerchantDepo = () => {
  const { openToast } = useToast();
  return useMutation(updateMerchant, {
    onSuccess: () => {
      openToast({
        severity: 'success',
        headMsg: 'Create Merchant Success',
      });
    },
    onError: (e) => {
      openToast({
        severity: 'error',
        headMsg: typeof e === 'string' ? e : 'Create Merchant Failed',
      });
    },
  });
};

export function useGetLimitHistory(id?: string, setParams?: ListParams) {
  const params = UseParams(setParams);

  const query = useQuery({
    queryKey: ['merchant-depo/merchant-depo/filter', id, params.params],
    queryFn: () => getMerchantDepoLimitHistoryList(id, params.params),
    enabled: !!id,
  });
  return { ...query, ...params, listData: query?.data?.data || [] };
}

export function useGetTransactionMutation(id?: string, setParams?: ListParams) {
  const params = UseParams(setParams);

  const query = useQuery({
    queryKey: [
      'merchant-depo/merchant-depo/transaction-history',
      id,
      params.params,
    ],
    queryFn: () => getAllTransactionMerchantDepo(id, params.params),
    enabled: !!id,
  });

  const formik = useFormik({
    initialValues: {
      type: undefined,
      from: undefined,
      to: undefined,
    },
    onSubmit: (values) => {
      const newValue = {
        ...values,
        page: 1,
        search: params.params.search,
        // @ts-ignore
        type: values.type?.id || undefined,
        // @ts-ignore
        from: values.from ? values.from?.startOf('day').unix() : undefined,
        // @ts-ignore
        to: values.to ? values.to.endOf('day').unix() : undefined,
      };

      params.handleChangeParams(newValue);
    },
  });

  return {
    formik,
    ...query,
    ...params,
    listData: query?.data?.data || [],
  };
}
