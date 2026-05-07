import {request} from "../../../../assets/js/utils/request";
import config from "../../../../assets/js/conf/config";

export function getList(data) {
    return request(config.baseApi + "/profit/weekProfitOrder", "get", data, {headers: {'Content-Type': 'application/json'}}, true);
}