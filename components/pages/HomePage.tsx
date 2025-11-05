
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import type { Product } from '../../types';

export const HomePage: React.FC = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="text-center bg-white p-12 rounded-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
          Modern Appliances for Modern Living
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Explore our curated collection of high-quality smart home and kitchen technology.
        </p>
        <div className="mt-8">
          <Link
            to="/products"
            className="inline-block bg-accent text-white font-semibold py-3 px-8 rounded-md hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};