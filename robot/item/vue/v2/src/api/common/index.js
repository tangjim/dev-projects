import {request} from "@/assets/js/utils/request";
import config from "@/assets/js/conf/config";

// 获取公告列表
export function getNoticeList(data) {
    return request(config.baseApi + "/common/getNoticeList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 分页获取公告列表
export function getNoticeListByPage(data) {
    return request(config.baseApi + "/common/getNoticeListByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 获取公告文章详情
export function getNoticeDoc(data) {
    return request(config.baseApi + "/common/getNoticeDoc", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 获取帮助中心列表
export function getHelpCenterList(data) {
    return request(config.baseApi + "/common/getHelpCenterList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 获取帮助中心文章详情
export function getHelpDoc(data) {
    return request(config.baseApi + "/common/getHelpDoc", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
// 获取交易所列表
export function getExchangeList(data) {
    return request(config.baseApi + "/common/getExchangeList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}
// 获取基础信息
export function getBasicInfo(data) {
    return request(config.baseApi + "/common/getBasicInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, true);
}