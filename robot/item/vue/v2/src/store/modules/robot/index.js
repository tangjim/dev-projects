import {DELETE_ALL, SET_LIST} from "@/store/modules/mutation-types";
import {buy, getPeriodCostInfo, apiAuthorization, getApiAuthorizationList, getApiAuthorizationInfo, updateAutoRenewInfo, getDiscountInfo} from "@/api/robot";

export default {
    namespaced: true,
    state: {
        periodCostList: [],
        apiAuthorizationList: []
    },
    mutations: { // 同步操作方法
        [DELETE_ALL](state, payload) {
            state.periodCostList = [];
        },
        [SET_LIST](state, payload) {
            // console.log(payload);
            state.periodCostList = [...payload];
        },
        ["SET_API_AUTHORIZATION_LIST"](state, payload) {
            state.apiAuthorizationList = [...payload];
        },
        ["DELETE_API_AUTHORIZATION_LIST"](state) {
            state.apiAuthorizationList = [];
        },
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        getPeriodCostInfo(conText, payload) {
            getPeriodCostInfo(payload.formData).then(res => {
                if (res.code === 1000) {
                    // 查看是否存在活动优惠
                    getDiscountInfo({type:1, subType: 1}).then(res2 => {
                        if (res2.code === 1000 && res2.data) {
                            for (let i=0; i<res.data.length; i++) {
                                if (res.data[i].periodType === res2.data.subType) {
                                    res.data[i].discountId = res2.data.id;
                                    res.data[i].discountCost = res2.data.amount;
                                }
                            }
                        }
                        conText.commit(SET_LIST, res.data);
                        if (payload && payload.success) {
                            payload.success(res);
                        }
                    });
                } else {
                    if (payload && payload.success) {
                        payload.success(res);
                    }
                }
            });
        },
        buy(conText, payload) {
            buy(payload.formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            })
        },
        updateAutoRenewInfo(conText, payload) {
            updateAutoRenewInfo(payload.formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            })
        },
        apiAuthorization(conText, payload) {
            apiAuthorization(payload.formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            })
        },
        getApiAuthorizationList(conText, payload) {
            getApiAuthorizationList().then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_API_AUTHORIZATION_LIST", res.data);
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        getApiAuthorizationInfo(conText, payload) {
            getApiAuthorizationInfo(payload.formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            })
        },
        getDiscountInfo(conText, payload) {
            getDiscountInfo(payload.formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            })
        }
    },
    getters: {
        periodCostList(state) {
            return state.periodCostList;
        },
        periodCostListByIndex: (state) => (index) => {
            return state.periodCostList[index];
        },
        apiAuthorizationList(state) {
            return state.apiAuthorizationList;
        }
    }
}
