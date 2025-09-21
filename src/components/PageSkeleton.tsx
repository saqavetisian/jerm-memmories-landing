'use client';

import { motion } from 'framer-motion';
import SkeletonLoader from './SkeletonLoader';

export function HeroSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden"
    >
      {/* Floating elements skeleton */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => {
          // Use deterministic positioning based on index to avoid hydration mismatch
          const positions = [
            { left: '10%', top: '20%' },
            { left: '80%', top: '30%' },
            { left: '20%', top: '70%' },
            { left: '70%', top: '60%' },
            { left: '50%', top: '10%' },
            { left: '90%', top: '80%' }
          ];
          const position = positions[index] || { left: '50%', top: '50%' };
          
          return (
            <motion.div
              key={index}
              className="absolute"
              style={position}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3 + (index * 0.5),
                repeat: Infinity,
                delay: index * 0.3,
              }}
            >
              <SkeletonLoader variant="circle" width="40px" height="40px" />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Title skeleton */}
        <div className="mb-6 space-y-3">
          <SkeletonLoader variant="text" height="48px" width="80%" className="mx-auto" />
          <SkeletonLoader variant="text" height="48px" width="60%" className="mx-auto" />
        </div>

        {/* Subtitle skeleton */}
        <div className="mb-8 space-y-2">
          <SkeletonLoader variant="text" height="24px" width="90%" className="mx-auto" />
          <SkeletonLoader variant="text" height="24px" width="70%" className="mx-auto" />
        </div>

        {/* Buttons skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SkeletonLoader variant="rect" height="56px" width="200px" />
          <SkeletonLoader variant="rect" height="56px" width="180px" />
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSectionSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <SkeletonLoader variant="text" height="32px" width="60%" />
              <SkeletonLoader variant="text" height="24px" width="80%" />
            </div>
            
            <div className="space-y-3">
              <SkeletonLoader variant="text" height="16px" width="100%" />
              <SkeletonLoader variant="text" height="16px" width="100%" />
              <SkeletonLoader variant="text" height="16px" width="80%" />
            </div>

            {/* Features skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <SkeletonLoader variant="circle" width="20px" height="20px" />
                  <SkeletonLoader variant="text" height="16px" width="70%" />
                </div>
              ))}
            </div>
          </div>

          {/* Image skeleton */}
          <div className="relative">
            <SkeletonLoader variant="card" height="400px" width="100%" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSectionSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 sm:py-20 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-12 space-y-3">
          <SkeletonLoader variant="text" height="32px" width="40%" className="mx-auto" />
          <SkeletonLoader variant="text" height="20px" width="60%" className="mx-auto" />
        </div>

        {/* Services grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-center space-y-4">
                <SkeletonLoader variant="circle" width="60px" height="60px" className="mx-auto" />
                <div className="space-y-2">
                  <SkeletonLoader variant="text" height="20px" width="80%" className="mx-auto" />
                  <SkeletonLoader variant="text" height="16px" width="100%" />
                  <SkeletonLoader variant="text" height="16px" width="70%" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function DownloadSectionSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-600"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <SkeletonLoader variant="text" height="32px" width="50%" className="mx-auto" />
          <SkeletonLoader variant="text" height="20px" width="70%" className="mx-auto" />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SkeletonLoader variant="rect" height="56px" width="200px" />
            <SkeletonLoader variant="rect" height="56px" width="200px" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FullPageSkeleton() {
  return (
    <div className="min-h-screen">
      <HeroSkeleton />
      <AboutSectionSkeleton />
      <ServicesSectionSkeleton />
      <DownloadSectionSkeleton />
    </div>
  );
}
