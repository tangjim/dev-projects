import Loading from './loading';
let flag = false;
export default {
    install(Vue) {
        let loadingObj = Vue.extend(Loading);
        let messageInit = new loadingObj().$mount(document.createElement("div"));
        Vue.prototype.$loading = {
            show: (text)=>{
                if (!flag) {
                    flag = true;
                    document.body.appendChild(messageInit.$el);
                    if (text) {
                        messageInit.text = text;
                    }
                }
            },
            clear: ()=>{
                if (null != messageInit) {
                    if (flag) {
                        document.body.removeChild(messageInit.$el);
                        flag = false;
                    }
                }
            }
        }
    }
}
