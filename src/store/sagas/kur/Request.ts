import { call, put, select, takeLatest } from 'redux-saga/effects';
import { uiAction } from 'store/slice/ui';
import * as service from 'service/Kur/Request';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Response } from 'models/fetch';
import {
  ActionParams,
  KURRequestDetail,
  RequestKUR,
  RequestKURParams,
} from 'models/kur/Request';
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

function* approveRequest(params: PayloadAction<ActionParams>) {
  try {
    const listParams: RequestKURParams = yield select(
      (state) => state.request.params,
    );
    yield call(service.approveRequest, params.payload.id);
    yield put(
      uiAction.openToast({
        headMsg: 'Success',
        message: 'Successfully approve request',
        severity: 'success',
      }),
    );
    // eslint-disable-next-line radix
    if (params.payload.detailsPage)
      yield put(requestKURAction.fetchDetails({ id: params.payload.id }));
    else yield put(requestKURAction.fetchData(listParams));
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

function* rejectRequest(params: PayloadAction<ActionParams>) {
  try {
    const listParams: RequestKURParams = yield select(
      (state) => state.request.params,
    );
    yield call(service.rejectRequest, params.payload);
    yield put(
      uiAction.openToast({
        headMsg: 'Success',
        message: 'Successfully reject request',
        severity: 'success',
      }),
    );
    if (params.payload.detailsPage)
      yield put(requestKURAction.fetchDetails({ id: params.payload.id }));
    else yield put(requestKURAction.fetchData(listParams));
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
    if (response.data.kur_user.id) {
      yield put(
        requestKURAction.fetchCreditBalance({ id: response.data.kur_user.id }),
      );
    }
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

function* fetchDetailsTable(
  params: PayloadAction<{ id: string | number; params: ListParams }>,
) {
  try {
    const response: ListResponse<KURRequestDetail> = yield call(
      service.getDetailsTable,
      params.payload.id,
      params.payload.params,
    );
    yield put(requestKURAction.fetchDetailsTableSuccess(response));
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

function* fetchCreditBalanceById(
  params: PayloadAction<{ id: string | number }>,
) {
  try {
    const response: Response<number> = yield call(
      service.getCreditBalanceById,
      params.payload.id,
    );
    yield put(requestKURAction.fetchCreditBalanceSuccess(response));
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
  yield takeLatest(requestKURAction.approveRequest.type, approveRequest);
  yield takeLatest(requestKURAction.rejectRequest.type, rejectRequest);
  yield takeLatest(requestKURAction.fetchDetails.type, fetchDetails);
  yield takeLatest(requestKURAction.fetchDetailsTable.type, fetchDetailsTable);
  yield takeLatest(
    requestKURAction.fetchCreditBalance.type,
    fetchCreditBalanceById,
  );
}
