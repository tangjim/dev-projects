import config from "@/assets/js/conf/config";
import {request} from "@/assets/js/utils/request";

// 用户注册接口
export function register(data) {
    return request(config.baseApi + "/user/register", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 用户登录接口
export function authorize(data) {
    return request(config.baseApi + "/user/login", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 用户生成区块链币种地址
export function createAddress(data) {
    return request(config.baseApi + "/user/createAddress", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}
// 获取用户信息
export function getUserInfo(data) {
    return request(config.baseApi + "/user/getUserInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 获取用户资产信息
export function getAssetInfo(data) {
    return request(config.baseApi + "/user/getAssetInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 获取充币地址
export function getRechargeAddress(data) {
    return request(config.baseApi + "/user/getRechargeAddress", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}
// 未登录用手机号获取验证码
export function getCheckCodeByPhone(data) {
    return request(config.baseApi + "/user/getCheckCodeByPhone", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 未登录用账号获取验证码
export function getCheckCodeByUserName(data) {
    return request(config.baseApi + "/user/getCheckCodeByUserName", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 已登录用户获取验证码
export function getCheckCode(data) {
    return request(config.baseApi + "/user/getCheckCode", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 找回密码-验证登录帐号
export function findPassword(data) {
    return request(config.baseApi + "/user/findPassword", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 设置交易密码
export function setTradePassword(data) {
    return request(config.baseApi + "/user/setTradePassword", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 修改交易密码
export function updateTradePassword(data) {
    return request(config.baseApi + "/user/updateTradePassword", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 修改登录密码
export function updatePassword(data) {
    return request(config.baseApi + "/user/updatePassword", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 绑定手机号码
export function bindMobilePhone(data) {
    return request(config.baseApi + "/user/bindMobilePhone", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 添加提币地址
export function addWithdrawalAddress(data) {
    return request(config.baseApi + "/user/addWithdrawalAddress", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 获取提币地址列表
export function getWithdrawalAddressList(data) {
    return request(config.baseApi + "/user/getWithdrawalAddressList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 删除提币地址
export function deleteWithdrawalAddress(data) {
    return request(config.baseApi + "/user/deleteWithdrawalAddress", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 退出登录
export function logout(data) {
    return request(config.baseApi + "/user/logout", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true)
}

export function safe() {
    return request(config.baseApi + "/user/safe", "get")
}