import { Metadata } from 'next';
import api from '../../../../utils/api';
import { notFound } from 'next/navigation';
import BouquetDetailClient from './BouquetDetailClient';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BouquetDetailClient bouquet={bouquet} />
      </div>
    </div>
  );
} 