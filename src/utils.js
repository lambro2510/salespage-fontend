import { notification } from "antd";

export function getErrorFromResponse(error) {
    if(error.response.status === 401){
      notification.error({ message: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!" });
      throw new Error('Login')
    }
    if (error.response.data.code === 1001) {
      notification.error({message : getMessageFromError(error.response.data.message)})
      throw new Error(getMessageFromError(error.response.data.message))
    } else if (error.response.data.code === 1005 | 1000) {
      throw new Error(error.response.data.message)
    } else {
      notification.error({message : "Lỗi hệ thống, vui lòng thử lại sau!"})
      throw new Error('Server error')
    }
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