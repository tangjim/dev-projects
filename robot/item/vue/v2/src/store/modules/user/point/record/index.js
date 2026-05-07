// 导入mutations命名常量
import {DELETE_ALL, SET_LIST} from '@/store/modules/mutation-types';
import {getRechargeWithdrawalByPage} from "@/api/user/point";

export default {
    namespaced: true,
    state: {
        allList: [],
        rechargeList: [],
        withdrawalList: []
    },
    mutations: { // 同步操作方法
        [SET_LIST](state, payload) {
            // state.list = payload.list;
            if (payload.type === 1) {
                state.rechargeList = state.rechargeList.concat(payload.list);
            } else if (payload.type === 2) {
                state.withdrawalList = state.withdrawalList.concat(payload.list);
            } else {
                state.allList = state.allList.concat(payload.list);
            }
        },
        [DELETE_ALL](state, payload) {
            if (payload === 1) {
                state.rechargeList = [];
            } else if (payload === 2) {
                state.withdrawalList = [];
            } else if (payload === 3) {
                state.allList = [];
            } else {
                state.allList = [];
                state.rechargeList = [];
                state.withdrawalList = [];
            }
        },
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        list(conText, payload) {
            getRechargeWithdrawalByPage(payload.formData).then(res => {
                if (res.code === 1000) {
                    if (res.data.list) {
                        res.data.list.forEach((c) => {c.isOpen = false});
                    }
                    conText.commit(SET_LIST, {list: res.data.list || [], type: payload.formData.type});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        allList(state) {
            return state.allList;
        },
        rechargeList(state) {
            return state.rechargeList;
        },
        withdrawalList(state) {
            return state.withdrawalList;
        }
    }
}
