// 用户注册接口
import {request} from "@/assets/js/utils/request";
import config from "@/assets/js/conf/config";

// 获取币种对数据(按显示顺序升序排列)
export function getByExchangeCode(data) {
    return request(config.baseApi + "/coinPair/getByExchangeCode", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 获取用户币种对数据
export function getListWithState(data) {
    return request(config.baseApi + "/coinPair/getListWithState", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取用户单个币种对数据
export function getSingleState(data) {
    return request(config.baseApi + "/coinPair/getSingleState", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取单个币种当前价格
export function getSinglePrice(data) {
    return request(config.baseApi + "/coinPair/getSinglePrice", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取多个币种当前价格
export function getPriceByCoinCodeList(data) {
    return request(config.baseApi + "/coinPair/getPriceByCoinCodeList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取币种汇率
export function getCoinRate(data) {
    return request(config.baseApi + "/coinPair/getCoinRate", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取币种详情
export function getCoinInfo(data) {
    return request(config.baseApi + "/coinPair/getCoinInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

