import {myRequest} from "@/util/request.js"
export default {
	namespaced: true,
	state: {},
	mutations: { // 同步操作方法
	},
	actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
		async buyHotel(conText, payload) {
			const res = await myRequest({
				url:"order/orderHotel",
				method: "POST",
				data: payload.formData
			})
			if (res.data.code === 1000) {
				// conText.commit("SET_LIST", res.data.data.products);
				if (payload.success) {
					payload.success(res.data);
				}
			}
		}
	},
	getters: {}
}