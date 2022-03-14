import React, { createContext } from 'react';
import axios from 'axios';
const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  // Only with localStorage
  authAxios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
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
