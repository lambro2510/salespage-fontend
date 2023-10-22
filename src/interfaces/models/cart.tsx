export interface CartResponseInterface extends CartResponse{
    isSelected : boolean;
}

export interface CartByStoreResponseInterface {
    storeId: string;
    storeName: string;
    cartResponses: CartResponseInterface[];
    combos: ProductComboDetailResponse[];
    bestCombo: ProductComboDetailResponse | undefined;
}
export interface CartPaymentDto {
    comboId : string | undefined;
    note : string | undefined;
    transaction : CartPaymentTransaction[] | [{}]
}

export interface CartPaymentTransaction {
    productDetailId : string;
    storeId : string;
    voucherCodeId : string | undefined;
    note : string | undefined;
    address : string;
}