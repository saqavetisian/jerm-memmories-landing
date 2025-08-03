import { Metadata } from 'next';
import Image from 'next/image';
import api from '../../../../utils/api';
import { notFound } from 'next/navigation';
import ScheduleButton from '../../components/ScheduleButton';

interface Bouquet {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  delivery_date?: string;
  category: { name: string };
  slug: string;
}

interface BouquetPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BouquetPageProps): Promise<Metadata> {
  const t = (key: string) => key; // fallback for server
  try {
    const { slug } = await params;
    const res = await api.get<{ data: Bouquet }>(`/guest/bouquets/${slug}`);
    const bouquet = res.data;
    return {
      title: `${bouquet.name} | Jerm memories Bouquets`,
      description: bouquet.description,
      openGraph: {
        title: bouquet.name,
        description: bouquet.description,
        images: [bouquet.image_url],
        type: 'article',
        url: `/bouquets/${bouquet.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: bouquet.name,
        description: bouquet.description,
        images: [bouquet.image_url],
      },
    };
  } catch {
    return {
      title: t('bouquet.notFoundTitle'),
      description: t('bouquet.notFoundDescription'),
    };
  }
}

export default async function BouquetPage({ params }: BouquetPageProps) {
  let bouquet: Bouquet | null = null;
  try {
    const { slug } = await params;
    const res = await api.get<{ data: Bouquet }>(`/guest/bouquets/${slug}`);
    bouquet = res.data;
  } catch {
    notFound();
  }

  if (!bouquet) return null;

  // Use translations on the client
  // (If you want to use translations on the server, use next-intl/server)
  // For now, only visible text is translated

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative w-full h-80">
          <Image
            src={bouquet.image_url}
            alt={bouquet.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{bouquet.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-700 font-semibold text-xl">֏{bouquet.price.toLocaleString()}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{bouquet.category?.name}</span>
          </div>
          <p className="text-gray-700 mb-6">{bouquet.description}</p>
          {bouquet.delivery_date && (
            <div className="mb-4 text-gray-600">
              <span className="font-medium">{/* t('bouquet.deliveryDate') */}Delivery Date:</span> {new Date(bouquet.delivery_date).toLocaleDateString()}
            </div>
          )}
          <ScheduleButton />
        </div>
      </div>
    </div>
  );
} 