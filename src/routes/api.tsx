import { API_URL } from '../utils';

export const apiRoutes = {

  account: `${API_URL}/account`,

  login: `${API_URL}/account/sign-in`,

  register: `${API_URL}/account/sign-up`,

  logout: `${API_URL}/logout`,

  verify: `${API_URL}/account/verify`,

  user: `${API_URL}/user`,

  reviews: `${API_URL}/unknown`,

  orderHistories: `${API_URL}/seller/product-transaction`,

  products: `${API_URL}/public/product`,

  publicRating: `${API_URL}/public/rating`,

  products_detail: `${API_URL}/public/product-detail`,

  productTransaction: `${API_URL}/product-transaction`,

  cart: `${API_URL}/cart`,

  stores: `${API_URL}/public/seller-store`,

  categories: `${API_URL}/seller/product-category`,

  maps : `${API_URL}/public/map`,

  payment : `${API_URL}/payment`,

  notification : `${API_URL}/notification`,
  
  bank : `${API_URL}/bank`,

  rating: `${API_URL}/rating`,

  public_voucher : `${API_URL}/public/voucher`,

  voucher : `${API_URL}/voucher`,
};
