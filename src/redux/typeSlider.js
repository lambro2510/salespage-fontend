import { createSlice } from '@reduxjs/toolkit';
export const typeSlide = createSlice({
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

export const { setProductType} = typeSlide.actions

export default typeSlide.reducer
