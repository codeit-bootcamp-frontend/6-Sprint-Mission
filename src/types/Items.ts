export interface AddItemType {
  itemName: string;
  itemDescription: string;
  itemPrice: string;
  itemTag: string[];
}

export interface ItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: [string];
  ownerId: number;
  favoriteCount: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}

export interface Comment {
  id: string;
  content: string;
  writer: {
    image: string;
    nickname: string;
  };
  updatedAt: Date;
  createdAt: Date;
}
