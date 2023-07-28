import { createSlice } from '@reduxjs/toolkit';
export const typeSlice = createSlice({
    name: 'type',
    initialState: {
        productType: []
    },
    reducers: {
        setProductType: (state, action) => {
            state.productType = action.payload;
        },
    }
})

export const { setProductType} = typeSlice.actions

export default typeSlice.reducer
