import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { uiAction } from 'store/slice/ui';
import * as SupplierServices from 'service/B2B/Supplier';
import { Response, ListResponse } from 'models/fetch';
import { Supplier, SupplierParams, CreateSupplier } from 'models/b2b/Supplier';
import { SupplierAction } from 'store/slice/b2b/Supplier';

function* fetchData(params: PayloadAction<SupplierParams>) {
  try {
    const response: ListResponse<Supplier> = yield call(
      SupplierServices.fetchSupplier,
      params.payload,
    );

    yield put(SupplierAction.fetchDataSuccess(response));
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
    yield put(SupplierAction.failedFetch());
  }
}

function* updateSupplier(payload: PayloadAction<CreateSupplier>) {
  try {
    const params: SupplierParams = yield select(
      (state) => state.supplier.params,
    );
    yield call(SupplierServices.updateSupplier, payload.payload);
    yield put(SupplierAction.fetchData(params));
    yield put(
      uiAction.openToast({
        headMsg: 'Supplier Edited',
        severity: 'success',
      }),
    );
    yield put(SupplierAction.updateSupplierSuccess({ error: false }));
  } catch (err) {
    const headMessage = 'Failed Update Supplier';
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
          message: 'internal server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* deleteSupplier(params: PayloadAction<(number | string)[]>) {
  try {
    const filter: SupplierParams = yield select(
      (state) => state.supplier.params,
    );
    yield call(SupplierServices.deleteSupplier, {
      ids: params.payload,
    });
    yield put(SupplierAction.deleteDone());
    yield put(SupplierAction.fetchData(filter));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error delete products',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error delete products',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(SupplierAction.deleteDone());
  }
}

export default function* supplierSagas() {
  yield takeLatest(SupplierAction.fetchData.type, fetchData);
  yield takeLatest(SupplierAction.updateSupplier.type, updateSupplier);
  yield takeLatest(SupplierAction.delete.type, deleteSupplier);
}
