/* eslint-disable @typescript-eslint/ban-ts-comment */
import useToast from 'hooks/useToast';
import { DisburseParams, MerchantParams } from 'models/merchantDepo/disburse';
import {
  getAllDisburse,
  deleteDisburse,
  getDisburseStatus,
  postDisburse,
  updateDisburse,
  detailsDisburse,
  updateStatusDisburse,
  getMerchantDepoList,
} from 'service/MerchantDepo/disburse';
// import { getMerchantDepoList } from 'service/MerchantDepo/Merchant';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';
import { useEffect, useMemo } from 'react';
import moment from 'moment';
// eslint-disable-next-line import/no-cycle
import { getRenameStatus } from '../Disburse';

export const DisburseStatus = {
  1: 'On Process',
  2: 'Transferred',
};

export const MerchantCondition = {
  1: 'New',
  5: 'Less then 5%',
  10: 'Less then 10%',
};

export function UseDisburse(setParams?: DisburseParams) {
  const params = UseParams<DisburseParams>(setParams);

  const queryDisburse = useQuery({
    queryKey: ['disburse', params.params],
    queryFn: () => getAllDisburse(params.params),
  });

  const formik = useFormik({
    initialValues: {
      status: undefined,
      start_date: undefined,
      end_date: undefined,
      jelajah_id: undefined,
    },
    onSubmit: (values) => {
      const newValue = {
        ...values,
        page: 1,
        search: params.params.search,
        // @ts-ignore
        start_date: values.start_date?.unix() || undefined,
        // @ts-ignore
        end_date: values.end_date?.unix() || undefined,
        // @ts-ignore
        status: values.status || undefined,
        jelajah_id: values.jelajah_id || undefined,
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

  const errorValidation = useMemo(() => {
    const errors: any = {};
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { start_date, end_date } = formik.values;

    if (!start_date && end_date) {
      errors.start_date = 'Start Date is required';
    }

    if (start_date && !end_date) {
      errors.end_date = 'End Date is required';
    }

    return errors;
  }, [formik.values]);

  return {
    ...queryDisburse,
    ...params,
    formikParams: {
      ...formik,
      errors: { ...formik.errors, ...errorValidation },
    },
    listData: queryDisburse?.data?.data || [],
  };
}

export const useMerchantDepoList = (setParams?: MerchantParams) => {
  const params = UseParams<MerchantParams>(setParams);
  const query = useQuery({
    queryKey: [
      'merchant-depo/disburse/merchant-depo-list',
      { ...params.params, depo_type_id: [1, 3] },
    ],
    queryFn: () =>
      getMerchantDepoList({
        ...params.params,
        depo_type_id: [1, 3],
        sort_by: params.params.sort_by || 'disburse',
      }),
  });
  const formik = useFormik({
    initialValues: {
      start_join_date: undefined,
      end_join_date: undefined,
      depo_type_id: [1, 3],
      jelajah_id: [],
      area_id: undefined,
      balance_condition: undefined,
      is_new: undefined,
      sort_by: 'disburse',
    },
    onSubmit: (values) => {
      const newValue = {
        ...values,
        page: 1,
        search: params.params.search,
        sort_by: values.sort_by || 'disburse',
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
      };
      params.handleChangeParams(newValue);
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

export const useDisburseDetails = (id?: number | string) => {
  const query = useQuery({
    queryKey: ['merchant-depo/disburse', id],
    queryFn: () => detailsDisburse(id),
    enabled: !!id,
  });
  return {
    ...query,
    details: query.data?.data,
  };
};

export const useDeleteDisburse = () => {
  const { openToast } = useToast();
  return useMutation(deleteDisburse, {
    onSuccess: () => {
      openToast({
        severity: 'success',
        headMsg: 'Delete Disburse Success',
      });
    },
    onError: (e) => {
      openToast({
        severity: 'error',
        headMsg: typeof e === 'string' ? e : 'Delete Disburse Success',
      });
    },
  });
};

export function UseListDisburseStatus() {
  const query = useQuery({
    queryKey: ['disburse/status'],
    queryFn: () => getDisburseStatus(),
  });
  return {
    ...query,
    listData:
      query?.data?.data.map((val) => ({
        ...val,
        description: getRenameStatus(val.description),
      })) || [],
  };
}

export const useCreateDisburse = () => {
  const { openToast } = useToast();
  return useMutation(postDisburse, {
    onSuccess: () => {
      openToast({
        severity: 'success',
        headMsg: 'Create Disburse Success',
      });
    },
    onError: (e) => {
      openToast({
        severity: 'error',
        headMsg: typeof e === 'string' ? e : 'Create Disburse Failed',
      });
    },
  });
};

export const useUpdateDisburse = () => {
  const { openToast } = useToast();
  return useMutation(updateDisburse, {
    onSuccess: () => {
      openToast({
        severity: 'success',
        headMsg: 'Update Disburse Success',
      });
    },
    onError: (e) => {
      openToast({
        severity: 'error',
        headMsg: typeof e === 'string' ? e : 'Update Disburse Failed',
      });
    },
  });
};

export const useUpdateStatusDisburse = () => {
  const { openToast } = useToast();
  return useMutation(updateStatusDisburse, {
    onSuccess: () => {
      openToast({
        severity: 'success',
        headMsg: 'Update Status Disburse Success',
      });
    },
    onError: (e) => {
      openToast({
        severity: 'error',
        headMsg: typeof e === 'string' ? e : 'Update Status Disburse Failed',
      });
    },
  });
};
