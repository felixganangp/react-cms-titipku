import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { customerAction } from 'store/slice/Kur/Customer';
import { uiAction } from 'store/slice/ui';

import * as CustomerService from 'service/Kur/Customer';
import { ListResponse } from 'models/fetch';
import { Customer, CustomerParams } from 'models/Customer';

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

export default function* customerKurSagas() {
  yield takeLatest(customerAction.fetchData.type, fetchData);
}
