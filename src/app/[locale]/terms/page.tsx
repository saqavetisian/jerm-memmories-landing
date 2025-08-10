'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from "next/link";

export default function TermsPage() {
  const t = useTranslations('terms');

  const sections = [
    'acceptance',
    'services',
    'userResponsibilities',
    'payment',
    'cancellation'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-3xl font-bold text-gray-900 mb-2"
              variants={itemVariants}
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              className="text-gray-600 mb-8"
              variants={itemVariants}
            >
              {t('lastUpdated')}
            </motion.p>

            <motion.div 
              className="space-y-8"
              variants={containerVariants}
            >
              {sections.map((section) => (
                <motion.div
                  key={section}
                  variants={itemVariants}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {t(`sections.${section}.title`)}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t(`sections.${section}.content`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="mt-12 pt-8 border-t border-gray-200"
              variants={itemVariants}
            >
              <p className="text-gray-600 text-sm">
                If you have any questions about these Terms of Use, please contact us at{' '}
                <Link href="mailto:legal@jermmemories.com" className="text-blue-600 hover:text-blue-700">
                  legal@jermmemories.com
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 