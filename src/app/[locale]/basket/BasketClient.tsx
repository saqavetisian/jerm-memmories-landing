'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useBasket } from '@/contexts/BasketContext';
import { updateBasketItemQuantity, removeFromBasket } from '@/utils/localStorage';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function BasketClient() {
  const router = useRouter();
  const { basket, basketTotal, refreshBasket } = useBasket();
  const [updatingItem, setUpdatingItem] = useState<number | null>(null);
  const t = useTranslations();

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setUpdatingItem(itemId);
    updateBasketItemQuantity(itemId, newQuantity);
    refreshBasket();
    setTimeout(() => setUpdatingItem(null), 500);
  };

  const handleRemoveItem = (itemId: number) => {
    removeFromBasket(itemId);
    refreshBasket();
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (basket.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('basket.empty')}</h2>
        <p className="text-gray-600 mb-8">{t('basket.emptySubtitle')}</p>
        <Link 
          href="/bouquets"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('basket.continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Basket Items */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('basket.items')}</h2>
        <div className="space-y-4">
          <AnimatePresence>
            {basket.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.category.name}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={updatingItem === item.id}
                          className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 text-gray-900 font-medium min-w-[40px] text-center">
                          {updatingItem === item.id ? '...' : item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={updatingItem === item.id}
                          className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-lg font-semibold text-blue-600">
                        ֏{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('basket.orderSummary')}</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>{t('basket.subtotal')}</span>
              <span>֏{basketTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{t('basket.delivery')}</span>
              <span className="text-green-600 font-medium">{t('basket.free')}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>{t('basket.total')}</span>
                <span>֏{basketTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {t('basket.proceedToCheckout')}
          </button>
        </div>
      </div>
    </div>
  );
} 