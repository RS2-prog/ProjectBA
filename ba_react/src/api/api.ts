import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// axiosインスタンス
const api: AxiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
});

// アクセストークン取得
const getAccessToken = () => localStorage.getItem('access');

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

// リクエスト
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// レスポンス処理
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Got 401 error:", originalRequest.url, " _retry:", originalRequest._retry);
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await axios.post<{ access: string }>('/accounts/refresh-token/', {}, { withCredentials: true });
          const newAccessToken = data.access;
          localStorage.setItem('access', newAccessToken);
          isRefreshing = false;
          //onRefreshed(newAccessToken);
          const token = getAccessToken();
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          localStorage.removeItem('access');
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
          console.log("Subscriber callback called with token:", token);
          // ヘッダーが正しく入っているかどうかもログ
          console.log("originalRequest before setting auth:", originalRequest);
          
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          console.log("originalRequest after setting auth:", originalRequest);
          
          resolve(
            api(originalRequest)
              .then((res) => {
                return res;
              })
              .catch((err) => {
                throw err;
              })
          ); 
        });
      });
      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);

export default api;
