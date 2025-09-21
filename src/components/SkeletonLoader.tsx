'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
  animated?: boolean;
}

export default function SkeletonLoader({
  variant = 'rect',
  width = '100%',
  height = '20px',
  className = '',
  count = 1,
  animated = true
}: SkeletonLoaderProps) {
  const baseClasses = `bg-gray-200 rounded ${animated ? 'animate-pulse' : ''}`;
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'rounded-xl';
      case 'list':
        return 'rounded-lg';
      case 'text':
        return 'rounded-sm';
      case 'circle':
        return 'rounded-full';
      case 'rect':
      default:
        return 'rounded-md';
    }
  };

  const skeletonElement = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={{ width, height }}
    >
      {animated && (
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </motion.div>
  );

  if (count === 1) {
    return skeletonElement;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {skeletonElement}
        </motion.div>
      ))}
    </div>
  );
}

// Specific skeleton components for common use cases
export function BouquetCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Image skeleton */}
      <SkeletonLoader variant="card" height="200px" className="w-full" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <SkeletonLoader variant="text" height="20px" width="80%" />
        
        {/* Description skeleton */}
        <SkeletonLoader variant="text" height="16px" width="100%" />
        <SkeletonLoader variant="text" height="16px" width="60%" />
        
        {/* Price and button skeleton */}
        <div className="flex justify-between items-center">
          <SkeletonLoader variant="text" height="24px" width="80px" />
          <SkeletonLoader variant="rect" height="40px" width="120px" />
        </div>
      </div>
    </motion.div>
  );
}

export function BouquetListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <BouquetCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

export function FilterSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 overflow-hidden"
    >
      {/* Header skeleton */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SkeletonLoader variant="circle" width="40px" height="40px" />
            <div className="space-y-2">
              <SkeletonLoader variant="text" height="20px" width="150px" />
              <SkeletonLoader variant="text" height="16px" width="200px" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <SkeletonLoader variant="rect" height="24px" width="60px" />
            <SkeletonLoader variant="rect" height="32px" width="80px" />
          </div>
        </div>
      </div>

      {/* Filter controls skeleton */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-2 space-y-2">
            <SkeletonLoader variant="text" height="16px" width="60px" />
            <SkeletonLoader variant="rect" height="48px" width="100%" />
          </div>
          <div className="space-y-2">
            <SkeletonLoader variant="text" height="16px" width="80px" />
            <SkeletonLoader variant="rect" height="48px" width="100%" />
          </div>
          <div className="space-y-2">
            <SkeletonLoader variant="text" height="16px" width="60px" />
            <SkeletonLoader variant="rect" height="48px" width="100%" />
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <SkeletonLoader variant="rect" height="48px" width="140px" />
          <SkeletonLoader variant="rect" height="48px" width="120px" />
        </div>
      </div>
    </motion.div>
  );
}

export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLoader
          key={index}
          variant="text"
          height="16px"
          width={index === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonLoader key={index} variant="text" height="20px" />
        ))}
      </div>
      
      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonLoader key={colIndex} variant="text" height="16px" />
          ))}
        </div>
      ))}
    </div>
  );
}
