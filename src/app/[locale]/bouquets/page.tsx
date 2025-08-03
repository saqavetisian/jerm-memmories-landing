import { Suspense } from 'react';
import Link from 'next/link';
import BouquetsClient from './BouquetsClient';

interface BouquetsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    category?: string;
    priceMin?: string;
    priceMax?: string;
  }>;
}

export default async function BouquetsPage({ searchParams }: BouquetsPageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bouquets</h1>
              <p className="text-gray-600 mt-1">Discover our beautiful collection</p>
            </div>
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bouquets...</p>
          </div>
        }>
          <BouquetsClient searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
} 