// 导入mutations命名常量
import {DELETE_ALL, SET_ITEM} from '../../../mutation-types';
import {getProfitInfo} from "../../../../../api/user/profit";

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: { // 同步操作方法
        [DELETE_ALL](state, payload) {
            state.list = [];
        },
        [SET_ITEM](state, payload) {
            console.log(payload);
            state.list = state.list.concat(payload.list);
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        list10(conText, payload) {
            getProfitInfo(payload.formData).then(res => {
                if (res.code === 1000) {
                    // console.log(res.data)
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
