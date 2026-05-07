<template>
	<view class="body">
		<view class="top_swiper">
			<swiper indicator-dots circular autoplay v-if="data.cover_display">
				<swiper-item v-for="(img, index) in data.cover_display" :key="index">
					<image :src="img"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="main">
			<view class="title-plane">
				<text class="title" v-if="data.name">{{data.name}}</text>
				<text class="tips" space="emsp">{{getAttribute}}</text>
			</view>
		</view>
		<view class="matters-plane" v-if="data.content" v-for="(item, index) in data.content" :key="index">
			<text class="title">{{item.title}}</text>
			<view class="content"><rich-text :nodes="formatRichText(item.content)"></rich-text></view>
		</view>
		
		<view class="handle-plane">
			<view class="price-plane"></view>
			<view class="handle-button">
				<button @click="onBuy">立即订购</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
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
			},
			formatRichText() {
				return function(html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					        return match;
					    });
					    
					    newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					        return match;
					    });
					    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					    newContent = newContent.replace(/\<img/gi,
					        '<img style="max-width:100%;height:auto;"');
					        
					    var stylePattern = /style="[^=>]*"[\s+\w+=|>]/g;
					    var innerQuotePattern = /(?<!=)"(?!>)/g;
					    return newContent.replace(stylePattern, function(matches) {
					        return matches.replace(innerQuotePattern, '\'');
					    });
				}
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
			onBuy() {
				uni.navigateTo({url: "/pages/goods/buy/index?uid="+this.data.uid})
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
	
	.main {
		width: 690rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		view.title-plane {
			padding: 26rpx 0 32rpx;
			text.title {
				font-size: 32rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				line-height: 42rpx;
				color: #333333;
				opacity: 1;
				display: block;
			}
			text.tips {
				margin-top: 16rpx;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 38rpx;
				color: #0087F6;
				opacity: 1;
				display: block;
			}
		}
		view.explain-main {
			border-top: 2px solid #E7ECED;
			padding: 30rpx 0;
			text.title {
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				line-height: 32rpx;
				color: #555555;
				opacity: 1;
				margin-bottom: 14rpx;
			}
			view.explain-plane {
				margin-top: 20rpx;
				display: flex;
				text {
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 32rpx;
					color: #555555;
					opacity: 1;
					display: block;
					width: 100%;
				}
				text.label {
					width: 158rpx;
					display: block;
				}
			}
		}
	}
	.matters-plane {
		width: 690rpx;
		margin-top: 24rpx;
		background-color: #FFFFFF;
		padding: 34rpx 30rpx 30rpx;
		text.title {
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			line-height: 32rpx;
			color: #555555;
			opacity: 1;
			margin-bottom: 34rpx;
			display: block;
		}
		view.content {
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			line-height: 32rpx;
			color: #555555;
			opacity: 1;
		}
	}
	.handle-plane {
		width: 690rpx;
		height: 88rpx;
		margin-top: 24rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
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
</style>
