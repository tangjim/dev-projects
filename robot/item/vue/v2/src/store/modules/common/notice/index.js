// 导入mutations命名常量
import {DELETE_ALL, SET_ITEM} from '@/store/modules/mutation-types';
import {getNoticeList,getNoticeListByPage,getNoticeDoc} from "@/api/common";

export default {
    namespaced: true,
    state: {
        list: [],
        homeList: [],
        doc: {},
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            // state.list = payload.list;
            state.list = state.list.concat(payload.list);
        },
        ["SET_HOME_LIST"](state, payload) {
            state.homeList = [...payload.list];
        },
        ["SET_DOC"](state, payload) {
            // state.list = payload.list;

            state.doc = {...payload.data};
        },
        [DELETE_ALL](state, payload) {
            state.list = [];
        },
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        list(conText, payload) {
            getNoticeList().then(res => {
                // console.log(res.data.list);
                if (res.code === 1000) {
                    conText.commit("SET_HOME_LIST", {list: res.data});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        listPage(conText, payload) {
            getNoticeListByPage(payload.formData).then(res => {
                // console.log(res.data.list);
                if (res.code === 1000) {
                    conText.commit(SET_ITEM, {list: res.data.list || []});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        },
        doc(conText, payload) {
            getNoticeDoc(payload.formData).then(res => {
                if (res.code === 1000) {
                    conText.commit("SET_DOC", {data: res.data});
                }
                if (payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {
        list(state) {
            return state.list;
        },
        homeList(state) {
            return state.homeList;
        },
        get: (state) => (id) => {
            return state.list.find(item => item.id === id);
        },
        doc(state) {
            return state.doc;
        }
    }
}
