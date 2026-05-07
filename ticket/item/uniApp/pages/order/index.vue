<template>
	<view class="body">
		<view class="tabs">
			<van-tabs v-model="tabs.active" sticky>
			  <van-tab v-for="(item, index) in tabs.tags" :title="item.title" :key="index">
				  <view class="list-plane"></view>
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
				tabs: {
					active:0,
					tags: [
						{title:"门票订单", type:1},
						{title:"酒店订单", type:2},
						{title:"商品订单", type:3}
					]
				}
			}
		},
		onLoad(options) {
			console.log(options)
			if (options.active) {
				this.tabs.active = parseInt(options.active)
			}
		},
	}
</script>

<style lang="scss">
	.body {
		width: 750rpx;
		height: 100%;
		background-color: #F6F6F6;
	}
	
	.tabs {
		width: 750rpx;
		background-color: #FFFFFF;
		.van-ellipsis {
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			line-height: 72rpx;
			color: #333333;
			opacity: 1;
		}
		.van-tabs__line {
			height: 6rpx;
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
