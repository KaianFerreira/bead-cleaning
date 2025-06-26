import axios from 'axios';
export const api = axios.create({
    baseURL: 'https://163.243.60.82/slim-webapi',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});



const setAuthHeader = (config: any) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}

api.interceptors.request.use(setAuthHeader)


export const setBearerToken = (token: string) => {
  if (token) {
    console.log('Setting Bearer Token:', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config.url?.includes('check-logon')) {
            localStorage.removeItem('authToken');
            delete api.defaults.headers.common['Authorization'];
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);