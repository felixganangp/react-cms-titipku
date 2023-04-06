import { all } from 'redux-saga/effects';
import roleUserSagas from 'store/sagas/RoleUser';
import roleAccessSagas from 'store/sagas/RoleAccess';
import customerKurSagas from 'store/sagas/kur/Customer';
import typeKurSagas from 'store/sagas/kur/Type';
import areaSagas from 'store/sagas/Area';
import userDetailsSaga from './sagas/UserDetails';
import requestKurSagas from './sagas/kur/Request';
import paymentKurSagas from './sagas/kur/Payment';
import invoiceKurSagas from './sagas/kur/Invoice';
import merchantSagas from './sagas/MerchantAccess';
import creditScoreSagas from './sagas/kur/CreditScore';
import productSagas from './sagas/b2b/Product';
import rawSagas from './sagas/b2b/ProductRaw';

export default function* rootSaga() {
  yield all([
    roleUserSagas(),
    roleAccessSagas(),
    userDetailsSaga(),
    customerKurSagas(),
    typeKurSagas(),
    areaSagas(),
    requestKurSagas(),
    paymentKurSagas(),
    invoiceKurSagas(),
    merchantSagas(),
    creditScoreSagas(),
    productSagas(),
    rawSagas(),
  ]);
}
