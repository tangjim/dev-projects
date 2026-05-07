import {request} from "@/assets/js/utils/request";
import config from "@/assets/js/conf/config";

// 用户提币
export function withdrawal(data) {
    return request(config.baseApi + "/point/withdrawal", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 分页获取充币提币列表
export function getRechargeWithdrawalByPage(data) {
    return request(config.baseApi + "/point/getRechargeWithdrawalByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 用户资产互转
export function transfer(data) {
    return request(config.baseApi + "/point/transfer", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 获取用户收益
export function getUserGain(data) {
    return request(config.baseApi + "/gain/getUserGain", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 获取用户收益明细
export function getUserGainDetail(data) {
    return request(config.baseApi + "/point/getUserGainDetail", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 分页获取用户每日收益
export function getUserGainByPage(data) {
    return request(config.baseApi + "/gain/getUserGainByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取预存资产状态
export function getPointState(data) {
    return request(config.baseApi + "/point/getPointState", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取用户交易所资产
export function getUserExchangePoint(data) {
    return request(config.baseApi + "/point/getUserExchangePoint", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 分页获取资产记录
export function getPointLogByPage(data) {
    return request(config.baseApi + "/point/getPointLogByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}