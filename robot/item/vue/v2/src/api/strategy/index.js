import {request} from "@/assets/js/utils/request";
import config from "@/assets/js/conf/config";

// 获取用户当前策略明细
export function getUserStrategyItem(data) {
    return request(config.baseApi + "/strategy/getUserStrategyItem", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 按币种列表获取用户当前策略明细
export function getUserStrategyItemByCoinList(data) {
    return request(config.baseApi + "/strategy/getUserStrategyItemByCoinList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 启动策略
export function startStrategy(data) {
    return request(config.baseApi + "/strategy/startStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 停止策略
export function stopStrategy(data) {
    return request(config.baseApi + "/strategy/stopStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 批量启动策略
export function batchStartStrategy(data) {
    return request(config.baseApi + "/strategy/batchStartStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 批量停止策略
export function batchStopStrategy(data) {
    return request(config.baseApi + "/strategy/batchStopStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}


// 设置高级策略
export function setAdvancedStrategy(data) {
    return request(config.baseApi + "/strategy/setAdvancedStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 设置普通策略
export function setCommonStrategy(data) {
    return request(config.baseApi + "/strategy/setCommonStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 还原多个交易策略设置
export function restoreStrategyItem(data) {
    return request(config.baseApi + "/strategy/restoreStrategyItem", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 更改交易策略类型
export function changeStrategyType(data) {
    return request(config.baseApi + "/strategy/changeStrategyType", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 获取默认策略明细
export function getDefaultStrategyItem(data) {
    return request(config.baseApi + "/strategy/getDefaultStrategyItem", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 获取推荐策略明细
export function getRecommendStrategyItem(data) {
    return request(config.baseApi + "/strategy/getRecommendStrategyItem", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 获取用户自定义策略列表
export function getCustomStrategyItemList(data) {
    return request(config.baseApi + "/strategy/getCustomStrategyItemList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}
// 添加用户普通自定义策略
export function addCustomCommonStrategy(data) {
    return request(config.baseApi + "/strategy/addCustomCommonStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 添加用户高级自定义策略
export function addCustomAdvancedStrategy(data) {
    return request(config.baseApi + "/strategy/addCustomAdvancedStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 删除用户自定义策略
export function deleteCustomStrategy(data) {
    return request(config.baseApi + "/strategy/deleteCustomStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 修改用户普通自定义策略
export function updateCustomCommonStrategy(data) {
    return request(config.baseApi + "/strategy/updateCustomCommonStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}
// 修改用户高级自定义策略
export function updateCustomAdvancedStrategy(data) {
    return request(config.baseApi + "/strategy/updateCustomAdvancedStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}


