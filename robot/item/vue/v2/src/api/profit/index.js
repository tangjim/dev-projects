import {request} from "@/assets/js/utils/request";
import config from "@/assets/js/conf/config";

// 获取奖励排行榜数据
export function getProfitRankingList(data) {
    return request(config.baseApi + "/profit/getRankingList", "json", data, {headers: {'Content-Type': 'application/json',"X-Requested-With":"XMLHttpRequest"}});
}
