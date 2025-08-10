export interface BasketItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  image_url: string;
  quantity: number;
  category: { name: string };
}

export interface FavoriteItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  image_url: string;
  category: { name: string };
}

// Basket operations
export const getBasket = (): BasketItem[] => {
  if (typeof window === 'undefined') return [];
  const basket = localStorage.getItem('basket');
  return basket ? JSON.parse(basket) : [];
};

export const addToBasket = (item: Omit<BasketItem, 'quantity'>): void => {
  if (typeof window === 'undefined') return;
  
  const basket = getBasket();
  const existingItem = basket.find(basketItem => basketItem.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    basket.push({ ...item, quantity: 1 });
  }
  
  localStorage.setItem('basket', JSON.stringify(basket));
};

export const removeFromBasket = (itemId: number): void => {
  if (typeof window === 'undefined') return;
  
  const basket = getBasket();
  const updatedBasket = basket.filter(item => item.id !== itemId);
  localStorage.setItem('basket', JSON.stringify(updatedBasket));
};

export const updateBasketItemQuantity = (itemId: number, quantity: number): void => {
  if (typeof window === 'undefined') return;
  
  const basket = getBasket();
  const item = basket.find(basketItem => basketItem.id === itemId);
  
  if (item) {
    if (quantity <= 0) {
      removeFromBasket(itemId);
    } else {
      item.quantity = quantity;
      localStorage.setItem('basket', JSON.stringify(basket));
    }
  }
};

export const clearBasket = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('basket');
};

export const getBasketTotal = (): number => {
  const basket = getBasket();
  return basket.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getBasketItemCount = (): number => {
  const basket = getBasket();
  return basket.reduce((total, item) => total + item.quantity, 0);
};

export const isInBasket = (itemId: number): boolean => {
  const basket = getBasket();
  return basket.some(item => item.id === itemId);
};

// Favorites operations
export const getFavorites = (): FavoriteItem[] => {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (item: FavoriteItem): void => {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  if (!favorites.find(fav => fav.id === item.id)) {
    favorites.push(item);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (itemId: number): void => {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(item => item.id !== itemId);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const isFavorite = (itemId: number): boolean => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === itemId);
};

export const toggleFavorite = (item: FavoriteItem): void => {
  if (isFavorite(item.id)) {
    removeFromFavorites(item.id);
  } else {
    addToFavorites(item);
  }
}; 