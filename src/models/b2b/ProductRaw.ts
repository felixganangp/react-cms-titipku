import { ListParams } from '../fetch';
import { ModifiedUser } from '../UserDetails';
import { Category } from './Category';
import { ProductParent, CreateProduct } from './ProductParent';
import { Page } from '../../stories/Page';

export interface ProductRaw {
  id: number;
  product_parent_id: number;
  product_parent: ProductParent;
  description: string;
  stock: number;
  is_exist: boolean;
  is_active: boolean;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  created_by: ModifiedUser;
  updated_by_id: number;
  updated_by_type: string;
  updated_by: ModifiedUser;
}

export interface RawParams extends ListParams {
  product_parent_category_id?: number;
}

export interface RawDisplayFilter {
  search?: string;
  category?: Category | null;
}

export interface InitialCreateRaw {
  file: string | File | Blob;
  name: string;
  category: Category | null;
  stock: string;
  description: string;
}

export interface CreateRawSaga {
  description: string;
  stock: number;
  name: string;
  category_id: number;
  image: string | Blob;
}

export interface CreateRawService {
  description: string;
  stock: number;
  is_active: boolean;
  product_parent_id?: number | null;
  product_parent: CreateProduct;
}
