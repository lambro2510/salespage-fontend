export interface ProductTransactionResponse {
    selected: boolean;
    transactionId: string;
    productId: string;
    productName: string;
    productImageUrl: string;
    sellerName: string;
    buyerName: string;
    storeId: string;
    storeName: string;
    address: string;
    note: string;
    quantity: number;
    isUseVoucher: boolean;
    productTransactionState: ProductTransactionState;
    voucherInfo: VoucherInfo;
    total_price: number;
    price: number;
    created_at: Date;
}