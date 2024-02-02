/* eslint-disable @typescript-eslint/ban-ts-comment */
import useToast from 'hooks/useToast';
import { useMutation, useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';
import { MerchantParams } from 'models/merchantDepo/Merchant';
import {
  deleteQris,
  getAllQris,
  postQris,
  updateQris,
} from 'service/MerchantDepo/Qris';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import moment from 'moment';
import { QrisParams, QrisForm } from 'models/merchantDepo/Qris';
import * as Yup from 'yup';

export const useQrisList = (setParams?: QrisParams) => {
  const params = UseParams<QrisParams>(setParams);
  const query = useQuery({
    queryKey: ['merchant-depo/qris', params.params],
    queryFn: () => getAllQris(params.params),
  });
  const formik = useFormik({
    initialValues: {
      depo_type_id: undefined,
      jelajah_id: [],
      start_date: undefined,
      end_date: undefined,
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
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      start_date: Yup.mixed().test(
        'start_date',
        'Start date must filled',
        (value) => {
          if (formik.values.end_date) {
            if (!value) {
              return false;
            }
          }
          return true;
        },
      ),
      end_date: Yup.mixed().test(
        'end_date',
        'End date must filled',
        (value) => {
          if (formik.values.start_date) {
            if (!value) {
              return false;
            }
          }
          return true;
        },
      ),
    }),
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
        start_date: newValue.start_date
          ? moment(newValue.start_date * 1000)
          : undefined,
        // @ts-ignore
        end_date: newValue.end_date
          ? moment(newValue.end_date * 1000)
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

export const useDeleteQris = () => {
  const { openToast } = useToast();
  return useMutation(deleteQris, {
    onSuccess: () => {
      openToast({
        severity: 'success',
        headMsg: 'Delete Transaction Success',
      });
    },
    onError: (e) => {
      openToast({
        severity: 'error',
        headMsg: typeof e === 'string' ? e : 'Delete Transaction Success',
      });
    },
  });
};

export const usePostQrisService = () => {
  const { openToast } = useToast();
  return useMutation(postQris, {
    onSuccess: () => {
      openToast({
        severity: 'success',
        headMsg: 'Create Transaction Success',
      });
    },
    onError: (e) => {
      openToast({
        severity: 'error',
        headMsg: typeof e === 'string' ? e : 'Failed Create Transaction',
      });
    },
  });
};

export const useUpdateQrisService = () => {
  const { openToast } = useToast();
  return useMutation(updateQris, {
    onSuccess: () => {
      openToast({
        severity: 'success',
        headMsg: 'Update Transaction Success',
      });
    },
    onError: (e) => {
      openToast({
        severity: 'error',
        headMsg: typeof e === 'string' ? e : 'Update Transaction Success',
      });
    },
  });
};
