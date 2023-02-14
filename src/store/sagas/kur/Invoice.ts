import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { invoiceKurAction, selectDataInvoice } from 'store/slice/kur/Invoice';
import { uiAction } from 'store/slice/ui';

import * as InvoiceService from 'service/Kur/Invoice';
import { ListResponse, Response } from 'models/fetch';
import {
  InvoiceKurDetail,
  InvoiceKur,
  PaymentKURParams,
} from 'models/kur/Invoice';

function* fetchData(params: PayloadAction<PaymentKURParams>) {
  try {
    const response: ListResponse<InvoiceKur> = yield call(
      InvoiceService.getAllInvoiceKur,
      params.payload,
    );

    yield put(invoiceKurAction.fetchDataSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(invoiceKurAction.failedFetch());
  }
}

function* fetchDataDetail(params: PayloadAction<{ id: string | number }>) {
  try {
    const response: Response<InvoiceKur> = yield call(
      InvoiceService.getAllInvoiceKurDetail,
      params.payload.id,
    );

    yield put(invoiceKurAction.fetchDataDetailSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(invoiceKurAction.failedFetch());
  }
}

function* fetchDataStatusInvoice() {
  try {
    const response: Response<string[]> = yield call(
      InvoiceService.getAllStatusInvoice,
    );

    yield put(invoiceKurAction.fetchDataStatusInvoiceSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(invoiceKurAction.failedFetch());
  }
}

function* fetchDataConditionInvoice() {
  try {
    const response: Response<string[]> = yield call(
      InvoiceService.getAllConditionInvoice,
    );

    yield put(invoiceKurAction.fetchDataConditionInvoiceSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(invoiceKurAction.failedFetch());
  }
}

export default function* customerKurSagas() {
  yield takeLatest(invoiceKurAction.fetchData.type, fetchData);
  yield takeLatest(invoiceKurAction.fetchDataDetail.type, fetchDataDetail);
  yield takeLatest(
    invoiceKurAction.fetchDataConditionInvoice.type,
    fetchDataConditionInvoice,
  );
  yield takeLatest(
    invoiceKurAction.fetchDataStatusInvoice.type,
    fetchDataStatusInvoice,
  );
}
