import Link from 'next/link';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your order! We've received your request and will process it shortly. 
            You'll receive a confirmation email with your order details.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Go to Home</span>
            </Link>
            
            <Link
              href="/bouquets"
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium inline-flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
          
          <p className="text-xs text-gray-500 mt-6">
            If you have any questions about your order, please contact our customer support.
          </p>
        </div>
      </div>
    </div>
  );
} 