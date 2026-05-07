import {SET_USER_AUTHORIZE_INFO, SET_USER_STATE, EMPTY_USER_INFO, SET_USER_RECHARGE_ADDRESS} from '@/store/modules/mutation-types';
import {authorize, register, safe, logout, getUserInfo, getCheckCodeByUserName, findPassword, getRechargeAddress, createAddress, getCheckCode, updatePassword, setTradePassword, updateTradePassword, bindMobilePhone, getCheckCodeByPhone} from "@/api/user";
import {withdrawal, transfer, getPointState} from "@/api/user/point";
import {getListWithState} from "@/api/coin/pair";

export default {
    namespaced: true,
    state: {
        loginState: parseInt(localStorage["loginState"] || 0),
        userCode: JSON.parse(localStorage["userCode"] || "\"\""),
        nickName: JSON.parse(localStorage["nickName"] || "\"\""),
        mobilePhone: JSON.parse(localStorage["mobilePhone"] || "\"\""),
        photoUrl: JSON.parse(localStorage["photoUrl"] || "\"\""),
        inviteCode: JSON.parse(localStorage["inviteCode"] || "\"\""),
        setTradePassword: parseInt(localStorage["setTradePassword"] || 0),
        agentLevel: JSON.parse(localStorage["level"] || 0),
        levelName: JSON.parse(localStorage["levelName"] || "\"\""),
        list: JSON.parse(localStorage["list"] || '[]'),
        // inviteUrl: localStorage["inviteUrl"] ? localStorage["inviteUrl"] : "",
        rechargeAddress: "",
        assetState: 0,
        coinPair: [],
    },
    mutations: { // 同步操作方法
        [SET_USER_AUTHORIZE_INFO](state, payload) {
            if (payload.user) {
                Object.getOwnPropertyNames(payload.user).forEach((key)=>{
                    state[key] = payload.user[key];
                    localStorage[key] = JSON.stringify(payload.user[key]);
                });
            }
        },
        ["SET_USER_MOBILE_PHONE"](state, payload) {
            state["mobilePhone"] = payload.mobilePhone;
            localStorage["mobilePhone"] = JSON.stringify(payload.mobilePhone);
        },
        ["UPDATE_USER_TRADE_PASSWORD_STATE"](state) {
            state["setTradePassword"] = 1;
            localStorage["setTradePassword"] = JSON.stringify(1);
        },
        [EMPTY_USER_INFO](state) {
            // 清空用户数据
            Object.getOwnPropertyNames(state).forEach((key)=>{
                if (key !== "loginState" && localStorage[key]) {
                    switch (typeof state[key]) {
                        case "string":
                            state[key] = "";
                            break;
                        case "number":
                            state[key] = 0;
                            break;
                        case "object":
                            state[key] = [];
                            break;
                    }
                    localStorage.removeItem(key);
                }
            });
            state.rechargeAddress = "";
            state.coinPair.length = 0;
            state.assetState = 0;
        },
        [SET_USER_STATE](state, payload) {
            state.loginState = payload.loginState;
            localStorage["loginState"] = payload.loginState;
        },
        [SET_USER_RECHARGE_ADDRESS](state, payload) {
            state.rechargeAddress = payload.rechargeAddress;
        },
        ["SET_USER_COIN_PAIR"](state, payload) {
            state.coinPair = [...payload];
        },
        ["SET_USER_COIN_PAIR_RUN_STATE"](state, payload) {
            let userCoinPair = state.coinPair.find(item => item.coinCode === payload.coinCode);
            if (userCoinPair) {
                userCoinPair.runFlag = payload.runFlag;
            }
            // state.coinPair.forEach((c)=>{
            //     if (c.coinCode === payload.coinCode) {
            //         c.runFlag = payload.runFlag;
            //     }
            // })
        },
        ["SET_USER_ASSET_STATE"](state, payload) {
            state.assetState = payload.state;
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        authorize(conText, payload) {
            authorize(payload.formData).then(res => {
                // console.log(res);
                if (res.code === 1000) {
                    conText.commit(SET_USER_AUTHORIZE_INFO, {user: res.data});
                    conText.commit(SET_USER_STATE, {loginState: 1});
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
        checkCodeByUserName(conText, payload) {
            getCheckCodeByUserName(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getCheckCode(conText, payload) {
            getCheckCode(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getCheckCodeByPhone(conText, payload) {
            getCheckCodeByPhone(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        findPassword(conText, payload) {
            findPassword(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        updatePassword(conText, payload) {
            updatePassword(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        setTradePassword(conText, payload) {
            setTradePassword(payload.formData).then(res => {
                if (res.code === 1000) {
                    // 设置交易密码绑定状态
                    conText.commit("UPDATE_USER_TRADE_PASSWORD_STATE");
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        updateTradePassword(conText, payload) {
            updateTradePassword(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        bindMobilePhone(conText, payload) {
            bindMobilePhone(payload.formData).then(res => {
                if (res.code === 1000) {
                    // 设置手机号码
                    conText.commit("SET_USER_MOBILE_PHONE", {mobilePhone: payload.formData.mobilePhone});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        withdrawal(conText, payload) {
            withdrawal(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        transfer(conText, payload) {
            transfer(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        logout(conText, payload) {
            logout({}).then(res => {
                conText.commit(SET_USER_STATE, {loginState: 0});
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        info(conText, payload) {
            getUserInfo(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit(SET_USER_AUTHORIZE_INFO, {user: res.data});
                    conText.commit(SET_USER_STATE, {loginState: 1});
                } else if (res.code === 4001) {
                    conText.commit(SET_USER_STATE, {loginState: 0});
                    conText.commit(EMPTY_USER_INFO);
                }
            });
        },
        createAddress(conText, payload) {
            createAddress(payload.formData).then(res => {
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getRechargeAddress(conText, payload) {
            getRechargeAddress(payload.formData).then(res => {
                if (res.code === 1000) {
                    if (res.data && res.data.address) {
                        conText.commit(SET_USER_RECHARGE_ADDRESS, {rechargeAddress: res.data.address});
                        if (payload.success) {
                            payload.success(res);
                        }
                    } else {
                        // 生成地址
                        conText.dispatch("createAddress", {
                            formData:payload.formData,
                            success: (res2)=> {
                                if (res2.code === 1000) {
                                    if (res2.data && res2.data.address) {
                                        conText.commit(SET_USER_RECHARGE_ADDRESS, {rechargeAddress: res2.data.address});
                                        if (payload.success) {
                                            payload.success(res2);
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            });
        },
        getListWithState(conText, payload) {
            getListWithState(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_USER_COIN_PAIR", res.data);
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        getPointState(conText, payload) {
            getPointState(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_USER_ASSET_STATE", res.data);
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        safe(conText, payload) {
            safe().then(res => {
                if (res.code === 200) {
                    conText.commit(EMPTY_USER_INFO);
                    conText.commit(SET_USER_STATE, {loginState: 0});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        get(state) {
            return {
                userCode: state.userCode,
                nickName: state.nickName,
                mobilePhone: state.mobilePhone,
                photoUrl: state.photoUrl,
                inviteCode: state.inviteCode,
                setTradePassword: state.setTradePassword,
                agentLevel: state.agentLevel,
                levelName: state.levelName,
                isAutoRenew: state.list.length > 0? state.list[0].isAutoRenew === 0 :true
            }
        },
        getRobotState: (state) => (exchangeCode) => {
            // return (state.list.length && state.list.length) > 0 && state.list.find(item => item.exchangeCode === exchangeCode) ? state.list.find(item => item.exchangeCode === exchangeCode) : {isOverdue: 1};
            return (state.list.length && state.list.length) > 0 ? state.list[0] : {isOverdue: 1};
        },
        rechargeAddress(state) {
            return state.rechargeAddress;
        },
        loginState(state) {
            return Boolean(state.loginState);
        },
        userCode(state) {
            return state.userCode;
        },
        coinPair(state) {
            return state.coinPair;
        },
        coinPairByCoinCode: (state) => (coinCode) => {
            return (state.coinPair.length && state.coinPair.length) > 0 && state.coinPair.find(item => item.coinCode === coinCode) ? state.coinPair.find(item => item.coinCode === coinCode) : {strategyFlag: 0, runFlag: 0, hasRunOrderFlag: 0};
        },
        assetState(state) {
            return state.assetState;
        }
    }
}
