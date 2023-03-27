import { ModifiedUser } from '../UserDetails';
import { Category } from './Category';

export interface ProductParent {
  id: number;
  name: string;
  product_parent_category: null | Category[];
  image_filepath: string;
  is_exist: boolean;
  is_active: boolean;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  created_by: null | ModifiedUser;
  updated_by_id: null | number;
  updated_by_type: null | string;
  updated_by: null | ModifiedUser;
}

export interface CreateProduct {
  name: string;
  image_filepath: string;
  product_parent_category_id: number[];
}
