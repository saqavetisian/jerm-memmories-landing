'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Heart, Gift, Sparkles, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string; amount: string }>;
}) {
  const t = useTranslations();
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderData, setOrderData] = useState<{ orderId: string; amount: string } | null>(null);

  useEffect(() => {
    // Load search params
    searchParams.then((params) => {
      setOrderData(params);
    });
    
    // Trigger confetti animation
    setShowConfetti(true);
    
    // Clean up after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [searchParams]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const confettiVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 0
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Hearts */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`heart-${index}`}
            className="absolute text-pink-300 opacity-60"
            style={{
              left: `${10 + (index * 12)}%`,
              top: `${20 + (index * 8)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          >
            <Heart className="w-8 h-8" />
          </motion.div>
        ))}

        {/* Floating Gifts */}
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={`gift-${index}`}
            className="absolute text-blue-300 opacity-50"
            style={{
              left: `${15 + (index * 15)}%`,
              top: `${30 + (index * 10)}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4 + index * 0.3,
              repeat: Infinity,
              delay: index * 0.4,
            }}
          >
            <Gift className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, index) => (
            <motion.div
              key={`confetti-${index}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 5)]
              }}
              variants={confettiVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 2
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            <motion.div
              className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CheckCircle className="w-16 h-16 text-white" />
            </motion.div>
            
            {/* Sparkles around icon */}
            <motion.div
              className="absolute inset-0"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`sparkle-${index}`}
                  className="absolute w-3 h-3 text-yellow-400"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: '0 60px',
                    transform: `rotate(${index * 60}deg) translateY(-60px)`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Success Message */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t('success.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-6">
              {t('success.subtitle')}
            </p>
            <p className="text-lg text-gray-500">
              {t('success.description')}
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Gift className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                {t('success.orderDetails')}
              </h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>{t('success.orderNumber')}: <span className="font-mono font-semibold text-blue-600">#{orderData?.orderId || 'Loading...'}</span></p>
              <p>{t('success.deliveryDate')}: <span className="font-semibold">{new Date().toLocaleDateString()}</span></p>
              <p>{t('success.totalAmount')}: <span className="font-semibold text-green-600">{orderData?.amount ? `${orderData.amount} AMD` : 'Loading...'}</span></p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/bouquets">
              <motion.button
                className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{t('success.continueShopping')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            
            <Link href="/">
              <motion.button
                className="group flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span>{t('success.backToHome')}</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {t('success.whatsNext')}
              </h4>
              <div className="space-y-2 text-gray-600">
                <p>• {t('success.confirmationEmail')}</p>
                <p>• {t('success.deliveryTracking')}</p>
                <p>• {t('success.specialSurprise')}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}