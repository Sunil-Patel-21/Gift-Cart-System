export interface Cart {
  _id?: string;
  user: string;
  items: CartItem[];
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  gift: any;
  quantity: number;
  price: number;
}
