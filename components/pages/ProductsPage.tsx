import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import type { Product } from '../../types';

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';
  
  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], []);

  const filteredProducts = useMemo(() => {
    let tempProducts = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      tempProducts = tempProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery)
      );
    }
    
    return tempProducts;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold">All Products</h1>
        <p className="text-gray-600 mt-2">
          {searchQuery ? `Showing results for "${searchParams.get('q')}"` : "Find the perfect item from our collection."}
        </p>
      </header>

      <div className="flex justify-center flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-accent text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))
        ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">No Products Found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            </div>
        )}
      </div>
    </div>
  );
};
