'use client';

import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Info, 
  Gift, 
  Download,
  ShoppingBag,
  Star,
  X,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useBasket } from '@/contexts/BasketContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const locale = useLocale();
  const t = useTranslations('header');
  const { basketItemCount, favorites } = useBasket();

  const locales = [
    { code: 'hy', name: 'Հայերեն', flag: '🇦🇲' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Рուսский', flag: '🇷🇺' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  // Don't render on server side
  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#00000087] z-[9998]"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[9999]"
          >
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-blue-700">Jerm</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Navigation Links */}
                <div className="p-4 space-y-2">
                  <Link 
                    href={`/${locale}#about`}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Info className="w-5 h-5" />
                    <span className="font-medium">{t('about')}</span>
                  </Link>
                  
                  <Link 
                    href={`/${locale}/bouquets`}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Gift className="w-5 h-5" />
                    <span className="font-medium">{t('bouquets')}</span>
                  </Link>
                  
                  <Link 
                    href={`/${locale}/services`}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">{t('services')}</span>
                  </Link>
                  
                  <Link 
                    href={`/${locale}#download`}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span className="font-medium">{t('download')}</span>
                  </Link>
                </div>

                {/* Quick Actions */}
                <div className="border-t border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Link 
                      href={`/${locale}/favorites`}
                      onClick={onClose}
                      className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <Star className="w-5 h-5" />
                      <span className="font-medium">Favorites</span>
                      {favorites.length > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {favorites.length}
                        </span>
                      )}
                    </Link>
                    
                    <Link 
                      href={`/${locale}/basket`}
                      onClick={onClose}
                      className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span className="font-medium">Basket</span>
                      {basketItemCount > 0 && (
                        <span className="ml-auto bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {basketItemCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>

                {/* Language Selector */}
                <div className="border-t border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Language
                  </h3>
                  <select 
                    value={locale} 
                    onChange={(e) => {
                      const newLocale = e.target.value;
                      window.location.href = `/${newLocale}`;
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {locales.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.flag} {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
