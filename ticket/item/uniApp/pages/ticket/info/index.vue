<template>
	<view class="body">
		<view class="top_swiper">
			<swiper indicator-dots circular autoplay>
				<swiper-item>
					<image src="http://iph.href.lu/750x380?text=暂无图片展示"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="main">
			<view class="title-plane">
				<text class="title">{{productInfo(code).description}}</text>
				<text class="tips">无</text>
			</view>
			<view class="explain-main">
				<text class="title">门票说明</text>
				<view class="explain-plane">
					<text class="label">产品内容</text>
					<text class="content">无</text>
				</view>
				<view class="explain-plane">
					<text class="label">门票类型</text>
					<text class="content">无</text>
				</view>
				<view class="explain-plane">
					<text class="label">补充说明</text>
					<text class="content">无</text>
				</view>
			</view>
			
			<view class="explain-main">
				<text class="title">变更说明</text>
				<view class="explain-plane">
					<text class="label">门票升级</text>
					<text class="content">无</text>
				</view>
				<view class="explain-plane">
					<text class="label">退改规则</text>
					<text class="content">无</text>
				</view>
				<view class="explain-plane">
					<text class="label">如何改期</text>
					<text class="content">无</text>
				</view>
			</view>
			
			<view class="explain-main">
				<text class="title">入园须知</text>
				<view class="explain-plane">
					<text class="label">入园时间</text>
					<text class="content">无</text>
				</view>
				<view class="explain-plane">
					<text class="label">预约入园</text>
					<text class="content">无</text>
				</view>
				<view class="explain-plane">
					<text class="label">携带证件</text>
					<text class="content">无</text>
				</view>
				<view class="explain-plane">
					<text class="label">入园提醒</text>
					<text class="content">无</text>
				</view>
			</view>
		</view>
		<view class="matters-plane">
			<text class="title">注意事项</text>
			<text class="content">
				为保障每位游客的健康和安全，根据相关法律和政府规定，每一位到访上海迪士尼乐园的游客 (包括儿童)，在到访之前，必须进行游客信息登记（点击进行登记https://shdr.cn/df）。收集的信息仅用于防疫工作。详情请查看乐园须知和入园登记须知。\n
				不满十六周岁的游客须由十六周岁(含)及以上游客陪同入园。\n
				在您入园之前，我们的演职人员会测量您的体温并请您出示“健康码”和“通信大数据行程卡（行程卡）”。请携带您的身份证明原件（内地游客，请携带中华人民共和国居民身份证；香港、澳门地区游客，请携带《港澳居民来往内地通行证》或《中华人民共和国旅行证》；台湾地区游客，请携带《台湾居民来往大陆通行证》或《中华人民共和国旅行证》；其他国家及地区游客，请携带有效护照），上海迪士尼度假区将在您入园时收集您身份证件上所载的身份证件号。\n
				自2020年5月11日起，上海迪士尼乐园内的大部分景点、游乐项目、部分娱乐演出以及商店和餐厅在控制客流量的基础上恢复运营。为了保证安全距离，备受喜爱的迪士尼朋友们已以全新的方式与游客们见面。他们会出现在上海迪士尼乐园的各个主题园区，欢迎大家回到这个神奇的地方。\n
				迪士尼预约等候卡——一键预约，减少排队时间，优化行程，轻松游园！\n
				为了减少游客的实际排队时间并提升游园体验，上海迪士尼度假区推出了免费线上预约工具——迪士尼预约等候卡。\n
				迪士尼预约等候卡的启用日期、时间和具体启用景点和娱乐演出会根据运营情况进行调整。在迪士尼预约等候卡启用的时间段，对应景点或娱乐演出仅对持有相应时间段的迪士尼预约等候卡的游客开放。在此时间段以外的时间，无需迪士尼预约等候卡。\n
				迪士尼预约等候卡并不一定每天启用，也不一定针对所有适用景点或娱乐演出启用。请您在到访期间，登录上海迪士尼度假区官方App,点击“规划行程”中的“获取预约等候卡”，查询预约等候卡的启用情况。\n
				没有智能手机或者有其他获取迪士尼预约等候卡困难的游客可至游客服务中心寻求帮助。
			</text>
		</view>
		<view class="handle-plane">
			<view class="price-plane">
				<text class="lable">票价</text>
				<view class="price_view"><text class="unit">¥</text><text>{{ticketPrice}}</text></view>
			</view>
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
				code: ""
			}
		},
		computed: {
			...mapGetters({
				productInfo: "ticket/productInfo"
			}),
			ticketPrice() {
				// 日期比对
				let price = 0;
				let currentDate = new Date();
				if (this.code) {
					this.productInfo(this.code).baseProduct.prices.forEach((c)=>{
						let datetime = new Date(c.datetime.replace(/-/g,"\/")).format("yyyy-MM-dd");
						if (new Date(datetime) <= new Date(currentDate.format("yyyy-MM-dd"))) {
							price = c.value;
						}
					});
					
					return price;
				} else {
					return "0.00";
				}
				
			}
		},
		onLoad(options) {
			this.code = options.code;
			// console.log(this.code, this.productInfo(this.code))
		},
		methods: {
			onBuy() {
				uni.navigateTo({url: "/pages/ticket/buy/index?code="+this.code})
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
				color: #555555;
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
