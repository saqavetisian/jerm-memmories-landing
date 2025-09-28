'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Info, 
  Gift, 
  Download,
  ShoppingBag,
  Star,
  Menu,
  Sparkles
} from 'lucide-react';
import { useBasket } from '@/contexts/BasketContext';
import { useState, useEffect } from 'react';
import MobileDrawer from './MobileDrawer';

interface HeaderProps {
  showNav?: boolean;
}

export default function Header({ showNav = true }: HeaderProps) {
  const locale = useLocale();
  const t = useTranslations('header');
  const { basketItemCount, favorites } = useBasket();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const locales = [
    { code: 'hy', name: 'Հայերեն', flag: '🇦🇲' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Рուսский', flag: '🇷🇺' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  return (
     <motion.nav 
       className="bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow"
       initial={{ y: -100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.6, ease: "easeOut" }}
     >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
            >
              <Heart className="w-5 h-5 text-white" />
            </motion.div>
             <Link href={`/${locale}`} className="text-xl sm:text-2xl font-bold text-blue-700">
               <span className="hidden sm:inline">{t('appName')}</span>
               <span className="sm:hidden">Jerm</span>
             </Link>
          </motion.div>
          
          {showNav && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href={`/${locale}#about`}>
                  <motion.span
                      className="text-gray-700 hover:text-blue-700 transition-colors flex items-center space-x-1"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                  >
                    <Info className="w-4 h-4" />
                    <span>{t('about')}</span>
                  </motion.span>
                </Link>
                <Link href={`/${locale}/bouquets`}>
                  <motion.span
                      className="text-gray-700 hover:text-blue-700 transition-colors flex items-center space-x-1"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                  >
                    <Gift className="w-4 h-4" />
                    <span>{t('bouquets')}</span>
                  </motion.span>
                </Link>
                <Link href={`/${locale}/services`}>
                  <motion.span
                      className="text-gray-700 hover:text-blue-700 transition-colors flex items-center space-x-1"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t('services')}</span>
                  </motion.span>
                </Link>
                <Link href={`/${locale}#download`}>
                  <motion.span
                      className="text-gray-700 hover:text-blue-700 transition-colors flex items-center space-x-1"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('download')}</span>
                  </motion.span>
                </Link>
              </div>

               {/* Mobile Menu Button */}
               <button
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                 className="md:hidden p-2 text-gray-700 hover:text-blue-700 transition-colors"
                 aria-label="Toggle mobile menu"
               >
                 <motion.div
                   animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                   transition={{ duration: 0.2 }}
                 >
                   <Menu className="w-6 h-6" />
                 </motion.div>
               </button>
            </>
          )}

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Favorites Icon */}
            <Link href={`/${locale}/favorites`}>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-blue-700 transition-colors" />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Basket Icon */}
            <Link href={`/${locale}/basket`}>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-blue-700 transition-colors" />
                {basketItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {basketItemCount}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Language Selector */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <select 
                value={locale} 
                onChange={(e) => {
                  const newLocale = e.target.value;
                  window.location.href = `/${newLocale}`;
                }}
                className="bg-white border border-blue-300 rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-6 sm:pr-8"
              >
                {locales.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

       {/* Mobile Menu Drawer */}
       <MobileDrawer 
         isOpen={isMobileMenuOpen} 
         onClose={() => setIsMobileMenuOpen(false)} 
       />
    </motion.nav>
  );
} 