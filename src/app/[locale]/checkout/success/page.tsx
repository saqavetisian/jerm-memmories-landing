import CheckoutSuccessClient from './CheckoutSuccessClient';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string, amount: string }>;
}) {

    const { orderId, amount } = await searchParams
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <CheckoutSuccessClient 
        orderId={orderId as string}
        amount={amount as string}
      />
    </div>
  );
} 