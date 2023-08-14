import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { InboundAction } from 'store/slice/b2b/Inbound';
import { uiAction } from 'store/slice/ui';
import * as InboundService from 'service/B2B/Inbound';
import { Response, ListResponse } from 'models/fetch';
import {
  CreateInbound,
  Inbound,
  InboundDetail,
  InboundParams,
} from 'models/b2b/Inbound';

function* fetchData(params: PayloadAction<InboundParams>) {
  try {
    const response: ListResponse<Inbound> = yield call(
      InboundService.fetchInbound,
      params.payload,
    );

    yield put(InboundAction.fetchDataSuccess(response));
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
    yield put(InboundAction.failedFetch());
  }
}

function* fetchDataDetail(params: PayloadAction<{ id: string | number }>) {
  try {
    const response: Response<InboundDetail> = yield call(
      InboundService.fetchInboundDetails,
      params.payload.id,
    );

    yield put(InboundAction.fetchDataDetailSuccess(response));
  } catch (err) {
    const headMessage = 'Failed Get Role Access Detail';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: headMessage,
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(InboundAction.failedFetch());
  }
}

function* createInbound(payload: PayloadAction<CreateInbound>) {
  try {
    const response: Response<string> = yield call(
      InboundService.createInbound as any,
      payload.payload,
    );

    yield put(InboundAction.createInboundSuccess());
    yield call(fetchData, {
      type: InboundAction.fetchData.type,
      payload: {
        page: 1,
        count: 10,
        search: '',
      },
    });
    yield put(
      uiAction.openToast({
        headMsg: 'Success create inbound',
        severity: 'success',
      }),
    );
  } catch (error) {
    yield put(
      uiAction.openToast({
        headMsg: 'Failed to create inbound',
        message: error as string,
        severity: 'error',
      }),
    );
    yield put(InboundAction.createInboundFailed());
    console.log(`Failed to create inbound: `, error);
  }
}

export default function* roleUserSagas() {
  yield takeLatest(InboundAction.fetchData.type, fetchData);
  yield takeLatest(InboundAction.fetchDataDetail.type, fetchDataDetail);
  yield takeLatest(InboundAction.createInbound.type, createInbound);
}
