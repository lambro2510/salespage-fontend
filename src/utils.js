import { notification } from "antd";
import { store } from "./redux/store";
import { logout } from "./redux/authSlide";
import { useNavigate } from "react-router-dom";

export function getErrorFromResponse(error) {
  if (error.response.status === 401) {
    store.dispatch(logout());
    notification.error({ message: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!" });
  } else {
    notification.error({ message: "Lỗi hệ thống, vui lòng thử lại sau!" })
  }
}

export function notificationFromResponse(response) {
  if (response?.error === true) {
    if (response?.message) {
      notification.error({
        message: response.message,
      });
    } else {
      notification.error({
        message: 'Hệ thống đang bảo trì, vui lòng thử lại sau.',
      });
    }
  } else {
    if (response?.message) {
      notification.success({
        message: response.message,
      });
    }
  }
  return response?.data;
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
  const token = store.getState().auth.token;
  return {
    Authorization: `Bearer ${token}`
  };
}



export function useLogoutAndNavigate() {
  const navigate = useNavigate();
  return () => {
    store.dispatch(logout());
    notification.error({ message: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!" });
    navigate('/login');
  };
}
