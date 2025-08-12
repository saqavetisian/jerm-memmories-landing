'use client';

import { motion } from 'framer-motion';
import { XCircle, Home, RefreshCw, ShoppingBag, AlertTriangle, Phone } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface CheckoutFailedClientProps {
  error?: string;
  orderId?: string;
}

export default function CheckoutFailedClient({ error, orderId }: CheckoutFailedClientProps) {
  const t = useTranslations('checkoutFailed');
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: 180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          variants={itemVariants}
        >
          {/* Failed Header */}
          <motion.div
            className="bg-gradient-to-r from-red-500 to-pink-600 p-8 text-center relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Animated Background Elements */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-10"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" as const
              }}
            />
            
            <motion.div
              className="relative z-10"
              variants={iconVariants}
            >
              <motion.div
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                variants={shakeVariants}
                animate="shake"
              >
                <XCircle className="w-12 h-12 text-red-500" />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold text-white mb-2"
              variants={itemVariants}
            >
              {t('title')}
            </motion.h1>
            
            <motion.p
              className="text-red-100 text-lg"
              variants={itemVariants}
            >
              {t('subtitle')}
            </motion.p>
          </motion.div>

          {/* Content */}
          <div className="p-8">
            {/* Error Details */}
            <motion.div
              className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 mb-8"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                {t('errorDetails')}
              </h2>
              
              <div className="space-y-4">
                {orderId && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">{t('orderId')}</p>
                    <p className="text-lg font-semibold text-gray-800">#{orderId}</p>
                  </div>
                )}
                
                {error && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
                    <p className="text-sm text-gray-600 mb-1">{t('errorMessage')}</p>
                    <p className="text-lg font-semibold text-red-600">{error}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Possible Reasons */}
            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-3 text-orange-500" />
                {t('possibleReasons')}
              </h3>
              
              <div className="space-y-3">
                {[
                  { text: t('reason1'), color: 'text-red-600' },
                  { text: t('reason2'), color: 'text-orange-600' },
                  { text: t('reason3'), color: 'text-yellow-600' }
                ].map((reason, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-gray-700">{reason.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="space-y-4"
              variants={itemVariants}
            >
              <Link href="/checkout">
                <motion.button
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>{t('tryAgain')}</span>
                </motion.button>
              </Link>
              
              <Link href="/">
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home className="w-5 h-5" />
                  <span>{t('goHome')}</span>
                </motion.button>
              </Link>
              
              <Link href="/bouquets">
                <motion.button
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{t('continueShopping')}</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Support Message */}
            <motion.div
              className="mt-8 text-center"
              variants={itemVariants}
            >
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  {t('needHelp')}
                </h4>
                <p className="text-blue-700 text-sm">
                  {t('supportMessage')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 