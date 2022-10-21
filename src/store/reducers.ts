import uiReducer from './slice/ui';
import roleUserReducer from './slice/RoleUser';
import roleAccessReducer from './slice/RoleAccess';

const reducers = {
  ui: uiReducer,
  roleUser: roleUserReducer,
  roleAccess: roleAccessReducer,
};

export default reducers;
