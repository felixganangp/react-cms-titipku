/* eslint-disable @typescript-eslint/ban-ts-comment */
import { InvoiceParams } from 'models/finance/invoice';
import {
  createInvoice,
  getInstallmentSimulation,
  getInvoiceAll,
  getInvoiceDetails,
  getInvoicePDF,
  setManualSettled,
} from 'service/Finance/invoice';
import { useFormik } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import UseParams from 'hooks/useParams';
import { useEffect, useMemo } from 'react';

export function UseInvoiceService(setParams?: InvoiceParams) {
  const params = UseParams<InvoiceParams>(setParams);

  const queryInvoice = useQuery({
    queryKey: ['invoice', params.params],
    queryFn: () => getInvoiceAll(params.params),
  });

  const formik = useFormik({
    initialValues: {
      area_id: undefined,
      invoice_type_id: undefined,
      status: undefined,
      min_invoice_date: undefined,
      max_invoice_date: undefined,
      min_due_date: undefined,
      max_due_date: undefined,
      restructure_type_id: [],
      user_type_id: undefined,
    },
    onSubmit: (values) => {
      const newValue = {
        ...values,
        page: 1,
        search: params.params.search,
        // @ts-ignore
        min_invoice_date: values.min_invoice_date?.unix() || undefined,
        // @ts-ignore
        max_invoice_date: values.max_invoice_date?.unix() || undefined,
        // @ts-ignore
        min_due_date: values.min_due_date?.unix() || undefined,
        // @ts-ignore
        max_due_date: values.max_due_date?.unix() || undefined,
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
    const { min_invoice_date, max_invoice_date, max_due_date, min_due_date } =
      formik.values;

    if (!min_invoice_date && max_invoice_date) {
      errors.min_invoice_date = 'Minimum Invoice Date is required';
    }

    if (min_invoice_date && !max_invoice_date) {
      errors.max_invoice_date = 'Maximum Invoice Date is required';
    }

    if (!min_due_date && max_due_date) {
      errors.min_due_date = 'Minimum Due Date is required';
    }

    if (min_due_date && !max_due_date) {
      errors.max_due_date = 'Maximum Due Date is required';
    }

    return errors;
  }, [formik.values]);

  return {
    ...queryInvoice,
    ...params,
    formikParams: {
      ...formik,
      errors: { ...formik.errors, ...errorValidation },
    },
    listData: queryInvoice?.data?.data || [],
    restructureList: [
      {
        id: 0,
        name: 'Normal',
      },
      {
        id: 1,
        name: 'Cut Loss',
      },
      {
        id: 2,
        name: 'Memo Internal',
      },
      {
        id: 3,
        name: 'Restructure',
      },
    ],
  };
}

export function useInvoiceDetails(idInvoice?: string | number) {
  const queryInvoice = useQuery({
    queryKey: ['invoice/details', idInvoice],
    queryFn: () => getInvoiceDetails(idInvoice),
    enabled: !!idInvoice,
  });

  return {
    ...queryInvoice,
    details: queryInvoice?.data?.data,
  };
}
export function UseCreateInvoice() {
  return useMutation(createInvoice);
}

export function UseSetManualSettled() {
  return useMutation(setManualSettled);
}

export function UseGetInvoicePDF() {
  return useMutation(getInvoicePDF);
}

export function UseGetInstalmentSimulation() {
  return useMutation(getInstallmentSimulation);
}
