import { Suspense } from 'react';
import Link from 'next/link';
import BasketClient from './BasketClient';
import { getTranslations } from 'next-intl/server';

export default async function BasketPage() {
  const t = await getTranslations();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{t('basket.title')}</h1>
            <Link 
              href="/bouquets"
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              {t('basket.continueShopping')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <BasketClient />
        </Suspense>
      </div>
    </div>
  );
} 