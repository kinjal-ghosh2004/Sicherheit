
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { getAIProductInsights } from '../../services/geminiService';
import type { Product } from '../../types';
import { StarIcon } from '../icons/StarIcon';
import { SparklesIcon } from '../icons/SparklesIcon';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { NotFoundPage } from './NotFoundPage';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [aiTips, setAiTips] = useState<string>('');
  const [isLoadingTips, setIsLoadingTips] = useState(false);
  const [error, setError] = useState<string>('');

  const { dispatch } = useCart();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(productId));
    setProduct(foundProduct || null);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const handleGetAIInsights = async () => {
    if (!product) return;
    setIsLoadingTips(true);
    setError('');
    setAiTips('');
    try {
      const tips = await getAIProductInsights(product.name);
      setAiTips(tips);
    } catch (err) {
      setError('Failed to fetch AI insights. Please try again.');
    } finally {
      setIsLoadingTips(false);
    }
  };

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg aspect-square"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.category}</p>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
                {[...Array(Math.round(product.rating))].map((_, i) => <StarIcon key={i} />)}
                {[...Array(5 - Math.round(product.rating))].map((_, i) => <StarIcon key={i+5} className="text-gray-300" />)}
            </div>
            <span className="ml-2 text-gray-600">{product.rating} / 5</span>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>
          <p className="text-4xl font-extrabold text-primary">${product.price.toFixed(2)}</p>
          <Button onClick={handleAddToCart}>
            Add to Cart
          </Button>

          <div className="pt-4 border-t">
             <Button onClick={handleGetAIInsights} variant="secondary" disabled={isLoadingTips}>
                <SparklesIcon />
                {isLoadingTips ? 'Analyzing...' : 'AI Product Helper'}
            </Button>
            {isLoadingTips && <div className="flex justify-center mt-4"><Spinner /></div>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {aiTips && (
              <div className="mt-4 p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-2">✨ AI Insights ✨</h3>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {aiTips.split('\n').map((tip, index) => tip.trim() && <p key={index} className="mb-2">{`• ${tip}`}</p>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
