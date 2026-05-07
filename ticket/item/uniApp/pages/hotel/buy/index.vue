<template>
	<view class="body">
		<view class="top-plane">
			<view class="txt-plane">
				<text class="txt1 bold txt_c_333">{{hotelInfo(formData.hotelCode).name}}</text>
				<text class="txt1 txt_c_555">{{roomInfo(formData.roomTypeCode).roomName}}</text>
				<text class="txt_c_555" space="ensp">标间  {{formData.adult}}成人, {{formData.child}}儿童</text>
				<text class="txt_c_555">{{new Date(formData.checkIn).format("yyyy年MM月dd日")}} - {{new Date(formData.checkOut).format("yyyy年MM月dd日")}} ({{dateNum}} 晚)</text>
			</view>
			
			<view class="price_view"><text class="unit">¥</text><text>{{formData.price}}</text></view>
			
		</view>
		<view class="form-plane">
			<text class="title">订单联系人</text>
			<view class="form-handle-plane">
				<view class="form-group">
					<text class="label">姓名</text>
					<input type="text" placeholder="请输入订单联系人姓名" v-model="formData.guest.name" placeholder-class="iplaceholder-class" />
				</view>
				<view class="form-group">
					<text class="label">手机号码</text>
					<input type="text" placeholder="请输入联系人手机号码" v-model="formData.telephone" placeholder-class="iplaceholder-class" />
				</view>
				<view class="form-group">
					<text class="label">身份证号</text>
					<input type="text" placeholder="请输入身份证号" placeholder-class="iplaceholder-class" />
				</view>
			</view>
		</view>
		<view class="handle-plane">
			<view class="price-plane">
				<text class="lable">共计</text>
				<view class="price_view"><text class="unit">¥</text><text>{{formData.price}}</text></view>
			</view>
			<view class="handle-button">
				<button @click="pay()">前往支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	const DateTools = {
		GetNumberOfDays(date1,date2) {
			//date1：开始日期，date2结束日期
			var a1 = Date.parse(new Date(date1));
			var a2 = Date.parse(new Date(date2));
			var day = parseInt((a2-a1) / (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
			return day;
		}
	}
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				formData: {
					openId: "",
					adult: 1,
					checkIn: "",
					checkOut: "",
					child: 0,
					guest: {
						name: ""
					},
					hotelCode: "",
					hotelName: "",
					price: 0,
					ratePlanCode: "",
					roomTypeCode: "",
					telephone: ""
				}
			}
		},
		computed: {
			...mapGetters({
				openid: "user/openid",
				hotelInfo: "hotel/hotelInfo",
				roomInfo: "hotel/roomInfo"
			}),
			dateNum() {
				return DateTools.GetNumberOfDays(this.formData.checkIn, this.formData.checkOut);
			}
		},
		onLoad(options) {
			this.formData.openId = this.openid;
			this.formData.adult = options.adult;
			this.formData.checkIn = options.checkIn;
			this.formData.checkOut = options.checkOut;
			this.formData.child = options.child;
			this.formData.hotelCode = options.hotelCode;
			this.formData.ratePlanCode = options.ratePlanCode;
			this.formData.roomTypeCode = options.roomTypeCode;
			this.formData.hotelName = this.hotelInfo(options.hotelCode).name;
			this.formData.price = options.price*this.dateNum;
		},
		methods: {
			...mapActions({
				buyHotel: "orderHotel/buyHotel"
			}),
			pay() {
				// console.log(this.formData)
				this.buyHotel({
					formData: this.formData,
					success:(res)=>{
						// console.log(res);
						uni.requestPayment({
							provider: "wxpay",
							orderInfo: "xxx",
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							signType: res.data.signType,
							paySign: res.data.sign
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.body {
		position: relative;
	}
	.top-plane {
		width: 690rpx;
		height: 282rpx;
		background: linear-gradient(135deg, #C7E6FF 0%, #78C2FF 100%);
		opacity: 1;
		border-radius: 10rpx;
		margin:40rpx 30rpx 36rpx;
		padding-top: 30rpx;
		position: relative;
		view.txt-plane {
			text {
				font-family: Microsoft YaHei;
				margin-bottom: 10rpx;
				display: block;
				margin-left: 26rpx;
				
				font-size: 28rpx;
				line-height: 38rpx;
				opacity: 1;
			}
			text.txt1 {
				font-size: 32rpx;
				line-height: 42rpx;
				color: #333333;
				opacity: 1;
			}
		}
		view.price_view {
			position: absolute;
			right: 32rpx;
			bottom: 22rpx;
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
	.form-plane {
		text.title {
			font-size: 40rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			line-height: 52rpx;
			color: #333333;
			opacity: 1;
			display: block;
			text-align: center;
			margin-bottom: 14rpx;
		}
		view.form-handle-plane {
			view.form-group {
				height: 80rpx;
				width: 690rpx;
				margin: 0 30rpx;
				border-bottom: 1px solid #E7ECED;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text.label {
					width: 202rpx;
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 38rpx;
					color: #333333;
					opacity: 1;
				}
				input {
					width: 100%;
				}
				.iplaceholder-class {
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 38rpx;
					color: #C5D0D5;
					opacity: 1;
				}
			}
		}
	}
	.handle-plane {
		position: fixed;
		bottom: 0;
		height: 88rpx;
		width: 690rpx;
		padding: 0 30rpx;
		margin-bottom: 34rpx;
		display: flex;
		justify-content: space-between;
		view.price-plane {
			text.lable {
				margin-top: 26rpx;
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				line-height: 32rpx;
				color: #555555;
				opacity: 1;
				float: left;
			}
			view.price_view {
				float: left;
				margin-left: 20rpx;
				margin-top: 16rpx;
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
		button {
			width: 160rpx;
			height: 50rpx;
			background: #0087F6;
			opacity: 1;
			margin-top: 20rpx;
			border-radius: 6rpx;
			
			padding: 0;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			line-height: 50rpx;
			color: #FFFFFF;
			opacity: 1;
		}
	}
	
	.bold {
		font-weight: bold;
	}
	.txt_c_333 {
		color: #333333;
	}
	.txt_c_555 {
		color: #555555;
	}
</style>
