import { ListParams } from 'models/fetch';
import { Supplier } from './Supplier';

export interface Inbound {
  id?: number;
  supplier_id: string;
  supplier: Supplier;
  code: string;
  date: number;
  description: number;
  created_at: number;
  updated_at: number;
  total_sku: number;
  grand_total: number;
}

export interface InboundDetail extends Inbound {
  supplier: Supplier;
  purchase_detail: PurchaseDetail[] | any;
}

export interface PurchaseDetail {
  product_image?: string;
  product_name: string;
  supplier_price: number;
  quantity: number;
}

export interface InboundParams extends ListParams {
  search?: string | undefined | null;
  defaultSearch?: string;
}

export interface InboundProduct {
  id: number;
  supplier_price: number;
  quantity: number;
  name: string;
  image: string;
  uom: string;
}

export interface InboundProductRequest {
  id: number;
  supplier_price: number;
  quantity: number;
}

export interface CreateInbound {
  supplier_id: number;
  code: string;
  date: number;
  description: string;
  products: InboundProductRequest[];
}

export interface CreateInboundParams {
  // supplier: Supplier;
  supplier: number | null;
  code: string;
  date: string | null;
  description: string;
  products: InboundProduct[];
}

export interface CheckValidResponse {
  timestamp: number;
  status: string;
  message: string;
  data: boolean;
}
