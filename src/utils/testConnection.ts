import api from './api';

export async function testBackendConnection() {
  try {
    // Test basic API connection
    const response = await api.get('/guest/orders');
    console.log('Backend connection successful:', response);
    return true;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return false;
  }
}

export async function testGuestOrderCreation() {
  try {
    const testOrder = {
      guestInfo: {
        name: "Test User",
        email: "test@example.com",
        phone: "+37412345678"
      },
      basketItems: [
        {
          id: 1,
          quantity: 1,
          price: 5000,
          name: "Test Bouquet",
          image_url: "https://example.com/image.jpg"
        }
      ],
      shippingDetails: {
        recipientName: "Test Recipient",
        recipientPhone: "+37412345678",
        deliveryAddress: "Test Address",
        deliveryCity: "Yerevan",
        deliveryDate: "2024-12-25",
        deliveryTime: "morning",
        specialInstructions: "Test instructions",
        customerName: "Test User",
        customerEmail: "test@example.com",
        customerPhone: "+37412345678"
      },
      totalAmount: 5000
    };

    const response = await api.post('/guest/orders', testOrder);
    console.log('Guest order creation test successful:', response);
    return response;
  } catch (error) {
    console.error('Guest order creation test failed:', error);
    throw error;
  }
} 