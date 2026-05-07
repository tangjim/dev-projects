import {SET_ITEM, SET_LIST, DELETE_ALL} from '@/store/modules/mutation-types';
import {getUserRecommendInfo, getUserDirectMemberByPage} from "@/api/recommend";

export default {
    namespaced: true,
    state: {
        profit: 0,
        profitYesterday: 0,
        newDirectNum: 0,
        newRecommendNum: 0,
        newTeamNum: 0,
        recommendList: []
    },
    mutations: {
        [SET_ITEM](state, payload) {
            Object.getOwnPropertyNames(payload).forEach((key)=>{
                state[key] = payload[key];
            });
        },
        ["INIT"](state) {
            state.profit = 0;
            state.profitYesterday = 0;
            state.newRecommendNum = 0;
            state.newDirectNum = 0;
            state.newTeamNum = 0;
        },
        [SET_LIST](state, payload) {
            if (payload.pageNo === 1) {
                state.recommendList = [...payload.data];
            } else {
                state.recommendList = state.recommendList.concat(payload.data);
            }

        },
        [DELETE_ALL](state) {
            state.recommendList.length = 0
        }
    },
    actions: {
        getUserRecommendInfo(conText, payload) {
            getUserRecommendInfo(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, res.data);
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getUserDirectMemberByPage(conText, payload) {
            getUserDirectMemberByPage(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_LIST, {data: res.data.list || [], pageNo: payload.formData.pageNo});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        info(state) {
            return {profit: state.profit, profitYesterday: state.profitYesterday, newDirectNum: state.newDirectNum, newRecommendNum: state.newRecommendNum, newTeamNum: state.newTeamNum};
        },
        list(state) {
            return state.recommendList;
        }
    }
}
