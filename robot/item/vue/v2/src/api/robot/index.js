import {request} from "@/assets/js/utils/request";
import config from "@/assets/js/conf/config";

// 获取激活费用信息
export function getPeriodCostInfo(data) {
    return request(config.baseApi + "/robot/getPeriodCostInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}
// 激活机器人
export function buy(data) {
    return request(config.baseApi + "/robot/buy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}
// API授权
export function apiAuthorization(data) {
    return request(config.baseApi + "/robot/apiAuthorization", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取API授权列表
export function getApiAuthorizationList(data) {
    return request(config.baseApi + "/robot/getApiAuthorizationList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 获取API授权信息
export function getApiAuthorizationInfo(data) {
    return request(config.baseApi + "/robot/getApiAuthorizationInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 获取是否自动续期信息
export function getAutoRenewInfo(data) {
    return request(config.baseApi + "/robot/getAutoRenewInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 修改是否自动续期
export function updateAutoRenewInfo(data) {
    return request(config.baseApi + "/robot/updateAutoRenewInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 获取优惠活动信息
export function getDiscountInfo(data) {
    return request(config.baseApi + "/robot/getDiscountInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}