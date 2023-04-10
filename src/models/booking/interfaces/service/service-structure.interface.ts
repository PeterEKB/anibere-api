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
  order: number;
  altVal?: AltVal;
  options?: Options[];
  images?: string[];
}
export interface Options {
  id: string;
  var_id: string;
  title: string;
  price: number,
  order: number,
  images?: string[];
}
export interface AltVal {
  true: string;
  false: string
}