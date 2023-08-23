import { ListParams } from 'models/fetch';
import { ModifiedUser } from 'models/UserDetails';
import { ProductGrade } from 'models/b2b/Grade';
import { ProductParent } from 'models/b2b/ProductParent';
import { ProductType } from 'models/b2b/Type';
import { Category } from 'models/b2b/Category';

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  product_category_id: number;
  product_category: string;
  unit_measurement_id: number;
  unit_measurement: string;
  average_price: number;
  selling_price: number;
  stock: number;
  low_stock_limit: number;
  is_exist: boolean;
  is_active: boolean;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  updated_by_id: number;
  updated_by_type: string;
}

export interface ProductParams extends ListParams {
  product_grade_id?: number;
  product_type_id?: number;
  product_category_id?: number;
  status?: string;
  product_parent_id?: number;
  pricemin?: number;
  pricemax?: number;
}

export interface LogParams extends ListParams {
  product_id?: number | string;
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
  type?: ProductType | null;
  pricemin?: number;
  pricemax?: number;
}

// export interface CreateProduct extends FormData {
//   append(
//     image: '',
//     name: '',
//     category: [],
//     selling_price: '',
//     low_stock_limit: '',
//     stock: '',
//     description: '',
//     unit_measurement_id: null,
//   ): void;
// }

export interface FormInventoryTypes2 {
  idParent?: number;
  image: string | Blob;
  name: string;
  category: { id: number; name: string }[];
  type: null | ProductType;
  productList: {
    id?: number;
    grade: { id: number; name: string } | ProductGrade;
    description: string;
    stock: string | number;
    lowStock: string | number;
    is_exist: boolean;
    is_active: boolean;
  }[];
  typeEdit?: 'normal' | 'details';
  price: string | number;
}

export interface FormInventoryTypes {
  image: string | Blob;
  name: string;
  category: number | null;
  unit_measurement_id: number | null;
  selling_price: string | number;
  description: string;
  stock: string | number;
  low_stock_limit: string | number;
}

export interface ChangeStatusParams {
  existingStatus: IsActiveType[];
  newStatus: IsActiveType;
}

export interface IsActiveType {
  is_active: boolean;
  ids: (number | string)[];
}

export interface Log {
  id: number;
  product_id: number;
  changes: ChangesLog;
  created_at: number;
  updated_at: number;
  created_by_id: number;
  created_by_type: string;
  editor: ModifiedUser;
  updated_by_id: number | null;
  updated_by_type: string | null;
  updated_by: ModifiedUser | null;
}

export interface ChangesLog {
  action_type: string;
  columns: ColumnLog[];
  unit_measurement?: string;
  is_new_product?: boolean;
  process_product?: string;
}

export interface ColumnLog {
  name: string;
  old_value: number;
  new_value: number;
}
