import {DELETE_ALL, SET_LIST, SET_ITEM} from "@/store/modules/mutation-types";
import {getUserGain, getUserGainByPage, getUserGainDetail} from "@/api/user/point";
import {getGainByCoin, getGainTotalByPage, getUserGainCoinDayByPage, getGainDetailByDay} from "@/api/gain";
import {getCompleteOrderGainByPage, getOrderSellByPage} from "@/api/order";

export default {
    namespaced: true,
    state: {
        gainTotal: 0,
        gainToday: 0,
        gainYesterday: 0,
        gainDayList: [],
        gainDayDetail: [],
        gainCoinList:[],
        gainOrderList:[]
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            state.gainTotal = payload.gain;
            state.gainToday = payload.gainToday;
            state.gainYesterday = payload.gainYesterday;
        },
        ["SET_DAY_LIST"](state, payload) {
            payload.list.forEach((c) => {
                c.isOpen = false;
                c.detail = {
                    loading: false,
                    finished: false,
                    refreshing: false,
                    pageNo: 1,
                    pageSize: 100,
                    list: []
                };
            })

            if (payload.pageNo === 1) {
                state.gainDayList = [...payload.list];
            } else {
                state.gainDayList = state.gainDayList.concat(payload.list);
            }
            // state.gainDayList = state.gainDayList.concat(payload.list);
        },
        ["SET_DAY_DETAIL_LIST"](state, payload) {
            // state.gainDayDetail = state.gainDayDetail.concat(payload.list);
            if (payload.pageNo === 1) {
                state.gainDayList[payload.index].detail.list = [...payload.list];
            } else {
                state.gainDayList[payload.index].detail.list = state.gainDayList[payload.index].detail.list.concat(payload.list);
            }
        },
        ["SET_DAY_OPEN_CHILD_LIST"](state, payload) {
            state.gainDayList[payload].isOpen = !state.gainDayList[payload].isOpen;
            if (!state.gainDayList[payload].isOpen) {
                state.gainDayList[payload].detail.list.length = 0;
                state.gainDayList[payload].detail.pageNo = 1;
            }
        },
        ["SET_COIN_LIST"](state, payload) {
            payload.list.forEach((c) => {
                c.isOpen = false;
                c.detail = {
                    loading: false,
                    finished: false,
                    refreshing: false,
                    pageNo: 1,
                    pageSize: 100,
                    list: []
                };
            })
            if (payload.pageNo === 1) {
                state.gainCoinList = [...payload.list];
            } else {
                state.gainCoinList = state.gainCoinList.concat(payload.list);
            }

        },
        ["SET_COIN_DETAIL_LIST"](state, payload) {
            if (payload.pageNo === 1) {
                state.gainCoinList[payload.index].detail.list = [...payload.list];
            } else {
                state.gainCoinList[payload.index].detail.list = state.gainCoinList[payload.index].detail.list.concat(payload.list);
            }
        },
        ["SET_COIN_OPEN_CHILD_LIST"](state, payload) {
            state.gainCoinList[payload].isOpen = !state.gainCoinList[payload].isOpen;
            if (!state.gainCoinList[payload].isOpen) {
                state.gainCoinList[payload].detail.list.length = 0;
                state.gainCoinList[payload].detail.pageNo = 1;
            }
        },
        ["SET_ORDER_LIST"](state, payload) {
            if (payload.pageNo === 1) {
                state.gainOrderList = [...payload.list];
            } else {
                state.gainOrderList = state.gainOrderList.concat(payload.list);
            }
        },
        ["EMPTY_DAY_LIST"](state) {
            state.gainDayList = [];
        },
        ["EMPTY_DAY_DETAIL_LIST"](state) {
            state.gainDayDetail = [];
        },
        ["EMPTY_COIN_LIST"](state) {
            state.gainCoinList = [];
        },
        ["EMPTY_ORDER_LIST"](state) {
            state.gainOrderList = [];
        },
        [DELETE_ALL](state) {
            state.gainDayList = [];
            state.gainDayDetail = [];
            state.gainCoinList = [];
            state.gainOrderList = [];
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        getUserGain(conText, payload) {
            getUserGain(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, res.data);
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getGainTotalByPage(conText, payload) {
            getGainTotalByPage(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_COIN_LIST", {list: res.data.list || [], pageNo:payload.formData.pageNo});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getUserGainCoinDayByPage(conText, payload) {
            getUserGainCoinDayByPage(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_COIN_DETAIL_LIST", {list: res.data.list || [], pageNo:payload.formData.pageNo, index:payload.index});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },

        getUserGainByPage(conText, payload) {
            getUserGainByPage(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_DAY_LIST", {list: res.data.list || [], pageNo:payload.formData.pageNo});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getGainDetailByDay(conText, payload) {
            getGainDetailByDay(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_DAY_DETAIL_LIST", {list: res.data.list || [], pageNo:payload.formData.pageNo, index:payload.index});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },

        // getUserGainDetail(conText, payload) {
        //     getUserGainDetail(payload.formData).then(res => {
        //         if (res.code === 1000) {
        //             conText.commit("SET_DAY_DETAIL_LIST", {list: res.data.list || []});
        //         }
        //         if (payload.success) {
        //             payload.success(res);
        //         }
        //     });
        // },
        // getGainByCoin(conText, payload) {
        //     getGainByCoin(payload.formData).then(res => {
        //         if (res.code === 1000) {
        //             conText.commit("SET_COIN_LIST", {list: res.data.list || []});
        //         }
        //         if (payload.success) {
        //             payload.success(res);
        //         }
        //     });
        // },

        getOrderSellByPage(conText, payload) {
            getOrderSellByPage(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_ORDER_LIST", {list: res.data.list || [], pageNo:payload.formData.pageNo});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        gainDayList(state) {
            return state.gainDayList;
        },
        gainDayDetail(state) {
            return state.gainDayDetail;
        },
        gainCoinList(state) {
            return state.gainCoinList;
            // for(let i=0;i<state.gainCoinList.length;i++){
            //     state.gainCoinList[i].statisticsDate = new Date(state.gainCoinList[i].statisticsDate).format("yyyy-MM-dd");
            // }
            //
            // let newArr = [];
            // state.gainCoinList.forEach((c, i) => {
            //     let index = -1;
            //     let alreadyExists = newArr.some((nc, j) => {
            //         if (c.statisticsDate === nc.date) {
            //             index = j;
            //             return true;
            //         }
            //     });
            //     if (!alreadyExists) {
            //         newArr.push({
            //             date: c.statisticsDate,
            //             dataList: [c]
            //         });
            //     } else {
            //         newArr[index].dataList.push(c);
            //     }
            // });
            //
            // return {size:state.gainCoinList.length, data:newArr};
        },
        gainOrderList(state) {
            for(let i=0;i<state.gainOrderList.length;i++){
                // state.gainOrderList[i].completeDate = new Date(state.gainOrderList[i].completeDate).format("yyyy-MM-dd");
                state.gainOrderList[i].groupDate = new Date(state.gainOrderList[i].completeDate).format("yyyy-MM-dd");
            }

            let newArr = [];
            state.gainOrderList.forEach((c, i) => {
                let index = -1;
                let alreadyExists = newArr.some((nc, j) => {
                    if (c.groupDate === nc.date) {
                        index = j;
                        return true;
                    }
                });
                if (!alreadyExists) {
                    newArr.push({
                        date: c.groupDate,
                        dataList: [c]
                    });
                } else {
                    newArr[index].dataList.push(c);
                }
            });
            return {size:state.gainOrderList.length, data:newArr};
            // return newArr;
        },
        gain(state) {
            return {gainTotal: state.gainTotal, gainToday: state.gainToday, gainYesterday: state.gainYesterday}
        }
    }
}