// store/actions.js

export const setLanguage = language => ({
    type: 'SET_LANGUAGE',
    payload: language,
  });
  
export const setProfile = profile => ({
  type: "SET_PROFILE",
  payload: profile,
})

export const setToken = token => ({
  type: "SET_TOKEN",
  payload: token,
})