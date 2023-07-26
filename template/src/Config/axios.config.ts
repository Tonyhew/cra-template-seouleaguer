import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';

interface IConfig extends AxiosRequestConfig {
  headers: any
}
export interface IResponse extends AxiosResponse { }

let service: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Acess-Control-Allow-Origin': '*',
  },
  timeout: 10000,
});

// 请求拦截器
// 使用该实例发送数据前，配置的一些操作（判断是否登录等）
service.interceptors.request.use(
  (config: IConfig) => {
    if (config && config.headers) {
      let token = localStorage.getItem('userInfo')
      if (token) {
        config.headers['token'] = encodeURIComponent(token)
      }
    }

    return config;
  },
  (err: AxiosError) => {
    console.log('request:', err);
    return Promise.reject(err)
  }
);

// 响应拦截器
// 收到服务器返回的数据，可以在这里进行一些设置
service.interceptors.response.use(
  (res: AxiosResponse) => {
    console.log('result: ', res);
    return res;
  },
  (err: AxiosError) => {
    console.log(err)
    let m = '';

    if (err.code === 'ECONNABORTED') {
      return m = '数据请求超时, 请稍后重试';
    }

    if (err && err.response) {
      switch (err.response.status) {
        case 302:
          m = '接口重定向了！';
          break;
        case 400:
          m = '参数不正确！';
          break;
        case 401:
          m = '您未登录，或者登录已经超时，请先登录！';
          break;
        case 403:
          m = '您没有权限操作！';
          break;
        case 404:
          m = `请求地址出错: ${err.response.config.url}`;
          break;
        case 405:
          m = `请求方法不允许: ${err.response.config.url}`;
          break;
        case 408:
          m = '请求超时！';
          break;
        case 409:
          m = '系统已存在相同数据！';
          break;
        case 500:
          m = '服务器内部错误！';
          break;
        case 501:
          m = '服务未实现！';
          break;
        case 502:
          m = '网关错误！';
          break;
        case 503:
          m = '服务不可用！';
          break;
        case 504:
          m = '服务暂时无法访问，请稍后再试！';
          break;
        case 505:
          m = 'HTTP 版本不受支持！';
          break;
        default:
          m = '异常问题，请联系管理员！';
          break;
      }
    }
    return Promise.reject(message.error(m));
  }
);

export default service;
