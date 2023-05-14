import { createSlice } from '@reduxjs/toolkit';
export const storeSlide = createSlice({
    name: 'store',
    initialState: {
        sellerStore: []
    },
    reducers: {
        setSellerStore: (state, action) => {
            state.sellerStore = action.payload;
        },
    }
})

export const { setSellerStore} = storeSlide.actions

export default storeSlide.reducer
