/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import UseParams from 'hooks/useParams';
import { PaymentParams, SettlementParams } from 'models/finance/payment';
import { useEffect, useMemo } from 'react';
import {
  createPayment,
  getPaymentAll,
  getPaymentSimulation,
  getSettlementeAll,
  getpaymentDetails,
} from 'service/Finance/payment';

export const useGetSettlements = (setParams?: SettlementParams) => {
  const params = UseParams<SettlementParams>(setParams);
  const querySettlement = useQuery({
    queryKey: ['settelment', params.params],
    queryFn: () => getSettlementeAll(params.params),
  });
  return {
    ...params,
    ...querySettlement,
    listData: querySettlement.data?.data || [],
  };
};

export const UseGetPeyement = (setParams?: PaymentParams) => {
  const params = UseParams<PaymentParams>(setParams);
  const paymentQuery = useQuery({
    queryKey: ['payment', params.params],
    queryFn: () => getPaymentAll(params.params),
  });

  const formik = useFormik({
    initialValues: {
      min_payment_date: undefined,
      max_payment_date: undefined,
    },
    onSubmit: (values) => {
      const newValue = {
        ...values,
        page: 1,
        // @ts-ignore
        min_payment_date: values.min_invoice_date?.unix() || undefined,
        // @ts-ignore
        max_payment_date: values.max_payment_date?.unix() || undefined,
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
    const { max_payment_date, min_payment_date } = formik.values;

    if (!min_payment_date && max_payment_date) {
      errors.min_invoice_date = 'Minimum Payment Date is required';
    }

    if (min_payment_date && !max_payment_date) {
      errors.max_invoice_date = 'Maximum Payment Date is required';
    }

    return errors;
  }, [formik.values]);

  return {
    ...params,
    ...paymentQuery,
    formikParams: {
      ...formik,
      errors: { ...formik.errors, ...errorValidation },
    },
    listData: paymentQuery.data?.data || [],
  };
};

export function usePaymentDetails(idPayment?: string | number) {
  const queryInvoice = useQuery({
    queryKey: ['payment/details', idPayment],
    queryFn: () => getpaymentDetails(idPayment),
    enabled: !!idPayment,
  });

  return {
    ...queryInvoice,
    details: queryInvoice?.data?.data,
  };
}

export function UseCreatePayment() {
  return useMutation(createPayment);
}

export function UseGetSimulationPayment() {
  return useMutation(getPaymentSimulation);
}
