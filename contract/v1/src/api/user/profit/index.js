import {request} from "../../../assets/js/utils/request";
import config from "../../../assets/js/conf/config";

export function getProfitInfo(data) {
    return request(config.baseApi + "/profit/getProfitInfo", "get", data, [], true);
}