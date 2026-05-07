import {SET_ITEM, UPDATE_SUS_PRODUCT_INDEX} from "../mutation-types";
import {getPriceInfo, getSusProductInfo} from "../../../api/product/sus/index";

export default {
    namespaced: true,
    state: {
        list: [],
        susList: [],
    },
    // 同步操作方法
    mutations: {
        [SET_ITEM](state, payload) {
            state.susList.push(payload.data); // = payload.list;
            // console.log(state.susList);
        },
        [UPDATE_SUS_PRODUCT_INDEX](state, payload) {
            // console.log(payload);
            for (let i=0; i<state.susList.length; i++) {
                let productCode = state.susList[i].codePrefix + "-" + state.susList[i].codeSuffix;
                if (productCode === payload.code) {
                    state.susList[i].price = payload.buy;
                    // console.log(123);
                }
            }
        }
    },
    // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
    actions: {
        // susList(conText, payload) {
        //     getPriceInfo(payload.formData).then(res => {
        //         if (res.code === 1000) {
        //             conText.commit(SET_ITEM, {list: res.data});
        //         }
        //         if (payload && payload.success) {
        //             payload.success(res.code);
        //         }
        //     });
        // },
        getSusProductInfo(conText, payload) {
            getSusProductInfo().then(res => {
                if (res.code === 1000) {
                    for (let i = 0; i<res.data.length; i++) {
                        let formData = {"productCode": res.data[i].codePrefix + "-" + res.data[i].codeSuffix};
                        getPriceInfo(formData).then(res2 => {
                            // console.log(res2);
                            if (res2.code === 1000) {
                                // conText.commit(SET_ITEM, {list: res2.data});
                                // res.data[i] = res2.data;
                                // console.log(res2.data[0]);
                                Object.assign(res.data[i], res2.data[0]);
                                res.data[i].type = "永续合约";
                                if (!res.data[i].front_precision) {
                                    // console.log(123);
                                    res.data[i].front_precision = 2;
                                }
                                conText.commit(SET_ITEM, {data: res.data[i]});
                            }
                        });
                    }

                }
                if (payload && payload.success) {
                    payload.success(res.code);
                }
            });
        },
        susSocketMessage(conText, payload) {
            switch (payload.type) {
                case 6:
                    // 更新产品指数
                    conText.commit(UPDATE_SUS_PRODUCT_INDEX, payload);
                    break;
            }
        }
    },
    getters: {
        getTopCoinList(state) {
            let newCoin = [];
            for(let i=0;i<state.susList.length;i+=3){
                newCoin.push(state.susList.slice(i,i+3));
            }
            newCoin.sort(function(a,b){
                return a.sequence - b.sequence
            });
            // console.log(newCoin);
            return newCoin;
        },
        getSusCoinList(state) {
            return state.susList;
        }
    }
}
