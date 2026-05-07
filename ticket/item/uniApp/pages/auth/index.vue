<template>
	<view class="body">
		<uni-popup ref="popup" type="bottom" background-color="#fff" :mask-click="false">
			<view class="popup-view">
				<view class="popup-body">需要获取您的微信头像和昵称</view>
				<view class="handle-button"><button @click="getUserProfile">同意获取</button></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	export default {
		onLoad() {
			this.login({
				success:(code)=>{
					this.auth({
						formData: {code: code},
						success:()=>{
							this.$refs.popup.open('bottom');
						}
					});
				}
			});
		},
		methods: {
			...mapActions({
				login: "user/login",
				auth: "user/auth",
				getUserInfo: "user/getUserProfile"
			}),
			getUserProfile() {
				this.getUserInfo({success:()=>{
					uni.switchTab({
						url:'/pages/index/index'
					})
				}})
			}
		}
	}
</script>

<style lang="scss">
	.popup-view {
		width: 750rpx;
		margin-bottom: 50rpx;
		view.popup-body {
			height: 150rpx;
			text-align: center;
			padding-top: 20rpx;
		}
		view.handle-button {
			width: 690rpx;
			padding: 0 30rpx;
			button {
				background-color: #0087F6;
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				line-height: 64rpx;
				color: #FFFFFF;
				opacity: 1;
			}
		}
	}
</style>
