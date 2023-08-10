export interface UomTypes {
  id: number;
  name: string;
  created_at: number;
  updated_at: Date;
  deleted_at: Date;
  total_product: number;
  product_count: number;
}

export interface CreateUomTypes {
  name: string;
}
