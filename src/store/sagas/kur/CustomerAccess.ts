import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { customerAction } from 'store/slice/kur/Customer';
import { uiAction } from 'store/slice/ui';

import * as CustomerService from 'service/Kur/Customer';
import { ListResponse, Response } from 'models/fetch';
import { Customer, CustomerParams } from 'models/kur/Customer';

function* fetchData(params: PayloadAction<CustomerParams>) {
  try {
    const response: ListResponse<Customer> = yield call(
      CustomerService.getAllCustomers,
      params.payload,
    );

    yield put(customerAction.fetchDataSuccess(response));
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
    yield put(customerAction.failedFetch());
  }
}

function* fetchDataDetail(params: PayloadAction<{ id: string | number }>) {
  try {
    const response: Response<Customer> = yield call(
      CustomerService.getCustomersDetails,
      params.payload.id,
    );

    yield put(customerAction.fetchDataDetailSuccess(response));
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
    yield put(customerAction.failedFetch());
  }
}
export default function* customerKurSagas() {
  yield takeLatest(customerAction.fetchData.type, fetchData);
  yield takeLatest(customerAction.fetchDataDetail.type, fetchDataDetail);
}
