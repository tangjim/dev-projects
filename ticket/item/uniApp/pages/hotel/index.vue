<template>
	<view class="body">
		<view class="top_swiper">
			<swiper indicator-dots circular autoplay>
				<swiper-item v-for="item in swiper" :key="item.id">
					<image :src="item.img"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="query-plane">
			<text class="title">查询房型与房价</text>
			<view class="form-plane">
				<view class="form-item">
					<image src="../../static/icon/01.png" mode="aspectFit"></image>
					<input type="text" placeholder="选择酒店" :value="selectedHotelName" @click="showHotelListPopup" placeholder-class="iplaceholder-class" disabled />
				</view>
				<view class="form-item">
					<image src="../../static/icon/02.png" mode="aspectFit"></image>
					<input type="text" placeholder="选择入住时间" :value="selectedDateStr" @click="DatePicker" placeholder-class="iplaceholder-class" disabled />
				</view>
				<view class="stepper-view">
					<view class="stepper-plane">
						<text class="label">宾客 (12周岁及以上)</text>
						<view class="stepper-comp">
							<view class="icon subtract" @click="stepperSubtract('adult')"></view>
							<input type="text" :value="formData.adult" disabled />
							<view class="icon add" @click="stepperAdd('adult')"></view>
						</view>
					</view>
					
					<view class="stepper-plane">
						<text class="label">儿童 (3至11周岁/含)</text>
						<view class="stepper-comp">
							<view class="icon subtract" @click="stepperSubtract('child')"></view>
							<input type="text" :value="formData.child" disabled />
							<view class="icon add" @click="stepperAdd('child')"></view>
						</view>
					</view>
				</view>
				<view class="form-button">
					<button @click="query">查询价格</button>
				</view>
			</view>
		</view>
		
		<view class="recommend">
			<text class="title">精选酒店</text>
			
			<view class="item" v-for="item in recommend" :key="item.id">
				<view class="image-bg"><image :src="item.img"></image></view>
				<view class="content">
					<text class="title">{{item.title}}</text>
				</view>
			</view>
			
		</view>
		
		<uni-popup ref="hotelListPopup" type="bottom" @change="changeUniPopup">
			<view class="hote-list-popup-view">
				<text class="title">选择您的酒店</text>
				<view class="list-item">
					<view class="item" v-for="(item, index) in hotelList" :key="index" @click="selectHotelItem(item)">
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="handle" @click="closeHotelListPopup">
					<text>取消</text>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="pickerPopup" type="bottom" @change="changeUniPopup">
			<view class="picker-popup-view">
				<mx-date-picker :show="mxDatePickerSetting.showPicker" :minDate="mxDatePickerSetting.minDate" :type="mxDatePickerSetting.type" :value="mxDatePickerSetting.value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="false" @confirm="ed" @cancel="ed"></mx-date-picker>
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
			var day = parseInt((a2-a1)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
			return day
		}
	}
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue"
	export default {
		components: {MxDatePicker},
		data() {
			return {
				swiper: [
					{id:1, img:"../../static/swipers/home/01.png", url:""},
					{id:2, img:"../../static/swipers/home/02.png", url:""}
				],
				recommend: [
					{id:1, img:"http://iph.href.lu/690x300?text=暂无图片展示", url:"", title:"北京环球影城主题酒店XXXXXX"},
					{id:2, img:"http://iph.href.lu/690x300?text=暂无图片展示", url:"", title:"北京环球影城主题酒店XXXXXX"}
				],
				adult: {maxValue:100,minValue:1},
				child: {maxValue:100,minValue:0},
				selectedHotelName: "",
				selectedDateStr: "",
				formData: {
					hotelCode: "",
					// roomNum: 1,
					checkIn: "",
					checkOut: "",
					adult: 1,
					child: 0
				},
				mxDatePickerSetting: {
					showPicker: false,
					// range: ['2019/01/01','2019/01/06'],
					minDate: new Date().format("yyyy/MM/dd"),
					type: 'range',
					value: ''
				}
			}
		},
		computed:{
			...mapGetters({
				hotelList: "hotel/hotelList"
			})
		},
		onLoad() {
			this.getHotelList();
		},
		onHide() {},
		methods: {
			...mapActions({
				getHotelList: "hotel/getHotelList"
			}),
			stepperSubtract(comp) {
				this.formData[comp]--;
				if (this.formData[comp] < this[comp].minValue) {
					this.formData[comp] = this[comp].minValue
				}
			},
			stepperAdd(comp) {
				this.formData[comp]++;
				if (this.formData[comp].value > this[comp].maxValue) {
					this.formData[comp].value = this[comp].maxValue
				}
			},
			changeUniPopup(e) {
				if (e.show) {
					setTimeout(()=>{
						uni.hideTabBar();
					}, 60)
				} else {
					setTimeout(()=>{
						uni.showTabBar({animation:true});
					}, 20)
				}
			},
			showHotelListPopup() {
				this.$refs.hotelListPopup.open('bottom');
			},
			closeHotelListPopup() {
				this.$refs.hotelListPopup.close();
			},
			selectHotelItem(item) {
				this.closeHotelListPopup();
				this.selectedHotelName = item.name;
				this.formData.hotelCode = item.code;
			},
			DatePicker() {
				this.$refs.pickerPopup.open('bottom');
				this.mxDatePickerSetting.showPicker = true;
				let dateTime = new Date();
				this.mxDatePickerSetting.value = [dateTime.format("yyyy/MM/dd"), new Date(dateTime.setDate(dateTime.getDate()+1)).format("yyyy/MM/dd")];
				// this.mxDatePickerSetting.value = this.mxDatePickerSetting["range"];
			},
			ed(e) {
				this.$refs.pickerPopup.close();
				this.mxDatePickerSetting.showPicker = false;
				if(e) {
					this.formData.checkIn = e.date[0].format("yyyy-MM-dd");
					this.formData.checkOut = e.date[1].format("yyyy-MM-dd");
					this.selectedDateStr = e.date[0].format("MM/dd/yyyy")+" - "+e.date[1].format("MM/dd/yyyy") + " ("+DateTools.GetNumberOfDays(e.value[0], e.value[1])+"晚)";
				}
			},
			query() {
				// this.formData.roomNum = 1;
				uni.navigateTo({
					url: "/pages/hotel/info/index?roomNum=1&adult="+this.formData.adult+"&child="+this.formData.child+"&checkIn="+this.formData.checkIn+"&checkOut="+this.formData.checkOut+"&hotelCode="+this.formData.hotelCode
				})
			}
		}
	}
</script>

<style lang="scss">
	.body {
		background-color: #EEF2F6;
	}
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
	
	.query-plane {
		width: 690rpx;
		padding: 38rpx 30rpx 40rpx;
		background-color: #FFFFFF;
		text.title {
			display: block;
			text-align: center;
			font-size: 40rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			line-height: 52rpx;
			color: #333333;
			opacity: 1;
		}
		view.form-plane {
			overflow: hidden;
			margin-top: 2rpx;
			view.form-item {
				width: 686rpx;
				height: 80rpx;
				border: 2rpx solid #0087F6;
				opacity: 1;
				border-radius: 10rpx;
				display: flex;
				margin-top: 32rpx;
				image {
					width: 35rpx;
					height: 80rpx;
					margin: 0 22rpx 0 24rpx;
				}
				input {
					height: 80rpx;
					width: 100%;
				}
				.iplaceholder-class {
					font-size: 32rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 42rpx;
					color: #888888;
					opacity: 1;
				}
			}
			view.stepper-view {
				margin-top: 44rpx;
				width: 636rpx;
				padding: 0 27rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				view.stepper-plane {
					text.label {
						font-size: 28rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 38rpx;
						color: #333333;
						opacity: 1;
					}
					view.stepper-comp {
						margin-left: 32rpx;
						display: flex;
						margin-top: 26rpx;
						input {
							width: 102rpx;
							height: 70rpx;
							text-align: center;
							font-size: 52rpx;
							font-family: Microsoft YaHei;
							font-weight: 400;
							line-height: 70rpx;
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
							background-image: url(../../static/icon/04.png);
						}
						view.add {
							background-image: url(../../static/icon/03.png)
						}
					}
				}
			}
			view.form-button {
				button {
					margin-top: 60rpx;
					height: 90rpx;
					background: #FF6E00;
					opacity: 1;
					border-radius: 10rpx;
					font-size: 36rpx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					line-height: 90rpx;
					color: #FFFFFF;
					opacity: 1;
				}
			}
		}
	}
	
	.recommend {
		margin-top: 24rpx;
		width: 690rpx;
		background-color: #FFFFFF;
		padding: 40rpx 30rpx 24rpx;
		text.title {
			font-size: 40rpx;
			color: #333333;
			font-family: Microsoft YaHei;
			font-weight: bold;
			line-height: 52rpx;
		}
		view.item {
			margin-top: 30rpx;
			view.image-bg {
				margin-bottom: 18rpx;
				width: 690rpx;
				height: 300rpx;
				display: block;
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			view.content {
				display: block;
				text.title {
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					line-height: 38rpx;
					color: #333333;
				}
			}
		}
	}
	
	.hote-list-popup-view {
		width: 750rpx;
		border-radius: 30rpx 30rpx 0 0;
		background-color: #EEF2F6;
		text.title {
			background-color: #FFFFFF;
			display: block;
			height: 80rpx;
			text-align: center;
			color: #333333;
			font-family: Microsoft YaHei;
			font-weight: bold;
			font-size: 32rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #F7F7F7;
		}
		view.list-item {
			background-color: #FFFFFF;
			view.item {
				height: 100rpx;
				border-bottom: 1rpx solid #E5E5E5;
				text {
					display: block;
					text-align: center;
					color: #333333;
					font-family: Microsoft YaHei;
					font-weight: 400;
					font-size: 28rpx;
					line-height: 100rpx;
				}
			}
			view.item:last-child {
				border-bottom: 0;
			}
		}
		view.handle {
			background-color: #FFFFFF;
			margin-top: 10rpx;
			padding-bottom: 80rpx;
			text {
				display: block;
				color: #333333;
				font-family: Microsoft YaHei;
				font-weight: 400;
				font-size: 28rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
			}
		}
	}
	.picker-popup-view {
		width: 750rpx;
		border-radius: 30rpx 30rpx 0 0;
		background-color: #fff;
		overflow: hidden;
	}
</style>
