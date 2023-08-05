import { message } from "antd";
import { store } from "./redux/store";
import { logout } from "./redux/authSlice";
import { loginError, paymentError } from "./redux/modalVisibleSlice";
import { useNavigate } from "react-router-dom";

export function getErrorFromResponse(error) {
  if (error.response.status === 401) {
    store.dispatch(loginError(true));
    localStorage.removeItem('token');
  } else {
    message.error("Lỗi hệ thống, vui lòng thử lại sau!");
  }
}

export function notificationFromResponse(response) {
  if (response?.error === true) {
    if (response?.code === 1) {
      store.dispatch(paymentError(true));
    }

    if (response?.message) {
      message.error(response.message);
    } else {
      message.error('Hệ thống đang bảo trì, vui lòng thử lại sau.');
    }
  } else {
    if (response?.message) {
      message.success(response.message);
    }
  }
  return response?.data;
}

export function formatCurrency(number) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  });

  return formatter.format(number);
}

export function getMessageFromError(message) {
  const regex = /default message \[(.*?)\]/g;
  const matches = message.match(regex);
  if (matches === null) {
    return "Lỗi hệ thống, vui lòng thử lại sau.";
  }
  const lastErrorMessage = matches[matches.length - 1].replace(/default message |\[|\]/g, '');
  return lastErrorMessage;
}

export function Authorization() {
  let token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`
  };
}

