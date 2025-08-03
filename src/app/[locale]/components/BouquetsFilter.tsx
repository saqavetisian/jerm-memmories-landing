import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BouquetsFilterProps {
  categories: { id: number; name: string }[];
  initialValues?: {
    search?: string;
    category?: string;
    priceMin?: string;
    priceMax?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
  onApply?: (params: Record<string, string>) => void;
}

export default function BouquetsFilter({ categories, initialValues = {}, onApply }: BouquetsFilterProps) {
  const router = useRouter();
  const t = useTranslations();
  const [search, setSearch] = useState(initialValues.search || '');
  const [category, setCategory] = useState(initialValues.category || '');
  const [sortBy, setSortBy] = useState(initialValues.sortBy || 'name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialValues.sortOrder || 'asc');

  const handleApply = () => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (initialValues.priceMin) params.priceMin = initialValues.priceMin;
    if (initialValues.priceMax) params.priceMax = initialValues.priceMax;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;
    params.page = '1';
    params.limit = '12';
    if (onApply) {
      onApply(params);
    } else {
      // Default: redirect to /bouquets
      const query = new URLSearchParams(params).toString();
      router.push(`/bouquets?${query}`);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t('filter.searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('filter.allCategories')}</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={e => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order as 'asc' | 'desc');
            }}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="name-asc">{t('filter.sortNameAsc')}</option>
            <option value="name-desc">{t('filter.sortNameDesc')}</option>
            <option value="price-asc">{t('filter.sortPriceAsc')}</option>
            <option value="price-desc">{t('filter.sortPriceDesc')}</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
        <button
          onClick={handleApply}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span>{t('filter.apply')}</span>
        </button>
      </div>
    </div>
  );
} 