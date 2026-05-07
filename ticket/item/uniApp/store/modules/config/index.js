export default {
	namespaced: true,
	state: {
		text: "测试一下"
	},
	mutations: { // 同步操作方法
	},
	actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
	},
	getters: {
		text(state) {
			return state.text;
		}
	}
}