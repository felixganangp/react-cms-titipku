/* eslint-disable @typescript-eslint/naming-convention */
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CreateRawSaga,
  CreateRawService,
  ProductRaw,
  RawParams,
} from 'models/b2b/ProductRaw';
import { ListResponse, Response } from 'models/fetch';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as service from 'service/B2B/ProductRaw';
import { uiAction } from 'store/slice/ui';
import { Category } from 'models/b2b/Category';
import { fetchCategory } from 'service/B2B/Category';
import {
  uploadImage,
  updateProduct,
  IsExistName,
} from 'service/B2B/ProductParent';
import { CreateProduct } from 'models/b2b/ProductParent';
import { productAction } from 'store/slice/b2b/Product';
import { rawAction } from '../../slice/b2b/ProductRaw';

function* fetchData(params: PayloadAction<RawParams>) {
  try {
    const response: ListResponse<ProductRaw> = yield call(
      service.fetchData,
      params.payload,
    );
    yield put(rawAction.fetchDataSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get raw data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get raw data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(rawAction.fetchDataFailed());
  }
}

function* fetchCategories() {
  try {
    const response: ListResponse<Category> = yield call(fetchCategory, {});
    yield put(rawAction.fetchCategorySuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get category data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get category data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(rawAction.fetchCategoryFailed());
  }
}

function* createRaw(payload: PayloadAction<CreateRawSaga>) {
  try {
    const params: RawParams = yield select((state) => state.raw.params);
    // upload image
    const payloadImage = {
      image: payload.payload.image,
    };
    const uploadImageRes: Response<string> = yield call(
      uploadImage,
      payloadImage,
    );

    // create product raw
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { description, stock, name, category_ids } = payload.payload;
    const payloadRaw: CreateRawService = {
      description,
      stock,
      is_active: true,
      product_parent: {
        name,
        image_filepath: uploadImageRes.data,
        product_category_id: category_ids,
      },
    };
    yield call(service.create, payloadRaw);
    yield put(
      uiAction.openYellowToast({
        totalItem: 1,
        additionalMsg: 'Product successfully',
        action: 'added!',
        noUndo: true,
        error: false,
      }),
    );
    yield put(rawAction.createRawSuccess());
    yield put(rawAction.fetchData(params));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error create new raw product',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error create new raw product',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(rawAction.createRawFailed());
  }
}

function* updateRaw(
  payload: PayloadAction<{ id: number | string; body: CreateRawSaga }>,
) {
  try {
    const listParams: RawParams = yield select((state) => state.raw.params);
    const {
      description,
      stock,
      name,
      category_ids,
      image,
      parent_id,
      is_active,
      is_exist,
      is_active_parent,
      is_exist_parent,
    } = payload.payload.body;
    const { id } = payload.payload;
    let imagePath: string;
    // upload updated image / slice image url
    if (typeof image !== 'string') {
      const payloadImage = {
        image,
      };
      const uploadImageRes: Response<string> = yield call(
        uploadImage,
        payloadImage,
      );
      imagePath = uploadImageRes.data;
    } else {
      imagePath = image.slice(
        image.search('/b2b'),
        image.search('X-Amz-Algorithm') - 1,
      );
    }

    // update data
    // update product parent
    const payloadParent: CreateProduct = {
      name,
      image_filepath: imagePath,
      product_category_id: category_ids,
      is_active: is_active_parent,
      is_exist: is_exist_parent,
    };
    yield call(updateProduct, { id: parent_id || 0, payload: payloadParent });
    // update product raw
    const payloadRaw: CreateRawService = {
      product_parent_id: parent_id,
      description,
      stock,
      is_active: is_active || true,
      is_exist: is_exist || true,
    };
    yield call(service.update, { id, body: payloadRaw });
    yield put(rawAction.updateRawSuccess());
    yield put(rawAction.fetchData(listParams));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error update raw product',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error update raw product',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(rawAction.updateRawFailed());
  }
}

function* deleteRaw(params: PayloadAction<(number | string)[]>) {
  try {
    const filter: RawParams = yield select((state) => state.raw.params);
    yield call(service.deleteRaw, {
      is_exist: false,
      ids: params.payload,
    });
    yield put(rawAction.fetchData(filter));
    yield put(rawAction.deleteRawSuccess());
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error delete raw products',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error delete raw products',
          message: 'interval server error',
          severity: 'error',
        }),
      );
      yield put(rawAction.deleteRawFailed());
    }
  }
}

function* undoDeleteRaw() {
  try {
    const filter: RawParams = yield select((state) => state.raw.params);
    const ids: (string | number)[] = yield select((state) => state.raw.tempIds);
    yield call(service.deleteRaw, { is_exist: true, ids });
    yield put(rawAction.fetchData(filter));
    yield put(rawAction.undoDeleteDone());
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error undo delete raw products',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error undo delete raw products',
          message: 'interval server error',
          severity: 'error',
        }),
      );
      yield put(rawAction.deleteRawFailed());
    }
  }
}

function* checkingName(
  payload: PayloadAction<{ name: string; exclude_id: number | string }>,
) {
  try {
    const response: Response<boolean> = yield call(IsExistName, {
      name: payload.payload.name,
      exclude_id: payload.payload.exclude_id,
    });
    yield put(rawAction.checkingRawNameSuccess(response.data));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error checking raw name',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error checking raw name',
          message: 'interval server error',
          severity: 'error',
        }),
      );
      yield put(rawAction.checkingRawNameFailed());
    }
  }
}

export default function* rawSagas() {
  yield takeLatest(rawAction.fetchData.type, fetchData);
  yield takeLatest(rawAction.fetchCategory.type, fetchCategories);
  yield takeLatest(rawAction.createRaw.type, createRaw);
  yield takeLatest(rawAction.updateRaw.type, updateRaw);
  yield takeLatest(rawAction.deleteRaw.type, deleteRaw);
  yield takeLatest(rawAction.undoDelete.type, undoDeleteRaw);
  yield takeLatest(rawAction.checkingRawName.type, checkingName);
}
