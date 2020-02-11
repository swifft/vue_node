import axios from 'axios';
import {Loading, Message} from 'element-ui';
import router from './router'

let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.7)'
    })
}

function endLoading() {
    loading.close();
}


//请求拦截
axios.interceptors.request.use(config => {
    // 加载动画
    startLoading();
    // 设置统一的请求头
    if (localStorage.eleToken) {
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
// 响应拦截
axios.interceptors.response.use(res => {
    endLoading();
    return res;
}, error => {
    endLoading();
    Message.error(error.response.data);
    // 返回状态码判定token过期
    const {status} = error.response;
    if (status == 401) {
        Message.error('登录信息失效，请重新登陆');
        localStorage.removeItem('eleToken');
        router.push('/login');
    }
    return Promise.reject(error)
});


export default axios;