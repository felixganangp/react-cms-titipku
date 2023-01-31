import uiReducer from './slice/ui';
import roleUserReducer from './slice/RoleUser';
import roleAccessReducer from './slice/RoleAccess';
import skuManagementReducer from './slice/SkuManagement';
import userDetailsReducer from './slice/UserDetails';
import customerKurReducer from './slice/kur/Customer';
import typeKurReducer from './slice/kur/Type';
import areaReducer from './slice/Area';

const reducers = {
  ui: uiReducer,
  roleUser: roleUserReducer,
  skuManagement: skuManagementReducer,
  roleAccess: roleAccessReducer,
  userDetails: userDetailsReducer,
  customerKur: customerKurReducer,
  typeKur: typeKurReducer,
  area: areaReducer,
};

export default reducers;
