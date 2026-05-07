import {SET_ITEM, SET_USER_STATE} from '../../mutation-types';
import {getIdInfo,idNoCheck} from "../../../../api/user/member";

export default {
    namespaced: true,
    state: {
        userCode: "",
        idCard: "",
        realName: "",
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            console.log(payload);
            state.userCode = payload.userCode;
            state.idCard = payload.idCard;
            state.realName = payload.realName;
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        get(conText, payload) {
            let formData = {userCode:"abc"}
            getIdInfo(formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, res.data);
                }
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        },
        primaryAuth(conText, payload) {
            idNoCheck(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    //     conText.commit(SET_USER_AUTHORIZE_INFO, {user: res.data});
                    // conText.commit(SET_USER_STATE, {loginState: true});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {}
}
