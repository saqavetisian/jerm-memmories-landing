import api from './api';

export interface GuestInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface BasketItem {
  id: number;
  quantity: number;
  price: number;
  name: string;
  image_url: string;
}

export interface ShippingDetails {
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryDate: string;
  deliveryTime: string;
  specialInstructions?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface CreateGuestOrderRequest {
  guestInfo: GuestInfo;
  basketItems: BasketItem[];
  shippingDetails: ShippingDetails;
  totalAmount: number;
}

export interface GuestOrderResponse {
  success: boolean;
  message: string;
  data: {
    orderId: number;
    guestId: number;
    totalAmount: number;
    status: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data: {
    paymentId: string;
    redirectUrl: string;
    orderId: number;
    amount: number;
  };
}

class GuestOrderApi {
  /**
   * Create a new guest order
   */
  async createOrder(orderData: CreateGuestOrderRequest): Promise<GuestOrderResponse> {
    return api.post<GuestOrderResponse>('/guest/orders', orderData);
  }

  /**
   * Process payment for a guest order
   */
  async processPayment(orderId: number, cardId?: string): Promise<PaymentResponse> {
    return api.post<PaymentResponse>(`/guest/orders/${orderId}/payment`, { cardId });
  }

  /**
   * Get guest order details
   */
  async getOrder(orderId: number) {
    return api.get(`/guest/orders/${orderId}`);
  }

  /**
   * Cancel guest order payment
   */
  async cancelPayment(orderId: number) {
    return api.delete(`/guest/orders/${orderId}/payment`);
  }
}

export const guestOrderApi = new GuestOrderApi(); 