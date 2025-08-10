import Image from 'next/image';
import {motion} from "framer-motion";
import Link from "next/link";
import { Calendar, Heart, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useBasket } from '@/contexts/BasketContext';
import { addToBasket, toggleFavorite, isFavorite, isInBasket } from '@/utils/localStorage';

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
  const { refreshBasket, refreshFavorites } = useBasket();
  
  if (!bouquets.length) return <div className="text-center py-12">{t('bouquets.noBouquets')}</div>;
  
  const handleAddToBasket = (e: React.MouseEvent, bouquet: Bouquet) => {
    e.preventDefault();
    e.stopPropagation();
    addToBasket(bouquet);
    refreshBasket();
  };

  const handleToggleFavorite = (e: React.MouseEvent, bouquet: Bouquet) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(bouquet);
    refreshFavorites();
  };

  return (
    <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {bouquets.map(bouquet => (
        <Link href={`/bouquets/${bouquet.slug}`} key={bouquet.id} passHref>
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
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
              
              {/* Action Buttons */}
              <div className="absolute top-2 left-2 flex flex-col gap-2">
                {/* Favorite Button */}
                <button
                  onClick={(e) => handleToggleFavorite(e, bouquet)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite(bouquet.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(bouquet.id) ? 'fill-current' : ''}`} />
                </button>
                
                {/* Add to Basket Button */}
                <button
                  onClick={(e) => handleAddToBasket(e, bouquet)}
                  className={`p-2 rounded-full transition-colors ${
                    isInBasket(bouquet.id)
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/90 text-gray-600 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
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
        </Link>
      ))}
    </motion.div>
  );
} 