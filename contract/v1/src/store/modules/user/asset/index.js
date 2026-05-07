import {SET_ITEM} from '../../mutation-types';
import {getAssetInfo} from "../../../../api/user/member";

export default {
    namespaced: true,
    state: {
        userCode: "",
        contractTotal: 0,
        contractTotalCny: 0,
        coinTotal: 0,
        coinTotalCny: 0,
        contractDetails: [],
        coinDetails: []
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            // console.log(payload);
            state.userCode = payload.userCode;
            state.contractTotal = payload.contractTotal;
            state.contractTotalCny = payload.contractTotalCny;
            state.coinTotal = payload.coinTotal;
            state.coinTotalCny = payload.coinTotalCny;
            state.contractDetails = payload.contractDetails;
            state.coinDetails = payload.coinDetails;
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        get(conText, payload) {
            // setTimeout(()=>{
                let formData = {userCode: "abc"};
                getAssetInfo(formData).then(res => {
                    // console.log(res);
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
    getters: {}
}
