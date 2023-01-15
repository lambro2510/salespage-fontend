// store/reducers.js

const initialState = {
    language: 'English',
    profile: {
      username : ''
    },
    token : ''
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LANGUAGE':
        return {
          ...state,
          language: action.payload,
        };
        case 'SET_PROFILE':
        return {
          ...state,
          profile: action.payload,
        };
        case 'SET_TOKEN':
        return {
          ...state,
          token: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  