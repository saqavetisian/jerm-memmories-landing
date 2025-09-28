'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Calendar, 
  Heart, 
  Gift, 
  Truck, 
  Clock, 
  Bell, 
  Star,
  Download,
  ChevronUp,
  X,
  ShoppingCart,
  Eye
} from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import BouquetsSection from './components/BouquetsSection';
import BouquetsFilter from './components/BouquetsFilter';
import { FullPageSkeleton } from '../../components/PageSkeleton';

interface Category {
  id: number;
  name: string;
}

export default function Home() {
  const t = useTranslations();
  
  // Bouquets data state
  const [categories, setCategories] = useState<Category[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [formData, setFormData] = useState({
    recipientName: '',
    address: '',
    phone: '',
    note: '',
    date: null as Date | null,
    addOns: {
      chocolate: false,
      balloon: false,
      card: false
    }
  });

  // Service icons mapping
  const serviceIcons = [
    <Calendar key="calendar" className="w-6 h-6 text-white" />,
    <Heart key="heart" className="w-6 h-6 text-white" />,
    <Gift key="gift" className="w-6 h-6 text-white" />,
    <Truck key="truck" className="w-6 h-6 text-white" />,
    <Clock key="clock" className="w-6 h-6 text-white" />,
    <Bell key="bell" className="w-6 h-6 text-white" />
  ];

  // Only fetch initial bouquets and categories once
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const [catRes] = await Promise.all([
          api.get<{ data: Category[] }>('/guest/categories'),
        ]);
        setCategories(catRes.data || []);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsPageLoading(false);
      }
    };
    fetchInitial();
  }, []);

  // Prevent hydration mismatch by not showing skeleton on initial render
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    if (modalStep === 1) {
      if (!formData.recipientName.trim()) {
        alert('Recipient name is required');
        return;
      }
      if (!formData.address.trim()) {
        alert('Address is required');
        return;
      }
      if (!formData.date) {
        alert('Date is required');
        return;
      }
    }
    setModalStep(prev => prev + 1);
  };

  const handleBack = () => setModalStep(prev => prev - 1);

  const handleSaveEvent = async (status: 'draft' | 'purchased' | 'yearly') => {
    try {
      // Validate required fields
      if (!formData.recipientName.trim()) {
        alert('Recipient name is required');
        return;
      }
      if (!formData.address.trim()) {
        alert('Address is required');
        return;
      }
      if (!formData.date) {
        alert('Date is required');
        return;
      }

      // Prepare event data
      const eventData = {
        full_name: formData.recipientName.trim(),
        relationship: '',
        phone: formData.phone,
        status: status === 'draft' ? 'DRAFT' : 'PENDING',
        address_name: formData.address.trim(),
        event_type: status,
        event_date: formData.date.toISOString(),
        description: formData.note.trim() || null,
      };

      // Call API to create event
      const response = await api.post('/events', eventData);
      
      if (response) {
        setShowModal(false);
        setModalStep(1);
        alert(`Event ${status === 'draft' ? 'saved as draft' : status === 'yearly' ? 'scheduled yearly' : 'purchased'} successfully!`);
        
        // Reset form
        setFormData({
          recipientName: '',
          address: '',
          phone: '',
          note: '',
          date: null,
          addOns: { chocolate: false, balloon: false, card: false }
        });
      }
    } catch (error: unknown) {
      console.error('Error saving event:', error);
      let errorMessage = 'Failed to save event';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      alert(`Error: ${errorMessage}`);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  const flowerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  // Show skeleton loader while page is loading (only on client to prevent hydration mismatch)
  if (isClient && isPageLoading) {
    return <FullPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        {/* Floating Flowers - Hidden on mobile */}
        <motion.div
          className="hidden sm:block absolute top-20 left-10 text-primary-400 opacity-60"
          variants={flowerVariants}
          initial="hidden"
          animate="visible"
          whileHover="float"
        >
          <Heart className="w-16 h-16" />
        </motion.div>
        
        <motion.div
          className="hidden sm:block absolute top-40 right-20 text-primary-300 opacity-50"
          variants={flowerVariants}
          initial="hidden"
          animate="visible"
          whileHover="float"
          transition={{ delay: 0.5 }}
        >
          <Gift className="w-12 h-12" />
        </motion.div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="flex justify-center mb-6"
              variants={itemVariants}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
              variants={itemVariants}
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 sm:px-0"
              variants={itemVariants}
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0"
              variants={containerVariants}
            >
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t('hero.cta')}</span>
              </motion.button>
              
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-2 text-blue-700 font-semibold text-sm sm:text-base"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span className="text-center">Schedule Once, Remember Forever</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bouquets Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <BouquetsFilter categories={categories} />
          <BouquetsSection />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-blue-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div
              className="flex justify-center mb-6"
              variants={itemVariants}
            >
              <motion.div
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Star className="w-8 h-8 text-blue-700" />
              </motion.div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6"
              variants={itemVariants}
            >
              {t('about.title')}
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-4 sm:px-0"
              variants={itemVariants}
            >
              {t('about.description')}
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
                variants={itemVariants}
              >
                <Star className="w-6 h-6 text-blue-700" />
                <span>{t('about.features.title')}</span>
              </motion.h3>
              <motion.p 
                className="text-gray-600 mb-6"
                variants={itemVariants}
              >
                {t('about.features.description')}
              </motion.p>
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                <motion.div 
                  className="flex items-center space-x-3"
                  variants={itemVariants}
                >
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">{t('about.features.pricing')}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  variants={itemVariants}
                >
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">{t('about.features.delivery')}</span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gradient-to-br from-primary-50 to-blue-100 rounded-2xl p-8 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-primary-300 opacity-30">
                <Heart className="w-12 h-12" />
              </div>
              
              <div className="text-center relative z-10">
                <motion.div 
                  className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Clock className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Smart Scheduling</h4>
                <p className="text-gray-600">Never forget important dates again</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div
              className="flex justify-center mb-6"
              variants={itemVariants}
            >
              <motion.div
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Gift className="w-8 h-8 text-blue-700" />
              </motion.div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6"
              variants={itemVariants}
            >
              {t('services.hero.title')}
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-4 sm:px-0"
              variants={itemVariants}
            >
              {t('services.hero.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {t.raw('services.features').map((feature: string, index: number) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-2 right-2 text-primary-200 opacity-30">
                  <Heart className="w-8 h-8" />
                </div>
                
                <motion.div 
                  className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {serviceIcons[index % serviceIcons.length]}
                </motion.div>
                <p className="text-gray-700 relative z-10">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-blue-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="flex justify-center mb-6"
              variants={itemVariants}
            >
              <motion.div
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Download className="w-8 h-8 text-blue-700" />
              </motion.div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6"
              variants={itemVariants}
            >
              {t('download.title')}
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0"
              variants={itemVariants}
            >
              {t('download.subtitle')}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0"
              variants={containerVariants}
            >
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center shadow-lg w-full sm:w-auto"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {t('download.ios')}
              </motion.button>
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg w-full sm:w-auto"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                {t('download.android')}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scheduling Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-md w-full max-h-[95vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Schedule Delivery</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {modalStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={formData.recipientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter recipient name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter delivery address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Date
                    </label>
                    <input
                      type="datetime-local"
                      onChange={(e) => setFormData(prev => ({ ...prev, date: new Date(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Note (Optional)
                    </label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Add a personal note"
                    />
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}

              {modalStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <button
                      onClick={handleBack}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ChevronUp className="w-5 h-5 rotate-90" />
                    </button>
                    <h4 className="text-lg font-semibold">Add-ons</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(formData.addOns).map(([key, value]) => (
                      <label key={key} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            addOns: { ...prev.addOns, [key]: e.target.checked }
                          }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700 capitalize">{key}</span>
                      </label>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleBack}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {modalStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <button
                      onClick={handleBack}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ChevronUp className="w-5 h-5 rotate-90" />
                    </button>
                    <h4 className="text-lg font-semibold">Choose Option</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleSaveEvent('yearly')}
                      className="w-full flex items-center space-x-3 bg-blue-50 border border-blue-200 p-4 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <div className="text-left">
                        <div className="font-semibold text-blue-900">Yearly Subscription</div>
                        <div className="text-sm text-blue-700">Schedule for every year</div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleSaveEvent('purchased')}
                      className="w-full flex items-center space-x-3 bg-green-50 border border-green-200 p-4 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <ShoppingCart className="w-6 h-6 text-green-600" />
                      <div className="text-left">
                        <div className="font-semibold text-green-900">One-time Purchase</div>
                        <div className="text-sm text-green-700">Buy now</div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleSaveEvent('draft')}
                      className="w-full flex items-center space-x-3 bg-gray-50 border border-gray-200 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="w-6 h-6 text-gray-600" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Save as Draft</div>
                        <div className="text-sm text-gray-700">Save for later</div>
                      </div>
                    </button>
                  </div>
                  
                  <button
                    onClick={handleBack}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 