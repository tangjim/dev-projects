import {SET_COIN_PAIR_PRICE, SET_LIST} from "@/store/modules/mutation-types";
import {getByExchangeCode, getSinglePrice, getPriceByCoinCodeList, getCoinInfo} from "@/api/coin/pair";


import storeAll from '@/store'
import {
    batchStartStrategy,
    batchStopStrategy,
    changeStrategyType,
    getUserStrategyItem, getUserStrategyItemByCoinList, restoreStrategyItem,
    startStrategy,
    stopStrategy
} from "@/api/strategy";
import {getRecentlyOrder, getRecentlyOrderByCoinList, pauseAddOrder} from "@/api/order";

export default {
    namespaced: true,
    state: {
        list: []
    },
    // 同步操作方法
    mutations: {
        [SET_LIST](state, payload) {
            // state.list.push(payload.data);
            state.list = [...payload];
            // console.log(payload);
        },
        [SET_COIN_PAIR_PRICE](state, payload) {
            let coinPair = state.list.find(item => item.coinCode === payload.data.code);
            if (coinPair) {
                coinPair.price = payload.data.price;
                coinPair.increase = payload.data.openPrice > 0 ? ((payload.data.price-payload.data.openPrice)/payload.data.openPrice)*100 : 0;
            }
        },
        ["DEL_STRATEGY_LIST"](state) {
            state.list.forEach(function(e){
                e.strategy =  {type: 1, level: 0, is:0};
            })
        },
        ["SET_COIN_OPEN_STATE"](state, payload) {
            let coinPair = state.list.find(item=> item.coinCode === payload);
            if (coinPair) {
                coinPair.isOpen = !coinPair.isOpen;
            }
        },
        ["SET_COIN_INFO_OPEN_STATE"](state, payload) {
            let coinPair = state.list.find(item=> item.coinCode === payload.coinCode);
            if (coinPair) {
                coinPair.infoOpen = payload.open;
            }
        },

        ["SET_STRATEGY_LIST"](state, payload) {
            let coinPair = state.list.find(item=> item.coinCode === payload.coinCode);
            if (coinPair) {
                coinPair.strategy = {...payload.data};
                coinPair.strategy.is = 1;
            }
        },
        ["SET_STRATEGY_TYPE"](state, payload) {
            let coinPair = state.list.find(item=> item.coinCode === payload.coinCode);
            if (coinPair) {
                coinPair.strategy.type = payload.type;
            }
        },

        ["DEL_RECENTLY_LIST"](state) {
            state.list.forEach(function(e){
                e.orderRecently = {isPause: 0,is:0};
            })
        },
        ["DEL_RECENTLY_ITEM"](state, payload) {
            let coinPair = state.list.find(item=> item.coinCode === payload.coinCode);
            if (coinPair) {
                coinPair.orderRecently = {isPause: 0,is:0};
            }
        },
        ["SET_RECENTLY_ITEM"](state, payload) {
            let coinPair = state.list.find(item=> item.coinCode === payload.coinCode);
            if (coinPair && payload.data) {
                coinPair.orderRecently = {...payload.data};
                coinPair.orderRecently.is = 1;
            } else {
                coinPair.orderRecently = {isPause: 0,is:0};
            }

            // payload.data.coinCode = payload.coinCode;
            // if (state.recently.find((item) => item.coinCode === payload.coinCode)) {
            //     for (let i=0; i<state.list.length; i++) {
            //         if (state.recently[i].coinCode === payload.coinCode) {
            //             state.recently[i] = {...payload.data};
            //         }
            //     }
            // } else {
            //     state.recently.push(payload.data);
            // }
        },
        // ["DEL_RECENTLY_ITEM"](state, payload) {
        //     let coinPair = state.list.find(item=> item.coinCode === payload.coinCode);
        //     if (coinPair) {
        //         coinPair.orderRecently = {isPause: 0, is:0}
        //     }
        // },
        ["SET_ORDER_PAUSE_ITEM"](state, payload) {
            let coinPair = state.list.find(item => item.orderRecently.orderNo === payload.orderNo);
            if (coinPair) {
                coinPair.orderRecently.isPause = payload.type;
            }
            // state.recently.find()
        },
        ["RECENTLY_STRATEGY_INIT"](state, payload) {

        }
    },
    // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
    actions: {
        socketMessage(conText, payload) {
            // 1620191747000
            // console.log(formatTime(, "Y-M-D h:m:s"));
            // console.log(new Date(1620191747000).format("yyyy-MM-dd hh:mm:ss"))
            switch (payload.pushType) {
                case 1:
                    let openPrice = payload.openPrice || 0;
                    // 判断当前价格小数位数
                    if (payload.price.toString().indexOf(".") === -1 || (payload.price.toString().split(".").length > 1 && payload.price.toString().split(".")[1].length < 2)) {
                        payload.price = payload.price.toFixed(2);
                    } else {
                        payload.price = payload.price.toString(); // .toFixed(payload.price.toString().split(".")[1].length);
                    }
                    let data = {code: payload.code, openPrice: openPrice, price: payload.price};
                    conText.commit(SET_COIN_PAIR_PRICE, {data: data});
                    break;
                case 3:
                    if (payload.tradeType === 0) {
                        // 买入
                        payload.createDate = new Date(payload.createDate).format("yyyy-MM-dd hh:mm:ss");// formatTime(payload.createDate, "Y-M-D h:m:s");
                        conText.commit("SET_RECENTLY_ITEM", {coinCode:payload.coinCode, data:payload});
                    } else {
                        // 卖出
                        // 读取运行状态
                        storeAll.dispatch("user/getListWithState", {formData: {exchangeCode: payload.exchangeCode}}).then(r => {});
                        // 删除订单
                        conText.commit("DEL_RECENTLY_ITEM", {coinCode:payload.coinCode});
                    }
                    // 读取用户交易所资产
                    storeAll.dispatch("pointExchange/getUserExchangePoint", {formData: {exchangeCode: payload.exchangeCode}}).then(r => {});
                    break;
            }
        },
        getByExchangeCode(conText, payload) {
            // console.log(conText.rootGetters["user/loginState"])
            getByExchangeCode(payload.formData).then(res => {
                if (res.code === 1000) {
                    for (let i=0; i<res.data.length; i++) {
                        res.data[i].type = "币币";
                        res.data[i].price = "0.00";
                        res.data[i].increase = 0;
                        res.data[i].isOpen = false;
                        res.data[i].infoOpen = true;
                        res.data[i].strategyFlag = 0;
                        res.data[i].runFlag = 0;
                        res.data[i].strategy = {type: 1, level: 0, is:0};
                        res.data[i].orderRecently = {isPause: 0, is:0};
                    }
                    conText.commit(SET_LIST, res.data);
                    // res.data.forEach(coinPair => {
                    //     conText.dispatch("getSinglePrice", {formData:{exchangeCode:payload.formData.exchangeCode, coinCode:coinPair.coinCode}});
                    // });

                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        getPriceByCoinCodeList(conText, payload) {
            getPriceByCoinCodeList(payload.formData).then(res => {
                if (res.code === 1000) {
                    res.data.forEach((coin)=>{
                        // 判断当前价格小数位数
                        if (coin.price.toString().indexOf(".") === -1 || (coin.price.toString().split(".").length > 1 && coin.price.toString().split(".")[1].length < 2)) {
                            coin.price = coin.price.toFixed(2);
                        } else {
                            coin.price = coin.price.toString(); // .toFixed(payload.price.toString().split(".")[1].length);
                        }
                        let data = {code: coin.coinCode, openPrice: coin.openPrice, price: coin.price};
                        conText.commit(SET_COIN_PAIR_PRICE, {data: data});
                    });

                }
            });
        },
        getSinglePrice(conText, payload) {
            getSinglePrice(payload.formData).then(res => {
                if (res.code === 1000) {
                    // 判断当前价格小数位数
                    if (res.data.toString().indexOf(".") === -1 || (res.data.toString().split(".").length > 1 && res.data.toString().split(".")[1].length < 2)) {
                        res.data = res.data.toFixed(2);
                    } else {
                        res.data = res.data.toString(); // .toFixed(payload.price.toString().split(".")[1].length);
                    }
                    let data = {code: payload.formData.coinCode, openPrice: 0, price: res.data};
                    conText.commit(SET_COIN_PAIR_PRICE, {data: data});
                }
            });
        },
        getUserStrategyItem(conText, payload) {
            getUserStrategyItem(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_STRATEGY_LIST", {data: res.data, coinCode: payload.formData.coinCode});
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        getUserStrategyItemByCoinList(conText, payload) {
            getUserStrategyItemByCoinList(payload.formData).then(res => {
                if (res.code === 1000) {

                    for (let i=0; i<res.data.length; i++) {
                        conText.commit("SET_STRATEGY_LIST", {coinCode:res.data[i].coinCode, data:res.data[i]});
                    }

                    // conText.commit("SET_STRATEGY_LIST", {data: res.data, coinCode: payload.formData.coinCode});
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
                        conText.commit("SET_STRATEGY_TYPE", {coinCode:payload.formData.coinCodeList[i], type:payload.formData.type});
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
                if (res.code === 1000) {}
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        getRecentlyOrder(conText, payload) {
            getRecentlyOrder(payload.formData).then(res => {
                if (res.code === 1000) {
                    if (res.data) {
                        conText.commit("SET_RECENTLY_ITEM", {coinCode:payload.formData.coinCode, data:res.data});
                    }
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getRecentlyOrderByCoinList(conText, payload) {
            getRecentlyOrderByCoinList(payload.formData).then(res => {
                if (res.code === 1000) {
                    for (let i=0; i<res.data.length; i++) {
                        conText.commit("SET_RECENTLY_ITEM", {coinCode:res.data[i].coinCode, data:res.data[i]});
                    }
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        pauseAddOrder(conText, payload) {
            pauseAddOrder(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_ORDER_PAUSE_ITEM", payload.formData);
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getCoinInfo(conText, payload) {
            getCoinInfo(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        getHomeCoinPairList(state) {
            let newCoin = [];
            let topCoinList = state.list.filter((item)=>{ return item.homePageShow === 1; });
            for(let i=0;i<topCoinList.length;i+=3){
                newCoin.push(topCoinList.slice(i,i+3));
            }
            newCoin.sort(function(a,b){
                return a.sequence - b.sequence
            });
            return newCoin;
        },
        search: (state) => (code, type) => {
            let newList = state.list;
            if (type === 1 || type === 2 || type === 5) {
                newList = state.list.filter(item => storeAll.getters["user/coinPairByCoinCode"](item.coinCode).strategyFlag === 1);
            }
            switch (type) {
                case 1:
                    // 获取已的启动了的交易对
                    newList = newList.filter(item => storeAll.getters["user/coinPairByCoinCode"](item.coinCode).runFlag === 1);
                    break;
                case 2:
                    // 获取已停止的交易对
                    newList = newList.filter(item => storeAll.getters["user/coinPairByCoinCode"](item.coinCode).runFlag === 0);
                    break;
                case 3:
                    // 获取循环策略的交易对
                    newList = newList.filter(item => storeAll.getters["user/coinPairByCoinCode"](item.coinCode).strategyFlag === 1 && item.strategy.type === 1);
                    break;
                case 4:
                    // 获取单次策略的交易对
                    newList = newList.filter(item => storeAll.getters["user/coinPairByCoinCode"](item.coinCode).strategyFlag === 1 && item.strategy.type === 0);
                    break;
                case 5:
                    // 获取停补状态下的交易对
                    newList = newList.filter(item => storeAll.getters["user/coinPairByCoinCode"](item.coinCode).runFlag === 1 && item.orderRecently.isPause === 1);
                    break;
            }
            let pattern = new RegExp(code,"i") ;
            let searchCoinList = newList.filter(item => !code || pattern.test(item.showCode.split("-")[0]));
            // 排序 运行状态(并有订单的)>运行状态(还未产生过订单的)>有过订单的交易对>设置过策略>排序字段
            let runFlagCoinList = [];
            let runNotOrderFlagCoinList = [];
            let orderCoinList = [];
            let strategyFlagCoinList = [];
            let defCoinList = [];
            // for (let i in searchCoinList) {
            //     if (storeAll.getters["user/coinPairByCoinCode"](searchCoinList[i].coinCode).runFlag === 1 && searchCoinList[i].orderRecently.orderNo) {
            //         runFlagCoinList.push(searchCoinList[i]);
            //     } else if (storeAll.getters["user/coinPairByCoinCode"](searchCoinList[i].coinCode).runFlag === 1 && !searchCoinList[i].orderRecently.orderNo) {
            //         runNotOrderFlagCoinList.push(searchCoinList[i]);
            //     } else if (storeAll.getters["user/coinPairByCoinCode"](searchCoinList[i].coinCode).runFlag === 0 && searchCoinList[i].orderRecently.orderNo) {
            //         orderCoinList.push(searchCoinList[i]);
            //     } else if (storeAll.getters["user/coinPairByCoinCode"](searchCoinList[i].coinCode).strategyFlag === 1) {
            //         strategyFlagCoinList.push(searchCoinList[i]);
            //     } else {
            //         defCoinList.push(searchCoinList[i]);
            //     }
            // }
            searchCoinList.forEach((c)=>{
                // console.log(c);
                // 获取开启状态的交易对
                if (storeAll.getters["user/coinPairByCoinCode"](c.coinCode).runFlag === 1 && storeAll.getters["user/coinPairByCoinCode"](c.coinCode).hasRunOrderFlag === 1) {
                    runFlagCoinList.push(c);
                } else if (storeAll.getters["user/coinPairByCoinCode"](c.coinCode).runFlag === 1 && storeAll.getters["user/coinPairByCoinCode"](c.coinCode).hasRunOrderFlag === 0) {
                    runNotOrderFlagCoinList.push(c);
                } else if (storeAll.getters["user/coinPairByCoinCode"](c.coinCode).runFlag === 0 && storeAll.getters["user/coinPairByCoinCode"](c.coinCode).hasRunOrderFlag === 1) {
                    orderCoinList.push(c);
                } else if (storeAll.getters["user/coinPairByCoinCode"](c.coinCode).strategyFlag === 1) {
                    strategyFlagCoinList.push(c);
                } else {
                    defCoinList.push(c);
                }
            });
            runFlagCoinList = runFlagCoinList.sort(function(a,b) {
                return a.sequence - b.sequence
            });
            runNotOrderFlagCoinList = runNotOrderFlagCoinList.sort(function(a,b) {
                return a.sequence - b.sequence
            });
            orderCoinList = orderCoinList.sort(function(a,b) {
                return a.sequence - b.sequence
            });
            strategyFlagCoinList = strategyFlagCoinList.sort(function(a,b) {
                return a.sequence - b.sequence
            });
            defCoinList = defCoinList.sort(function(a,b) {
                return a.sequence - b.sequence
            });

            let sortCoinList = [];
            if (runFlagCoinList.length > 0) {
                sortCoinList = sortCoinList.concat(runFlagCoinList);
            }
            if (runNotOrderFlagCoinList.length > 0) {
                sortCoinList = sortCoinList.concat(runNotOrderFlagCoinList);
            }
            if (orderCoinList.length > 0) {
                sortCoinList = sortCoinList.concat(orderCoinList);
            }
            if (strategyFlagCoinList.length > 0) {
                sortCoinList = sortCoinList.concat(strategyFlagCoinList);
            }
            if (defCoinList.length > 0) {
                sortCoinList = sortCoinList.concat(defCoinList);
            }
            // return searchCoinList.sort(function(a,b) {return a.sequence - b.sequence});
            return sortCoinList;
        },
        getShowCode: (state) => (coinCode) => {
            return (state.list.find(item => item.coinCode === coinCode) && state.list.find(item => item.coinCode === coinCode).showCode) || "";
        },
        getByCode: (state) => (coinCode) => {
            return state.list.find(item => item.coinCode === coinCode) || {};
        },
        list: (state) => (code) => {
            let pattern = new RegExp(code,"i") ;
            let searchCoinList = state.list.filter(item => !code || pattern.test(item.showCode.split("-")[0]));

            return searchCoinList.sort(function(a,b) {
                return a.sequence - b.sequence
            });
        },
        getCoinOpenState: (state) => (coinCode) => {
            return state.list.find(item => item.coinCode === coinCode).isOpen;
        },
        getCoinInfoOpenState: (state) => (coinCode) => {
            return state.list.find(item => item.coinCode === coinCode).infoOpen;
        },
        getCoin: (state) => (coinCode) => {
            return (state.coins && state.coins[coinCode]) || {};
        }
    }
}
