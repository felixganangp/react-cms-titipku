import { ListParams } from '../fetch';

export interface MerchantParams extends ListParams {
  start_join_date?: string | number;
}
