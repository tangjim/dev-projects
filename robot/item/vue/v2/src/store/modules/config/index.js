import {UPDATE_SYS_TIME, SET_USERNAME_LOCAL} from "../mutation-types";

export default {
    namespaced: true,
    state: {
        languages: [
            {txt: '简体中文', val: 'zh'},
            {txt: '繁体中文', val: 'zhTw'},
            {txt: 'English', val: 'en'},
        ],
        bankList: [
            {text: '中国工商银行', code: 'ICBC'},
            {text: '中国农业银行', code: 'ABC'},
            {text: '中国银行', code: 'BOC'},
            {text: '建设银行', code: 'CCB'},
            {text: '交通银行', code: 'COMM'},
            {text: '中信银行', code: 'CITIC'},
            {text: '中国光大银行', code: 'CEB'},
            // {text: '华夏银行', code: 'HXBANK'},
            {text: '中国民生银行', code: 'CMBC'},
            {text: '广发银行', code: 'GDB'},
            // { text: '平安银行', code: 'PINGAN'},
            {text: '招商银行', code: 'CMB'},
            {text: '兴业银行', code: 'CIB'},
            {text: '上海浦东发展银行', code: 'SPDB'},
            {text: '中国邮政储蓄银行', code: 'PSBC'}
        ],
        languagesIndex: parseInt(localStorage["languagesIndex"] || 0),// localStorage["languagesIndex"]?:0,
        sysTime: new Date(localStorage["sysTime"] || new Date()),//localStorage["sysTime"]?new Date(localStorage["sysTime"]):new Date(),
        loginCode: localStorage["loginCode"] || "",
        coinCode: "USDT",
        loginPanel: {load: false, show: false},
        loading: parseInt(localStorage["loading"]) || 0,
    },
    mutations: { // 同步操作方法
        [UPDATE_SYS_TIME](state, payload) {
            state.sysTime = new Date(payload.data.time.replace(/-/g, '/'));
            localStorage["sysTime"] = state.sysTime;
        },
        [SET_USERNAME_LOCAL](state, payload) {
            state.loginCode = payload.userName;
            localStorage["loginCode"] = payload.userName;
        },
        ["OPEN_LOGIN_PANEL"](state) {
            state.loginPanel.load = true;
            setTimeout(()=>{state.loginPanel.show = true;}, 50);
        },
        ["CLOSE_LOGIN_PANEL"](state) {
            state.loginPanel.show = false;
            setTimeout(()=>{state.loginPanel.load = false;}, 50);
        },
        ["ADD_LOADING_NUM"](state) {
            state.loading++;
            localStorage["loading"] = state.loading;
        },
        ["SUBTRACT_LOADING_NUM"](state) {
            state.loading--;
            localStorage["loading"] = state.loading;
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        socketMessage(conText, payload) {
            switch (payload.type) {
                // case 3:
                //     // 更新系统时间
                //     conText.commit(UPDATE_SYS_TIME, {data: payload.data});
                //     break;
            }
        }
    },
    getters: {
        loginCode(state) {
            return state.loginCode;
        },
        coinCode(state) {
            return state.coinCode;
        },
        loginPanel(state) {
            return state.loginPanel;
        },
        loading(state) {
            return state.loading;
        }
    }
}