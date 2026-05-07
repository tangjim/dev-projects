import {getBasicInfo} from "@/api/common";

export default {
    namespaced: true,
    state: {},
    // 同步操作方法
    mutations: {},
    // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
    actions: {
        getBasicInfo(conText, payload) {
            getBasicInfo(payload.formData).then(res => {
                if (payload && payload.success) {
                    payload.success(res);
                }
            });
        }
    },
    getters: {}
}
