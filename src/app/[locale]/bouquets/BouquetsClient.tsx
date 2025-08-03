'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, X, Gift } from 'lucide-react';
import api from '../../../utils/api';
import Pagination from '../components/Pagination';
import BouquetsList from "@/app/[locale]/components/BouquetsList";

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
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Local state for form inputs
  const [searchTerm, setSearchTerm] = useState(searchParams.search || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || '');
  const [priceRange, setPriceRange] = useState({
    min: searchParams.priceMin || '',
    max: searchParams.priceMax || ''
  });
  const [sortBy, setSortBy] = useState(searchParams.sortBy || 'name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(searchParams.sortOrder || 'asc');

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

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (priceRange.min) params.set('priceMin', priceRange.min);
    if (priceRange.max) params.set('priceMax', priceRange.max);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    
    // Reset to page 1 when applying filters
    params.set('page', '1');
    params.set('limit', '12');
    
    router.push(`/bouquets?${params.toString()}`);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
    setSortOrder('asc');
    router.push('/bouquets');
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
      {/* Search and Filter Bar */}
      <motion.div
        className="bg-white rounded-lg p-6 mb-8 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bouquets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>

          {/* Apply Filters Button */}
          <button
            onClick={applyFilters}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Apply
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price (֏)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price (֏)
                </label>
                <input
                  type="number"
                  placeholder="50000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

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
        <motion.div
          className="text-center py-12"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bouquets...</p>
        </motion.div>
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