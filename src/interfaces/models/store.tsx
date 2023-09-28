import { StoreStatus } from '../enum/StoreStatus';

export interface Store {
    storeId: string,
    storeName: string,
    address: string,
    description: string,
    status: StoreStatus,
    imageUrl: string
  }

 export interface SellerStoreResponse {
    storeId: string;
    storeName: string;
    address: string;
    description: string;
    status: StoreStatus;
    imageUrl: string;
}