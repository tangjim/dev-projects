import {request} from "@/assets/js/utils/request";
import config from "@/assets/js/conf/config";

// 获取邀请数据
export function getRecommendInfo(data) {
    return request(config.baseApi + "/recommend/getRecommendInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}

// 获取邀请记录
export function getRecommendList(data) {
    return request(config.baseApi + "/recommend/getRecommendList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}

// 分页获取邀请记录
export function getRecommendListByPage(data) {
    return request(config.baseApi + "/recommend/getRecommendListByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}

// 获取邀请返佣明细
export function getRecommendProfitList(data) {
    return request(config.baseApi + "/recommend/getRecommendProfitList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}

// 分页获取邀请返佣明细
export function getRecommendProfitListByPage(data) {
    return request(config.baseApi + "/recommend/getRecommendProfitListByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}

// 获取团队数据
export function getTeamInfo(data) {
    return request(config.baseApi + "/recommend/getTeamInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}

// 获取团队推广记录
export function getTeamRecommendList(data) {
    return request(config.baseApi + "/recommend/getTeamRecommendList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}

// 分页获取团队推广记录
export function getTeamRecommendListByPage(data) {
    return request(config.baseApi + "/recommend/getTeamRecommendListByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}

// 获取团队返佣明细
export function getTeamProfitList(data) {
    return request(config.baseApi + "/recommend/getTeamProfitList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}

// 分页获取团队返佣明细
export function getTeamProfitListByPage(data) {
    return request(config.baseApi + "/recommend/getTeamProfitListByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}

// 获取用户推广信息
export function getUserRecommendInfo(data) {
    return request(config.baseApi + "/recommend/getUserRecommendInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取用户直属信息信息
export function getUserDirectInfo(data) {
    return request(config.baseApi + "/recommend/getUserDirectInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取用户间属信息信息
export function getUserDirectRecommendInfo(data) {
    return request(config.baseApi + "/recommend/getUserDirectRecommendInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 获取用户团队信息信息
export function getUserTeamInfo(data) {
    return request(config.baseApi + "/recommend/getUserTeamInfo", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}

// 分页获取用户直属会员
export function getUserDirectMemberByPage(data) {
    return request(config.baseApi + "/recommend/getUserDirectMemberByPage", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
