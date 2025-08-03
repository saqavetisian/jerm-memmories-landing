'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Mail, HelpCircle } from 'lucide-react';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');

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

  return (
    <motion.footer 
      className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div 
            className="col-span-2"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <Heart className="w-5 h-5 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-blue-400">{t('appName')}</h3>
            </div>
            <p className="text-gray-300 mb-4">
              {t('slogan')}
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>{t('contact')}</span>
            </h4>
            <p className="text-gray-300">info@Jerm memories.com</p>
            <p className="text-gray-300">support@Jerm memories.com</p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <span>{t('support')}</span>
            </h4>
            <div className="space-y-2">
              <Link href={`/${locale}/about`} className="block text-gray-300 hover:text-white transition-colors">
                {t('about')}
              </Link>
              <Link href={`/${locale}/faq`} className="block text-gray-300 hover:text-white transition-colors">
                {t('faq')}
              </Link>
              <Link href={`/${locale}/contact`} className="block text-gray-300 hover:text-white transition-colors">
                {t('contactLink')}
              </Link>
              <Link href={`/${locale}/terms`} className="block text-gray-300 hover:text-white transition-colors">
                {t('terms')}
              </Link>
              <Link href={`/${locale}/privacy`} className="block text-gray-300 hover:text-white transition-colors">
                {t('privacy')}
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-300">
            {t('copyright')}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
} 