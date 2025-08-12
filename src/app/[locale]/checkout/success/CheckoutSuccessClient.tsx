'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Home, ShoppingBag, Package, Clock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface CheckoutSuccessClientProps {
  orderId?: string;
  amount?: string;
}

export default function CheckoutSuccessClient({ orderId, amount }: CheckoutSuccessClientProps) {
  const t = useTranslations('checkoutSuccess');
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
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
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
          {/* Success Header */}
          <motion.div
            className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center relative overflow-hidden"
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
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="relative z-10"
              variants={iconVariants}
            >
              <motion.div
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                variants={pulseVariants}
                animate="pulse"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold text-white mb-2"
              variants={itemVariants}
            >
              {t('title')}
            </motion.h1>
            
            <motion.p
              className="text-green-100 text-lg"
              variants={itemVariants}
            >
              {t('subtitle')}
            </motion.p>
          </motion.div>

          {/* Content */}
          <div className="p-8">
            {/* Order Details */}
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Package className="w-6 h-6 mr-3 text-blue-600" />
                {t('orderDetails')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orderId && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">{t('orderId')}</p>
                    <p className="text-lg font-semibold text-gray-800">#{orderId}</p>
                  </div>
                )}
                
                {amount && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">{t('totalAmount')}</p>
                    <p className="text-lg font-semibold text-green-600">֏{amount}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-3 text-orange-500" />
                {t('nextSteps')}
              </h3>
              
              <div className="space-y-3">
                {[
                  { icon: Package, text: t('step1'), color: 'text-blue-600' },
                  { icon: Mail, text: t('step2'), color: 'text-green-600' },
                  { icon: Clock, text: t('step3'), color: 'text-purple-600' }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm`}>
                      <step.icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                    <span className="text-gray-700">{step.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="space-y-4"
              variants={itemVariants}
            >
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
              <p className="text-gray-600 text-sm">
                {t('supportMessage')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 