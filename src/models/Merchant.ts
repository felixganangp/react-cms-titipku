import { AreaForKur, Area } from 'models/Area';
import { ListParams } from 'models/fetch';

export interface Merchant {
  id?: number;
  name: string;
  area: AreaForKur;
}

export interface MerchantResp {
  id?: number;
  merchant_name: string;
  area: Area;
  created_at: number;
  updated_at: number;
  merchant_description: string;
  is_exist: boolean;
  is_owner: boolean;
  area_id: number;
}

export interface MerchantParams extends ListParams {
  area_id?: number;
}
