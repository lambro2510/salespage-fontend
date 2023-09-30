export interface Product {
    productId: string;
    productName: string;
    productPrice: number;
    categoryName?: string;
    description: string;
    productTypes: string[]; 
    productRate: {
      totalPoint: number;
      totalRate: number;
      avgPoint: number;
    };
    sellerUsername: string;
    storeName?: string;
    sellingAddress: string;
    imageUrl: string;
    storeId: string;
    categoryId: string;
    isHot: boolean;
    sellPrice : number;
    discountPercent : number;
  }

export interface ProductDetailResponse {
  productId: string;
  productName: string;
  productPrice: number ;
  sellProductPrice: number;
  discountPercent: number;
  imageUrls: UploadImageData[];
  description: string;
  rate : Rate;
  yourRate: number;
  stores: SellerStoreResponse[];
  categoryId: string;
  categoryName: string;
  origin: string;
  isForeign: boolean;
  size: number;
  sizeType: SizeType;
  weight: number;
  weightType: WeightType;
  colors: string[];
  isGuarantee: boolean;
  quantity: number;
  isLike: boolean;
  is_hot: boolean;
  totalSell: number;
  totalView: number;
}
  
interface UploadImageData {
  uid: string;
  name: string;
  status: string;
  url: string;
  thumbUrl: string;
}
  
  
  