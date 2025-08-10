'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  BasketItem, 
  FavoriteItem, 
  getBasket, 
  getFavorites, 
  getBasketTotal, 
  getBasketItemCount 
} from '@/utils/localStorage';

interface BasketContextType {
  basket: BasketItem[];
  favorites: FavoriteItem[];
  basketTotal: number;
  basketItemCount: number;
  refreshBasket: () => void;
  refreshFavorites: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};

interface BasketProviderProps {
  children: React.ReactNode;
}

export const BasketProvider: React.FC<BasketProviderProps> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [basketTotal, setBasketTotal] = useState(0);
  const [basketItemCount, setBasketItemCount] = useState(0);

  const refreshBasket = () => {
    const currentBasket = getBasket();
    setBasket(currentBasket);
    setBasketTotal(getBasketTotal());
    setBasketItemCount(getBasketItemCount());
  };

  const refreshFavorites = () => {
    const currentFavorites = getFavorites();
    setFavorites(currentFavorites);
  };

  // Listen for storage changes (when basket is updated from other tabs/windows)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'basket') {
        refreshBasket();
      }
      if (e.key === 'favorites') {
        refreshFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Initial load
    refreshBasket();
    refreshFavorites();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value: BasketContextType = {
    basket,
    favorites,
    basketTotal,
    basketItemCount,
    refreshBasket,
    refreshFavorites,
  };

  return (
    <BasketContext.Provider value={value}>
      {children}
    </BasketContext.Provider>
  );
}; 