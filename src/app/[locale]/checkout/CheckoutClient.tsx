'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useBasket } from '@/contexts/BasketContext';
import { clearBasket } from '@/utils/localStorage';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { guestOrderApi, CreateGuestOrderRequest } from '@/utils/guestOrderApi';
import toast, { Toaster } from 'react-hot-toast';

interface ShippingDetails {
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryDate: string;
  deliveryTime: string;
  specialInstructions: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export default function CheckoutClient() {
  const router = useRouter();
  const { basket, basketTotal, refreshBasket } = useBasket();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    recipientName: '',
    recipientPhone: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryDate: '',
    deliveryTime: '',
    specialInstructions: '',
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const t = useTranslations();

  useEffect(() => {
    if (basket.length === 0) {
      router.push('/bouquets');
    }
  }, [basket, router]);

  const handleInputChange = (field: keyof ShippingDetails, value: string) => {
    setShippingDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!shippingDetails.recipientName || !shippingDetails.recipientPhone || 
          !shippingDetails.deliveryAddress || !shippingDetails.deliveryCity || 
          !shippingDetails.deliveryDate || !shippingDetails.deliveryTime) {
        alert('Please fill in all required fields');
        return;
      }
    }
    if (currentStep === 2) {
      if (!shippingDetails.customerName || !shippingDetails.customerEmail || 
          !shippingDetails.customerPhone) {
        alert('Please fill in all required fields');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare order data
      const orderData: CreateGuestOrderRequest = {
        guestInfo: {
          name: shippingDetails.customerName,
          email: shippingDetails.customerEmail,
          phone: shippingDetails.customerPhone
        },
        basketItems: basket.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image_url: item.image_url
        })),
        shippingDetails: {
          recipientName: shippingDetails.recipientName,
          recipientPhone: shippingDetails.recipientPhone,
          deliveryAddress: shippingDetails.deliveryAddress,
          deliveryCity: shippingDetails.deliveryCity,
          deliveryDate: shippingDetails.deliveryDate,
          deliveryTime: shippingDetails.deliveryTime,
          specialInstructions: shippingDetails.specialInstructions,
          customerName: shippingDetails.customerName,
          customerEmail: shippingDetails.customerEmail,
          customerPhone: shippingDetails.customerPhone
        },
        totalAmount: basketTotal
      };

      // Create the order
      const orderResponse = await guestOrderApi.createOrder(orderData);
      
      if (orderResponse.success) {
        toast.success('Order created successfully! Redirecting to payment...', {
          duration: 3000,
          position: 'top-right',
        });
        
        // Process payment
        const paymentResponse = await guestOrderApi.processPayment(orderResponse.data.orderId);
        
        if (paymentResponse.success) {
          // Redirect to payment gateway
          window.location.href = paymentResponse.data.redirectUrl;
        } else {
          throw new Error(paymentResponse.message || 'Payment initialization failed');
        }
      } else {
        throw new Error(orderResponse.message || 'Order creation failed');
      }
    } catch (error: any) {
      console.error('Order submission failed:', error);
      
      // Handle backend validation errors
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        const errors: Record<string, string> = {};
        
        validationErrors.forEach((err: any) => {
          // Show toast for each error
          toast.error(`${err.field}: ${err.message}`, {
            duration: 5000,
            position: 'top-right',
          });
          
          // Store field-specific errors for highlighting
          errors[err.field] = err.message;
        });
        
        setFieldErrors(errors);
      } else if (error.response?.data?.message) {
        // Handle general backend error messages
        toast.error(error.response.data.message, {
          duration: 5000,
          position: 'top-right',
        });
      } else {
        // Handle network or other errors
        toast.error('Order submission failed. Please try again.', {
          duration: 5000,
          position: 'top-right',
        });
      }
      
      setIsSubmitting(false);
    }
  };

  if (basket.length === 0) {
    return null;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Shipping Details */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('checkout.shippingDetails')}</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.recipientName')} *</label>
                  <input
                    type="text"
                    value={shippingDetails.recipientName}
                    onChange={(e) => handleInputChange('recipientName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                      fieldErrors['shippingDetails.recipientName'] 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Recipient's full name"
                  />
                  {fieldErrors['shippingDetails.recipientName'] && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors['shippingDetails.recipientName']}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.recipientPhone')} *</label>
                  <input
                    type="tel"
                    value={shippingDetails.recipientPhone}
                    onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+374 XX XXX XXX"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.deliveryAddress')} *</label>
                  <input
                    type="text"
                    value={shippingDetails.deliveryAddress}
                    onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Street address, apartment, suite, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.deliveryCity')} *</label>
                  <input
                    type="text"
                    value={shippingDetails.deliveryCity}
                    onChange={(e) => handleInputChange('deliveryCity', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.deliveryDate')} *</label>
                  <input
                    type="date"
                    value={shippingDetails.deliveryDate}
                    onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.deliveryTime')} *</label>
                  <select
                    value={shippingDetails.deliveryTime}
                    onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.specialInstructions')}</label>
                  <textarea
                    value={shippingDetails.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special delivery instructions..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Customer Details */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('checkout.customerDetails')}</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.customerName')} *</label>
                  <input
                    type="text"
                    value={shippingDetails.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.customerEmail')} *</label>
                  <input
                    type="email"
                    value={shippingDetails.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('checkout.customerPhone')} *</label>
                  <input
                    type="tel"
                    value={shippingDetails.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+374 XX XXX XXX"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('checkout.paymentInformation')}</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VPOS</span>
                  </div>
                </div>
                <p className="text-blue-800 text-center mb-4">
                  {t('checkout.paymentDescription')}
                </p>
                <div className="text-center text-sm text-blue-700">
                  <p>• {t('checkout.securePayment')}</p>
                  <p>• {t('checkout.instantProcessing')}</p>
                  <p>• {t('checkout.multipleCards')}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 text-center">
                  {t('checkout.paymentNotice')}
                </p>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                onClick={handlePrevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('checkout.previous')}
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('checkout.next')}
              </button>
            ) : (
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : t('checkout.placeOrder')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('checkout.orderSummary')}</h2>
          
          {/* Basket Items */}
          <div className="space-y-4 mb-6">
            {basket.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  ֏{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          
          {/* Totals */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{t('checkout.items')}</span>
              <span>{basket.length}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{t('checkout.deliveryFee')}</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>{t('checkout.totalAmount')}</span>
                <span>֏{basketTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 