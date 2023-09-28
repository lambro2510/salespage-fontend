/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2023-09-28 23:03:24.

interface CreatePaymentDto {
    bankAccountId: string;
    amount: number;
}

interface UserFavoriteDto {
    refId: string;
    favoriteType: FavoriteType;
    isLike: boolean;
}

interface CheckInDto {
    status: boolean;
    longitude: string;
    latitude: string;
}

interface LoginDto {
    username: string;
    password: string;
}

interface LogoutDto {
    refreshToken: string;
}

interface SignUpDto {
    username: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    userRole: UserRole;
}

interface BankAccountInfoRequest {
    bin: string;
    accountNumber: string;
}

interface BankDto {
    error: number;
    data: TransactionData[];
}

interface GenQrCodeDto {
    accountNo: string;
    accountName: string;
    acqId: string;
    amount: number;
    addInfo: string;
    format: string;
    template: string;
}

interface Oath2CassoDto {
    scope: string;
    state: string;
    client_id: string;
    redirect_uri: string;
    response_type: string;
}

interface TransactionData {
    postingDate: Date;
    transactionDate: Date;
    accountNo: string;
    creditAmount: number;
    debitAmount: number;
    currency: string;
    description: string;
    availableBalance: number;
    beneficiaryAccount: string;
    refNo: string;
    benAccountName: string;
    bankName: string;
    benAccountNo: string;
}

interface CreateProductCategoryTypeDto {
    categoryName: string;
    categoryType: CategoryType;
    description: string;
    rangeAge: string;
    productType: string;
}

interface CreateProductInfoDto {
    productName: string;
    description: string;
    categoryId: string;
    productPrice: number;
    storeIds: string[];
    origin: string;
    isForeign: boolean;
    size: number;
    sizeType: SizeType;
    weight: number;
    weightType: WeightType;
    colors: string[];
    isGuarantee: boolean;
    quantity: number;
    discountPercent: number;
}

interface ProductDto extends ProductInfoDto {
    productId: string;
}

interface ProductInfoDto extends CreateProductInfoDto {
    imageUrl: string;
}

interface ProductTypeDetailDto {
    productId: string;
    typeName: string;
    typeDetailName: string;
    note: string;
}

interface ProductTypeDto {
    productType: string;
    typeName: string;
    description: string;
    status: ProductTypeStatus;
}

interface UpdateProductCategoryTypeDto extends CreateProductCategoryTypeDto {
    id: string;
}

interface UpdateTypeDetailStatusDto {
    id: string;
    status: ProductTypeDetailStatus;
}

interface ProductTransactionDto extends ProductTransactionInfoDto {
    productId: string;
    storeId: string;
    voucherCode: string;
}

interface ProductTransactionInfoDto {
    quantity: number;
    note: string;
    address: string;
}

interface SellerStoreDto {
    storeName: string;
    address: string;
    description: string;
    status: StoreStatus;
    location: string;
}

interface UpdateSellerStoreDto extends SellerStoreDto {
    storeId: string;
}

interface UserInfoDto {
    displayName: string;
    phoneNumber: string;
    imageUrl: string;
}

interface CreateVoucherStoreDto extends UpdateVoucherStoreDto {
    refId: string;
}

interface UpdateVoucherStoreDto {
    voucherStoreName: string;
    voucherStoreType: VoucherStoreType;
    discountType: DiscountType;
    voucherStoreStatus: VoucherStoreStatus;
    value: number;
    valuePercent: number;
    maxAblePrice: number;
    minAblePrice: number;
    maxVoucherPerUser: number;
}

interface BankAccountData {
    accountName: string;
}

interface BankAccountResponse {
    bankAccountId: string;
    username: string;
    accountNo: string;
    bankId: number;
    bin: string;
    bankName: string;
    bankLogoUrl: string;
    bankFullName: string;
    bankAccountName: string;
    status: BankStatus;
    moneyIn: number;
    moneyOut: number;
}

interface BankListData {
    id: number;
    name: string;
    code: string;
    bin: string;
    shortName: string;
    logo: string;
    transferSupported: number;
    lookupSupported: number;
    support: number;
    isTransfer: number;
    /**
     * Bank short name
     */
    short_name: string;
    swift_code: string;
}

interface BankPaymentResponse {
    bin: string;
    bankName: string;
    bankShortName: string;
    bankAccount: string;
}

interface MbBankTransaction {
    success: boolean;
    message: string;
    data: Transaction[];
}

interface QrData {
    qrCode: string;
    qrDataURL: string;
}

interface VietQrResponse<T> {
    code: string;
    desc: string;
    data: T;
}

interface BaseResponse<T> {
    errorCode: number;
    error: boolean;
    message: string;
    data: T;
}

interface FavoriteResponse {
    type: FavoriteType;
    refId: string;
    name: string;
}

interface InfoResponse {
    code: number;
    message: string;
}

interface JwtResponse {
    username: string;
    token: string;
    role: UserRole;
}

interface Metadata {
    total: number;
    totalPages: number;
}

interface PageResponse<T> {
    data: T[];
    metadata: Metadata;
}

interface PaymentResponse {
    paymentId: string;
    bankName: string;
    bankAccountName: string;
    amount: string;
    createdAt: Date;
}

interface ProductCategoryResponse {
    categoryId: string;
    categoryName: string;
    categoryType: CategoryType;
    description: string;
    timeType: TimeType;
    timeValue: number;
    productType: string;
}

interface ProductDataResponse {
    productId: string;
    productName: string;
    productPrice: number;
    categoryName: string;
    description: string;
    productTypes: string[];
    productRate: Rate;
    sellerUsername: string;
    discountPercent: number;
    sellPrice: number;
    imageUrl: string;
    stores: SellerStoreResponse[];
    categoryId: string;
    isHot: boolean;
}

interface ProductDetailResponse {
    productId: string;
    productName: string;
    productPrice: number;
    sellProductPrice: number;
    discountPercent: number;
    imageUrls: UploadImageData[];
    description: string;
    rate: Rate;
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
}

interface ProductTypeResponse {
    value: string;
    label: string;
}

interface TotalProductStatisticResponse {
    productId: string;
    productName: string;
    totalUser: number;
    totalPurchase: number;
    totalView: number;
    totalBuy: number;
    totalShipCod: number;
    dailies: Daily[];
}

interface UploadImageData {
    uid: string;
    name: string;
    status: string;
    url: string;
    thumbUrl: string;
}

interface UserResponse {
}

interface NotificationDetailResponse extends NotificationResponse {
    content: string;
}

interface NotificationResponse {
    id: string;
    title: string;
    created: Date;
    status: NotificationStatus;
}

interface SellerStoreResponse {
    storeId: string;
    storeName: string;
    address: string;
    description: string;
    status: StoreStatus;
    imageUrl: string;
}

interface DistinctProductResponse {
    productId: string;
}

interface PaymentTransactionResponse {
    paymentId: string;
    status: PaymentStatus;
    bankName: string;
    bankAccountNo: string;
    bankAccountName: string;
    amount: number;
    type: PaymentType;
    created: Date;
}

interface ProductTransactionResponse {
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
    created_at: Date;
}

interface TotalStatisticResponse {
    totalPrice: number;
    quantity: number;
}

interface ListVoucherCodeResponse {
    voucherCodes: VoucherCodeResponse[];
    voucherStoreId: string;
    voucherStoreName: string;
    voucherStoreStatus: VoucherStoreStatus;
}

interface UserVoucherResponse {
    voucherStoreName: string;
    voucherCode: string;
    minPrice: number;
    maxPrice: number;
    value: number;
    discountType: DiscountType;
    storeType: VoucherStoreType;
    dayToExpireTime: number;
}

interface VoucherCodeResponse {
    voucherCode: string;
    voucherCodeStatus: VoucherCodeStatus;
    usedBy: string;
    usedAt: Date;
    expireTime: Date;
}

interface VoucherStoreResponse {
    voucherStoreId: string;
    voucherStoreName: string;
    totalQuantity: number;
    totalUsed: number;
    voucherStoreStatus: VoucherStoreStatus;
    voucherStoreType: VoucherStoreType;
    discountType: DiscountType;
    refId: string;
    value: number;
}

interface Transaction {
    postingDate: string;
    transactionDate: string;
    dueDate: Date;
    accountNo: string;
    creditAmount: number;
    debitAmount: number;
    currency: string;
    description: string;
    availableBalance: number;
    beneficiaryAccount: string;
    refNo: string;
    benAccountName: string;
    bankName: string;
    benAccountNo: string;
    transactionType: string;
    docId: string;
}

interface Rate {
    totalPoint: number;
    totalRate: number;
    avgPoint: number;
}

interface Daily {
    daily: Date;
    totalUser: number;
    totalPurchase: number;
    totalView: number;
    totalBuy: number;
    totalShipCod: number;
}

interface VoucherInfo {
    voucherCode: string;
    voucherStoreType: VoucherStoreType;
    discountType: DiscountType;
    totalDiscount: number;
    priceBefore: number;
    priceAfter: number;
}

type FavoriteType = "PRODUCT" | "STORE" | "SELLER" | "SHIPPER";

type UserRole = "ADMIN" | "OPERATOR" | "SHIPPER" | "USER" | "SELLER";

type CategoryType = "VERY_SMALL" | "SMALL" | "BIG" | "LARGE" | "SUPPER_LARGE";

type SizeType = "CENTIMES" | "MES";

type WeightType = "KILOGRAM" | "GRAM";

type ProductTypeStatus = "ACTIVE" | "INACTIVE";

type ProductTypeDetailStatus = "ACTIVE" | "WAITING" | "DENY" | "INACTIVE";

type StoreStatus = "ACTIVE" | "INACTIVE";

type VoucherStoreType = "PRODUCT" | "STORE";

type DiscountType = "PERCENT" | "TOTAL" | "PER_PRODUCT";

type VoucherStoreStatus = "ACTIVE" | "INACTIVE";

type BankStatus = "ACTIVE" | "INACTIVE" | "DISCONNECT";

type TimeType = "MINUTE" | "HOUR" | "DAY" | "WEEK" | "MONTH";

type NotificationStatus = "SEEN" | "NOT_SEEN";

type PaymentStatus = "WAITING" | "RESOLVE" | "PENDING" | "CANCEL";

type PaymentType = "IN" | "OUT";

type ProductTransactionState = "WAITING_STORE" | "ACCEPT_STORE" | "WAITING_SHIPPER" | "SHIPPER_PROCESSING" | "SHIPPER_COMPLETE" | "ALL_COMPLETE" | "CANCEL";

type VoucherCodeStatus = "NEW" | "OWNER" | "USED" | "EXPIRE";
