import {request} from "@/assets/js/utils/request";
import config from "@/assets/js/conf/config";

// 获取盈利排行榜数据
export function getRebateRankingList(data) {
    return request(config.baseApi + "/rebate/getRankingList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}}, false);
}
