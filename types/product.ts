export default interface Product {
  createdAt: string;
  favoriteCount: number;
  ownerId: number;
  images: string;
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
}

export interface ProductForm {
  images: string;
  tags: string[];
  price: string;
  description: string;
  name: string;
}
