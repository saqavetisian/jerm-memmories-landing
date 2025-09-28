'use client';

import { motion } from 'framer-motion';
import { 
  Heart, 
  Gift, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Briefcase,
  Cake,
  HeartHandshake
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const t = useTranslations();
  const [activeService, setActiveService] = useState('weddings');

  const services = [
    {
      id: 'weddings',
      title: t('services.weddings.title'),
      subtitle: t('services.weddings.subtitle'),
      description: t('services.weddings.description'),
      icon: <HeartHandshake className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      features: [
        t('services.weddings.features.bridalBouquet'),
        t('services.weddings.features.ceremonyDecor'),
        t('services.weddings.features.receptionCenterpieces'),
        t('services.weddings.features.boutonnieres'),
        t('services.weddings.features.flowerGirlBasket'),
        t('services.weddings.features.archDecorations')
      ],
      packages: [
        {
          name: t('services.weddings.packages.basic.name'),
          price: t('services.weddings.packages.basic.price'),
          features: [
            t('services.weddings.packages.basic.bridalBouquet'),
            t('services.weddings.packages.basic.boutonnieres'),
            t('services.weddings.packages.basic.consultation')
          ]
        },
        {
          name: t('services.weddings.packages.premium.name'),
          price: t('services.weddings.packages.premium.price'),
          features: [
            t('services.weddings.packages.premium.everything'),
            t('services.weddings.packages.premium.ceremonyDecor'),
            t('services.weddings.packages.premium.receptionCenterpieces'),
            t('services.weddings.packages.premium.setup')
          ]
        },
        {
          name: t('services.weddings.packages.luxury.name'),
          price: t('services.weddings.packages.luxury.price'),
          features: [
            t('services.weddings.packages.luxury.everything'),
            t('services.weddings.packages.luxury.archDecorations'),
            t('services.weddings.packages.luxury.aisleRunner'),
            t('services.weddings.packages.luxury.coordination')
          ]
        }
      ]
    },
    {
      id: 'birthdays',
      title: t('services.birthdays.title'),
      subtitle: t('services.birthdays.subtitle'),
      description: t('services.birthdays.description'),
      icon: <Cake className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: [
        t('services.birthdays.features.birthdayBouquets'),
        t('services.birthdays.features.partyDecorations'),
        t('services.birthdays.features.balloonArrangements'),
        t('services.birthdays.features.centerpieces'),
        t('services.birthdays.features.giftWrapping'),
        t('services.birthdays.features.surpriseDelivery')
      ],
      packages: [
        {
          name: t('services.birthdays.packages.simple.name'),
          price: t('services.birthdays.packages.simple.price'),
          features: [
            t('services.birthdays.packages.simple.bouquet'),
            t('services.birthdays.packages.simple.card'),
            t('services.birthdays.packages.simple.delivery')
          ]
        },
        {
          name: t('services.birthdays.packages.celebration.name'),
          price: t('services.birthdays.packages.celebration.price'),
          features: [
            t('services.birthdays.packages.celebration.bouquet'),
            t('services.birthdays.packages.celebration.balloons'),
            t('services.birthdays.packages.celebration.decorations'),
            t('services.birthdays.packages.celebration.setup')
          ]
        },
        {
          name: t('services.birthdays.packages.party.name'),
          price: t('services.birthdays.packages.party.price'),
          features: [
            t('services.birthdays.packages.party.everything'),
            t('services.birthdays.packages.party.centerpieces'),
            t('services.birthdays.packages.party.arch'),
            t('services.birthdays.packages.party.coordination')
          ]
        }
      ]
    },
    {
      id: 'corporate',
      title: t('services.corporate.title'),
      subtitle: t('services.corporate.subtitle'),
      description: t('services.corporate.description'),
      icon: <Briefcase className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      features: [
        t('services.corporate.features.receptionArrangements'),
        t('services.corporate.features.conferenceDecor'),
        t('services.corporate.features.lobbyDisplays'),
        t('services.corporate.features.eventCenterpieces'),
        t('services.corporate.features.executiveGifts'),
        t('services.corporate.features.regularMaintenance')
      ],
      packages: [
        {
          name: t('services.corporate.packages.standard.name'),
          price: t('services.corporate.packages.standard.price'),
          features: [
            t('services.corporate.packages.standard.reception'),
            t('services.corporate.packages.standard.consultation'),
            t('services.corporate.packages.standard.delivery')
          ]
        },
        {
          name: t('services.corporate.packages.premium.name'),
          price: t('services.corporate.packages.premium.price'),
          features: [
            t('services.corporate.packages.premium.everything'),
            t('services.corporate.packages.premium.conference'),
            t('services.corporate.packages.premium.lobby'),
            t('services.corporate.packages.premium.maintenance')
          ]
        },
        {
          name: t('services.corporate.packages.enterprise.name'),
          price: t('services.corporate.packages.enterprise.price'),
          features: [
            t('services.corporate.packages.enterprise.everything'),
            t('services.corporate.packages.enterprise.multipleLocations'),
            t('services.corporate.packages.enterprise.regularService'),
            t('services.corporate.packages.enterprise.dedicatedManager')
          ]
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const activeServiceData = services.find(service => service.id === activeService);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.div
              key={`decoration-${index}`}
              className="absolute text-blue-200 opacity-30"
              style={{
                left: `${5 + (index * 10)}%`,
                top: `${10 + (index * 8)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            >
              <Heart className="w-12 h-12" />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              {t('services.hero.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('services.hero.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-2 text-lg text-gray-500">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>{t('services.hero.tagline')}</span>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Service Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.button
                key={service.id}
                variants={itemVariants}
                onClick={() => setActiveService(service.id)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeService === service.id
                    ? `${service.bgColor} ${service.borderColor} border-2 shadow-xl scale-105`
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
                whileHover={{ scale: activeService === service.id ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.subtitle}
                  </p>
                </div>
                
                {activeService === service.id && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Active Service Details */}
      {activeServiceData && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Service Info */}
              <div>
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${activeServiceData.bgColor} ${activeServiceData.borderColor} border mb-6`}>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${activeServiceData.color} flex items-center justify-center text-white`}>
                    {activeServiceData.icon}
                  </div>
                  <span className="font-semibold text-gray-900">{activeServiceData.title}</span>
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {activeServiceData.title}
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  {activeServiceData.description}
                </p>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {t('services.featuresInfo.title')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeServiceData.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Packages */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  {t('services.packages.title')}
                </h3>
                <div className="space-y-6">
                  {activeServiceData.packages.map((pkg, pkgIndex) => (
                    <motion.div
                      key={pkgIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: pkgIndex * 0.1, duration: 0.4 }}
                      className={`p-6 rounded-xl border-2 ${
                        pkgIndex === 1 
                          ? `${activeServiceData.bgColor} ${activeServiceData.borderColor} border-2 shadow-lg` 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold text-gray-900">{pkg.name}</h4>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-900">{pkg.price}</div>
                          {pkgIndex === 1 && (
                            <div className="text-sm text-blue-600 font-semibold mt-1">
                              {t('services.packages.popular')}
                            </div>
                          )}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('services.cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('services.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="group flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>{t('services.cta.schedule')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link href="/bouquets">
                <motion.button
                  className="group flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Gift className="w-5 h-5" />
                  <span>{t('services.cta.browse')}</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
