import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { notification } from "antd";

const instance: AxiosInstance = axios.create({
  baseURL: "/api/v1",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    /**
     * Set Headers
     */
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";

    // prettier-ignore
    // @ts-ignore
    config.headers["X-API-KEY"] = "ac531a937f740242868895cbf80855691d19fac1d42336952c8b3518fdecf7841cffe026e6a4174d8332d331d6aa27a591e03e7e670969c43fcfbfff4c714ce9";

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      const { status } = error.response;

      if (status === 500) {
        notification.error({
          message: "Error",
          description: "Server error occured!",
        });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
