<template>
	<view class="body">
		<view class="top_swiper">
			<swiper indicator-dots circular autoplay>
				<swiper-item v-for="(item, index) in hotelInfo(formData.hotelCode).coverDisplay" :key="index">
					<image :src="item"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="main">
			<view class="abstract-plane">
				<text class="title">{{hotelInfo(formData.hotelCode).name}}</text>
				<text class="abstract">酒店地址：{{hotelInfo(formData.hotelCode).address}}\n联系电话：{{hotelInfo(formData.hotelCode).telephone}}</text>
			</view>
			
			<view class="bar">
				<view class="data-plane"><text class="date-z">{{new Date(formData.checkIn).format("MM月dd日")}}</text><text class="date-i">{{dateTxt(formData.checkIn)}}</text><text class="date-c">{{dateNum}}晚</text></view>
				<view class="data-plane"><text class="date-z">{{new Date(formData.checkOut).format("MM月dd日")}}</text><text class="date-i">{{dateTxt(formData.checkOut)}}</text></view>
			</view>
			<view class="list-plane">
				<view class="data-plane" v-for="(item, index) in hotelRoomList" :key="index">
					<image :src="item.coverDisplay[0]"></image>
					<view class="content">
						<text class="title">{{item.roomName}}</text>
						<text class="tips _txt_grey">{{breakfastType(hotelRoomBreakfastType(item.roomCode))}} 1张大床 {{item.maxNumber}}人入住 {{item.area}}㎡</text>
						<text class="tips _txt_green">入住前{{hotelRoomCancelRuleDetails(item.roomCode)}}</text>
					</view>
					<view class="handle">
						<view class="price_view"><text class="unit">¥</text><text>{{hotelRoomPrice({code:item.roomCode,adult:formData.adult,child:formData.child})}}</text></view>
						<button @click="openPopup(item.roomCode)">选择</button>
					</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="bottom" background-color="#fff" :mask-click="false">
			<view class="popup-view">
				<view class="popup-top-plane">
					<text class="title">选择房型</text>
					<image class="close" @click="closePopup" src="../../../static/icon/05.png" mode="aspectFit"></image>
				</view>
				<view class="popup-top-body">
					<view class="top-plane">
						<view class="top-plane-left">
							<view class="top-plane-left-t">
								<text class="title">{{roomInfo(formData.roomTypeCode).roomName}}</text>
								<text class="txt">{{roomInfo(formData.roomTypeCode).adult}}成人, {{roomInfo(formData.roomTypeCode).child}}儿童</text>
								<text class="txt">{{roomInfo(formData.roomTypeCode).roomName}}</text>
							</view>
							<view class="top-plane-left-b">
								<text class="data">{{new Date(formData.checkIn).format("yyyy年MM月dd日")}} - {{new Date(formData.checkOut).format("yyyy年MM月dd日")}} ({{dateNum}} 晚)</text>
							</view>
						</view>
						<view class="top-plane-right">
							<view class="price_view"><text class="unit">¥</text><text>{{hotelRoomPrice({code:formData.roomTypeCode,adult:formData.adult,child:formData.child})}}</text></view>
						</view>
					</view>
					
					<view class="describe-plane">
						<text class="title">房型描述及政策服务</text>
						<view class="content">
							<text>
								{{roomInfo(formData.roomTypeCode).content}}
							</text>
						</view>
					</view>
				
					<view class="handle-plane">
						<button @click="onBuy">立即订购</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const DateTools = {
		GetNumberOfDays(date1,date2) {
			//date1：开始日期，date2结束日期
			var a1 = Date.parse(new Date(date1));
			var a2 = Date.parse(new Date(date2));
			var day = parseInt((a2-a1) / (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
			return day
		}
	}
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				formData: {
					hotelCode: "",
					checkIn: "",
					checkOut: "",
					roomTypeCode: "",
					roomNum: 1,
					adult: 1,
					child: 0,
					price: 0,
					ratePlanCode: ""
				},
				roomCode: ""
			}
		},
		computed: {
			...mapGetters({
				hotelInfo: "hotel/hotelInfo",
				hotelRoomList: "hotel/hotelRoomList",
				roomInfo: "hotel/roomInfo",
				hotelRoomBreakfastType: "hotel/hotelRoomBreakfastType",
				hotelRoomPrice: "hotel/hotelRoomPrice",
				hotelRoomCancelRuleDetails: "hotel/hotelRoomCancelRuleDetails",
				hotelRoomRatePlanCode: "hotel/hotelRoomRatePlanCode"
			}),
			dateTxt() {
				return function(dateStr) {
					let dayTxt = "";
					let day = DateTools.GetNumberOfDays(new Date().format("yyyy-MM-dd"), dateStr);
					switch(day) {
						case 0:
							dayTxt = "今天";
							break;
						case 1:
							dayTxt = "明天";
							break
						case 2:
							dayTxt = "后天";
							break;
						default:
							dayTxt = day+"天后";
					}
					return dayTxt;
				}
			},
			dateNum() {
				return DateTools.GetNumberOfDays(this.formData.checkIn, this.formData.checkOut);
			},
			breakfastType() {
				return function(code) {
					let breakfastTypeTxt = ""
					switch(code) {
						case "NO_BREAKFAST":
							breakfastTypeTxt = "无早餐";
							break;
						case "FREE_TWO_BREAKFAST":
							breakfastTypeTxt = "免费双人早餐";
							break;
						case "FREE_ONE_BREAKFAST":
							breakfastTypeTxt = "免费单人早餐";
							break;
						default:
							breakfastTypeTxt = "免费早餐";
					}
					return breakfastTypeTxt;
				}
			}
		},
		onLoad(options) {
			// 读取酒店信息
			this.formData = options;
			// 查询房型信息
			// console.log(options)
			this.getHotelRoomList({
				formData:this.formData,
				success:()=> {
					this.hotelRoomList.forEach((c)=>{
						// 查询房型价格
						// console.log(c)
						let formData = {
							roomTypeCode: c.roomCode,
							checkIn: this.formData.checkIn,
							checkOut: this.formData.checkOut,
							hotelCode: this.formData.hotelCode
						};
						this.getHotelRoomPrice({formData:formData});
					})
				}
			});
		},
		methods:{
			...mapActions({
				getHotelRoomList: "hotel/getHotelRoomList",
				getHotelRoomPrice: "hotel/getHotelRoomPrice"
			}),
			openPopup(roomCode){
				this.roomCode = roomCode;
				this.formData.roomTypeCode = roomCode;
				this.formData.price = this.hotelRoomPrice({code:this.formData.roomTypeCode,adult:this.formData.adult,child:this.formData.child});
				this.formData.ratePlanCode = this.hotelRoomRatePlanCode(roomCode);
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('bottom');
			},
			closePopup() {
				this.$refs.popup.close();
			},
			onBuy() {
				this.closePopup();
			   let urlParameters = "";
			   for (let k in this.formData) {
				   let value = this.formData[k] !== undefined ? this.formData[k] : "";
				   urlParameters += `&${k}=${encodeURIComponent(value)}`
			   }
			   // console.log(urlParameters.substring(1));
			   uni.navigateTo({url: "/pages/hotel/buy/index?"+urlParameters})
			}
		}
	}
</script>

<style lang="scss">
	.top_swiper {
		swiper {
			width: 750rpx;
			height: 380rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.main {
		width: 690rpx;
		padding: 0 30rpx;
		view.abstract-plane {
			padding-top: 26rpx;
			padding-bottom: 22rpx;
			text.title {
				font-size: 32rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				line-height: 42rpx;
				color: #333333;
				opacity: 1;
				display: block;
			}
			text.abstract {
				height: 120rpx;
				display: block;
				margin-top: 22rpx;
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 32rpx;
				color: #333333;
				opacity: 1;
			}
			
		}
		view.bar {
			width: 690rpx;
			height: 38rpx;
			background: #E9F9FF;
			opacity: 1;
			border-radius: 10rpx;
			padding: 18rpx 0 25rpx;
			
			view.data-plane {
				float: left;
				margin-left: 20rpx;
				text.date-z {
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					line-height: 38rpx;
					color: #333333;
					opacity: 1;
					margin-left: 20rpx;
				}
				text.date-i {
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 32rpx;
					color: #555555;
					opacity: 1;
					margin-left: 20rpx;
				}
				
				text.date-c {
					height: 36rpx;
					padding: 0 20rpx;
					border: 2rpx solid #D1D1D1;
					opacity: 1;
					border-radius: 60rpx;
					margin-left: 20rpx;
					font-size: 20rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 28rpx;
					color: #555555;
					opacity: 1;
				}
			}
			
		}
		view.list-plane {
			margin-bottom: 50rpx;
			view.data-plane {
				height: 140rpx;
				padding: 26rpx 0 24rpx;
				border-bottom: 2px solid #E5E5E5;
				display: flex;
				image {
					width: 196rpx;
					height: 140rpx;
				}
				view.content {
					width: 372rpx;
					margin-left: 12rpx;
					text {
						margin-bottom: 10rpx;
						display: block;
					}
					text.title {
						font-size: 28rpx;
						font-family: Microsoft YaHei;
						font-weight: bold;
						line-height: 32rpx;
						color: #333333;
						opacity: 1;
					}
					text.tips {
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 28rpx;
						opacity: 1;
					}
				}
				view.handle {
					width: 110rpx;
					view.price_view {
						float: right;
						font-size: 40rpx;
						font-family: Microsoft YaHei;
						font-weight: bold;
						line-height: 52rpx;
						color: #FF6E00;
						opacity: 1;
						margin-top: 26rpx;
						text.unit {
							font-size: 28rpx;
						}
					}
					button {
						margin-top: 6rpx;
						width: 110rpx;
						height: 56rpx;
						background: #0087F6;
						opacity: 1;
						border-radius: 10rpx;
						padding: 0;
						
						font-size: 28rpx;
						font-family: Microsoft YaHei;
						font-weight: bold;
						line-height: 56rpx;
						color: #FFFFFF;
						opacity: 1;
					}
				}
			}
			view.data-plane:last-child {
				border: 0;
			}
		}
	}
	
	.popup-view {
		view.popup-top-plane {
			width: 750rpx;
			height: 68rpx;
			background: #BEE2FF;
			opacity: 1;
			border-top: 6rpx solid #0087F6;
			position: relative;
			text.title {
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				line-height: 68rpx;
				color: #333333;
				opacity: 1;
				text-align: center;
				display: block;
			}
			image.close {
				width: 22rpx;
				height: 22rpx;
				position: absolute;
				right: 24rpx;
				top: 20rpx;
			}
		}
		view.popup-top-body {
			width: 690rpx;
			padding: 34rpx 30rpx 38rpx;
			view.top-plane {
				display: flex;
				justify-content: space-between;
				view.top-plane-left {
					view.top-plane-left-t {
						text.title {
							font-size: 32rpx;
							font-family: Microsoft YaHei;
							font-weight: bold;
							line-height: 42rpx;
							color: #555555;
							opacity: 1;
							margin-right: 26rpx;
						}
						text.txt {
							font-size: 28rpx;
							font-family: Microsoft YaHei;
							font-weight: 400;
							line-height: 38rpx;
							color: #555555;
							opacity: 1;
							margin-right: 32rpx;
						}
					}
					view.top-plane-left-b {
						margin-top: 24rpx;
						font-size: 28rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 38rpx;
						color: #555555;
						opacity: 1;
					}
				}
				view.top-plane-right {
					margin-top: 6rpx;
					view.price_view {
						font-size: 40rpx;
						font-family: Microsoft YaHei;
						font-weight: bold;
						line-height: 52rpx;
						color: #FF6E00;
						opacity: 1;
						text.unit {
							font-size: 28rpx;
						}
					}
				}
			}
			view.describe-plane {
				margin-top: 54rpx;
				padding-bottom: 20rpx;
				text.title {
					font-size: 32rpx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					line-height: 42rpx;
					color: #555555;
					opacity: 1;
				}
				view.content {
					margin-top: 24rpx;
					max-height: 800rpx;
					overflow: hidden;
					overflow-y: auto;
					text {
						font-size: 28rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 38rpx;
						color: #555555;
						opacity: 1;
						display: block;
					}
				}
			}
			view.handle-plane {
				margin-top: 20rpx;
				margin-bottom: 38rpx;
				button {
					width: 690rpx;
					height: 80rpx;
					background: #0087F6;
					opacity: 1;
					border-radius: 6px;
					
					font-size: 32rpx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					line-height: 80rpx;
					color: #FFFFFF;
					opacity: 1;
					text-align: center;
				}
			}
		}
	}
	
	._txt_green {
		color: #009A3D;
	}
	._txt_grey {
		color: #555555;
	}
	
</style>
