export const getToken = () => localStorage.getItem('token')
export const setToken = (token) => localStorage.setItem('token', token)
export const deleteToken = () => localStorage.removeItem('token')

export const getLanguage = () => localStorage.getItem('language')
export const setLanguage = (language) => localStorage.setItem('language', language)
