export interface productType {
  createdAt: string;
  description: string;
  id: number;
  images: string[];
  name: string;
  favoriteCount: number;
  ownerId: number;
  price: number;
  tags: string[];
  updatedAt: string;
}

export interface inquiryType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: { id: number; image: string; nickname: string };
}
