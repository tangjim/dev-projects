<template>
	<view class="body">
		<view class="top-plane">
			<view class="txt-plane">
				<text class="txt1 bold txt_c_333">{{data.name}}</text>
				<text class="txt1 txt_c_555">{{getAttribute}}</text>
				<!-- <text class="txt_c_555" space="ensp">时间：</text> -->
				<!-- <text class="txt_c_555">地点：XXXXXXXXXXXXX</text> -->
			</view>
			
		</view>
		<view class="form-plane">
			<text class="title">订单联系人</text>
			<view class="form-handle-plane">
				<view class="form-group">
					<text class="label">姓名</text>
					<input type="text" placeholder="请输入订单联系人姓名" placeholder-class="iplaceholder-class" />
				</view>
				<view class="form-group">
					<text class="label">手机号码</text>
					<input type="text" placeholder="请输入联系人手机号码" placeholder-class="iplaceholder-class" />
				</view>
				<view class="form-group">
					<text class="label">身份证号</text>
					<input type="text" placeholder="请输入身份证号" placeholder-class="iplaceholder-class" />
				</view>
			</view>
		</view>
		
		<view class="form-plane">
			<view class="form-handle-plane">
				<view class="form-group bold line">
					<text class="label">选择套餐</text>
					<input type="text" value="自然基础下午" placeholder="请选择一个套餐" placeholder-class="iplaceholder-class" disabled />
					<view class="icon arrow down"></view>
				</view>
				<view class="form-group line">
					<text class="label">选择日期</text>
					<input type="text" value="2011-11-11" placeholder="请选择一个日期" placeholder-class="iplaceholder-class" disabled />
					<view class="icon arrow down"></view>
				</view>
				<view class="form-group">
					<text class="label">购票数量</text>
					<view class="stepper-comp">
						<view class="icon subtract" @click="stepperSubtract(num)"></view>
						<input type="text" :value="num.value" disabled />
						<view class="icon add" @click="stepperAdd(num)"></view>
					</view>
				</view>
				
				<view class="form-group-child" v-for="index in num.value" :key="index">
					<view class="form-group line">
						<text class="num">{{index+1}}</text>
					</view>
					<view class="form-group line">
						<text class="label">姓名</text>
						<input type="text" placeholder="请输入订单联系人姓名" placeholder-class="iplaceholder-class" />
					</view>
					<view class="form-group line">
						<text class="label">手机号码</text>
						<input type="text" placeholder="请输入联系人手机号码" placeholder-class="iplaceholder-class" />
					</view>
					<view class="form-group line">
						<text class="label">身份证号</text>
						<input type="text" placeholder="请输入身份证号" placeholder-class="iplaceholder-class" />
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
				<view class="price_view"><text class="unit">¥</text><text>298</text></view>
			</view>
			<view class="handle-button">
				<button>前往支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				num: {value:1,maxValue:6,minValue:1},
				// code: ""
				data: {}
			}
		},
		computed: {
			getAttribute() {
				let attribute = "";
				if (this.data.attribute) {
					for (let i =0; i<this.data.attribute.length; i++) {
						attribute += this.data.attribute[i].value + " "
					}
				}
				return attribute;
			}
		},
		onLoad(options) {
			this.getSelfProductDetail({
				formData:{productId:options.uid},
				success:(res)=>{
					// console.log(res);
					if (res.code === 1000) {
						// this.pageNo++;
						this.data = res.data;
					}
				}
			})
			
			// console.log(this.uid);
			// 读取商品详情
			// console.log(this.code, this.productInfo(this.code))
		},
		methods: {
			...mapActions({
				getSelfProductDetail: 'product/getSelfProductDetail'
			}),
			stepperSubtract(comp) {
				comp.value--;
				if (comp.value < comp.minValue) {
					comp.value = comp.minValue
				}
			},
			stepperAdd(comp) {
				comp.value++;
				if (comp.value > comp.maxValue) {
					comp.value = comp.maxValue
				}
			},
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
