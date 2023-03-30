export interface Service {
  id: string;
  sku: string;
  cat_id: string;
  title: string;
  images?: string[];
  variants?: Variant[]
}
export interface Category {
  id: string;
  sku: string;
  title: string;
}
export interface Variant {
  id: string;
  svc_id: string;
  type: string;
  title: string;
  price: number,
  order: number,
  images?: string[];
}