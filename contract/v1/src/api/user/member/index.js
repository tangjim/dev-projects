import {request} from "../../../assets/js/utils/request";
import config from "../../../assets/js/conf/config";

export function getAssetInfo(data) {
    return request(config.baseApi + "/member/getAssetInfo", "get", data, [], true);
}
export function getAddressInfo(data) {
    return request(config.baseApi + "/member/getAddressInfo", "get", data, [], true);
}

export function getIdInfo(data) {
    return request(config.baseApi + "/member/getIdInfo", "get", data, [], true);
}

export function idNoCheck(data) {
    return request(config.baseApi + "/member/idNoCheck", "post", data, [], true);
}

export function getWithdrawalRecord(data) {
    return request(config.baseApi + "/member/withdrawal/record", "get", data, [], true);
}

export function getRechargeRecord(data) {
    return request(config.baseApi + "/member/recharge/record", "get", data, [], true);
}