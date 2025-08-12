import CheckoutFailedClient from './CheckoutFailedClient';

export default async function CheckoutFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string, orderId: string }>;
}) {

    const { error, orderId } = await searchParams
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
      <CheckoutFailedClient
          error={error}
          orderId={orderId}
      />
    </div>
  );
} 