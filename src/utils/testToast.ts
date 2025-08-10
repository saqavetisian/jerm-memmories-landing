import toast from 'react-hot-toast';

export function testToastMessages() {
  // Test different types of toast messages
  toast.success('Success message test!', {
    duration: 3000,
    position: 'top-right',
  });
  
  toast.error('Error message test!', {
    duration: 5000,
    position: 'top-right',
  });
  
  toast('Info message test!', {
    duration: 3000,
    position: 'top-right',
  });
}

export function showValidationError(field: string, message: string) {
  toast.error(`${field}: ${message}`, {
    duration: 5000,
    position: 'top-right',
  });
}

export function showSuccessMessage(message: string) {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
  });
} 