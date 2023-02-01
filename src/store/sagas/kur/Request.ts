import { all, call, put, takeLatest } from 'redux-saga/effects';
import { uiAction } from 'store/slice/ui';
import * as service from 'service/Kur/Request';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListResponse } from 'models/fetch';
import { RequestKUR } from 'models/kur/Request';
import { requestKURAction } from '../../slice/kur/Request';

function* fetchData(params: PayloadAction<RequestKUR>) {
  try {
    const response: ListResponse<RequestKUR> = yield call(
      service.getAllRequestKUR,
      params.payload,
    );

    yield put(requestKURAction.fetchDataSuccess(response));
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
  }
}

export default function* requestKurSagas() {
  yield takeLatest(requestKURAction.fetchData.type, fetchData);
}
