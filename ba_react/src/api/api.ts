import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const api: AxiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});

const getAccessToken = () => localStorage.getItem('accessToken');

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    console.log(token);
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await axios.post<{ access: string }>('/accounts/refresh-token/', {}, { withCredentials: true });
          const newAccessToken = data.access;
          localStorage.setItem('accessToken', newAccessToken);
          isRefreshing = false;
          onRefreshed(newAccessToken);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          window.location.href = '/login'; 
          return Promise.reject(refreshError);
        }
      }

      // const retryOriginalRequest = new Promise(resolve => {
      //   refreshSubscribers.push((token: string) => {
      //     originalRequest.headers['Authorization'] = `Bearer ${token}`;
      //     resolve(api(originalRequest));
      //   });
      // });
      const retryOriginalRequest = new Promise<AxiosResponse>((resolve, reject) => {
        refreshSubscribers.push((token: string) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          resolve(api(originalRequest)); // 正常なリトライ結果を返す
        });
      });
      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);

export default api;
