import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, ChevronDown, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface BouquetsFilterProps {
  categories: { id: number; name: string }[];
  initialValues?: {
    search?: string;
    category?: string;
    priceMin?: string;
    priceMax?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    availability?: string;
    rating?: string;
  };
  onApply?: (params: Record<string, string>) => void;
  showAdvanced?: boolean;
}

export default function BouquetsFilter({ 
  categories, 
  initialValues = {}, 
  onApply, 
  showAdvanced = false,
}: BouquetsFilterProps) {
  const router = useRouter();
  const t = useTranslations();
  
  // State management
  const [search, setSearch] = useState(initialValues.search || '');
  const [category, setCategory] = useState(initialValues.category || '');
  const [sortBy, setSortBy] = useState(initialValues.sortBy || 'name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialValues.sortOrder || 'asc');
  const [priceRange, setPriceRange] = useState({
    min: initialValues.priceMin || '',
    max: initialValues.priceMax || ''
  });
  const [availability, setAvailability] = useState(initialValues.availability || '');
  const [rating, setRating] = useState(initialValues.rating || '');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(showAdvanced);
  const [activeFilters, setActiveFilters] = useState(0);

  // Calculate active filters count
  useEffect(() => {
    let count = 0;
    if (search) count++;
    if (category) count++;
    if (priceRange.min || priceRange.max) count++;
    if (availability) count++;
    if (rating) count++;
    setActiveFilters(count);
  }, [search, category, priceRange, availability, rating]);

  const handleApply = () => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (priceRange.min) params.priceMin = priceRange.min;
    if (priceRange.max) params.priceMax = priceRange.max;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;
    if (availability) params.availability = availability;
    if (rating) params.rating = rating;
    params.page = '1';
    params.limit = '12';
    
    if (onApply) {
      onApply(params);
    } else {
      const query = new URLSearchParams(params).toString();
      router.push(`/bouquets?${query}`);
    }
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setPriceRange({ min: '', max: '' });
    setAvailability('');
    setRating('');
    setSortBy('name');
    setSortOrder('asc');
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const sortOptions = [
    { value: 'name-asc', label: t('filter.sortNameAsc') },
    { value: 'name-desc', label: t('filter.sortNameDesc') },
    { value: 'price-asc', label: t('filter.sortPriceAsc') },
    { value: 'price-desc', label: t('filter.sortPriceDesc') },
    { value: 'createdAt-desc', label: t('filter.sortNewest') },
    { value: 'createdAt-asc', label: t('filter.sortOldest') }
  ];

  const availabilityOptions = [
    { value: '', label: t('filter.allAvailability') },
    { value: 'in-stock', label: t('filter.inStock') },
    { value: 'low-stock', label: t('filter.lowStock') },
    { value: 'out-of-stock', label: t('filter.outOfStock') }
  ];

  const ratingOptions = [
    { value: '', label: t('filter.allRatings') },
    { value: '5', label: '⭐⭐⭐⭐⭐ 5+ Stars' },
    { value: '4', label: '⭐⭐⭐⭐ 4+ Stars' },
    { value: '3', label: '⭐⭐⭐ 3+ Stars' },
    { value: '2', label: '⭐⭐ 2+ Stars' },
    { value: '1', label: '⭐ 1+ Stars' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('filter.title')}</h3>
              <p className="text-sm text-gray-600">{t('filter.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {activeFilters > 0 && (
              <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                {activeFilters} {t('filter.active')}
              </span>
            )}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span className="text-sm font-medium">{t('filter.advanced')}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Filters */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('filter.search')}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('filter.searchPlaceholder')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('filter.category')}
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">{t('filter.allCategories')}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('filter.sortBy')}
            </label>
            <div className="relative">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={e => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 pt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('filter.priceRange')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder={t('filter.minPrice')}
                      value={priceRange.min}
                      onChange={e => handlePriceChange('min', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="number"
                      placeholder={t('filter.maxPrice')}
                      value={priceRange.max}
                      onChange={e => handlePriceChange('max', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('filter.availability')}
                  </label>
                  <div className="relative">
                    <select
                      value={availability}
                      onChange={e => setAvailability(e.target.value)}
                      className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      {availabilityOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('filter.rating')}
                  </label>
                  <div className="relative">
                    <select
                      value={rating}
                      onChange={e => setRating(e.target.value)}
                      className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      {ratingOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleApply}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">{t('filter.apply')}</span>
          </button>
          
          {activeFilters > 0 && (
            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="font-medium">{t('filter.reset')}</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 