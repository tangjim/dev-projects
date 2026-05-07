import {myRequest} from "@/util/request.js"
export default {
	namespaced: true,
	state: {
		// code: "",
		openid:"",
		session_key: "",
		nick_name: "",
		avatar_url: "",
		amount: 0
	},
	mutations: { // 同步操作方法
		["SET_OPENID"](state, payload) {
			state.openid = payload.openid;
			state.session_key = payload.session_key;
		},
		["SET_USER_INFO"](state, payload) {
			// state.code = payload;
			// console.log(payload);
			state.nick_name = payload.nickName
			state.avatar_url = payload.avatarUrl
		}
	},
	actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
		login(conText, payload) {
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
				  // conText.commit("SET_CODE", loginRes.code);
				  if (payload.success) {
					  payload.success(loginRes.code);
				  }
			  }
			});
		},
		async auth(conText, payload) {
			const res = await myRequest({
				url:"user/login",
				method: "POST",
				data: {code:payload.formData.code}
			})
			// console.log(res);
			// 获取用户信息，并更新
			if (res.data.code === 1000) {
				conText.commit("SET_OPENID", res.data.data);
				payload.success();
			}
		},
		getUserProfile(conText, payload) {
			uni.getUserProfile({
				desc: "用于完善会员资料",
				success: (wxRes) => {
					// 设置用户信息，跳转首页
					// console.log("success", wxRes);
					conText.commit("SET_USER_INFO", wxRes.userInfo);
					payload.success();
				},
				fail: (errorRes) => {
					console.log("error", errorRes)
				}
			})
		}
	},
	getters: {
		openid(state) {
			return state.openid;
		},
		userInfo(state) {
			return {nickName:state.nick_name, avatarUrl:state.avatar_url, amount:state.amount};
		}
	}
}