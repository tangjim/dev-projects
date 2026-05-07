import {SET_LIST} from "@/store/modules/mutation-types";
import {getUserStrategyItem, changeStrategyType, startStrategy, stopStrategy, restoreStrategyItem, batchStartStrategy, batchStopStrategy} from "@/api/strategy";


export default {
    namespaced: true,
    state: {
        list: []
    },
    // 同步操作方法
    mutations: {
        [SET_LIST](state, payload) {
            // let strategy = state.list.find((item) => item.coinCode === payload.coinCode);

            payload.data.coinCode = payload.coinCode;
            if (state.list.find((item) => item.coinCode === payload.coinCode)) {
                for (let i=0; i<state.list.length; i++) {
                    if (state.list[i].coinCode === payload.coinCode) {
                        state.list[i] = payload.data;
                    }
                }
            } else {
                state.list.push(payload.data);
            }
        },
        ["SET_TYPE"](state, payload) {
            let strategy = state.list.find(item => item.coinCode === payload.coinCode);
            if (strategy) {
                strategy.type = payload.type;
            }
            // state.list.forEach((c)=>{
            //     if (c.coinCode === payload.coinCode) {
            //         c.type = payload.type;
            //     }
            // });
        }
    },
    // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
    actions: {
        getUserStrategyItem(conText, payload) {
            getUserStrategyItem(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_LIST, {data: res.data, coinCode: payload.formData.coinCode});
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        changeStrategyType(conText, payload) {
            changeStrategyType(payload.formData).then(res => {
                if (res.code === 1000) {
                    for (let i=0; i<payload.formData.coinCodeList.length; i++) {
                        conText.commit("SET_TYPE", {coinCode:payload.formData.coinCodeList[i], type:payload.formData.type});
                    }
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        startStrategy: function (conText, payload) {
            startStrategy(payload.formData).then(res => {
                if (res.code === 1000) {}
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        stopStrategy: function (conText, payload) {
            stopStrategy(payload.formData).then(res => {
                if (res.code === 1000) {}
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        batchStartStrategy: function (conText, payload) {
            batchStartStrategy(payload.formData).then(res => {
                if (res.code === 1000) {}
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        batchStopStrategy: function (conText, payload) {
            batchStopStrategy(payload.formData).then(res => {
                if (res.code === 1000) {}
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        restoreStrategyItem: function (conText, payload) {
            restoreStrategyItem(payload.formData).then(res => {
                if (res.code === 1000) {

                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        get: (state) => (coinCode) => {
            return state.list.find(item => item.coinCode === coinCode) || {type: 1, level: 0};
        }
    }
}
