
import axios from "axios"
const instance = axios.create();


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let arr = ['/api/login', '/api/register'];
    if (!arr.includes(config.url)) {
        config.headers.token = localStorage.token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    return response;
}, function (error) {
    // 对响应错误做点什么
    //    错误处理
    if (error.response.status == 401) {
        window.location.replace("/login")
        localStorage.clear()
    }
    return Promise.reject(error);
});

export default {
    get: (pathname, parmas) => {
        return instance.get(pathname, { parmas })
    },
    post: (pathname, parmas) => {
        return instance.post(pathname, parmas)
    }
}