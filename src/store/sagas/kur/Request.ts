import { call, put, select, takeLatest } from 'redux-saga/effects';
import { uiAction } from 'store/slice/ui';
import * as service from 'service/Kur/Request';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, Response } from 'models/fetch';
import { RequestKUR, RequestKURParams } from 'models/kur/Request';
import { requestKURAction } from 'store/slice/kur/Request';

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

function* approveRequest(params: PayloadAction<{ id: string | number }>) {
  try {
    const listParams: RequestKURParams = yield select(
      (state) => state.request.params,
    );
    yield call(service.approveRequest, params.payload.id);
    yield put(requestKURAction.fetchData(listParams));
  } catch (err) {
    const headMsg = 'Failed to Approve Request';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg,
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* fetchDetails(params: PayloadAction<{ id: string | number }>) {
  try {
    const response: Response<RequestKUR> = yield call(
      service.getRequestDetails,
      params.payload.id,
    );

    yield put(requestKURAction.fetchDetailsSuccess(response));
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

function* rejectRequest(
  params: PayloadAction<{ id: number | undefined; remarks: string }>,
) {
  try {
    const listParams: RequestKURParams = yield select(
      (state) => state.request.params,
    );
    yield call(service.rejectRequest, params.payload);
    yield put(requestKURAction.fetchData(listParams));
  } catch (err) {
    const headMsg = 'Failed to Approve Request';
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg,
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg,
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

export default function* requestKurSagas() {
  yield takeLatest(requestKURAction.fetchData.type, fetchData);
  yield takeLatest(requestKURAction.approveRequest.type, approveRequest);
  yield takeLatest(requestKURAction.rejectRequest.type, rejectRequest);
  yield takeLatest(requestKURAction.fetchDetails.type, fetchDetails);
}
