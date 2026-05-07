// 导入mutations命名常量
import {DELETE_ALL, SET_LIST} from '@/store/modules/mutation-types';
import {getPointLogByPage} from "@/api/user/point";

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: { // 同步操作方法
        [SET_LIST](state, payload) {
            // state.list = payload.list;
            if (payload.pageNo === 1) {
                state.list = [...payload.list];
            } else {
                state.list = state.list.concat(payload.list);
            }
        },
        [DELETE_ALL](state) {
            state.list = [];
        },
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        list(conText, payload) {
            getPointLogByPage(payload.formData).then(res => {
                if (res.code === 1000) {
                    if (res.data.list) {
                        res.data.list.forEach((c) => {c.isOpen = false});
                    }
                    conText.commit(SET_LIST, {list: res.data.list || [], pageNo:payload.formData.pageNo});
                }
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
