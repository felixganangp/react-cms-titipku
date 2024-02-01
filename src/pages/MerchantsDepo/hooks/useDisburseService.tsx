/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DisburseParams } from 'models/merchantDepo/disburse';
import {
  createInvoice,
  getInstallmentSimulation,
  getInvoiceAll,
  getInvoiceDetails,
  getInvoicePDF,
  setManualSettled,
} from 'service/Finance/invoice';
import { getAllDisburse } from 'service/MerchantDepo/disburse';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';
import { useEffect, useMemo } from 'react';

export const DisburseStatus = {
  1: 'On Process',
  2: 'Transferred',
};

export function UseDisburseService(setParams?: DisburseParams) {
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
        status: (values.status || '').toLowerCase() || undefined,
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
