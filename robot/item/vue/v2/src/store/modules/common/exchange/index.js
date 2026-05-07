import {SET_EXCHANGE_CODE, SET_ITEM} from "@/store/modules/mutation-types";
import {getExchangeList} from "@/api/common";

export default {
    namespaced: true,
    state: {
        list: [],
        currentExchangeCode: localStorage["currentExchangeCode"] || "",
    },
    // 同步操作方法
    mutations: {
        [SET_ITEM](state, payload) {
            // state.list.push(payload.data);
            state.list = [...payload];
            // console.log(payload);
        },
        [SET_EXCHANGE_CODE](state, payload) {
            state.currentExchangeCode = payload.exchangeCode;
            localStorage["currentExchangeCode"] = payload.exchangeCode;
        }
    },
    // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
    actions: {
        getExchangeList(conText, payload) {
            getExchangeList().then(res => {
                if (res.code === 1000) {
                    if (res.data.length > 0) {
                        conText.commit(SET_EXCHANGE_CODE, {exchangeCode: res.data[0].exchangeCode});
                    }
                    conText.commit(SET_ITEM, res.data);
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        selectExchange(conText, payload) {
            let exchange = conText.state.list.find(item => item.exchangeCode === payload.exchangeCode);
            if (exchange) {
                if (exchange.isValid === 1) {
                    conText.commit(SET_EXCHANGE_CODE, {exchangeCode: exchange.exchangeCode});
                } else {
                    if (payload && payload.success) {
                        payload.success(1001);
                    }
                }
            } else {
                if (payload && payload.success) {
                    payload.success(1002);
                }
            }
        }
    },
    getters: {
        currentExchangeCode(state) {
            return state.currentExchangeCode;
        },
        currentExchangeShowCode(state) {
            // return state.currentExchangeCode;
            let exchange = state.list.find(item => item.exchangeCode === state.currentExchangeCode);
            return exchange ? exchange.showCode : "HUOBI";
        },
        currentExchangeName(state) {
            let exchange = state.list.find(item => item.exchangeCode === state.currentExchangeCode);
            return exchange ? exchange.showName : "";
        },
        getExchangeName: (state) => (coinCode) => {
            let exchange = state.list.find(item => item.exchangeCode === coinCode);
            return exchange ? exchange.showName : "";
        },
        list(state) {
            return state.list;
        }
    }
}
