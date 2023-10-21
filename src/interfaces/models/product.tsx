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

  
interface UploadImageData {
  uid: string;
  name: string;
  status: string;
  url: string;
  thumbUrl: string;
}
  
  
  