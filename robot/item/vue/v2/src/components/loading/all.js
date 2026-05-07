import Loading from './loading';
import Vue from 'vue';
const customLoading = Vue.extend(Loading);
let customLoadingInit = new customLoading().$mount(document.createElement("div"));

import store from '@/store';

export default {
    install(Vue) {
        Vue.component("loading",  Loading);
    },
    show(...v) {
        if (store.getters["config/loading"] === 0) {
            // customLoadingInit = new customLoading().$mount(document.createElement("div"));
            document.body.appendChild(customLoadingInit.$el);
            if (arguments.length > 0) {
                customLoadingInit.text = v[0];
            }
        }
        store.commit("config/ADD_LOADING_NUM");
        // console.log(store.getters["config/loading"]);
    },
    clear() {
        if (null != customLoadingInit) {
            store.commit("config/SUBTRACT_LOADING_NUM");
            if (store.getters["config/loading"] === 0) {
                document.body.removeChild(customLoadingInit.$el);
            }

        }
    }
}