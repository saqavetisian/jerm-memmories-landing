'use client';

import { useState } from 'react';
import SkeletonLoader, {
  BouquetCardSkeleton, 
  BouquetListSkeleton, 
  FilterSkeleton, 
  TextSkeleton, 
  TableSkeleton 
} from './SkeletonLoader';
import { 
  HeroSkeleton, 
  AboutSectionSkeleton, 
  ServicesSectionSkeleton, 
  DownloadSectionSkeleton 
} from './PageSkeleton';
import MobileFilterSkeleton from './MobileFilterSkeleton';

export default function SkeletonDemo() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Skeleton Loader Demo</h1>
          <p className="text-gray-600">Cool skeleton animations for loading states</p>
        </div>

        {/* Basic Skeletons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Basic Skeletons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Rectangle</h3>
              <SkeletonLoader variant="rect" width="100%" height="40px" />
              <SkeletonLoader variant="rect" width="80%" height="20px" />
              <SkeletonLoader variant="rect" width="60%" height="20px" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Circle</h3>
              <SkeletonLoader variant="circle" width="60px" height="60px" />
              <SkeletonLoader variant="circle" width="40px" height="40px" />
              <SkeletonLoader variant="circle" width="20px" height="20px" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Text</h3>
              <TextSkeleton lines={3} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Card</h3>
              <SkeletonLoader variant="card" width="100%" height="120px" />
            </div>
          </div>
        </section>

        {/* Bouquet Card Skeleton */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Bouquet Card Skeleton</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BouquetCardSkeleton />
            <BouquetCardSkeleton />
            <BouquetCardSkeleton />
          </div>
        </section>

        {/* Bouquet List Skeleton */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Bouquet List Skeleton</h2>
          <BouquetListSkeleton count={6} />
        </section>

        {/* Filter Skeleton */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Filter Skeleton</h2>
          <FilterSkeleton />
        </section>

        {/* Table Skeleton */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Table Skeleton</h2>
          <div className="bg-white rounded-lg p-6">
            <TableSkeleton rows={5} columns={4} />
          </div>
        </section>

        {/* Page Sections */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Page Section Skeletons</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Hero Section</h3>
              <div className="h-96 overflow-hidden rounded-lg">
                <HeroSkeleton />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">About Section</h3>
              <AboutSectionSkeleton />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Services Section</h3>
              <ServicesSectionSkeleton />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Download Section</h3>
              <DownloadSectionSkeleton />
            </div>
          </div>
        </section>

        {/* Mobile Filter Demo */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Mobile Filter Skeleton</h2>
          <button
            onClick={() => setShowMobileFilter(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Show Mobile Filter Skeleton
          </button>
        </section>

        {/* Mobile Filter Skeleton */}
        {showMobileFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="relative w-full">
              <MobileFilterSkeleton />
              <button
                onClick={() => setShowMobileFilter(false)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Animation Controls */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Animation Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">With Animation</h3>
              <SkeletonLoader variant="rect" width="100%" height="40px" animated={true} />
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Without Animation</h3>
              <SkeletonLoader variant="rect" width="100%" height="40px" animated={false} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
