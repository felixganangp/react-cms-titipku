import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { customerAction, selectDataCustomer } from 'store/slice/kur/Customer';
import { uiAction } from 'store/slice/ui';

import * as CustomerService from 'service/Kur/Customer';
import { ListResponse, Response } from 'models/fetch';
import {
  Customer,
  CustomerParams,
  CreateCustomer,
  CreateCustomerPayload,
  KurUserDocumentPayload,
} from 'models/kur/Customer';

interface ImageUpdatePayload {
  id: number | null | undefined;
  is_update: boolean;
  document_type: 'ktp' | 'kk' | 'npwp' | 'sku'; // available options : ktp, kk, npwp, sku
  document_filepath?: string;
  document_number?: string;
}
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

function* createCustomer(payload: PayloadAction<CreateCustomer>) {
  try {
    const responseImageNik: Response<string> = yield call(
      CustomerService.uploadImage as any,
      { file: payload.payload.imageNik, type: 'ktp' },
    );
    const responseImageKk: Response<string> = yield call(
      CustomerService.uploadImage as any,
      { file: payload.payload.imageKk, type: 'kk' },
    );
    const responseImageNpwp: Response<string> = yield call(
      CustomerService.uploadImage as any,
      { file: payload.payload.imageNpwp, type: 'npwp' },
    );
    const responseImageSKUsaha: Response<string> = yield call(
      CustomerService.uploadImage as any,
      { file: payload.payload.imageSKUsaha, type: 'sku' },
    );
    // eslint-disable-next-line no-underscore-dangle
    const jsDate = payload.payload.birthDate?._d;
    // eslint-disable-next-line no-unsafe-optional-chaining
    const convertBirthDate = jsDate && jsDate?.getTime() / 1000;
    const today = new Date();
    const convertJoindate = Math.floor(today.getTime() / 1000);

    const createCustomerPayload: CreateCustomerPayload = {
      user_id: payload.payload.merchantName?.id,
      user_type: 'merchant',
      name: payload.payload.name,
      nik: payload.payload.nikKtp,
      birth_date: convertBirthDate,
      join_date: convertJoindate,
      email: payload.payload.email,
      phone_number: payload.payload.phoneNumber,
      registered_address: payload.payload.addressKtp,
      living_address: payload.payload.addressDomisili,
      credit_limit: +payload.payload.creditLimit,
      admin_fee: +payload.payload.adminFee,
      dpd_rate: +payload.payload.dpdRate,
      user_account_number: payload.payload.bankNumberPrimary,
      user_bank: payload.payload.bankName?.name,
      nobu_account_number: payload.payload.nobuAccountNumber,
      kur_user_status_id: 1,
      kur_user_type_id: payload.payload.kurType?.id,
      kur_user_document: [
        {
          document_filepath: responseImageNik.data,
          document_number: payload.payload.nikKtp,
          document_type: 'ktp',
        },
        {
          document_filepath: responseImageKk.data,
          document_number: payload.payload.kkNumber,
          document_type: 'kk',
        },
        {
          document_filepath: responseImageNpwp.data,
          document_number: payload.payload.npwp,
          document_type: 'npwp',
        },
        {
          document_filepath: responseImageSKUsaha.data,
          document_type: 'sku',
        },
      ],
    };
    const response: Response<string> = yield call(
      CustomerService.createCustomer as any,
      createCustomerPayload,
    );

    yield put(customerAction.createCustomerSuccess());
    yield call(fetchData, {
      type: customerAction.fetchData.type,
      payload: {
        page: 1,
        count: 10,
        search: '',
        order_by: 'id',
        order_type: 'desc',
      },
    });
    yield put(
      uiAction.openToast({
        headMsg: 'Success create customer kur',
        // message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
  } catch (error) {
    yield put(
      uiAction.openToast({
        headMsg: 'Failed to create customer kur',
        message: error as string,
        severity: 'error',
      }),
    );
    yield put(customerAction.createCustomerFailed());
    console.log(`Failed to create user: `, error);
  }
}

function* editCustomer(payload: PayloadAction<CreateCustomer>) {
  try {
    const paramsState: CustomerParams = yield select((state) => {
      return state.customerKur.params;
    });
    console.log(
      '🚀 ~ file: CustomerAccess.ts:150 ~ function*editCustomer ~ payload',
      payload,
    );
    console.log('🚀 ~ file: payload', typeof payload.payload.imageKk);

    // if
    const test =
      'kur_user_documents/ktp/1-02-2023-1675233622722456380_Screen%20Shot%202023-01-31%20at%2010.45.43.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXSNW2ORESX4WA3MQ%2F20230201%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230201T093213Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=0acfac854d07547e115cfa8f8f34ad55e052e0237a5db9da947bda3126ff1287';

    let payloadKtp: undefined | ImageUpdatePayload = {
      id: payload.payload.idImageNik,
      is_update: false,
      document_type: 'ktp',
    };
    if (payload.payload.oldNikKtp !== payload.payload.nikKtp) {
      payloadKtp = {
        ...payloadKtp,
        document_number: payload.payload.nikKtp,
        is_update: true,
      };
    } else {
      payloadKtp = {
        ...payloadKtp,
        document_number: payload.payload.nikKtp,
        is_update: false,
      };
    }
    if (typeof payload.payload.imageNik === 'object') {
      const responseImageNik: Response<string> = yield call(
        CustomerService.uploadImage as any,
        { file: payload.payload.imageNik, type: 'ktp' },
      );
      payloadKtp = {
        ...payloadKtp,
        document_filepath: responseImageNik.data,
      };
    } else {
      let imageNik: string | string[] = payload.payload.imageNik.toString();
      imageNik = imageNik.split('//');
      const payloadImageNik = imageNik[2].split('?');
      payloadKtp = {
        ...payloadKtp,
        document_filepath: `/${payloadImageNik[0]}`,
      };
    }
    console.log(
      '🚀 ~ file: CustomerAccess.ts:176 ~ function*editCustomer ~ payloadKtp',
      payloadKtp,
    );

    // if (typeof payload.payload.imageKk === 'object') {
    //   const responseImageKk: Response<string> = yield call(
    //     CustomerService.uploadImage as any,
    //     { file: payload.payload.imageKk, type: 'kk' },
    //   );
    // }
    // if (typeof payload.payload.imageNpwp === 'object') {
    //   const responseImageNpwp: Response<string> = yield call(
    //     CustomerService.uploadImage as any,
    //     { file: payload.payload.imageNpwp, type: 'npwp' },
    //   );
    // }
    // if (typeof payload.payload.imageSKUsaha === 'object') {
    //   const responseImageSKUsaha: Response<string> = yield call(
    //     CustomerService.uploadImage as any,
    //     { file: payload.payload.imageSKUsaha, type: 'sku' },
    //   );
    // }
    // eslint-disable-next-line no-underscore-dangle
    const jsDate = payload.payload.birthDate?._d;
    // eslint-disable-next-line no-unsafe-optional-chaining
    const convertBirthDate = jsDate && jsDate?.getTime() / 1000;
    const today = new Date();
    const convertJoindate = Math.floor(today.getTime() / 1000);

    // const createCustomerPayload: CreateCustomerPayload = {
    //   user_id: payload.payload.merchantName?.id,
    //   user_type: 'merchant',
    //   name: payload.payload.name,
    //   nik: payload.payload.nikKtp,
    //   birth_date: convertBirthDate,
    //   join_date: convertJoindate,
    //   email: payload.payload.email,
    //   phone_number: payload.payload.phoneNumber,
    //   registered_address: payload.payload.addressKtp,
    //   living_address: payload.payload.addressDomisili,
    //   credit_limit: +payload.payload.creditLimit,
    //   admin_fee: +payload.payload.adminFee,
    //   dpd_rate: +payload.payload.dpdRate,
    //   user_account_number: payload.payload.bankNumberPrimary,
    //   user_bank: payload.payload.bankName?.name,
    //   nobu_account_number: payload.payload.nobuAccountNumber,
    //   kur_user_status_id: 1,
    //   kur_user_type_id: payload.payload.kurType?.id,
    //   kur_user_document: [
    //     {
    //       document_filepath: responseImageNik.data,
    //       document_number: payload.payload.nikKtp,
    //       document_type: 'ktp',
    //     },
    //     {
    //       document_filepath: responseImageKk.data,
    //       document_number: payload.payload.kkNumber,
    //       document_type: 'kk',
    //     },
    //     {
    //       document_filepath: responseImageNpwp.data,
    //       document_number: payload.payload.npwp,
    //       document_type: 'npwp',
    //     },
    //     {
    //       document_filepath: responseImageSKUsaha.data,
    //       document_type: 'sku',
    //     },
    //   ],
    // };
    // const response: Response<string> = yield call(
    //   CustomerService.updateCustomer as any,
    //   createCustomerPayload,
    // );

    // yield put(customerAction.editCustomerSuccess());
    yield call(fetchData, {
      type: customerAction.fetchData.type,
      payload: paramsState,
    });
    yield put(
      uiAction.openToast({
        headMsg: 'Success create customer kur',
        // message: 'Succes Fetch data',
        severity: 'success',
      }),
    );
  } catch (error) {
    yield put(
      uiAction.openToast({
        headMsg: 'Failed to create customer kur',
        message: error as string,
        severity: 'error',
      }),
    );
    yield put(customerAction.createCustomerFailed());
    console.log(`Failed to create user: `, error);
  }
}

function* fetchDataDetail(params: PayloadAction<{ id: string | number }>) {
  try {
    const response: Response<Customer> = yield call(
      CustomerService.getCustomersDetails,
      params.payload.id,
    );

    yield put(customerAction.fetchDataDetailSuccess(response));
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
  yield takeLatest(customerAction.createCustomer.type, createCustomer);
  yield takeLatest(customerAction.editCustomer.type, editCustomer);
  yield takeLatest(customerAction.fetchDataDetail.type, fetchDataDetail);
}
