const BASE_URL = 'https://murankeji.net/ticket_seller/'
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			data: options.data || {},
			success: (res)=>{
				if (res.data.code !== 1000) {
					return uni.showToast({
						title:res.data.message,
						icon: "none"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:'获取数据失败',
					icon: "none"
				})
				reject(err)
			}
		})
	})
}