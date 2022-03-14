import React, { createContext } from 'react';
import axios from 'axios';
// import { AuthContext } from './AuthContext'
const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  //const authContext = useContext(AuthContext);   // Only with localStorage

  const authAxios = axios.create({
    // baseURL: 'https://gammer-api.herokuapp.com/api'
    baseURL: process.env.REACT_APP_API_URL
  });

  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await authAxios.get('csrf-token');
  //     console.log(data);
  //     authAxios.defaults.headers['X-CSRF-Token'] = data.csrfToken
  //   };

  //   getCsrfToken();
  // }, [authAxios])

  // Only with localStorage
  authAxios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      // config.headers.Authorization = `Bearer ${authContext.authState.token}`;
      return config
    },
    error => {
      return Promise.reject(error);
    }
  )

  return (
    <Provider
      value={{
        authAxios
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
