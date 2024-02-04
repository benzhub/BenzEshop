export interface ProductInfo {
  id: number;
  title: string;
  slug: string;
  unit_price: number;
  discount: number;
  inventory: number;
  thumb: string;
  description: string
  is_deleted: boolean;
}

export type ProductInfoSerialized = Omit<ProductInfo, 'unit_price' | 'is_deleted'> & {
  unitPrice: number;
  isDeleted: boolean;
};

export type ProductEditStatusProps = {
  productId: number;
  status: boolean;
};