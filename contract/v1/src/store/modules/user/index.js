import {SET_USER_AUTHORIZE_INFO, SET_USER_STATE, EMPTY_USER_INFO} from '../mutation-types';
import {authorize, register, safe, logout, get} from "../../../api/user";
import store from "../../index";

export default {
    namespaced: true,
    state: {
        loginState: localStorage["loginState"] ? Boolean(localStorage["loginState"]) : false,
        userCode: localStorage["userCode"] ? localStorage["userCode"] : "",
        mobilePhone: localStorage["mobilePhone"] ? localStorage["mobilePhone"] : "",
        email: localStorage["email"] ? localStorage["email"] : "",
        setTransactionPassword: localStorage["setTransactionPassword"] ? parseInt(localStorage["setTransactionPassword"]) : 0,
        inviteUrl: localStorage["inviteUrl"] ? localStorage["inviteUrl"] : "",
        inviteCode: localStorage["inviteCode"] ? localStorage["inviteCode"] : "",

        // uid: localStorage["uid"] ? localStorage["uid"] : "",
        amountPassword: localStorage["amountPassword"] ? localStorage["amountPassword"] : false,
    },
    mutations: { // 同步操作方法
        [SET_USER_AUTHORIZE_INFO](state, payload) {
            Object.getOwnPropertyNames(payload.user).forEach((key)=>{
                state[key] = payload.user[key];
                localStorage[key] = JSON.stringify(payload.user[key]);
            });
        },
        [EMPTY_USER_INFO](state) {
            // 清空用户数据
            Object.getOwnPropertyNames(state).forEach((key)=>{
                if (key !== "loginState" && localStorage[key]) {
                    state[key] = "";
                    localStorage.removeItem(key);
                }
            });

        },
        [SET_USER_STATE](state, payload) {
            state.loginState = payload.loginState;
            localStorage["loginState"] = payload.loginState;
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        authorize(conText, payload) {
            authorize(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit(SET_USER_AUTHORIZE_INFO, {user: res.data});
                    conText.commit(SET_USER_STATE, {loginState: true});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        register(conText, payload) {
            register(payload.formData).then(res => {
                // console.log(res);
                // if (res.code === 1000) {
                //     conText.commit(SET_USER_AUTHORIZE_INFO, {user: res.data});
                //     conText.commit(SET_USER_STATE, {loginState: true});
                // }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        logout(conText, payload) {
            logout({userCode: conText.getters.userCode}).then(res => {
                if (res.code === 1000) {
                    conText.commit(EMPTY_USER_INFO);
                    conText.commit(SET_USER_STATE, {loginState: false});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        info(conText, payload) {
            // console.log(conText.getters.userCode);
            get({userCode: conText.getters.userCode}).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_USER_AUTHORIZE_INFO, {user: res.data});
                    conText.commit(SET_USER_STATE, {loginState: true});
                } else if (res.code === 4001) {
                    conText.commit(SET_USER_STATE, {loginState: false});
                    conText.commit(EMPTY_USER_INFO);
                }

            });
        },
        safe(conText, payload) {
            safe().then(res => {
                if (res.code === 200) {
                    conText.commit(EMPTY_USER_INFO);
                    conText.commit(SET_USER_STATE, {loginState: false});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        userCode(state) {
            return state.userCode;
        },
    }
}
