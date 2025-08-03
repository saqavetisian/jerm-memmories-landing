'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Android SVG icon (Material Design)
const AndroidIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M17.6 9.48l1.43-2.48a.5.5 0 10-.87-.5l-1.46 2.54A7.97 7.97 0 0012 8c-1.6 0-3.1.47-4.7 1.04L5.8 6.5a.5.5 0 10-.87.5l1.43 2.48C4.7 10.2 4 11.53 4 13v5a2 2 0 002 2h12a2 2 0 002-2v-5c0-1.47-.7-2.8-2.4-3.52zM7 19a1 1 0 110-2 1 1 0 010 2zm10 0a1 1 0 110-2 1 1 0 010 2z" fill="#fff"/>
  </svg>
);

export default function ScheduleModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative border border-blue-100"
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={onClose}
              aria-label={t('modal.close')}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">{t('modal.openInApp')}</h2>
            <p className="mb-6 text-center text-gray-600">{t('modal.useApp')}</p>
            <div className="flex flex-row gap-4">
              <a
                href={`https://play.google.com/store/apps/details?id=${process.env.NEXT_PUBLIC_ANDROID_APP_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 bg-green-900 text-white py-4 rounded-lg font-bold text-lg shadow hover:bg-green-800 transition-colors border-2 border-green-900 hover:border-green-700"
              >
                <AndroidIcon />
                <span>{t('modal.android')}</span>
              </a>
              <a
                href={`https://apps.apple.com/app/id${process.env.NEXT_PUBLIC_IOS_APP_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 bg-neutral-900 text-white py-4 rounded-lg font-bold text-lg shadow hover:bg-neutral-800 transition-colors border-2 border-neutral-900 hover:border-neutral-700"
              >
                <Apple className="w-6 h-6" />
                <span>{t('modal.ios')}</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 