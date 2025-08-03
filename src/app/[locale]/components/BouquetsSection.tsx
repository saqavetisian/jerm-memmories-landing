import { useEffect, useState } from 'react';
import BouquetsList, {Bouquet} from './BouquetsList';
import api from '../../../utils/api';
import Link from "next/link";
import {useLocale} from "next-intl";

export default function BouquetsSection() {
  const locale = useLocale();

  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get<{ data: Bouquet[] }>('/guest/bouquets', { page: 1, limit: 4, sortBy: 'createdAt', sortOrder: 'desc' })
      .then(res => setBouquets(res.data))
      .catch(() => setError('Failed to load bouquets'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12">Loading bouquets...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  return (
      <>
        <BouquetsList bouquets={bouquets} />
        <div className="flex justify-center mt-4 w-full">
          <Link href={`/${locale}/bouquets`}>
            <button
                className="flex items-center cursor-pointer space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Load more
            </button>
          </Link>
        </div>
      </>
  );
} 