import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/utils/request";

export function send(data) {
    return request(config.baseApi + "/member/getCheckCode", "json", data, {headers: {'Content-Type': 'application/json'}}, true);
}