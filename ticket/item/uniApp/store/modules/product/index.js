import {myRequest} from "@/util/request.js"
export default {
	namespaced: true,
	state: {
		list: []
	},
	mutations: { // 同步操作方法
		["SET_LIST"](state, payload) {
			if (payload.current_page === 1) {
				state.list = [...payload.data];
			} else {
				state.list = state.list.concat(payload.data);
			}
		}
	},
	actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
		async getSelfProductList(conText, payload) {
			const res = await myRequest({
				url:"ticket/getSelfProductList",
				method: "POST",
				data: payload.formData
			})
			if (res.data.code === 1000) {
				conText.commit("SET_LIST", res.data.data);
				if (payload.success) {
					payload.success(res.data);
				}
			}
		},
		async getSelfProductDetail(conText, payload) {
			const res = await myRequest({
				url:"ticket/getSelfProductDetail",
				method: "POST",
				data: payload.formData
			})
			if (res.data.code === 1000) {
				// conText.commit("SET_LIST", res.data.data);
				if (payload.success) {
					payload.success(res.data);
				}
			}
		}
	},
	getters: {
		list(state) {
			return state.list
		}
	}
}