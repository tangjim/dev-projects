// 导入mutations命名常量
import {SET_ITEM} from '@/store/modules/mutation-types';
import {getUserExchangePoint} from "@/api/user/point";

export default {
    namespaced: true,
    state: {
        amount: 0,
        total: 0
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            if (payload.amount)  state.amount = payload.amount;
            if (payload.total) state.total = payload.total;
        },
        ["INIT_DATA"](state){
            state.amount = 0;
            state.total = 0;
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        getUserExchangePoint(conText, payload) {
            getUserExchangePoint(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, res.data);
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        get(state) {
            return {amount: state.amount, total: state.total};
        }
    }
}
