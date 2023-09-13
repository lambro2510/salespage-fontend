export interface User {
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
}

export interface UserDetail {
  id: string,
  username: string,
  email?: string,
  phoneNumber: string,
  displayName: string,
  dateOfBirth?: string,
  firstName?: string,
  lastName?: string,
  imageUrl?: string,
  rate: {
    totalPoint: number,
    totalRate: number,
    avgPoint: number
  },
  balance: {
    type: string,
    money: number
  }
}