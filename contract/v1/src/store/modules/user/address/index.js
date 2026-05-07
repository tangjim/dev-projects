import {SET_ITEM, DELETE_ALL} from '../../mutation-types';
import {getAddressInfo} from "../../../../api/user/member";

export default {
    namespaced: true,
    state: {
        userCode: "",
        addressInfo: []
    },
    mutations: { // 同步操作方法
        [DELETE_ALL](state, payload) {
            state.addressInfo = [];
        },
        [SET_ITEM](state, payload) {
            // console.log(payload);
            state.userCode = payload.userCode;
            state.addressInfo = payload.addressInfo;
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        get(conText, payload) {
            getAddressInfo(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, res.data);
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {}
}
