import {request} from "@/assets/js/utils/request";
import config from "@/assets/js/conf/config";

// 获取盈利排行榜数据
export function getGainRankingList(data) {
    return request(config.baseApi + "/gain/getRankingList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 分页获取用户币种对收益
export function getGainByCoin(data) {
    return request(config.baseApi + "/gain/getGainByCoin", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 据币种对获取用户收益统计
export function getGainTotalByCoin(data) {
    return request(config.baseApi + "/gain/getGainTotalByCoin", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取用户交易对总收益列表
export function getGainTotalByPage(data) {
    return request(config.baseApi + "/gain/getGainTotalByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 根据币种获取用户每日收益列表
export function getUserGainCoinDayByPage(data) {
    return request(config.baseApi + "/gain/getUserGainCoinDayByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 分页获取用户每日收益详情列表
export function getGainDetailByDay(data) {
    return request(config.baseApi + "/gain/getGainDetailByDay", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}