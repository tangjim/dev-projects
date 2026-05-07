<template>
	<view class="body">
		<scroll-view scroll-y="true" @scroll="getList">
			<view class="list-item" v-for="(item, index) in productList" :key="index" @click="onInfo(item.uid)">
				<view class="img-bg">
					<image :src="item.cover_display[0]"></image>
				</view>
				<view class="info">
					<text class="title">{{item.name}}</text>
					<!-- view class="price_view"><text class="unit">¥</text><text>298</text></view -->
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10
			}
		},
		computed: {
			...mapGetters({
				productList: 'product/list'
			})
		},
		onLoad() {
			this.getProductList({
				formData:{pageNo:this.pageNo, pageSize:this.pageSize},
				success:(res)=>{
					// console.log(res);
					if (res.code === 1000) {
						this.pageNo++;
					}
				}
			})
		},
		methods: {
			...mapActions({
				getProductList: 'product/getSelfProductList'
			}),
			getList(e) {
				console.log(e);
			},
			onInfo(uid) {
				uni.navigateTo({url: "/pages/goods/info/index?uid="+uid});
			}
		}
	}
</script>

<style lang="scss">
	.body {
		padding: 30rpx;
	}
	
	.list-item {
		margin-top: 12rpx;
		view.img-bg {
			width: 690rpx;
			height: 426rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		view.info {
			margin-top: 14rpx;
			display: flex;
			justify-content: space-between;
			text.title {
				font-size: 32rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				line-height: 42rpx;
				color: #333333;
				opacity: 1;
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
	}
</style>
