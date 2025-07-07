import { RouterService } from '../router.service';
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://akrgmitcti002.na.goodyear.com/slim-webapi',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

const publicRoutes = [
    '/auth/login',
    '/auth/check-logon'
];

const setAuthHeader = (config: any) => {
    // Check if the request is for a public route
    const isPublicRoute = publicRoutes.some(route => 
        config.url?.includes(route)
    );

    const token = localStorage.getItem('authToken');
    
    // If not a public route and no token exists, reject the request
    if (!isPublicRoute && !token) {
        const router = getRouterInstance();
        router.navigate(['/login']);
        
        // Cancel the request
        return Promise.reject(new axios.Cancel('No authentication token available'));
    }
    
    // Add token to the request header if it exists
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
}

api.interceptors.request.use(setAuthHeader)

// api.defaults.withCredentials = true;

api.interceptors.request.use(
    setAuthHeader,
    error => Promise.reject(error)
);

export const setBearerToken = (token: string) => {
  if (token) {
    console.log('Setting Bearer Token:', token);
    token = token.replace(/"/g, '');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const router = getRouterInstance();

        if (error.response?.status === 401 && !error.config.url?.includes('check-logon')) {
            localStorage.removeItem('authToken');
            delete api.defaults.headers.common['Authorization'];
            router.navigate(['/login']);
        }
        return Promise.reject(error);
    }
);

const getRouterInstance = () => {
    const router = RouterService.getRouter();
    if (!router) {
        throw new Error('Router instance not found. Ensure RouterService is properly initialized.');
    }
    return router;
}

