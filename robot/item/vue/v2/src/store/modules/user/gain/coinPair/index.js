import {DELETE_ALL, SET_ITEM} from "@/store/modules/mutation-types";
import {getGainTotalByCoin} from "@/api/gain";

export default {
    namespaced: true,
    state: {
        gain: 0,
        gainToday: 0
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            state.gain = payload.gain || 0;
            state.gainToday = payload.gainToday || 0;
        },
        [DELETE_ALL](state) {
            state.gain = 0;
            state.gainToday = 0;
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        getGainTotalByCoin(conText, payload) {
            getGainTotalByCoin(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, res.data);
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
    },
    getters: {
        gain(state) {
            return {gain:state.gain, gainToday: state.gainToday};
        }
    }
}