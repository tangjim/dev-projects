import {SET_ITEM} from "@/store/modules/mutation-types";
import {getCoinRate} from "@/api/coin/pair";
export default {
    namespaced: true,
    state: {
        usdt: 0
    },
    // 同步操作方法
    mutations: {
        [SET_ITEM](state, payload) {
            state[payload.coinCode] = payload.data;
        }
    },
    // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
    actions: {
        getCoinRate(conText, payload) {
            getCoinRate(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, {coinCode:payload.formData.coinCode, data:res.data});
                }
            });
        },

    },
    getters: {
        usdt(state) {
            return state.usdt;
        }
    }
}
