'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowLeft, Star, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useBasket } from '@/contexts/BasketContext';
import { addToBasket, toggleFavorite, isFavorite, isInBasket } from '@/utils/localStorage';
import Link from 'next/link';
import Image from 'next/image';

interface Bouquet {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  delivery_date?: string;
  category: { name: string };
  slug: string;
}

interface BouquetDetailClientProps {
  bouquet: Bouquet;
}

export default function BouquetDetailClient({ bouquet }: BouquetDetailClientProps) {
  const t = useTranslations();
  const { refreshBasket, refreshFavorites } = useBasket();
  const [quantity, setQuantity] = useState(1);

  const handleAddToBasket = () => {
    addToBasket(bouquet);
    refreshBasket();
  };

  const handleToggleFavorite = () => {
    toggleFavorite(bouquet);
    refreshFavorites();
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const isInBasketStatus = isInBasket(bouquet.id);
  const isFavoriteStatus = isFavorite(bouquet.id);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/bouquets"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('bouquets.backToBouquets')}
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={bouquet.image_url}
                alt={bouquet.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Action Buttons Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-3">
                {/* Favorite Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleToggleFavorite}
                  className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                    isFavoriteStatus
                      ? 'bg-red-500 text-white shadow-red-500/50' 
                      : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white hover:shadow-red-500/50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavoriteStatus ? 'fill-current' : ''}`} />
                </motion.button>
                
                {/* Add to Basket Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToBasket}
                  className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                    isInBasketStatus
                      ? 'bg-blue-500 text-white shadow-blue-500/50' 
                      : 'bg-white/90 text-gray-600 hover:bg-blue-500 hover:text-white hover:shadow-blue-500/50'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-full shadow-lg">
                <span className="text-xl font-bold">֏{bouquet.price.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              {bouquet.name}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {bouquet.category?.name}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-900">{t('bouquets.description')}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">{bouquet.description}</p>
          </motion.div>

          {/* Delivery Date */}
          {bouquet.delivery_date && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-900">{t('bouquets.deliveryDate')}</h4>
                  <p className="text-blue-700">{new Date(bouquet.delivery_date).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quantity and Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-6"
          >
            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-lg font-semibold text-gray-900">{t('bouquets.quantity')}</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-lg font-semibold text-gray-900 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  ֏{(bouquet.price * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToBasket}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isInBasketStatus
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {isInBasketStatus ? t('bouquets.inBasket') : t('bouquets.addToBasket')}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleToggleFavorite}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isFavoriteStatus
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                    : 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white shadow-lg'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavoriteStatus ? 'fill-current' : ''}`} />
                {isFavoriteStatus ? t('bouquets.inFavorites') : t('bouquets.addToFavorites')}
              </motion.button>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gray-50 rounded-xl p-6 space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-900">Why Choose This Bouquet?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Fresh flowers from local growers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Handcrafted with care</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Perfect for any occasion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Free delivery in Yerevan</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 