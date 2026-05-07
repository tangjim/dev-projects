<template>
	<view class="body">
		<view class="top-plane">
			<view class="info-plane">
				<view class="portrait"><image :src="user.avatarUrl"></image></view>
				<view class="u-info">
					<text class="u-nickName">{{user.nickName}}</text>
					<view class="u-sy"><text class="u-sy-lable">我的收益</text><text class="u-sy-txt">¥{{user.amount.toFixed(2)}}</text></view>
				</view>
			</view>
			<view class="top-tab-plane">
				<text class="title">我的订单</text>
				<view class="tab-list">
					<view class="tab-item" v-for="(item, index) in tabs" :key="index" @click="goto(item.url)">
						<view class="item-plane">
							<view class="item-icon"><image :src="item.icon"></image></view>
							<text>{{item.title}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="background-color: #F7F7F7;margin-top: 16rpx;">
			<view class="handle-list-plane" v-for="(item, index) in handleList" :key="index">
				<view class="list-item" v-for="(handle, index2) in item" :key="index2">
					<view class="icon"><image :src="handle.icon"></image></view>
					<text class="title">{{handle.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				tabs: [
					{title:"门票",icon:"../../static/icon/001.png", url:"/pages/order/index?active=0"},
					{title:"酒店",icon:"../../static/icon/002.png", url:"/pages/order/index?active=1"},
					{title:"商品",icon:"../../static/icon/003.png", url:"/pages/order/index?active=2"}
				],
				handleList: [
					[{title:"申请代理", icon:"../../static/icon/004.png"},{title:"我的团队", icon:"../../static/icon/005.png"}],
					[{title:"联系我们", icon:"../../static/icon/006.png"}]
				]
			}
		},
		computed: {
			...mapGetters({
				user: "user/userInfo"
			})
		},
		methods: {
			goto(url) {
				uni.reLaunch({url: url});
			}
		}
	}
</script>

<style lang="scss">
	.top-plane {
		position: relative;
		height: 472rpx;
		.info-plane {
			padding-top: 42rpx;
			padding-left: 36rpx;
			display: flex;
			width: 714rpx;
			height: 306rpx;
			background: linear-gradient(270deg, #2B9EFB 0%, #1779FE 100%);
			opacity: 1;
			view.portrait {
				width: 130rpx;
				height: 130rpx;
				border: 10rpx solid #51B5FE;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			view.u-info {
				margin-left: 30rpx;
				margin-top: 8rpx;
				text.u-nickName {
					font-size: 44rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 58rpx;
					color: #FFFFFF;
					opacity: 1;
				}
				view.u-sy {
					margin-top: 12rpx;
					text.u-sy-lable {
						font-size: 32rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 42rpx;
						color: #FFFFFF;
						opacity: 1;
					}
					text.u-sy-txt {
						margin-left: 20rpx;
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 32rpx;
						color: #FFFFFF;
						opacity: 0.7;
					}
				}
			}
		}
		.top-tab-plane {
			position: absolute;
			margin: 0 30rpx;
			width: 690rpx;
			height: 250rpx;
			background: #FFFFFF;
			box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.15);
			opacity: 1;
			border-radius: 20rpx;
			bottom: 0;
			overflow: hidden;
			text.title {
				display: block;
				margin-top: 26rpx;
				margin-left: 34rpx;
				font-size: 36rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 48rpx;
				color: #333333;
				opacity: 1;
			}
			.tab-list {
				display: flex;
				justify-content: space-between;
				.tab-item {
					justify-content: center;
					align-items: center;
					display: flex;
					width: 200rpx;
					height: 165rpx;
					view.item-plane {
						align-items: center;
						justify-content: center;
						view.item-icon {
							width: 64rpx;
							height: 64rpx;
							image {
								width: 100%;
								height: 100%;
							}
						}
					}
					text {
						font-size: 28rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						line-height: 38rpx;
						color: #333333;
						opacity: 1;
					}
				}
			}
		}
	}
	.handle-list-plane {
		background-color: #FFFFFF;
		margin-top: 30rpx;
		view.list-item {
			display: flex;
			align-items: center;
			padding-left: 58rpx;
			padding-right: 48rpx;
			width: 644rpx;
			height: 100rpx;
			position: relative;
			border-bottom: 2rpx solid #F7F7F7;
			view.icon {
				width: 46rpx;
				height: 46rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			text.title {
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 38rpx;
				color: #111111;
				opacity: 1;
				text-indent: 24rpx;
			}
			&::before {
				width: 36rpx;
				height: 36rpx;
				display: block;
				content: '';
				background: url(../../static/icon/0000.png) no-repeat;
				background-size: contain;
				position: absolute;
				right: 48rpx;
				top: 36rpx;
			}
		}
		view.list-item:last-child {
			border-bottom: 0;
		}
	}
	.handle-list-plane:first-child {
		margin-top: 0;
	}
</style>
