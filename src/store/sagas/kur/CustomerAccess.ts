import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { customerAction } from 'store/slice/kur/Customer';
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

    console.log(
      '🚀 ~ file: CustomerAccess.ts:71 ~ function*createCustomer ~ convertBirthDate',
      convertJoindate,
    );
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
    console.log(
      '🚀 ~ file: CustomerAccess.ts:122 ~ function*createCustomer ~ response',
      response,
    );
    yield put(customerAction.createCustomerSuccess());
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

export default function* customerKurSagas() {
  yield takeLatest(customerAction.fetchData.type, fetchData);
  yield takeLatest(customerAction.createCustomer.type, createCustomer);
}
