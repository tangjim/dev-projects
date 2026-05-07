import {SET_ITEM, DELETE_ALL} from '../../../mutation-types';
import {getWithdrawalRecord} from "../../../../../api/user/member";

export default {
    namespaced: true,
    state: {
        userCode: "",
        list: []
    },
    mutations: { // 同步操作方法
        [DELETE_ALL](state, payload) {
            state.list = [];
        },
        [SET_ITEM](state, payload) {
            // console.log(payload);
            state.userCode = payload.userCode;
            state.list = state.list.concat(payload.list);
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        get(conText, payload) {
            getWithdrawalRecord(payload.formData).then(res => {
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
