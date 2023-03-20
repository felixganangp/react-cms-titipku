import { PayloadAction } from '@reduxjs/toolkit';
import { Inventory, InventoryParams } from 'models/b2b/Inventory';
import { ListResponse } from 'models/fetch';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as service from 'service/B2B/Inventory';
import { inventoryAction } from 'store/slice/b2b/Inventory';
import { uiAction } from 'store/slice/ui';

function* fetchData(params: PayloadAction<InventoryParams>) {
  try {
    const response: ListResponse<Inventory> = yield call(
      service.fetchInventory,
      params.payload,
    );
    yield put(inventoryAction.fetchDataSuccess(response));
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

export default function* inventorySaga() {
  yield takeLatest(inventoryAction.fetchData, fetchData);
}
