export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Role = 'admin' | 'customer' | null;

export interface User {
  name: string;
  role: Role;
}

export interface OrderItem extends CartItem {}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}
