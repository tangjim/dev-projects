import {getDefaultStrategyItem, setCommonStrategy, setAdvancedStrategy, getRecommendStrategyItem,
    getCustomStrategyItemList, addCustomCommonStrategy, addCustomAdvancedStrategy, deleteCustomStrategy, updateCustomCommonStrategy, updateCustomAdvancedStrategy} from "@/api/strategy";

export default {
    namespaced: true,
    state: {
        coins: [],
        general: {
            addTimes: 1,
            additionalLoseRate:0,
            additionalWinRate:0,
            firstAmount:0,
            winRate:0,
            itemList:[],
        },
        advanced: {
            addTimes:1,
            additionalLoseRate:0,
            additionalWinRate:0,
            firstAmount:0,
            loseRate:0,
            winRate:0,
            itemList:[]
        },
        customCommonStrategyItemList: [],
        customCommonAdvancedItemList: []
    },
    // 同步操作方法
    mutations: {
        ["SET_SETTINGS_ITEM"](state, payload) {
            if (payload.level === 0) {
                state.general = {...payload.data};
                state.general.additionalLoseRate = state.general.additionalLoseRate*100;
                state.general.additionalWinRate = state.general.additionalWinRate*100;
                state.general.winRate = state.general.winRate*100;

                state.general.loseRateList.forEach((item) => {
                    item.loseRate = item.loseRate*100;
                });

                state.general.timesList = payload.data.addAmountTimesList;
                delete state.general.addAmountTimesList;
            } else {
                state.advanced = {...payload.data}
                state.advanced.additionalLoseRate = state.advanced.additionalLoseRate*100;
                state.advanced.additionalWinRate = state.advanced.additionalWinRate*100;
                state.advanced.loseRate = state.advanced.loseRate*100;
                state.advanced.winRate = state.advanced.winRate*100;
                state.advanced.itemList.forEach((item) => {
                    item.additionalLoseRate = item.additionalLoseRate*100;
                    item.additionalWinRate = item.additionalWinRate*100;
                    item.loseRate = item.loseRate*100;
                    item.winRate = item.winRate*100;
                });
            }
        },
        ["SET_SETTINGS_USER_ITEM"](state, payload) {
            if (payload.level === 0) {
                console.log(payload);
                state.general = {...payload.data};
            }
        },
        ["SET_COINS"](state, payload) {
            state.coins = [...payload]
        },
        ["SET_CUSTOM_COMMON_SETTINGS_LIST"](state, payload) {
            state.customCommonStrategyItemList = [...payload]
        },
        ["SET_CUSTOM_ADVANCED_SETTINGS_LIST"](state, payload) {
            state.customCommonAdvancedItemList = [...payload]
        },
        ["DEL_CUSTOM_COMMON_SETTINGS_LIST_ITEM"](state, payload) {
            state.customCommonStrategyItemList.splice(payload, 1);
        },
        ["DEL_CUSTOM_ADVANCED_SETTINGS_LIST_ITEM"](state, payload) {
            state.customCommonAdvancedItemList.splice(payload, 1);
        }
    },
    // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
    actions: {
        getDefaultStrategyItem: function (conText, payload) {
            getDefaultStrategyItem(payload.formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        getRecommendStrategyItem: function (conText, payload) {
            getRecommendStrategyItem(payload.formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        setCommonStrategy: function (conText, payload) {
            // console.log(conText.state.settings.general.addTimes);
            // let formData = {...conText.state.settings.general};

            payload.formData.exchangeCode = conText.rootGetters["exchange/currentExchangeCode"];
            payload.formData.coinCodeList = conText.state.coins;

            payload.formData.additionalLoseRate = payload.formData.additionalLoseRate/100;
            payload.formData.additionalWinRate = payload.formData.additionalWinRate/100;
            payload.formData.winRate = payload.formData.winRate/100;

            payload.formData.itemList.forEach((item) => {item.loseRate = item.loseRate/100});

            setCommonStrategy(payload.formData).then(res => {
                if (res.code === 1000) {
                    // 读取新的策略设置
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        setAdvancedStrategy: function (conText, payload) {
            let formData = {...payload.formData};
            formData.exchangeCode = conText.rootGetters["exchange/currentExchangeCode"];
            formData.coinCodeList = conText.state.coins;
            // Object.assign(formData, payload.formData);
            // payload.formData.additionalLoseRate = payload.formData.additionalLoseRate/100;
            formData.additionalWinRate = payload.formData.additionalWinRate/100;
            // payload.formData.loseRate = payload.formData.loseRate/100;
            formData.winRate = payload.formData.winRate/100;

            formData.itemList.forEach((item) => {
                item.additionalLoseRate = item.additionalLoseRate/100;
                item.additionalWinRate = item.additionalWinRate/100;
                item.loseRate = item.loseRate/100;
                item.winRate = item.winRate/100;
            });

            setAdvancedStrategy(formData).then(res => {
                if (res.code === 1000) {
                    // 读取新的策略设置
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        getCustomStrategyItemList: function (conText, payload) {
            getCustomStrategyItemList(payload.formData).then(res => {
                if(res.code === 1000) {
                    // 读取新的策略设置
                    if (payload.formData.level === 0) {
                        conText.commit("SET_CUSTOM_COMMON_SETTINGS_LIST", res.data || []);
                    } else {
                        conText.commit("SET_CUSTOM_ADVANCED_SETTINGS_LIST", res.data || []);
                    }
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        addCustomCommonStrategy: function (conText, payload) {
            let formData = {...payload.formData};
            formData.exchangeCode = conText.rootGetters["exchange/currentExchangeCode"];
            formData.coinCodeList = ["btcusdt"];

            formData.additionalLoseRate = formData.additionalLoseRate/100;
            formData.additionalWinRate = formData.additionalWinRate/100;
            formData.winRate = formData.winRate/100;
            formData.itemList.forEach((item) => {item.loseRate = item.loseRate/100});

            addCustomCommonStrategy(formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        addCustomAdvancedStrategy: function (conText, payload) {
            let formData = {...payload.formData};
            formData.exchangeCode = conText.rootGetters["exchange/currentExchangeCode"];
            formData.additionalWinRate = payload.formData.additionalWinRate/100;
            // payload.formData.loseRate = payload.formData.loseRate/100;
            formData.winRate = payload.formData.winRate/100;

            formData.itemList.forEach((item) => {
                item.additionalLoseRate = item.additionalLoseRate/100;
                item.additionalWinRate = item.additionalWinRate/100;
                item.loseRate = item.loseRate/100;
                item.winRate = item.winRate/100;
            });

            addCustomAdvancedStrategy(formData).then(res => {
                if (res.code === 1000) {
                    // 读取新的策略设置
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        deleteCustomStrategy: function (conText, payload) {
            deleteCustomStrategy(payload.formData).then(res => {
                if (res.code === 1000) {
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        updateCustomCommonStrategy: function (conText, payload) {
            updateCustomCommonStrategy(payload.formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        updateCustomAdvancedStrategy: function (conText, payload) {
            let formData = {...payload.formData};
            formData.exchangeCode = conText.rootGetters["exchange/currentExchangeCode"];
            formData.additionalWinRate = payload.formData.additionalWinRate/100;
            // payload.formData.loseRate = payload.formData.loseRate/100;
            formData.winRate = payload.formData.winRate/100;

            formData.itemList.forEach((item) => {
                item.additionalLoseRate = item.additionalLoseRate/100;
                item.additionalWinRate = item.additionalWinRate/100;
                item.loseRate = item.loseRate/100;
                item.winRate = item.winRate/100;
            });

            updateCustomAdvancedStrategy(formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        generalSetting(state) {
            return state.general;
        },
        advancedSetting(state) {
            return state.advanced;
        },
        coins(state) {
            return state.coins;
        },
        customCommonStrategyItemList(state) {
            return state.customCommonStrategyItemList;
        },
        customCommonStrategyItemListByIndex:(state) => (index) => {
            return state.customCommonStrategyItemList[index];
        },
        customCommonAdvancedItemList(state) {
            return state.customCommonAdvancedItemList;
        },
        customCommonAdvancedItemListByIndex:(state) => (index) => {
            return state.customCommonAdvancedItemList[index];
        }
    }
}
