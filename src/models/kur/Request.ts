import { Customer } from 'models/kur/Customer';
import { Area } from 'models/Area';
import { Type } from 'models/kur/Type';
import { ListParams } from '../fetch';

export interface RequestKURParams extends ListParams {
  kur_user_type_id?: number;
  kur_user_id?: number;
  area_ids?: string;
  status?: string;
  submit_date_start?: number;
  submit_date_end?: number;
}

export interface RequestKURDisplayFilter {
  areas?: Area[];
  types?: Type | null;
}

export interface RequestKUR {
  id: number;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  created_by: ModifierUser;
  updated_by_id: number;
  updated_by_type: string;
  updated_by: ModifierUser;
  kur_request_number: string;
  kur_user_id: number;
  kur_user: Customer;
  status: string;
  amount: number;
  admin_fee: number;
  remarks: string;
  decision_date: number;
  decision_by_admin_id: number;
  decision_by_admin: null;
  kur_request_detail: KURRequestDetail[];
}

export interface ModifierUser {
  id: number;
  name: string;
  area?: {
    id: number;
    name: string;
  };
}

export interface KURRequestDetail {
  id: number;
  created_date: number;
  updated_date: number;
  created_by_id: number;
  created_by_type: string;
  created_by: null | ModifierUser;
  updated_by_id: number;
  updated_by_type: string;
  updated_by: null | ModifierUser;
  kur_request_id: number;
  amount: number;
  description: string;
  image_filepath: string;
}

export interface ActionParams {
  id: string | number;
  detailsPage: boolean;
  remarks?: string;
}
