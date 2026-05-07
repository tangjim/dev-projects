import {request} from "@/assets/js/utils/request";
import config from "@/assets/js/conf/config";

// export function getList(data) {
//     return request(config.baseApi + "/order/list", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
// }

// 分页获取用户交易订单
export function getOrderListByPage(data) {
    return request(config.baseApi + "/order/getOrderListByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 分页获取用户交易订单明细
export function getOrderDetailByPage(data) {
    return request(config.baseApi + "/order/getOrderDetailByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 获取用户最近一笔交易信息
export function getRecentlyOrder(data) {
    return request(config.baseApi + "/order/getRecentlyOrder", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 按币种列表获取最近一笔运行中交易信息
export function getRecentlyOrderByCoinList(data) {
    return request(config.baseApi + "/order/getRecentlyOrderByCoinList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 暂停或恢复补仓
export function pauseAddOrder(data) {
    return request(config.baseApi + "/order/pauseAddOrder", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 批量暂停或恢复补仓
export function batchPauseAddOrder(data) {
    return request(config.baseApi + "/order/batchPauseAddOrder", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 手工补仓
export function addOrderByHand(data) {
    return request(config.baseApi + "/order/addOrderByHand", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 清仓多个交易
export function clearUpOrder(data) {
    return request(config.baseApi + "/order/clearUpOrder", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 分页获取用户已结束交易收益
export function getCompleteOrderGainByPage(data) {
    return request(config.baseApi + "/order/getCompleteOrderGainByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取用户成功卖单明细
export function getOrderSellByPage(data) {
    return request(config.baseApi + "/order/getOrderSellByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取用户策略及订单明细
export function getUserStrategyOrderInfo(data) {
    return request(config.baseApi + "/order/getUserStrategyOrderInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 获取用户交易对买入时机设置
export function getUserCircleStrategyInfo(data) {
    return request(config.baseApi + "/order/getUserCircleStrategyInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}

// 设置用户交易对买入时机
export function setUserCircleStrategy(data) {
    return request(config.baseApi + "/order/setUserCircleStrategy", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}