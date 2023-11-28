import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const API_URL = `https://salepage-server-rherm.appengine.bfcplatform.vn/api/v1`;

// export const API_URL = `http://localhost:8080/api/v1`;
export enum NotificationType {
  ERROR = 'error',
  SUCCESS = 'success',
}

export const setPageTitle = (title: string) => {
  window.document.title = title;
};

export const showNotification = (
  message = 'Đã có lỗi xảy ra',
  type: NotificationType = NotificationType.ERROR,
  description?: string
) => {
  toast[type](message, {
    description: description,
  });
};

export const handleErrorResponse = (
  error: any,
  callback?: () => void,
  errorMessage?: string
) => {
  console.error(error);

  if (!errorMessage) {
    errorMessage = 'Đã có lỗi xảy ra';

    if (typeof error === 'string') {
      try {
        error = JSON.parse(error);
      } catch (error) {
        // do nothing
      }
    }

    if (error instanceof AxiosError && error?.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error?.message) {
      errorMessage = error.message;
    }
  }

  showNotification(
    errorMessage &&
    errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1),
    NotificationType.ERROR
  );

  if (callback) {
    return callback();
  }
};

// export function formatCurrency(amount: any | undefined, currencyCode = 'VND') {
//   if (typeof amount === 'number') {
//     return new Intl.NumberFormat('vi-VN', {
//       style: 'currency',
//       currency: currencyCode,
//     }).format(amount);
//   } else {
//     return amount;
//   }
// }

export function formatCurrency(amount : any) {
  // Kiểm tra nếu amount là số
  if (typeof amount === 'number') {
    // Định dạng số tiền theo yêu cầu
    if (amount >= 10000000) {
      return (amount / 1000000).toFixed(1) + ' tr đ';
    } else {
      return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    }
  } else {
    // Nếu không phải số, trả về giá trị không thay đổi
    return amount;
  }
}
export function formatQuantity(amount: number) {
  if (amount > 1000) {
    return amount / 1000 + ' k';
  } else {
    return amount;
  }
}
