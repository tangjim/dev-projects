<template>
	<view class="body">
		<view class="top_swiper">
			<swiper indicator-dots circular autoplay>
				<swiper-item v-for="item in swiper" :key="item.id">
					<image :src="item.img"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice"></view>
		
		<view class="recommend">
			<text class="title">人气景点</text>
			<view class="item" v-for="item in attractions" :key="item.id">
				<view class="image-bg">
					<image src="http://iph.href.lu/690x240?text=暂无图片展示"></image>
					<text>TOP{{item.ranking}}</text>
				</view>
				<view class="content">
					<text class="title">{{item.title}}</text>
					<view class="price_view"><text class="unit">¥</text><text>{{item.price}}</text></view>
				</view>
			</view>
		</view>
		
		<view class="tabs">
			<van-tabs v-model="tabs.active" line-width="52" sticky>
			  <van-tab v-for="(item, index) in tabs.tags" :title="item.title" :key="index">
				  <view class="list-plane">
					  <view class="data-plane" v-for="(product, productIndex) in products(item.type)" @click="info(product.code)" :key="productIndex">
						  <view class="image-plane"><image src="http://iph.href.lu/160x160?text=暂无图片展示"></image></view>
						  <view class="data-content-plane">
							  <text class="title">{{product.description}}</text>
							  <text class="state" :class="{'discontinued' : !product.baseProduct.purchasable}">{{product.baseProduct.purchasable?"在售":"停售"}}</text>
							  <text class="moreTicket">余票：{{ticketStocks(product.baseProduct.stocks)}}</text>
						  </view>
						  <view class="price_view"><text class="unit">¥</text><text>{{ticketPrice(product.baseProduct.prices)}}</text></view>
					  </view>
				  </view>
			  </van-tab>
			</van-tabs>
		</view>
	</view>
</template>

<script>
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				swiper: [
					{id:1, img:"../../static/swipers/home/01.png", url:""},
					{id:2, img:"../../static/swipers/home/02.png", url:""}
				],
				attractions: [
					{id:1, ranking:1, url:"", title:"环球度假区景点XXXXXXXX", price:298},
					{id:2, ranking:2, url:"", title:"环球度假区景点XXXXXXXX", price:198}
				],
				tabs: {
					active:0,
					tags: [
						{title:"门票", type:1},
						{title:"季卡", type:2},
						{title:"年卡", type:3}
					]
				},
				test: {
					loginRes: "",
					userInfo: ""
				}
			}
		},
		computed: {
			...mapGetters({
				products: "ticket/products"
			}),
			ticketPrice() {
				return function (prices) {
					// console.log("prices=>", prices);
					// 日期比对
					let price = 0;
					let currentDate = new Date();
					prices.forEach((c)=>{
						let datetime = new Date(c.datetime.replace(/-/g,"\/")).format("yyyy-MM-dd");
						if (new Date(datetime) <= new Date(currentDate.format("yyyy-MM-dd"))) {
							price = c.value;
						}
					});
					return price;// prices[0].value.toFixed(2);
				}
			},
			ticketStocks() {
				return function (stocks) {
					// console.log("stocks=>", stocks);
					let number = 0;
					let currentDate = new Date();
					stocks.forEach((c)=>{
						let datetime = new Date(c.datetime.replace(/-/g,"\/")).format("yyyy-MM-dd");
						if (new Date(datetime) <= new Date(currentDate.format("yyyy-MM-dd"))) {
							// price = c.value;
							if (c.number) {
								number = c.number;
							} else {
								switch(c.status) {
									case "normal":
									number = "充足"
									break;
									default:
									number = "售完"
								}
							}
						}
					});
					return number;
				}
			}
		},
		onLoad() {
			this.getTicketList()
		},
		methods: {
			...mapActions({
				getTicketList: "ticket/getTicketList"
			}),
			info(code) {
				uni.navigateTo({url: "/pages/ticket/info/index?code="+code});
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
	.notice {
		height: 84rpx;
		width: 690rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		text {
			margin-top: 10rpx;
			display: inline-block;
			width: 100%;
			white-space: pre-wrap;
			word-wrap: break-word;
			height: auto;
		}
	}
	.recommend {
		margin-top: 12rpx;
		width: 690rpx;
		background-color: #FFFFFF;
		padding: 30rpx 30rpx 38rpx;
		text.title {
			font-size: 56rpx;
			color: #333333;
			font-family: Microsoft YaHei;
			font-weight: bold;
			line-height: 74rpx;
		}
		view.item {
			margin-top: 30rpx;
			view.image-bg {
				margin-bottom: 20rpx;
				width: 690rpx;
				height: 240rpx;
				display: block;
				position: relative;
				image {
					width: 100%;
					height: 100%;
				}
				text {
					position: absolute;
					top: 0;
					right: 0;
					width: 124rpx;
					height: 50rpx;
					background: #0087F6;
					opacity: 1;
					border-radius: 0rpx 10rpx 0rpx 10rpx;
					text-align: center;
					font-size: 32rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 50rpx;
					color: #FFFFFF;
					opacity: 1;
				}
			}
			
			view.content {
				display: block;
				text.title {
					font-size: 32rpx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					line-height: 42rpx;
					color: #333333;
				}
				view.price_view {
					float: right;
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
	}
	.tabs {
		margin-top: 24rpx;
		width: 690rpx;
		background-color: #FFFFFF;
		padding: 50rpx 30rpx 32rpx;
		.van-ellipsis {
			font-size: 44rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			line-height: 58rpx;
			color: #333333;
			opacity: 1;
		}
		.van-tabs__line {
			height: 8rpx;
			background: #0087F6;
			opacity: 1;
			border-radius: 10rpx;
		}
		.van-tabs__nav {
			height: 78rpx;
		}
		view.list-plane {
			padding-top: 14rpx;
			view.data-plane {
				margin-top: 50rpx;
				position: relative;
				display: flex;
				view.image-plane {
					width: 160rpx;
					height: 160rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				view.data-content-plane  {
					margin-left: 20rpx;
					text {
						display: block;
						font-family: Microsoft YaHei;
						font-weight: 400;
					}
					text.title {
						font-size: 32rpx;
						line-height: 44rpx;
						color: #333333;
						opacity: 1;
						height: 44rpx;
						overflow: hidden;
					}
					text.state {
						margin-top: 24rpx;
						width: 124rpx;
						height: 50rpx;
						background: #0087F6;
						opacity: 1;
						border-radius: 16rpx 16rpx 16rpx 0rpx;
						text-align: center;
						font-size: 32rpx;
						line-height: 50rpx;
						color: #FFFFFF;
						opacity: 1;
					}
					text.discontinued {
						background: #7A7A7A;
					}
					text.moreTicket {
						margin-top: 10rpx;
						font-size: 24rpx;
						line-height: 32rpx;
						color: #707070;
						opacity: 1;
					}
				}
				view.price_view {
					position: absolute;
					right: 0;
					bottom: 0;
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
	}
</style>
