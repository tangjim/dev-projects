import Message from './message';
export default {
    install(Vue) {
        let messageObj = Vue.extend(Message);
        Vue.prototype.$message = function (v) {
            let messageInit = new messageObj().$mount(document.createElement("div"));
            document.body.appendChild(messageInit.$el);
            messageInit.isShow = true;
            if (v.title) {
                messageInit.title = v.title;
            }
            if (v.msg) {
                messageInit.msg = v.msg;
            }
        };
    }
}
