'use client';

import { motion } from 'framer-motion';
import { XCircle, RefreshCw, Home, HelpCircle, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function CheckoutFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string; orderId?: string }>;
}) {
  const t = useTranslations();
  const [isRetrying, setIsRetrying] = useState(false);
  const [errorData, setErrorData] = useState<{ error: string; orderId?: string } | null>(null);

  useEffect(() => {
    // Load search params
    searchParams.then((params) => {
      setErrorData(params);
    });
  }, [searchParams]);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate retry process
    setTimeout(() => {
      setIsRetrying(false);
      // In real app, this would retry the failed operation
    }, 2000);
  };

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

  const pulseVariants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle background patterns */}
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={`pattern-${index}`}
            className="absolute w-32 h-32 border border-red-200/30 rounded-full"
            style={{
              left: `${5 + (index * 8)}%`,
              top: `${10 + (index * 7)}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + index * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-center"
        >
          {/* Error Icon */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            <motion.div
              className="w-32 h-32 mx-auto bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
              variants={pulseVariants}
              initial="hidden"
              animate="visible"
            >
              <XCircle className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t('failure.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-6">
              {t('failure.subtitle')}
            </p>
            <p className="text-lg text-gray-500">
              {t('failure.description')}
            </p>
          </motion.div>

          {/* Error Details */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/20"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <HelpCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                {t('failure.errorDetails')}
              </h3>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>{t('failure.errorCode')}: <span className="font-mono font-semibold text-red-600">{errorData?.orderId ? `#${errorData.orderId}` : 'N/A'}</span></p>
              <p>{t('failure.timestamp')}: <span className="font-semibold">{new Date().toLocaleString()}</span></p>
              <p>{t('failure.possibleCause')}: <span className="font-semibold">{errorData?.error || t('failure.paymentIssue')}</span></p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <motion.button
              onClick={handleRetry}
              disabled={isRetrying}
              className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isRetrying ? 1 : 1.05, y: isRetrying ? 0 : -2 }}
              whileTap={{ scale: isRetrying ? 1 : 0.95 }}
            >
              <motion.div
                animate={isRetrying ? { rotate: 360 } : {}}
                transition={isRetrying ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
              <span>{isRetrying ? t('failure.retrying') : t('failure.tryAgain')}</span>
            </motion.button>
            
            <Link href="/">
              <motion.button
                className="group flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span>{t('failure.backToHome')}</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Help Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {t('failure.needHelp')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.a
                href="mailto:support@jermmemories.com"
                className="flex items-center justify-center space-x-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 font-medium">{t('failure.emailSupport')}</span>
              </motion.a>
              
              <motion.a
                href="tel:+37412345678"
                className="flex items-center justify-center space-x-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">{t('failure.phoneSupport')}</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h5 className="font-semibold text-yellow-800 mb-2">
                {t('failure.troubleshooting')}
              </h5>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• {t('failure.checkConnection')}</p>
                <p>• {t('failure.verifyPayment')}</p>
                <p>• {t('failure.clearCache')}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}