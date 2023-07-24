import { createSlice } from '@reduxjs/toolkit';
export const storeSlice = createSlice({
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

export const { setSellerStore} = storeSlice.actions

export default storeSlice.reducer
