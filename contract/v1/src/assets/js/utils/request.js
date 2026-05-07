import axios from 'axios';
import qs from 'qs';

import Vue from "vue";
import { Toast } from "vant";
import "vant/lib/toast/style"
Vue.use(Toast);
import customLoading from "@/components/loading";

let isPrompt = false;

export function request(url, method = "get", data = {}, config = {}, loading = false) {
    return axiosRequest(url, method, data, config, loading)
}

function axiosRequest(url, method, data, config, loading) {
    let params = null;
    if (method.toLowerCase() === "post") {
        if (data instanceof Object) {
            // data = qs.stringify(data);
            let params = new URLSearchParams();
            for (let key in data) {
                params.append(key, data[key]);
            }
            data = params;
            // data = qs.stringify(data,{ indices: false });
        }
    } else if (method.toLowerCase() === "json") {
        method = "post";
        data = JSON.stringify(data);

        // headers: {
        //     'Content-Type': 'application/json',//设置请求头请求格式为JSON
        // },
    } else if (method.toLowerCase() === "file") {
        method = "post";
        if (data instanceof Object) {
            let params = new FormData();
            for (let key in data) {
                params.append(key, data[key]);
            }
            data = params;
        }
    } else if (method.toLowerCase() === "get") {
        params = data;
    }

    let axiosConfig = {
        url: url,
        method: method.toLowerCase(),
        data: data
    };
    if (params !== null) {
        axiosConfig.params = params;
    }
    if (config instanceof Object) {
        for (let key in config) {
            axiosConfig[key] = config[key];
        }
    }
    if (loading) {
        customLoading.show();
    }

    return axios(axiosConfig).then(res => {
        if (loading) {
            customLoading.clear();
        }
        return res.data;
    }).catch(err => {
        // console.log(err.response.status);
        if (loading) {
            customLoading.clear();
        }
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = "错误的请求";
                    break;
                case 401:
                    err.message = "登录失效，请重新登录";
                    break;
                case 403:
                    err.message = "拒绝访问";
                    break;
                case 404:
                    err.message = "请求错误，未找到该资源";
                    break;
                case 405:
                    err.message = "请求方法未允许";
                    break;
                case 408:
                    err.message = "请求超时";
                    break;
                case 500:
                    err.message = "系统错误";
                    break;
                case 501:
                    err.message = "网络未实现";
                    break;
                case 502:
                    err.message = "网络错误";
                    break;
                case 503:
                    err.message = "服务不可用";
                    break;
                case 504:
                    err.message = "网络超时";
                    break;
                case 505:
                    err.message = "http版本不支持该请求";
                    break;
                default:
                    err.message = `连接错误${err.response.status}`;
            }
        } else {
            err.message = "网络出问题，请稍后再试";
        }
        if (!isPrompt) {
            isPrompt = true;
            Toast({
                message: err.message,
                onClose: (()=>{ isPrompt = false; })
            });
        }
        return Promise.resolve(err);
    });
}
