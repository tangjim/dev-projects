import {request} from "../../assets/js/utils/request";
import config from "../../assets/js/conf/config";


export function getSusProductInfo(data) {
    return request(config.baseApi + "/susProduct/getSusProductInfo", "get", data, {headers: {'Content-Type': 'application/json'}});
}

export function getSusList(data) {
    return request(config.baseApi + "/susProduct/getPriceInfo", "json", data, {headers: {'Content-Type': 'application/json'}});
}