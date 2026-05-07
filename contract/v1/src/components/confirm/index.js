import Confirm from './confirm';
export default {
    install(Vue) {
        let ConfirmObj = Vue.extend(Confirm);
        Vue.prototype.$confirm = function (...v) {
            let ConfirmInit = new ConfirmObj().$mount(document.createElement("div"));
            document.body.appendChild(ConfirmInit.$el);
            ConfirmInit.isShow = true;
            if (arguments.length === 2) {
                ConfirmInit.msg = v[0];
                ConfirmInit.btnArr = v[1];
            } else if (arguments.length === 3) {
                ConfirmInit.title = v[0];
                ConfirmInit.msg = v[1];
                ConfirmInit.btnArr = v[2];
            }
        };
    }
}
