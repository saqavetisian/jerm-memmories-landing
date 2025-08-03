'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Smartphone, Apple } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ScheduleButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  return (
    <>
      <button
        className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors mt-2"
        onClick={() => setOpen(true)}
      >
        {t('schedule.cta')}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000087]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setOpen(false)}
                aria-label={t('schedule.close')}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-2 text-center">{t('schedule.title')}</h2>
              <p className="text-gray-600 mb-6 text-center">{t('schedule.description')}</p>
              <div className="flex flex-col gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.Jerm memories.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                >
                  <Smartphone className="w-6 h-6" />
                  {t('schedule.android')}
                </a>
                <a
                  href="https://apps.apple.com/app/id6478888888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
                >
                  <Apple className="w-6 h-6" />
                  {t('schedule.ios')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 