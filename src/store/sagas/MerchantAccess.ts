import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { merchantAction } from 'store/slice/Merchant';
import { uiAction } from 'store/slice/ui';

import * as MerchantService from 'service/Merchant';
import { ListResponse } from 'models/fetch';
import { MerchantResp, MerchantParams } from 'models/Merchant';

function* fetchData(params: PayloadAction<MerchantParams>) {
  try {
    const response: ListResponse<MerchantResp> = yield call(
      MerchantService.getAllMerchants,
      params.payload,
    );

    yield put(merchantAction.fetchDataSuccess(response));
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
    yield put(merchantAction.failedFetch());
  }
}

export default function* merchantKurSagas() {
  yield takeLatest(merchantAction.fetchData.type, fetchData);
}
