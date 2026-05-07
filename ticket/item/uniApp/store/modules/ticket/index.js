import {myRequest} from "@/util/request.js"
export default {
	namespaced: true,
	state: {
		products: {}
	},
	mutations: { // 同步操作方法
		["SET_LIST"](state, payload) {
			state.products = payload;
		}
	},
	actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
		async getTicketList(conText) {
			const res = await myRequest({
				url:"ticket/getTicketList",
				method: "POST"
			})
			if (res.data.code === 1000) {
				// console.log("products==>",res.data.data.products)
				conText.commit("SET_LIST", res.data.data.products);
			}
		}
	},
	getters: {
		products:(state) => (type) => {
			if (type === 1) {
				let list = [];
				for (let key in state.products) {
					let item = state.products[key];
					item.code = key;
					list.push(item);
				}
				// console.log(list);
				return list;
			} else {
				return [];
			}
		},
		productInfo:(state) => (code) => {
			return state.products[code] || {};
		}
	}
}