'use client';

import { motion } from 'framer-motion';
import SkeletonLoader from './SkeletonLoader';

export default function MobileFilterSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-[9999] max-h-[85vh]"
    >
      <div className="flex flex-col h-full">
        {/* Header skeleton */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <SkeletonLoader variant="circle" width="32px" height="32px" />
            <div className="space-y-1">
              <SkeletonLoader variant="text" height="18px" width="80px" />
              <SkeletonLoader variant="text" height="14px" width="120px" />
            </div>
          </div>
          <SkeletonLoader variant="circle" width="32px" height="32px" />
        </div>

        {/* Content skeleton */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Search skeleton */}
          <div className="space-y-2">
            <SkeletonLoader variant="text" height="14px" width="60px" />
            <SkeletonLoader variant="rect" height="48px" width="100%" />
          </div>

          {/* Category skeleton */}
          <div className="space-y-2">
            <SkeletonLoader variant="text" height="14px" width="80px" />
            <SkeletonLoader variant="rect" height="48px" width="100%" />
          </div>

          {/* Sort skeleton */}
          <div className="space-y-2">
            <SkeletonLoader variant="text" height="14px" width="60px" />
            <SkeletonLoader variant="rect" height="48px" width="100%" />
          </div>

          {/* Price range skeleton */}
          <div className="space-y-2">
            <SkeletonLoader variant="text" height="14px" width="100px" />
            <div className="grid grid-cols-2 gap-3">
              <SkeletonLoader variant="rect" height="48px" width="100%" />
              <SkeletonLoader variant="rect" height="48px" width="100%" />
            </div>
          </div>

          {/* Availability skeleton */}
          <div className="space-y-2">
            <SkeletonLoader variant="text" height="14px" width="90px" />
            <SkeletonLoader variant="rect" height="48px" width="100%" />
          </div>

          {/* Rating skeleton */}
          <div className="space-y-2">
            <SkeletonLoader variant="text" height="14px" width="60px" />
            <SkeletonLoader variant="rect" height="48px" width="100%" />
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <SkeletonLoader variant="rect" height="48px" width="140px" />
            <SkeletonLoader variant="rect" height="48px" width="48px" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
