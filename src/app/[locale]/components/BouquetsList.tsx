import Image from 'next/image';
import {motion} from "framer-motion";
import Link from "next/link";
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface Bouquet {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category: { name: string };
}

export default function BouquetsList({ bouquets }: { bouquets: Bouquet[] }) {
  const t = useTranslations();
  if (!bouquets.length) return <div className="text-center py-12">{t('bouquets.noBouquets')}</div>;
  return (
      <Link href={`/bouquets/${bouquets[0].slug}`} passHref>
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bouquets.map(bouquet => (
              <motion.div
                  key={bouquet.id}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <Image
                      src={bouquet.image_url}
                      alt={bouquet.name}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    ֏{bouquet.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{bouquet.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{bouquet.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {bouquet.category.name}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{t('bouquets.schedule')}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
          ))}
        </motion.div>
      </Link>
  );
} 