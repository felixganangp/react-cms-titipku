import { ListParams } from '../fetch';
import { ModifiedUser } from '../UserDetails';
import { ProductGrade } from './Grade';
import { ProductParent } from './ProductParent';
import { ProductType } from './Type';
import { Category } from './Category';

export interface Product {
  id: number;
  product_parent_id: number;
  product_parent: ProductParent;
  product_grade_id: number;
  product_grade: ProductGrade;
  product_type_id: number;
  product_type: ProductType;
  description: string;
  stock: number;
  low_stock_limit: number;
  is_exist: boolean;
  is_active: boolean;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  created_by: ModifiedUser;
  updated_by_id: null | number;
  updated_by_type: null | string;
  updated_by: null | ModifiedUser;
}

export interface ProductParams extends ListParams {
  product_grade_id?: number;
  product_type_id?: number;
  product_parent_category_id?: number;
  status?: string;
}

export interface Status {
  value: string;
  label: string;
}

export interface ProductDisplayFilter {
  search?: string;
  grade?: ProductGrade | null;
  category?: Category | null;
  status?: Status | null;
}
