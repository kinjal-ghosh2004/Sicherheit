import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import type { CartItem } from '../../types';
import { Button } from '../ui/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { MinusIcon } from '../icons/MinusIcon';
import { TrashIcon } from '../icons/TrashIcon';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { dispatch } = useCart();
    const handleQuantityChange = (newQuantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: newQuantity } });
    };
    const handleRemove = () => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
    };

    return (
        <div className="flex items-center py-4 border-b">
            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
            <div className="flex-grow">
                <Link to={`/product/${item.id}`} className="font-semibold hover:underline">{item.name}</Link>
                <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={() => handleQuantityChange(item.quantity - 1)} className="p-1 rounded-full hover:bg-gray-200 transition"><MinusIcon /></button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.quantity + 1)} className="p-1 rounded-full hover:bg-gray-200 transition"><PlusIcon /></button>
            </div>
            <div className="w-24 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button onClick={handleRemove} className="ml-4 text-gray-500 hover:text-red-500 transition"><TrashIcon /></button>
        </div>
    );
}

export const CartPage: React.FC = () => {
  const { state } = useCart();
  const { items } = state;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/products"
          className="inline-block bg-accent text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div>
        {items.map(item => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-8 flex flex-col items-end">
        <div className="w-full max-w-sm space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t pt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="block w-full">
            <Button className="w-full mt-4">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
