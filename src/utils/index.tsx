import { AxiosError } from 'axios';
import { toast } from 'sonner';


// export const API_URL = `https://salepage-server-rherm.appengine.bfcplatform.vn/api/v1`;
export const API_URL = `https://sale-api.luckypresent.com.vn/api/v1`;
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
      return (amount / 1000000).toFixed(1) + 'tr đ';
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

export function convertUTCToVietnamTime(utcTimestamp : number) {
  const utcDate = new Date(utcTimestamp);

  // Chuyển múi giờ sang múi giờ Việt Nam (UTC+7)
  const vietnamDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

  // Trích xuất thông tin ngày và giờ
  const year = vietnamDate.getFullYear();
  const month = ('0' + (vietnamDate.getMonth() + 1)).slice(-2);
  const day = ('0' + vietnamDate.getDate()).slice(-2);
  const hours = ('0' + vietnamDate.getHours()).slice(-2);
  const minutes = ('0' + vietnamDate.getMinutes()).slice(-2);
  const seconds = ('0' + vietnamDate.getSeconds()).slice(-2);

  // Tạo chuỗi định dạng
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

export function convertToVietnamTime(vnTimestamp : number) {

  const vietnamDate = new Date(vnTimestamp);

  // Trích xuất thông tin ngày và giờ
  const year = vietnamDate.getFullYear();
  const month = ('0' + (vietnamDate.getMonth() + 1)).slice(-2);
  const day = ('0' + vietnamDate.getDate()).slice(-2);
  const hours = ('0' + vietnamDate.getHours()).slice(-2);
  const minutes = ('0' + vietnamDate.getMinutes()).slice(-2);
  const seconds = ('0' + vietnamDate.getSeconds()).slice(-2);

  // Tạo chuỗi định dạng
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} `;

  return formattedDateTime;
}

export function formatTimeDifference(longMillis: number): string {
  const currentMillisUTC = new Date().getTime();
  const timeDifference = currentMillisUTC - longMillis;
  const secondsUntilTarget = timeDifference / 1000;

  if (secondsUntilTarget < 60) {
      // Nếu nhỏ hơn 1 phút, hiển thị số giây
      return `${Math.floor(secondsUntilTarget)} giây trước`;
  } else if (secondsUntilTarget < 3600) {
      // Nếu nhỏ hơn 1 giờ, hiển thị số phút
      const minutes = Math.floor(secondsUntilTarget / 60);
      return `${minutes} phút trước`;
  } else if (secondsUntilTarget < 86400) {
      // Nếu nhỏ hơn 1 ngày, hiển thị số giờ
      const hours = Math.floor(secondsUntilTarget / 3600);
      return `${hours} giờ trước`;
  } else {
      // Nếu lớn hơn 1 ngày, hiển thị số ngày của longMillis
      const date = new Date(longMillis);
      const days = date.getDate();
      return `${days}`;
  }
}