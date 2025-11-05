import type { Order } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'ST-12345',
    date: '2023-10-26',
    customerName: 'Jane Smith',
    items: [
      {
        id: 1,
        name: "Aviator Leather Jacket",
        price: 299.99,
        quantity: 1,
        description: "", category: "Jackets", rating: 4.8, imageUrl: "https://picsum.photos/seed/jacket/800/800"
      },
      {
        id: 5,
        name: "Merino Wool Scarf",
        price: 49.99,
        quantity: 2,
        description: "", category: "Accessories", rating: 4.7, imageUrl: "https://picsum.photos/seed/scarf/800/800"
      },
    ],
    total: 399.97,
    status: 'Delivered',
  },
  {
    id: 'ST-12346',
    date: '2023-10-25',
    customerName: 'John Doe',
    items: [
      {
        id: 2,
        name: "Venture Canvas Sneakers",
        price: 129.99,
        quantity: 1,
        description: "", category: "Footwear", rating: 4.5, imageUrl: "https://picsum.photos/seed/sneakers/800/800"
      },
    ],
    total: 129.99,
    status: 'Shipped',
  },
  {
    id: 'ST-12347',
    date: '2023-10-25',
    customerName: 'Emily White',
    items: [
      {
        id: 6,
        name: "Nomad Tech Backpack",
        price: 110.00,
        quantity: 1,
        description: "", category: "Bags", rating: 4.8, imageUrl: "https://picsum.photos/seed/backpack/800/800"
      },
    ],
    total: 110.00,
    status: 'Processing',
  },
    {
    id: 'ST-12348',
    date: '2023-10-24',
    customerName: 'Michael Brown',
    items: [
      {
        id: 4,
        name: "Heritage Slim Fit Jeans",
        price: 89.99,
        quantity: 1,
        description: "", category: "Trousers", rating: 4.6, imageUrl: "https://picsum.photos/seed/jeans/800/800"
      },
       {
        id: 7,
        name: "Breezy Linen Shirt",
        price: 75.00,
        quantity: 1,
        description: "", category: "Shirts", rating: 4.4, imageUrl: "https://picsum.photos/seed/shirt/800/800"
      }
    ],
    total: 164.99,
    status: 'Delivered',
  },
  {
    id: 'ST-12349',
    date: '2023-10-22',
    customerName: 'Jessica Green',
    items: [
      {
        id: 3,
        name: "Classic Chronograph Watch",
        price: 199.50,
        quantity: 1,
        description: "", category: "Accessories", rating: 4.9, imageUrl: "https://picsum.photos/seed/watch/800/800"
      },
    ],
    total: 199.50,
    status: 'Delivered',
  },
];
