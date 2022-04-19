import axios from 'axios';

const baseURL = 'http://192.168.3.33:3000';
// const CancelToken = axios.CancelToken;
const httpCode = {
  400: "请求参数错误",
  401: "权限不足, 请重新登录",
  403: "服务器拒绝本次访问",
  404: "请求资源未找到",
  500: "内部服务器错误",
  501: "服务器不支持该请求中使用的方法",
  502: "网关错误",
  504: "网关超时",
};

const service = axios.create({
  baseURL,
  timeout: 10000,
})

//请求拦截
service.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

//响应拦截
service.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res.data.msg);
    }
  },
  err => {
    if (err.response) {
      const tips = err.response.status in httpCode
        ? httpCode[err.response.status]
        : err.response.data.message;
      return Promise.reject(tips);
    }
    return Promise.resolve(new Error("请求超时, 请刷新重试"))
  }
);

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service({
      url,
      method: 'get',
      params
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function post(url, params = {}, data = {}) {
  return new Promise((resolve, reject) => {
    service({
      url,
      method: 'post',
      data,
      params
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function del(url, params = {}, data = {}) {
  return new Promise((resolve, reject) => {
    service({
      url,
      method: 'delete',
      data,
      params
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  get,
  post,
  del,
}
