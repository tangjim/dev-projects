<template>
	<view class="body">
		<view class="top-plane">
			<view class="txt-plane">
				<text class="txt1 bold txt_c_333">{{productInfo(code).description}}</text>
				<text class="txt1 txt_c_555">{{personType}}</text>
				<text class="txt_c_555" space="ensp">时间：{{ticketDate}}</text>
				<text class="txt_c_555">地点：XXXXXXXXXXXXX</text>
			</view>
			
		</view>
		<view class="form-plane">
			<text class="title">订单联系人</text>
			<view class="form-handle-plane">
				<view class="form-group">
					<text class="label">姓名</text>
					<input type="text" placeholder="请输入订单联系人姓名" v-model="formData.contact.name" placeholder-class="iplaceholder-class" />
				</view>
				<view class="form-group">
					<text class="label">手机号码</text>
					<input type="text" placeholder="请输入联系人手机号码" v-model="formData.contact.telephone" placeholder-class="iplaceholder-class" />
				</view>
				<view class="form-group">
					<text class="label">身份证号</text>
					<input type="text" placeholder="请输入身份证号" v-model="formData.contact.id_no" placeholder-class="iplaceholder-class" />
				</view>
				
				<view class="form-group">
					<text class="label">入园时间</text>
					<input type="text" placeholder="请选择入园时间" :value="selectedDateStr" @click="DatePicker" placeholder-class="iplaceholder-class" disabled />
				</view>
				
			</view>
		</view>
		
		<view class="form-plane">
			<view class="form-handle-plane">
				<view class="form-group-title">
					<text class="title">自然基础(这是景点门票的子项目名)</text>
					<view class="price_view"><text class="unit">¥</text><text>{{ticketPrice.toFixed(2)}}</text></view>
				</view>
				<view class="form-group">
					<text class="label">购票数量</text>
					<view class="stepper-comp">
						<view class="icon subtract" @click="stepperSubtract()"></view>
						<input type="text" :value="formData.ticketEntity.quantity" disabled />
						<view class="icon add" @click="stepperAdd()"></view>
					</view>
				</view>
				
				<view class="form-group-child" v-for="(item, index) in formData.ticketEntity.guest" :key="index">
					<view class="form-group line">
						<text class="num">{{index+1}}</text>
					</view>
					<view class="form-group line">
						<text class="label">姓名</text>
						<input type="text" placeholder="请输入订单联系人姓名" v-model="item.name" placeholder-class="iplaceholder-class" />
					</view>
					<view class="form-group line">
						<text class="label">手机号码</text>
						<input type="text" placeholder="请输入联系人手机号码" v-model="item.telephone" placeholder-class="iplaceholder-class" />
					</view>
					<view class="form-group line">
						<text class="label">身份证号</text>
						<input type="text" placeholder="请输入身份证号" v-model="item.id_no" placeholder-class="iplaceholder-class" />
					</view>
				</view>
				
				
			</view>
		</view>
		
		<view class="need-to-know">
			<text class="title">出游人须知</text>
			<text class="content">本产品中所含的一日票为指定日票，游客在购票时须在日历所标识的适用日期中选定入园日期，且仅可在购票时所选定的入园日期入园；产品内所含的“100元购物抵扣券”为指定日抵扣券，使用日期与游客所购买的入园门票日期须一致，且仅可在入园日期当天使用。</text>
		</view>
		
		<view class="handle-plane">
			<view class="price-plane">
				<text class="lable">共计</text>
				<view class="price_view"><text class="unit">¥</text><text>{{(ticketPrice*formData.ticketEntity.quantity).toFixed(2)}}</text></view>
			</view>
			<view class="handle-button">
				<button @click="pay">前往支付</button>
			</view>
		</view>
		
		<uni-popup ref="myPickerPopup" type="bottom">
			<view class="picker-popup-view">
				<my-date-picker :show="mxDatePickerSetting.showPicker" :currCalendar="mxDatePickerSetting.currCalendar" :maxDate="mxDatePickerSetting.maxDate" :minDate="mxDatePickerSetting.minDate" :type="mxDatePickerSetting.type" :value="mxDatePickerSetting.value" :show-tips="true" :show-seconds="false" @confirm="ed" @cancel="ed"></my-date-picker>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	import MyDatePicker from "@/components/my-datepicker/my-datepicker.vue"
	export default {
		components: {MyDatePicker},
		data() {
			return {
				quantitySetting: {maxValue:5,minValue:1},
				code: "",
				selectedDateStr: "",
				mxDatePickerSetting: {
					showPicker: false,
					// range: ['2019/01/01','2019/01/06'],
					minDate: new Date().format("yyyy/MM/dd"),
					maxDate: "",
					type: 'date',
					value: '',
					currCalendar: [],
				},
				formData: {
					openId: "",
					ticketEntity: {
						code:"",
						name: "",
						datetime: "",
						price: 0,
						quantity: 1,
						guest:[
							{
								name: "",
								id_type: 1,
								id_no: "",
								telephone: ""
							}
						]
					},
					contact:{
						name:"",
						id_type: 1,
						id_no: "",
						telephone: ""
					}
				}
			}
		},
		computed: {
			...mapGetters({
				openid: "user/openid",
				productInfo: "ticket/productInfo"
			}),
			ticketPrice() {
				// 日期比对
				let price = 0;
				if (this.code) {
					let currentDate = new Date();
					if (this.formData.ticketEntity.datetime) {
						currentDate = new Date(this.formData.ticketEntity.datetime);
					}
					this.productInfo(this.code).baseProduct.prices.forEach((c)=>{
						let datetime = new Date(c.datetime.replace(/-/g,"\/")).format("yyyy-MM-dd");
						if (new Date(datetime) <= new Date(currentDate.format("yyyy-MM-dd"))) {
						
						// if (new Date(Date.parse(c.datetime)) <= currentDate) {
							price = c.value;
						}
					});
				}
				
				return price;
				/* if (this.code) {
					return this.productInfo(this.code).baseProduct.prices[0].value;
				} else {
					return 0;
				} */
			},
			ticketDate() {
				let ticketDatetime = "";
				if (this.code) {
					let currentDate = new Date();
					if (this.formData.ticketEntity.datetime) {
						currentDate = new Date(this.formData.ticketEntity.datetime);
					}
					this.productInfo(this.code).baseProduct.prices.forEach((c)=>{
						let datetime = new Date(c.datetime.replace(/-/g,"\/")).format("yyyy-MM-dd");
						if (new Date(datetime) <= new Date(currentDate.format("yyyy-MM-dd"))) {
							ticketDatetime = c.datetime;
						}
					});
					// return this.productInfo(this.code).baseProduct.prices[0].datetime;
				}
				return ticketDatetime;
			},
			maxTicketDate() {
				if (this.code) {
					return this.productInfo(this.code).baseProduct.prices[this.productInfo(this.code).baseProduct.prices.length-1].datetime;
				} else {
					return "";
				}
			},
			ticketDateList() {
				if (this.code) {
					return this.productInfo(this.code).baseProduct.prices;
				} else {
					return []
				}
			},
			personType() {
				let typeStr = "--";
				if (this.code) {
					switch(this.productInfo(this.code).personType) {
						case "Child":
						typeStr = "儿童票"
						break;
						case "Adult":
						typeStr = "成人票"
						break;
						case "Senior":
						typeStr = "老年票"
						break;
						default:
						typeStr = "--"
					}
				}
				return typeStr;
			}
		},
		onLoad(options) {
			this.code = options.code;
			this.formData.openId = this.openid;
			this.formData.ticketEntity.code = options.code;
			this.formData.ticketEntity.name = this.productInfo(this.code).description;
			this.formData.ticketEntity.datetime = this.ticketDate.replace(" ", "T");
			this.formData.ticketEntity.price = this.ticketPrice;
		},
		methods: {
			// orderTicket
			...mapActions({
				buyTicket: "orderTicket/buyTicket"
			}),
			stepperSubtract() {
				this.formData.ticketEntity.quantity--;
				if (this.formData.ticketEntity.quantity < this.quantitySetting.minValue) {
					this.formData.ticketEntity.quantity = this.quantitySetting.minValue
				} else {
					this.formData.ticketEntity.guest.pop();
				}
			},
			stepperAdd() {
				this.formData.ticketEntity.quantity++;
				if (this.formData.ticketEntity.quantity > this.quantitySetting.maxValue) {
					this.formData.ticketEntity.quantity = this.quantitySetting.maxValue
				} else {
					this.formData.ticketEntity.guest.push({name: "",id_type: 1,id_no: "",telephone: ""});
				}
			},
			pay() {
				// console.log(this.formData)
				this.buyTicket({
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
			},
			
			DatePicker() {
				this.mxDatePickerSetting.maxDate = new Date(this.maxTicketDate).format("yyyy/MM/dd");
				this.mxDatePickerSetting.currCalendar = this.ticketDateList;
				// console.log(this.mxDatePickerSetting.maxDate)
				this.$refs.myPickerPopup.open('bottom');
				this.mxDatePickerSetting.showPicker = true;
				let dateTime = new Date();
				this.mxDatePickerSetting.value = dateTime.format("yyyy/MM/dd");// [dateTime.format("yyyy/MM/dd"), new Date(dateTime.setDate(dateTime.getDate()+1)).format("yyyy/MM/dd")];
				// this.mxDatePickerSetting.value = this.mxDatePickerSetting["range"];
			},
			ed(e) {
				this.$refs.myPickerPopup.close();
				this.mxDatePickerSetting.showPicker = false;
				if(e) {
					// this.formData.checkIn = e.date[0].format("yyyy-MM-dd");
					// this.formData.checkOut = e.date[1].format("yyyy-MM-dd");
					// this.selectedDateStr = e.date[0].format("MM/dd/yyyy")+" - "+e.date[1].format("MM/dd/yyyy");
					// console.log(e);
					this.formData.ticketEntity.datetime = e.date.format("yyyy-MM-ddThh:mm:ss");
					this.selectedDateStr = e.date.format("yyyy-MM-dd hh:mm:ss");
					this.mxDatePickerSetting.value = e.date.format("yyyy/MM/dd");
				}
			}
		}
	}
</script>

<style lang="scss">
	.body {
		background-color: #EEF2F6;
		position: relative;
		height: 100%;
	}
	.top-plane {
		width: 690rpx;
		height: 282rpx;
		background: linear-gradient(135deg, #C7E6FF 0%, #78C2FF 100%);
		opacity: 1;
		border-radius: 10rpx;
		margin:0 30rpx;
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
		width: 690rpx;
		background: #FFFFFF;
		margin: 30rpx;
		opacity: 1;
		border-radius: 10px;
		padding-top: 30rpx;
		padding-bottom: 64rpx;
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
			view.form-group-title {
				display: flex;
				justify-content: space-between;
				width: 642rpx;
				border-bottom: 2rpx solid #E7ECED;
				margin: 4rpx 24rpx 0;
				padding-bottom: 24rpx;
				text.title {
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					line-height: 38rpx;
					color: #333333;
					opacity: 1;
					margin-top: 4rpx;
				}
				view.price_view {
					float: left;
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
			view.form-group {
				height: 80rpx;
				width: 630rpx;
				margin: 0 30rpx;
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
				text.num {
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					line-height: 38rpx;
					color: #333333;
					opacity: 1;
				}
				input {
					width: 100%;
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 38rpx;
					color: #333333;
					opacity: 1;
				}
				.iplaceholder-class {
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 38rpx;
					color: #C5D0D5;
					opacity: 1;
				}
				view.stepper-comp {
					display: flex;
					input {
						width: 64rpx;
						height: 70rpx;
						text-align: center;
						font-size: 40rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 52rpx;
						color: #0087F6;
						opacity: 1;
					}
					view.icon {
						 width: 40rpx;
						 height: 70rpx;
						 background-size: 40rpx;
						 background-repeat:no-repeat;
						 background-position: center;
					}
					view.subtract {
						background-image: url(../../../static/icon/04.png);
					}
					view.add {
						background-image: url(../../../static/icon/03.png)
					}
				}
				view.icon {
					width: 40rpx;
					height: 24rpx;
					display: block;
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
				view.arrow {
					background-image: url(../../../static/icon/06.png);
				}
			}
			view.line {
				border-bottom: 1px solid #E7ECED;
			}
			view.bold {
				input {
					font-weight: bold;
				}
			}
		}
	}
	
	.need-to-know {
		width: 640rpx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 10rpx;
		padding: 28rpx 25rpx;
		margin: 6rpx 30rpx 0;
		text.title {
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			line-height: 38rpx;
			color: #333333;
			opacity: 1;
			display: block;
			margin-bottom: 14rpx;
		}
		text.content {
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			line-height: 32rpx;
			color: #555555;
			opacity: 1;
		}
	}
	
	.handle-plane {
		height: 88rpx;
		width: 690rpx;
		padding: 0 30rpx;
		background: #FFFFFF;
		margin-top: 82rpx;
		margin-bottom: 30rpx;
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
