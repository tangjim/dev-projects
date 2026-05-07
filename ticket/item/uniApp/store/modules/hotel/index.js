import {myRequest} from "@/util/request.js"
export default {
	namespaced: true,
	state: {
		hotelList:[],
		hotelRoomList: [],
		hotelRoomPrice: []
	},
	mutations: { // 同步操作方法
		["SET_HOTEL_LIST"](state, payload) {
			state.hotelList = payload;
		},
		["SET_HOTEL_ROOM_LIST"](state, payload) {
			state.hotelRoomList = payload;
		},
		["SET_HOTEL_ROOM_PRICE"](state, payload) {
			// console.log(payload.data);
			state.hotelRoomPrice.push({roomTypeCode:payload.roomTypeCode, data:payload.data || []}) // [payload.roomTypeCode] = payload.data;
		}
	},
	actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
		async getHotelList(conText) {
			const res = await myRequest({
				url:"ticket/getHotelList",
				method: "POST"
			})
			if (res.data.code === 1000) {
				conText.commit("SET_HOTEL_LIST", res.data.data);
			}
		},
		async getHotelRoomList(conText, payload) {
			const res = await myRequest({
				url:"ticket/getHotelRoomList",
				method: "POST",
				data: payload.formData
			})
			if (res.data.code === 1000) {
				conText.commit("SET_HOTEL_ROOM_LIST", res.data.data);
				if (payload.success) {
					payload.success();
				}
			}
		},
		async getHotelRoomPrice(conText, payload) {
			const res = await myRequest({
				url:"ticket/getHotelRoomPrice",
				method: "POST",
				data: payload.formData
			})
			if (res.data.code === 1000) {
				conText.commit("SET_HOTEL_ROOM_PRICE", {data:res.data.data, roomTypeCode:payload.formData.roomTypeCode});
				if (payload.success) {
					payload.success(res.data);
				}
			}
		}
	},
	getters: {
		hotelList(state) {
			return state.hotelList;
		},
		hotelInfo:(state)=>(code)=> {
			return state.hotelList.find(item => item.code === code) || {};
		},
		hotelRoomList(state) {
			return state.hotelRoomList;
		},
		roomInfo:(state)=>(code)=> {
			return state.hotelRoomList.find(item => item.roomCode === code) || {};
		},
		hotelRoomBreakfastType:(state)=>(code)=> {
			if (state.hotelRoomPrice.find(item => item.roomTypeCode === code)) {
				return state.hotelRoomPrice.find(item => item.roomTypeCode === code).data[0].breakfastType;
			} else {
				return "NO_BREAKFAST";
			}
		},
		hotelRoomPrice:(state)=>(query)=> {
			if (state.hotelRoomPrice.find(item => item.roomTypeCode === query.code)) {
				// console.log(state.hotelRoomPrice.find(item => item.roomTypeCode === query.code).data[0].price[0], query.adult);
				return state.hotelRoomPrice.find(item => item.roomTypeCode === query.code).data[0].price[0]["adult_"+query.adult] || 
				state.hotelRoomPrice.find(item => item.roomTypeCode === query.code).data[0].price[0].adult_1;
			} else {
				return "0";
			}
		},
		hotelRoomCancelRuleDetails:(state)=>(code)=> {
			if (state.hotelRoomPrice.find(item => item.roomTypeCode === code)) {
				let cancelRuleDetails = state.hotelRoomPrice.find(item => item.roomTypeCode === code).data[0].channelRateInfos[0].cancelRule.cancelRuleDetails[0];
				return cancelRuleDetails.remark[0].content;// "入住前"+cancelRuleDetails.dayBeforeArrival+"天"+cancelRuleDetails.cancelBeforeTime+"前免费取消";
			} else {
				return ""
			}
		},
		hotelRoomRatePlanCode:(state)=>(code)=> {
			if (state.hotelRoomPrice.find(item => item.roomTypeCode === code)) {
				return state.hotelRoomPrice.find(item => item.roomTypeCode === code).data[0].ratePlanCode;
			} else {
				return "";
			}
		}
	}
}