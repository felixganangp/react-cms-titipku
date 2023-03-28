/* eslint-disable @typescript-eslint/naming-convention */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { productAction } from 'store/slice/b2b/Product';
import { uiAction } from 'store/slice/ui';
// models
import { ListResponse, Response } from 'models/fetch';
import {
  ChangeStatusParams,
  IsActiveType,
  Product,
  ProductParams,
  FormInventoryTypes,
  CreateProduct,
  Log,
} from 'models/b2b/Product';
import { ProductGrade } from 'models/b2b/Grade';
import { Category } from 'models/b2b/Category';
import { ProductType } from 'models/b2b/Type';
import { ProductParent } from 'models/b2b/ProductParent';
// service
import * as service from 'service/B2B/Product';
import * as serviceProductPerrant from 'service/B2B/ProductParent';
import { fetchGrade } from 'service/B2B/Grade';
import { fetchCategory } from 'service/B2B/Category';
import { fetchTypes } from 'service/B2B/Types';

function* fetchData(params: PayloadAction<ProductParams>) {
  try {
    const response: ListResponse<Product> = yield call(
      service.fetchProduct,
      params.payload,
    );
    yield put(productAction.fetchDataSuccess(response));
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
    yield put(productAction.fetchDataFailed());
  }
}

function* fetchTotalEmptyStock() {
  try {
    const response: ListResponse<Product> = yield call(service.fetchProduct, {
      status: 'empty_stock',
    });
    yield put(productAction.fetchTotalEmptyStockSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get total empty stock',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get total empty stock',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.fetchTotalEmptyStockFailed());
  }
}

function* fetchTotalLowStock() {
  try {
    const response: ListResponse<Product> = yield call(service.fetchProduct, {
      status: 'low_stock',
    });
    yield put(productAction.fetchTotalLowStockSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get total low stock',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get total low stock',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.fetchTotalLowStockFailed());
  }
}

function* fetchGrades() {
  try {
    const response: ListResponse<ProductGrade> = yield call(fetchGrade, {});
    yield put(productAction.fetchGradeSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get grades',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get grades',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.fetchGradeFailed());
  }
}

function* fetchCategories() {
  try {
    const response: ListResponse<Category> = yield call(fetchCategory, {});
    yield put(productAction.fetchCategorySuccess(response));
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
    yield put(productAction.fetchCategoryFailed());
  }
}

function* fetchTypesList() {
  try {
    const response: ListResponse<ProductType> = yield call(fetchTypes, {});
    yield put(productAction.fetchTypesSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get types data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get types data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.fetchTypesFailed());
  }
}

function* stockOpname(payload: PayloadAction<any>) {
  try {
    const paramsState: ProductParams = yield select((state) => {
      return state.product.params;
    });
    const response: ListResponse<any> = yield call(
      service.stockOpnameProduct,
      payload.payload,
    );
    yield put(productAction.stockOpnameSuccess());
    yield call(fetchData, {
      type: productAction.fetchData.type,
      payload: paramsState,
    });
    yield put(
      uiAction.openToast({
        headMsg: 'Success stock opname product',
        // message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get data',
          message: error || 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* createProduct(payload: PayloadAction<FormInventoryTypes>) {
  try {
    const dataForm = payload.payload;
    // console.log('from saga', payload.payload);
    // Step 1. upload image
    const payloadImage = {
      image: dataForm.image,
    };
    const responUploadImage: Response<string> = yield call(
      serviceProductPerrant.uploadImage,
      payloadImage,
    );
    // console.log(responUploadImage);
    // Step 2. Create Product Perent
    const payloadProductPerant = {
      name: dataForm.name,
      image_filepath: responUploadImage.data,
      product_parent_category_id: dataForm.category.map((val) => val.id),
    };

    yield call(serviceProductPerrant.createProduct, payloadProductPerant);

    // get id
    const getIdProductParent: ListResponse<ProductParent> = yield call(
      serviceProductPerrant.fetchProduct,
      { page: 1, count: 1, order_by: 'id', order_type: 'desc' },
    );

    // Step 3. upload product List
    const callPromise: any = call;
    yield all(
      dataForm.productList.map((val) =>
        callPromise(service.createProduct, {
          product_type_id: dataForm.type?.id || 0,
          product_parent_id: getIdProductParent.data[0].id,
          product_grade_id: val.grade?.id || 0,
          description: val.description,
          stock: val.stock,
          low_stock_limit: val.lowStock,
          is_exist: val.is_exist,
          is_active: val.is_active,
        }),
      ),
    );
    yield put(
      uiAction.openToast({
        headMsg: 'Success create product',
        // message: error,
        severity: 'success',
      }),
    );
    yield put(productAction.createProductSuccess());
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error create product',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error create product',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.createProductFailed());
  }
}

function* undoDelete() {
  try {
    const ids: (string | number)[] = yield select(
      (state) => state.product.tempIds,
    );
    const params: ProductParams = yield select((state) => state.product.params);
    yield call(service.deleteProduct, { is_exist: true, ids });
    yield put(productAction.deleteDone());
    yield put(productAction.fetchData(params));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error undo delete products',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error undo delete products',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.deleteDone());
  }
}

function* deleteProduct(params: PayloadAction<(number | string)[]>) {
  try {
    const filter: ProductParams = yield select((state) => state.product.params);
    yield call(service.deleteProduct, {
      is_exist: false,
      ids: params.payload,
    });
    yield put(productAction.deleteDone());
    yield put(productAction.fetchData(filter));
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
    yield put(productAction.deleteDone());
  }
}

function* changeStatus(params: PayloadAction<ChangeStatusParams>) {
  try {
    const filter: ProductParams = yield select((state) => state.product.params);
    const { is_active, ids } = params.payload.newStatus;
    yield call(service.changeStatusProduct, { is_active, ids });
    yield put(productAction.changeStatusDone());
    yield put(productAction.fetchData(filter));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error change status products',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error change status products',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.changeStatusDone());
  }
}

function* undoChangeStatus() {
  try {
    const temps: IsActiveType[] = yield select(
      (state) => state.product.tempChangeStatus,
    );
    const filter: ProductParams = yield select((state) => state.product.params);
    yield call(service.batchUndoChangeStatus, temps);
    yield put(productAction.changeStatusDone());
    yield put(productAction.fetchData(filter));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error undo change status products',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error undo change status products',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
    yield put(productAction.changeStatusDone());
  }
}

function* fetchDetails(params: PayloadAction<string | number>) {
  try {
    const response: Response<Product> = yield call(
      service.fetchDetails,
      params.payload,
    );
    yield put(productAction.fetchDetailsSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get details data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get details data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

function* fetchLog(params: PayloadAction<string | number>) {
  try {
    const response: ListResponse<Log> = yield call(
      service.fetchLog,
      params.payload,
    );
    yield put(productAction.fetchLogSuccess(response));
  } catch (err) {
    if (typeof err === 'string') {
      const error = err as string;
      yield put(
        uiAction.openToast({
          headMsg: 'Error get log data',
          message: error,
          severity: 'error',
        }),
      );
    } else {
      yield put(
        uiAction.openToast({
          headMsg: 'Error get log data',
          message: 'interval server error',
          severity: 'error',
        }),
      );
    }
  }
}

export default function* productSagas() {
  yield takeLatest(productAction.fetchData, fetchData);
  yield takeLatest(productAction.stockOpname, stockOpname);
  yield takeLatest(productAction.fetchTotalEmptyStock, fetchTotalEmptyStock);
  yield takeLatest(productAction.fetchTotalLowStock, fetchTotalLowStock);
  yield takeLatest(productAction.fetchGrade, fetchGrades);
  yield takeLatest(productAction.fetchCategory, fetchCategories);
  yield takeLatest(productAction.fetchTypes, fetchTypesList);
  yield takeLatest(productAction.createProduct, createProduct);
  yield takeLatest(productAction.fetchData.type, fetchData);
  yield takeLatest(
    productAction.fetchTotalEmptyStock.type,
    fetchTotalEmptyStock,
  );
  yield takeLatest(productAction.delete.type, deleteProduct);
  yield takeLatest(productAction.undoDelete.type, undoDelete);
  yield takeLatest(productAction.changeStatus.type, changeStatus);
  yield takeLatest(productAction.undoChangeStatus.type, undoChangeStatus);
  yield takeLatest(productAction.fetchDetails.type, fetchDetails);
  yield takeLatest(productAction.fetchLog.type, fetchLog);
}
