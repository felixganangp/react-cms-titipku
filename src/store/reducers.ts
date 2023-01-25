import uiReducer from './slice/ui';
import roleUserReducer from './slice/RoleUser';
import roleAccessReducer from './slice/RoleAccess';
import skuManagementReducer from './slice/SkuManagement';
import userDetailsReducer from './slice/UserDetails';

const reducers = {
  ui: uiReducer,
  roleUser: roleUserReducer,
  skuManagement: skuManagementReducer,
  roleAccess: roleAccessReducer,
  userDetails: userDetailsReducer,
};

export default reducers;
