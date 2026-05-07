import {SET_ITEM} from "@/store/modules/mutation-types";
import {getRebateRankingList} from "@/api/rebate";

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            state.list = [...payload.list];
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        list(conText, payload) {
            getRebateRankingList(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, {list: res.data});
                }
                if (payload && payload.success) {
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
