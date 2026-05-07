import Loading from './loading';
import Vue from 'vue';
const customLoading = Vue.extend(Loading);
let customLoadingInit = new customLoading().$mount(document.createElement("div"));
export default {
    install(Vue) {
        Vue.component("custom-loading",  Loading);
    },
    show(...v) {
        // customLoadingInit = new customLoading().$mount(document.createElement("div"));
        document.body.appendChild(customLoadingInit.$el);
        if (arguments.length > 0) {
            customLoadingInit.text = v[0];
        }
    },
    clear() {
        if (null != customLoadingInit) {
            document.body.removeChild(customLoadingInit.$el);
        }
    }
}
