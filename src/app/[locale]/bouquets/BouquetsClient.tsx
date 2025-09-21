'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Filter, Gift, X } from 'lucide-react';
import api from '../../../utils/api';
import Pagination from '../components/Pagination';
import BouquetsList from "@/app/[locale]/components/BouquetsList";
import BouquetsFilter from '../components/BouquetsFilter';
import MobileFilterDrawer from '../../../components/MobileFilterDrawer';
import { BouquetListSkeleton, FilterSkeleton } from '../../../components/SkeletonLoader';

interface Bouquet {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category: {
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

interface ApiResponse<T> {
  data: T[];
  pagination?: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
  };
}

interface BouquetsClientProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    category?: string;
    priceMin?: string;
    priceMax?: string;
  };
}

export default function BouquetsClient({ searchParams }: BouquetsClientProps) {
  const router = useRouter();
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await api.get<{ data: Category[] }>('/guest/categories');
      setCategories(response.data || []);
    } catch (err: unknown) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch bouquets with server-side filtering
  const fetchBouquets = async () => {
    setLoading(true);
    setError('');
    
    try {
      const params: Record<string, string | number> = {
        page: searchParams.page || 1,
        limit: searchParams.limit || 12,
        search: searchParams.search || '',
        sortBy: searchParams.sortBy || 'name',
        sortOrder: searchParams.sortOrder || 'asc',
      };
      
      if (searchParams.category) params.category = searchParams.category;
      if (searchParams.priceMin) params.priceMin = searchParams.priceMin;
      if (searchParams.priceMax) params.priceMax = searchParams.priceMax;
      
      const response = await api.get<ApiResponse<Bouquet>>('/guest/bouquets', params);
      const { data, pagination } = response;
      
      setBouquets(data);
      setTotalPages(pagination?.totalPages || 1);
    } catch (err: unknown) {
      console.error('Error fetching bouquets:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load bouquets';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters from filter component
  const handleApplyFilters = (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    router.push(`/bouquets?${query}`);
  };

  // Initialize data
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBouquets();
  }, [searchParams]);

  return (
    <div>
      {/* Desktop Filter */}
      <div className="hidden md:block">
        {loading && bouquets.length === 0 ? (
          <FilterSkeleton />
        ) : (
          <BouquetsFilter
            categories={categories}
            initialValues={searchParams}
            onApply={handleApplyFilters}
            showAdvanced={true}
          />
        )}
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filter & Sort</span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        onApply={handleApplyFilters}
        categories={categories}
        initialValues={searchParams}
      />

      {/* Error Message */}
      {error && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center space-x-2">
            <X className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && bouquets.length === 0 && (
        <BouquetListSkeleton count={12} />
      )}

      {/* Bouquets Grid */}
      {!loading && (
          <BouquetsList bouquets={bouquets} />
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Pagination totalPages={totalPages} />
      )}

      {/* Empty State */}
      {!loading && bouquets.length === 0 && (
        <motion.div
          className="text-center py-12"
        >
          <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No bouquets found matching your criteria</p>
        </motion.div>
      )}
    </div>
  );
}