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
  const formik = useFormik({
    initialValues: {
      start_join_date: undefined,
      end_join_date: undefined,
      depo_type_id: undefined,
      jelajah_id: [],
    },
    onSubmit: (values) => {
      const newValue = {
        ...values,
        page: 1,
        search: params.params.search,
        // @ts-ignore
        start_join_date: values.start_join_date?.unix() || undefined,
        // @ts-ignore
        end_join_date: values.start_join_date?.unix() || undefined,
      };
      params.handleChangeParams(newValue);
      const queryParams = new URLSearchParams(
        Object.fromEntries(
          Object.entries(newValue).filter(
            ([key, value]) => value !== undefined,
          ),
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
      });
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
      };
      params.handleChangeParams(newValue);
      const queryParams = new URLSearchParams(
        // @ts-ignore
        Object.fromEntries(
          Object.entries(newValue).filter(
            ([key, value]) => value !== undefined,
          ),
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
    queryKey: ['merchant-depo/merchant-depo/filter', params.params],
    queryFn: () => getMerchantDepoLimitHistoryList(id, params.params),
    enabled: !!id,
  });
  return { ...query, ...params, listData: query?.data?.data || [] };
}
