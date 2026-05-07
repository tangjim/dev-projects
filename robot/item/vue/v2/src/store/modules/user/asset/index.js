import {SET_ITEM} from '@/store/modules/mutation-types';
import {getAssetInfo} from "@/api/user";

export default {
    namespaced: true,
    state: {
        userCode: "",
        totalGain: 0,
        totalProfit: 0,
        assetState: 0,
        list: [{coinCode:"USDT", amount:0}]
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            // console.log(payload);
            state.userCode = payload.userCode;
            state.totalGain = payload.totalGain;
            state.totalProfit = payload.totalProfit;
            state.assetState = payload.assetState;
            state.list = [...payload.list];
        },
        ["INIT_DATA"](state){
            state.userCode = ""
            state.totalGain = 0;
            state.totalProfit = 0;
            state.assetState = 0;
            state.list = [{coinCode:"USDT", amount:0}];
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        getAssetInfo(conText, payload) {
            // setTimeout(()=>{
                getAssetInfo(payload.formData).then(res => {
                    if (res.code === 1000) {
                        conText.commit(SET_ITEM, res.data);
                    }
                    if (payload && payload.success) {
                        payload.success(res);
                    }
                });
            // }, 500);
        }
    },
    getters: {
        get(state) {
            return {totalGain:state.totalGain, totalProfit: state.totalProfit};
        },
        amount: (state) => (coinCode) => {
            return state.list.find(item => item.coinCode === coinCode);
        },
        assetState(state) {
            return state.assetState;
        }
    }
}
