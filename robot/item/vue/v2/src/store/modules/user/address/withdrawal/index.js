import {SET_ITEM, DELETE_ALL} from '@/store/modules/mutation-types';
import {getWithdrawalAddressList, addWithdrawalAddress} from "@/api/user";

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            // state.list = payload.list;
            state.list = state.list.concat(payload.list);
        },
        [DELETE_ALL](state, payload) {
            state.list = [];
        },
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        list(conText, payload) {
            getWithdrawalAddressList(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, {list: res.data.list || []});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        add(conText, payload) {
            addWithdrawalAddress(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        list(state) {
            return state.list;
        }
    }
}
