import {SET_ITEM} from '@/store/modules/mutation-types';
import {getUserDirectRecommendInfo} from "@/api/recommend";

export default {
    namespaced: true,
    state: {
        gain: 0,
        gainToday: 0,
        activateNum: 0,
        nonactivatedNum: 0
    },
    mutations: {
        [SET_ITEM](state, payload) {
            Object.getOwnPropertyNames(payload).forEach((key)=>{
                state[key] = payload[key];
            });
        },
        ["INIT"](state) {
            state.gain = 0;
            state.gainToday = 0;
            state.activateNum = 0;
            state.nonactivatedNum = 0;
        }
    },
    actions: {
        getUserDirectRecommendInfo(conText, payload) {
            getUserDirectRecommendInfo(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, res.data);
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        info(state) {
            return {gain: state.gain, gainToday: state.gainToday, activateNum: state.activateNum, nonactivatedNum: state.nonactivatedNum};
        }
    }
}
