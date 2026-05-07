import Confirm from './confirm';
export default {
    install(Vue) {
        let ConfirmObj = Vue.extend(Confirm);
        Vue.prototype.$confirm = function (v) {
            let ConfirmInit = new ConfirmObj().$mount(document.createElement("div"));
            document.body.appendChild(ConfirmInit.$el);
            ConfirmInit.isShow = true;
            if (v.title) {
                ConfirmInit.title = v.title;
            }
            if (v.msg) {
                ConfirmInit.msg = v.msg;
            }
            if (v.buttons) {
                let buttons = [{txt:"取消"}];
                if (v.buttons.length > 0) {
                    buttons = v.buttons;
                }
                ConfirmInit.buttons = buttons;
            }
        };
    }
}
