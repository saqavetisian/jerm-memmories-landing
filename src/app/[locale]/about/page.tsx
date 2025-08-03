'use client';

import { motion } from 'framer-motion';
import { Heart, Target, Award, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.div className="flex justify-center mb-6" variants={itemVariants}>
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-blue-600" />
              </div>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              {t('subtitle')}
            </motion.p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('storyTitle')}</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('story1')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('story2')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 text-center">
                <Heart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('missionTitle')}</h3>
                <p className="text-gray-700">
                  {t('mission')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('valuesTitle')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('values.qualityTitle')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('values.quality')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('values.reliabilityTitle')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('values.reliability')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('values.careTitle')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('values.care')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('values.innovationTitle')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('values.innovation')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 