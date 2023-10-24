import uiReducer from './slice/ui';
import roleUserReducer from './slice/RoleUser';
import roleAccessReducer from './slice/RoleAccess';
import skuManagementReducer from './slice/SkuManagement';
import userDetailsReducer from './slice/UserDetails';
import customerKurReducer from './slice/kur/Customer';
import typeKurReducer from './slice/kur/Type';
import areaReducer from './slice/Area';
import requestKURReducer from './slice/kur/Request';
import paymentKURReducer from './slice/kur/Payment';
import merchantReducer from './slice/Merchant';
import creditScoreKurReducer from './slice/kur/CreditScore';
import invoiceReducer from './slice/kur/Invoice';
import productsReducer from './slice/b2b/Product';
import rawsReducer from './slice/b2b/ProductRaw';
import inboundReducer from './slice/b2b/Inbound';
import supplierReducer from './slice/b2b/Supplier';
import financingCustomerReducer from './slice/financing/Customer';

const reducers = {
  ui: uiReducer,
  roleUser: roleUserReducer,
  skuManagement: skuManagementReducer,
  roleAccess: roleAccessReducer,
  userDetails: userDetailsReducer,
  customerKur: customerKurReducer,
  customerFinancing: financingCustomerReducer,
  typeKur: typeKurReducer,
  area: areaReducer,
  request: requestKURReducer,
  payment: paymentKURReducer,
  merchant: merchantReducer,
  creditScore: creditScoreKurReducer,
  invoice: invoiceReducer,
  product: productsReducer,
  raw: rawsReducer,
  inbound: inboundReducer,
  supplier: supplierReducer,
};

export default reducers;
