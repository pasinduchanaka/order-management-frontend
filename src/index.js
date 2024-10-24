import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Set axios to a window property for easy access
window.axios = axios;

// Default headers for API calls
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Base URL for your API calls
const baseUrl = 'http://localhost:8010';

window.axios.defaults.baseURL = baseUrl + '/api';

// If a token exists in local storage, set it in axios authorization header
const token = localStorage.getItem('token');
if (token) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
// Intercept responses. If 401 error, clear token and redirect to login
axios.interceptors.response.use(
   response => response,
   error => {
      if (error.response?.status === 401) {
         if(localStorage.getItem('token')){
            localStorage.removeItem('token');
         }
         axios.defaults.headers.common['Authorization'] = 'Bearer';
      }
      return Promise.reject(error);
   }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
