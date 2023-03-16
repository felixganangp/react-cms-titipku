export interface Inventory {
  id: number;
  product_name: string;
  grade: string | null;
  image_path: string;
  low_stock_limit: number;
  category: {
    id: number;
    category_name: string;
  };
  weight: number;
  status: boolean;
}
