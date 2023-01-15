import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    language: 'English',
    profile: {
        username: ''
    },
    token: ''
};

const store = configureStore({
    reducer: {
        language: (state = initialState.language, action) => {
            switch (action.type) {
                case 'SET_LANGUAGE':
                    return action.payload;
                case 'SET_PROFILE':
                    return action.payload;
                case 'SET_TOKEN':
                    return action.payload;
                default:
                    return state;
            }
        }
    }
});

export default store;
