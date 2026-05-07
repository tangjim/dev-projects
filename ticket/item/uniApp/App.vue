<script>
	import {mapActions, mapGetters, mapMutations} from 'vuex'
	export default {
		onLaunch: function() {
			// 当uni-app 初始化完成时触发（全局只触发一次）
			// console.log('App Launch')
			/*this.login({
				success:(code)=>{
					this.auth({
						formData: {code: code},
						success:()=>{
							// console.log(this.$refs)
						}
					});
				}
			});*/
		},
		onShow: function() {
			// 当 uni-app 启动，或从后台进入前台显示
			// console.log('App Show')
		},
		onHide: function() {
			// 当 uni-app 从前台进入后台
			// console.log('App Hide')
		},
		/*methods: {
			...mapActions({
				login: "user/login",
				auth: "user/auth"
			})
		}*/
	}
</script>

<style>
	/*每个页面公共css */
</style>
