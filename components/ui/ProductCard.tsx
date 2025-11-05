
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigating to product page
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
    
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col h-full">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-sm text-gray-500">{product.category}</p>
          <h3 className="text-lg font-semibold mt-1 flex-grow">
            {product.name}
          </h3>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <Button size="sm" onClick={handleAddToCart}>Add</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
