import { all } from 'redux-saga/effects';
import roleUserSagas from 'store/sagas/RoleUser';

export default function* rootSaga() {
  yield all([roleUserSagas()]);
}
