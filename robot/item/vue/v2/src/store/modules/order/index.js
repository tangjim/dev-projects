import {DELETE_ALL, SET_LIST} from '@/store/modules/mutation-types';
import {getRecentlyOrder, pauseAddOrder, clearUpOrder, addOrderByHand, getOrderListByPage, getOrderDetailByPage, batchPauseAddOrder, getUserStrategyOrderInfo, getUserCircleStrategyInfo, setUserCircleStrategy} from "@/api/order";

export default {
    namespaced: true,
    state: {
        list:[],
        totalGain: 0,
        recently: []
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
        [DELETE_ALL](state, payload) {
            state.list = [];
        },
        ["SET_RECENTLY_ITEM"](state, payload) {
            // if (!state.recently[payload.coinCode]) {
            //     state.recently[payload.coinCode] = {...payload.data}
            // }
            // state.recently[payload.coinCode] = {...payload.data}
            payload.data.coinCode = payload.coinCode;
            if (state.recently.find((item) => item.coinCode === payload.coinCode)) {
                for (let i=0; i<state.list.length; i++) {
                    if (state.recently[i].coinCode === payload.coinCode) {
                        state.recently[i] = {...payload.data};
                    }
                }
            } else {
                state.recently.push(payload.data);
            }
        },
        ["SET_ORDER_PAUSE_ITEM"](state, payload) {
            if (state.list.find(item => item.orderNo === payload.orderNo)) {
                state.list.find(item => item.orderNo === payload.orderNo).isPause = payload.type;
            }
            // state.recently.find()
        },
        ["DEL_RECENTLY"](state) {
            state.recently.length = 0;
        },
        ["CHANGE_OPEN_STATE"](state, payload) {
            state.list[payload.index].isOpen = payload.open;
            state.list[payload.index].isOpenAll = payload.isAll;
            if (!payload.open) {
                state.list[payload.index].detail.list.length = 0;
                state.list[payload.index].detail.pageNo = 1;
            }
        },
        ["SET_DETAIL_LIST"](state, payload) {
            state.list[payload.index].detail.pageNo = state.list[payload.index].detail.pageNo+1;
            state.list[payload.index].detail.list = state.list[payload.index].detail.list.concat(payload.list);
        }
    },
    actions: {
        getOrderListByPage(conText, payload) {
            getOrderListByPage(payload.formData).then(res => {
                if (res.code === 1000) {
                    if (res.data.list) {
                        res.data.list.forEach(c=>{
                            c.isOpen = false;
                            c.isOpenAll = false;
                            c.detail = {
                                pageNo: 1,
                                pageSize: 50,
                                totalSize: 0,
                                list: []
                            };
                        })
                    }

                    conText.commit(SET_LIST, {list: res.data.list || [], pageNo:payload.formData.pageNo});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getOrderDetailByPage(conText, payload) {
            getOrderDetailByPage(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_DETAIL_LIST", {list: res.data.list || [], index:payload.index});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getRecentlyOrder(conText, payload) {
            getRecentlyOrder(payload.formData).then(res => {
                if (res.code === 1000 && res.data) {
                    conText.commit("SET_RECENTLY_ITEM", {coinCode:payload.formData.coinCode, data:res.data});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        pauseAddOrder(conText, payload) {
            pauseAddOrder(payload.formData).then(res => {
                if (payload.success) {
                    conText.commit("SET_ORDER_PAUSE_ITEM", payload.formData);
                    payload.success(res);
                }
            });
        },
        batchPauseAddOrder(conText, payload) {
            batchPauseAddOrder(payload.formData).then(res => {
                if (payload.success) {
                    payload.formData.orderNoList.forEach((orderNo) => {
                        conText.commit("SET_ORDER_PAUSE_ITEM", {orderNo: orderNo});
                        payload.success(res);
                    });
                }
            });
        },
        //
        clearUpOrder(conText, payload) {
            clearUpOrder(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        addOrderByHand(conText, payload) {
            addOrderByHand(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getUserStrategyOrderInfo(conText, payload) {
            getUserStrategyOrderInfo(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getUserCircleStrategyInfo(conText, payload) {
            getUserCircleStrategyInfo(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        setUserCircleStrategy(conText, payload) {
            setUserCircleStrategy(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    }
    ,
    getters: {
        list(state) {
            return state.list;
        },
        totalGain(state) {
            return state.totalGain;
        },
        recently: (state) => (coinCode) => {
            // console.log(state.recently);
            return state.recently.find(item => item.coinCode === coinCode) || null;// state.recently[coinCode] | {};
        }
    }
}
