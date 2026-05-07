import {SET_LIST, SET_ITEM, DELETE_ALL} from '@/store/modules/mutation-types';
import {getRecommendInfo, getRecommendList, getRecommendListByPage, getRecommendProfitList, getRecommendProfitListByPage, getTeamInfo, getTeamRecommendList, getTeamRecommendListByPage, getTeamProfitList, getTeamProfitListByPage} from "@/api/recommend";

export default {
    namespaced: true,
    state: {
        recommend: {
            list: [],
            pageList: [],
            profitList: [],
            pageProfitList:[],
            total: 0,
            profitTotal: 0,
            orderProfitTotal: 0
        },
        teamRecommend: {
            list: [],
            pageList: [],
            profitList: [],
            pageProfitList:[],
            teamTotal: 0,
            profitTotal: 0
        }
    },
    mutations: { // 同步操作方法
        [SET_LIST](state, payload) {
            if (payload.type === 1) {
                state.recommend.list = payload.list;
            } else {
                state.teamRecommend.list = payload.list;
            }
        },
        ["SET_PAGE_LIST"](state, payload) {
            if (payload.type === 1) {
                state.recommend.pageList = state.recommend.pageList.concat(payload.list);
            } else {
                state.teamRecommend.pageList = state.teamRecommend.pageList.concat(payload.list);
            }
        },
        ["SET_PROFIT_LIST"](state, payload) {
            if (payload.type === 1) {
                state.recommend.profitList = payload.list;
            } else {
                state.teamRecommend.profitList = payload.list;
            }
        },
        ["SET_PAGE_PROFIT_LIST"](state, payload) {
            if (payload.type === 1) {
                state.recommend.pageProfitList = state.recommend.pageProfitList.concat(payload.list);
            } else {
                state.teamRecommend.pageProfitList = state.teamRecommend.pageProfitList.concat(payload.list);
            }
        },
        [SET_ITEM](state, payload) {
            if (payload.type === 1) {
                state.recommend.total = payload.data.recommendTotal;
                state.recommend.profitTotal = payload.data.activateProfitTotal;
                state.recommend.orderProfitTotal = payload.data.orderProfitTotal;
            } else {
                state.teamRecommend.teamTotal = payload.data.teamTotal;
                state.teamRecommend.profitTotal = payload.data.profitTotal;
            }
        },
        [DELETE_ALL](state, payload) {
            // state.list = [];
            state[payload.type][payload.childType] = [];
            // if (payload.type === "recommend") {
            //     if (payload.childType === "list") {
            //         state.recommend.list = [];
            //     } else if (payload.childType === "pageList") {
            //         state.recommend.pageList = []
            //     }
            // } else {
            //
            // }
        },
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        recommendInfo(conText, payload) {
            getRecommendInfo(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, {data: res.data, type: 1});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        recommendList(conText, payload) {
            getRecommendList(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit(SET_LIST, {list: res.data, type: 1});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        recommendPageList(conText, payload) {
            getRecommendListByPage(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit("SET_PAGE_LIST", {list: res.data.list, type: 1});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        recommendProfitList(conText, payload) {
            getRecommendProfitList(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit("SET_PROFIT_LIST", {list: res.data, type: 1});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        recommendProfitPageList(conText, payload) {
            getRecommendProfitListByPage(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit("SET_PAGE_PROFIT_LIST", {list: res.data.list, type: 1});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },


        teamInfo(conText, payload) {
            getTeamInfo(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, {data: res.data, type: 2});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        teamRecommendList(conText, payload) {
            getTeamRecommendList(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit(SET_LIST, {list: res.data, type: 2});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        teamRecommendPageList(conText, payload) {
            getTeamRecommendListByPage(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit("SET_PAGE_LIST", {list: res.data.list, type: 2});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        teamProfitList(conText, payload) {
            getTeamProfitList(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit("SET_PROFIT_LIST", {list: res.data, type: 2});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        teamProfitPageList(conText, payload) {
            getTeamProfitListByPage(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit("SET_PAGE_PROFIT_LIST", {list: res.data.list, type: 2});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        recommendInfo(state) {
            return {
                recommendTotal:state.recommend.total,
                activateProfitTotal:state.recommend.profitTotal,
                orderProfitTotal:state.recommend.orderProfitTotal
            };
        },
        recommendList(state) {
            return state.recommend.list;
        },
        recommendPageList(state) {
            return state.recommend.pageList;
        },
        recommendProfitList(state) {
            return state.recommend.profitList;
        },
        recommendProfitPageList(state) {
            return state.recommend.pageProfitList;
        },


        teamRecommendInfo(state) {
            return {
                teamTotal:state.teamRecommend.teamTotal,
                profitTotal:state.teamRecommend.profitTotal
            };
        },
        teamRecommendList(state) {
            return state.teamRecommend.list;
        },
        teamRecommendPageList(state) {
            return state.teamRecommend.pageList;
        },
        teamRecommendProfitList(state) {
            return state.teamRecommend.profitList;
        },
        teamRecommendProfitPageList(state) {
            return state.teamRecommend.pageProfitList;
        }
    }
}
