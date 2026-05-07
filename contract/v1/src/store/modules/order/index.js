import {SET_ITEM} from '../mutation-types';

export default {
    namespaced: true,
    state: {
        type: 1,
        lever: 3,
        num:"",
        codePrefix:"",
        codeSuffix:"",
        priceType:1,
        price:""
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            Object.getOwnPropertyNames(payload).forEach((key)=>{
                state[key] = payload[key];
            });
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
    },
    getters: {}
}
