import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();

  // Always get current page from URL
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/bouquets?${params.toString()}`);
  };

  // Show up to 5 page numbers, centered on current page
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    if (currentPage <= 2) end = Math.min(5, totalPages);
    if (currentPage >= totalPages - 1) start = Math.max(1, totalPages - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="inline-flex items-center space-x-1">
        <li>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-l bg-gray-100 text-gray-700 hover:bg-blue-100 disabled:opacity-50"
          >
            {t('pagination.previous')}
          </button>
        </li>
        {getPageNumbers().map(page => (
          <li key={page}>
            <button
              onClick={() => goToPage(page)}
              className={`px-3 py-2 ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'} rounded`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-r bg-gray-100 text-gray-700 hover:bg-blue-100 disabled:opacity-50"
          >
            {t('pagination.next')}
          </button>
        </li>
      </ul>
    </nav>
  );
} 