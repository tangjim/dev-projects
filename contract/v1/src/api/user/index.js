import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/utils/request";

export function authorize(data) {
    return request(config.baseApi + "/member/login", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
export function register(data) {
    return request(config.baseApi + "/member/register", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}
export function logout(data) {
    return request(config.baseApi + "/member/logout", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true)
}
export function safe() {
    return request(config.baseApi + "/user/safe", "get")
}
export function get(data) {
    return request(config.baseApi + "/member/getMemberInfo", "get", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}