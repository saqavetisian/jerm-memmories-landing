'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, Star } from 'lucide-react';
import { useBasket } from '@/contexts/BasketContext';
import { removeFromFavorites, addToBasket, FavoriteItem } from '@/utils/localStorage';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function FavoritesClient() {
  const router = useRouter();
  const { favorites, refreshBasket, refreshFavorites } = useBasket();
  const t = useTranslations();

  const handleAddToBasket = (item: FavoriteItem) => {
    addToBasket(item);
    refreshBasket();
  };

  const handleRemoveFavorite = (itemId: number) => {
    removeFromFavorites(itemId);
    refreshFavorites();
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('favorites.empty')}</h2>
        <p className="text-gray-600 mb-8">{t('favorites.emptySubtitle')}</p>
        <Link 
          href="/bouquets"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('favorites.browseMore')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {favorites.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
                
                {/* Action Buttons */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  {/* Remove from Favorites */}
                  <button
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="p-2 rounded-full bg-white/90 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  {/* Add to Basket */}
                  <button
                    onClick={() => handleAddToBasket(item)}
                    className="p-2 rounded-full bg-white/90 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>

                {/* Price Badge */}
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  ֏{item.price.toLocaleString()}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.category.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {item.category.name}
                  </span>
                  <button 
                    onClick={() => handleAddToBasket(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t('favorites.addToBasket')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Summary */}
      <div className="mt-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
          <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {favorites.length} {favorites.length === 1 ? 'Favorite' : 'Favorites'} Saved
          </h3>
          <p className="text-gray-600 mb-6">
            Keep track of your favorite bouquets and add them to your basket whenever you're ready to order.
          </p>
          <Link 
            href="/bouquets"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('favorites.browseMore')}
          </Link>
        </div>
      </div>
    </div>
  );
} 