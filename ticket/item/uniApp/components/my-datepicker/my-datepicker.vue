<template>
	<view v-if="isShow" class="picker">
		<!-- 日期选择器 -->
		<view class="picker-modal">
			<view class="picker-calendar-view-title">
				<text>请选择游玩日期</text>
			</view>	
			<view class="picker-calendar-view-week">
				<view class="picker-calendar-view" v-for="(week,index) in weeks" :key="index - 7">
					<view class="picker-calendar-view-item">{{week}}</view>
				</view>
			</view>
			
			<view class="picker-modal-plane">
				<view v-for="(calendar, index) in calendars_list" :key="index">
					<view class="picker-modal-header">
						<text class="picker-modal-header-title">{{calendar.title}}</text>
					</view>
					
					<view class="picker-modal-body">
						<view class="picker-calendar">
							<view class="picker-calendar-view" v-for="(week,weekIndex) in calendar.week" v-if="calendar.week > 0" :key="weekIndex">
								<!-- 正常和选中样式 -->
								<view class="picker-calendar-view-item"></view>
							</view>
							<view class="picker-calendar-view" v-for="(date,dateIndex) in calendar.dates" :key="dateIndex" @click="onSelectDate(date)">
								<!-- 背景样式 -->
								<view v-show="date.bgStyle.type" :class="'picker-calendar-view-'+date.bgStyle.type" :style="{background: date.bgStyle.background}"></view>
								<!-- 正常和选中样式 -->
								<view class="picker-calendar-view-item" :style="{opacity: date.statusStyle.opacity, color: date.statusStyle.color, background: date.statusStyle.background}">
								<!-- <view class="picker-calendar-view-item"> -->
									<text class="picker-calendar-view-item-title" :class="{'picker-calendar-view-item-disable':isPickerDaySelected(date)}">{{date.title}}</text>
									<text class="picker-calendar-view-item-price" v-if="date.price > 0">¥{{date.price}}</text>
								</view>
								<!-- 小圆点样式 -->
								<view class="picker-calendar-view-dot" :style="{opacity: date.dotStyle.opacity, background: date.dotStyle.background}"></view>
								<!-- <view class="picker-calendar-view-dot" :class="{'picker-calendar-view-dot-disable':isPickerDaySelected(date)}"></view> -->
								<!-- 信息样式 -->
								<view v-show="date.tips" class="picker-calendar-view-tips">{{date.tips}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	/**
	 * 工具函数库
	 */
	const DateTools = {
		/**
		 * 获取公历节日
		 * @param date Date对象
		 */
		getHoliday(date) {
			let holidays = {
				'0101': '元旦',
				'0214': '情人',
				'0308': '妇女',
				'0312': '植树',
				'0401': '愚人',
				'0501': '劳动',
				'0504': '青年',
				'0601': '儿童',
				'0701': '建党',
				'0801': '建军',
				'0903': '抗日',
				'0910': '教师',
				'1001': '国庆',
				'1031': '万圣',
				'1224': '平安',
				'1225': '圣诞'
			};
			let value = this.format(date, 'mmdd');
			if (holidays[value]) return holidays[value];
			return false;
		},
		/**
		 * 解析标准日期格式
		 * @param s 日期字符串
		 * @return 返回Date对象
		 */
		parse: s => new Date(s.replace(/(年|月|-)/g, '/').replace(/(日)/g, '')),
		/**
		 * 比较日期是否为同一天
		 * @param a Date对象
		 * @param b Date对象
		 * @return Boolean
		 */
		isSameDay: (a, b) => a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear() && a.getDate() == b.getDate(),
		/**
		 * 格式化Date对象
		 * @param d 日期对象
		 * @param f 格式字符串
		 * @return 返回格式化后的字符串
		 */
		format(d, f) {
			var o = {
				"m+": d.getMonth() + 1,
				"d+": d.getDate(),
				"h+": d.getHours(),
				"i+": d.getMinutes(),
				"s+": d.getSeconds(),
				"q+": Math.floor((d.getMonth() + 3) / 3),
			};
			if (/(y+)/.test(f))
				f = f.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(f))
					f = f.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return f;
		},
		/**
		 * 用于format格式化后的反解析
		 * @param s 日期字符串
		 * @param f 格式字符串
		 * @return 返回Date对象
		 */
		inverse(s, f) {
			var o = {
				"y": '',
				"m": '',
				"d": '',
				"h": '',
				"i": '',
				"s": '',
			};
			let d = new Date();
			if (s.length != f.length) return d;
			for (let i in f)
				if (o[f[i]] != undefined) o[f[i]] += s[i];
			if (o.y) d.setFullYear(o.y.length < 4 ? (d.getFullYear() + '').substr(0, 4 - o.y.length) + o.y : o.y);
			o.m && d.setMonth(o.m - 1, 1);
			o.d && d.setDate(o.d - 0);
			o.h && d.setHours(o.h - 0);
			o.i && d.setMinutes(o.i - 0);
			o.s && d.setSeconds(o.s - 0);
			return d;
		},
		/**
		 * 获取日历数组（42天）
		 * @param date 日期对象或日期字符串
		 * @param proc 处理日历(和forEach类似)，传递一个数组中的item
		 * @return Array
		 */
		getCalendar(date, proc) {
			let it = new Date(date),
				calendars = [];
			it.setDate(1);
			it.setDate(it.getDate() - ((it.getDay() == 0 ? 7 : it.getDay()) - 1)); //偏移量
			for (let i = 0; i < 42; i++) {
				let tmp = {
					dateObj: new Date(it),
					title: it.getDate(),
					isOtherMonth: it.getMonth() < date.getMonth() || it.getMonth() > date.getMonth()
				};
				calendars.push(Object.assign(tmp, proc ? proc(tmp) : {}));
				it.setDate(it.getDate() + 1);
			}
			return calendars;
		},
		
		getCalendarObj(data, proc) {
			let it = new Date(data.datetime.replace(/-/g,"\/"));
			let tmp = {
				dateObj: it,
				title: it.getDate(),
				price: data.value
				// isOtherMonth: it.getMonth() < date.getMonth() || it.getMonth() > date.getMonth()
			};
			return Object.assign(tmp, proc ? proc(tmp) : {});
		},
		
		/**
		 * 获取日期到指定的月份1号(不改变原来的date对象)
		 * @param d Date对象
		 * @param v 指定的月份
		 * @return Date对象
		 */
		getDateToMonth(d, v) {
			let n = new Date(d);
			n.setMonth(v, 1);
			return n;
		},
		/**
		 * 把时间数组转为时间字符串
		 * @param t Array[时,分,秒]
		 * @param showSecinds 是否显示秒
		 * @return 字符串 时:分[:秒]
		 */
		formatTimeArray(t, s) {
			let r = [...t];
			if (!s) r.length = 2;
			r.forEach((v, k) => r[k] = ('0' + v).slice(-2));
			return r.join(':');
		},
		getNumberOfDays(date1,date2) {
			//date1：开始日期，date2结束日期
			var a1 = Date.parse(new Date(date1));
			var a2 = Date.parse(new Date(date2));
			var day = parseInt((a2-a1) / (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
			return day;
		},
		daysInMonth(date) {
			date.setMonth(date.getMonth()+1);
			date.setDate(0);
			return date.getDate();
		}
	};

	export default {
		props: {
			//颜色
			color: {
				type: String,
				default: '#409eff'
			},
			//初始的值
			value: [String, Array],
			currCalendar: {
				type: Array,
				default: []
			},
			//类型date time datetime range rangetime
			type: {
				type: String,
				default: 'range'
			},
			//是否显示
			show: {
				type: Boolean,
				default: false
			},
			//初始格式
			format: {
				type: String,
				default: ''
			},
			//显示公历节日
			showHoliday: {
				type: Boolean,
				default: true
			},
			//显示提示
			showTips: {
				type: Boolean,
				default: false
			},
			// 最小日期
			minDate: {
				type: String,
				default: ''
			},
			// 最大日期
			maxDate: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isShow: false, //是否显示
				// isMultiSelect: false, //是否为多选
				date: {}, //当前日期对象
				weeks: ["日", "一", "二", "三", "四", "五", "六"],
				title: '初始化', //标题
				calendars: [[],[],[]], //日历数组
				calendarIndex: 1, //当前日历索引
				checkeds: [], //选中的日期对象集合
				calendars_list: [],
				generateMonth: []
			};
		},
		methods: {
			//设置值
			setValue(value) {
				//console.log(this.currCalendar);
				console.log(value)
				this.date = new Date();
				this.checkeds = [];
				// this.isMultiSelect = this.type.indexOf('range') >= 0;
				//将字符串解析为Date对象
				let parseDateStr = (str) => (this.format ? DateTools.inverse(str, this.format) : DateTools.parse(str));
				if (value) {
					this.checkeds.push(parseDateStr(value));
					if (this.checkeds.length) this.date = new Date(this.checkeds[0]);
				} else {
					this.checkeds.push(new Date(this.date));
				}
				this.refreshCalendars(true);
			},
			//处理日历
			procCalendar(item) {
				//定义初始样式
				item.statusStyle = {
					opacity: 1,
					color: item.isOtherMonth ? '#ddd' : '#000',
					background: 'transparent'
				};
				item.bgStyle = {
					type: '',
					background: 'transparent'
				};
				item.dotStyle = {
					opacity: 1,
					background: 'transparent'
				};
				item.tips = "";
				//标记今天的日期
				if (DateTools.isSameDay(new Date(), item.dateObj)) {
					item.statusStyle.color = this.color;
					if (item.isOtherMonth) item.statusStyle.opacity = 0.3;
				}
				//标记选中项
				this.checkeds.forEach(date => {
					if (DateTools.isSameDay(date, item.dateObj)) {
						item.statusStyle.background = this.color;
						item.statusStyle.color = '#fff';
						item.statusStyle.opacity = 1;
					}
				});
				//节假日或今日的日期标点
				if (item.statusStyle.background != this.color) {
					let holiday = this.showHoliday ? DateTools.getHoliday(item.dateObj) : false;
					if (holiday || DateTools.isSameDay(new Date(), item.dateObj)) {
						item.title = holiday || item.title;
						item.dotStyle.background = this.color;
						// if (item.isOtherMonth) item.dotStyle.opacity = 0.2;
						if (this.isPickerDaySelected(item)) item.dotStyle.opacity = 0.2;
					}
				} else {
					item.title = item.dateObj.getDate();
				}
			},
			//刷新日历
			refreshCalendars(refresh = false) {
				// 根据第一个日期获取之前的日期
				let temp_d = new Date(this.currCalendar[0].datetime.replace(/-/g,"\/"));
				// console.log(temp_d.getDay())
				// console.log(DateTools.format(DateTools.getDateToMonth(temp_d, temp_d.getMonth()), "yyyy-mm-dd"))
				
				// 对日期进行分组
				this.calendars_list = [];
				for (let i=0; i<this.currCalendar.length; i++) {
					let date = new Date(this.currCalendar[i].datetime.replace(/-/g,"\/"));
					let title = DateTools.format(date, 'yyyy年mm月');
					if (this.calendars_list.length === 0) {
						let calendar = {title: title, dateObj:[date.getFullYear(), date.getMonth()], dates:[DateTools.getCalendarObj(this.currCalendar[i], this.procCalendar)]};
						this.calendars_list.push(calendar)
					} else {
						// 查看日期是否已存在
						let temp_d = this.calendars_list.find(item=>item.title === title);
						if (temp_d) {
							temp_d.dates.push(DateTools.getCalendarObj(this.currCalendar[i], this.procCalendar));
						} else {
							let calendar = {title: title, dateObj:[date.getFullYear(), date.getMonth()], dates:[DateTools.getCalendarObj(this.currCalendar[i], this.procCalendar)]};
							this.calendars_list.push(calendar)
						}
					}
				}
				// console.log(this.calendars_list);
				// 对日期进行补齐
				for (let i=0; i<this.calendars_list.length; i++) {
					let it = new Date(this.calendars_list[i].dateObj[0], this.calendars_list[i].dateObj[1], 1);
					// console.log(it.getDay());
					this.calendars_list[i].week = it.getDay();
					// 获取月份总天数
					let days = DateTools.daysInMonth(new Date(this.calendars_list[i].dateObj[0], this.calendars_list[i].dateObj[1], 1));
					// console.log(it.format('yyyy-MM-dd'));
					for (let j=0; j<days; j++) {
						// 从一号起判断日期是否存在
						if (!this.calendars_list[i].dates.find((c)=>{return new Date(c.dateObj.format('yyyy-MM-dd')).getDate() === it.getDate()})) {
							// 添加日期
							this.calendars_list[i].dates.push(DateTools.getCalendarObj({datetime:it.format('yyyy-MM-dd'), value:0}, this.procCalendar));
							// console.log(this.calendars_list[i].dateObj[0]+"-"+this.calendars_list[i].dateObj[1]+"需要添加日期",it.format('yyyy-MM-dd'));
						}
						it.setDate(it.getDate() + 1);
					}
					
					this.calendars_list[i].dates.sort((a, b) => a.dateObj - b.dateObj); //从小到大排序
					// console.log(days);
					// console.log(d.format('yyyy-MM-dd'))
				}
			},
			//选中日期
			onSelectDate(date) {
				/* if (this.minDate !== '') {
					// 比较选择日期
					if (new Date(date.dateObj.format('yyyy-MM-dd')) < new Date(this.minDate)) {
						return;
					}
				} */
				if (date.price === 0) {
					return;
				}
				this.checkeds = [];
				this.checkeds.push(new Date(date.dateObj));
				this.checkeds.sort((a, b) => a - b); //从小到大排序
				this.calendars_list.forEach(calendar => {
					calendar.dates.forEach(this.procCalendar); //重新处理
				});
				this.onConfirm();
			},
			//取消
			onCancel() {
				this.$emit('cancel', false);
			},
			//确定
			onConfirm() {
				let result = {
					value: null,
					date: null
				};
				//定义默认格式
				let defaultFormat = {
					'date': 'yyyy/mm/dd',
					// 'time': 'hh:ii' + (this.showSeconds ? ':ss' : ''),
					'datetime': ''
				};
				defaultFormat['datetime'] = defaultFormat.date + ' ' + defaultFormat.time;
				let fillTime = (date, timeArr) => {
					date.setHours(timeArr[0], timeArr[1]);
					// if (this.showSeconds) date.setSeconds(timeArr[2]);
				};
				
				let newDate = new Date(this.checkeds[0]);
				if (this.isContainTime) {
					newDate.setHours(this.beginTime[0], this.beginTime[1]);
					// if (this.showSeconds) newDate.setSeconds(this.beginTime[2]);
				}
				result.value = DateTools.format(newDate, this.format ? this.format : defaultFormat[this.isContainTime ?
					'datetime' : 'date']);
				result.date = newDate;
				
				this.$emit('confirm', result);
			}
		},
		computed: {
			// 判断是否可选择
			isPickerDaySelected() {
				return function(date) {
					return date.price === 0;
				}
			},
			BeginTitle() {
				let value = '未选择';
				if (this.checkeds.length) value = DateTools.format(this.checkeds[0], 'yy/mm/dd');
				return value;
			},
			EndTitle() {
				let value = '未选择';
				if (this.checkeds.length == 2) value = DateTools.format(this.checkeds[1], 'yy/mm/dd');
				return value;
			},
		},
		watch: {
			show(newValue, oldValue) {
				// console.log(newValue, oldValue);
				// newValue && this.setValue(this.value);
				this.isShow = newValue;
			} ,
			value(newValue, oldValue) {
				// console.log(newValue, oldValue);
				if(this.checkeds.length > 0) {
					this.setValue(this.checkeds[0].format("yyyy/MM/dd"));
				} else {
					this.setValue(newValue);
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	$z-index: 100;
	$cell-spacing: 20upx;
	$calendar-size: 700upx;
	$calendar-item-size: 100upx;

	.picker {
		// position: fixed;
		// z-index: $z-index;
		background: rgba(255, 255, 255, 1);
		// left: 0;
		// top: 0;
		width: 100%;
		font-size: 28upx;
		padding-bottom: 50rpx;

		&-btn {
			padding: $cell-spacing*0.5 $cell-spacing;
			border-radius: 12upx;
			color: #666;

			&-active {
				background: rgba(0, 0, 0, .1);
			}
		}

		&-display {
			color: #666;

			&-text {
				color: #000;
				margin: 0 $cell-spacing*0.5;
			}

			&-link {
				display: inline-block;

				&-active {
					background: rgba(0, 0, 0, .1);
				}
			}
		}

		&-time {
			width: $calendar-size - 80upx !important;
			left: ((750upx - $calendar-size) / 2 + 40upx) !important;
		}

		&-modal {
			// background: #fff;
			// position: absolute;
			// top: 50%;
			// left: (750upx - $calendar-size) / 2;
			// width: $calendar-size;
			
			// transform: translateY(-50%);
			// box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
			border-radius: 12upx;
			
			&-plane {
				// padding: 0 25rpx;
				height: 700rpx;
				overflow-y:	scroll;
			}

			&-header {
				text-align: center;
				line-height: 60upx;
				font-size: 28upx;
				border-bottom: 1rpx solid #eaeaea;

				&-title {
					display: inline-block;
					width: 40%;
				}

				.picker-icon {
					display: inline-block;
					line-height: 50upx;
					width: 50upx;
					height: 50upx;
					border-radius: 50upx;
					text-align: center;
					margin: 10upx;
					background: #fff;
					font-size: 36upx;

					&-active {
						background: rgba(0, 0, 0, .1);
					}
				}
			}

			&-body {
				// width: $calendar-size !important;
				// height: $calendar-size !important;
				position: relative;
				padding: 0 25rpx;
			}

			&-time {
				width: 100%;
				height: 180upx;
				text-align: center;
				line-height: 60upx;
			}

			&-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx 20upx 50upx;

				&-info {
					flex-grow: 1;
				}

				&-btn {
					flex-shrink: 0;
					display: flex;
				}
			}
		}

		&-calendar {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			&-view {
				position: relative;
				width: $calendar-item-size;
				height: $calendar-item-size;
				text-align: center;
				
				&-title {
					text-align: center;
					font-family: Microsoft YaHei;
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					line-height: 60rpx;
				}
				&-week {
					// width: 100%;
					padding: 0 25rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
				}

				&-bgbegin,
				&-bg,
				&-bgend,
				&-item,
				&-dot,
				&-tips {
					position: absolute;
					transition: .2s;
				}

				&-bgbegin,
				&-bg,
				&-bgend {
					opacity: .15;
					height: 80%;
				}

				&-bg {
					left: 0;
					top: 10%;
					width: 100%;
				}

				&-bgbegin {
					border-radius: $calendar-item-size 0 0 $calendar-item-size;
					top: 10%;
					left: 10%;
					width: 90%;
				}

				&-bgend {
					border-radius: 0 $calendar-item-size $calendar-item-size 0;
					top: 10%;
					left: 0%;
					width: 90%;
				}

				&-item {
					left: 5%;
					top: 5%;
					width: 90%;
					height: 90%;
					border-radius: $calendar-item-size;
					// display: flex;
					// align-items: center;
					// justify-content: center;
					
					&-disable {
						opacity: 1;
						color: #ddd;
						background: transparent
					}
					&-title {
						display: block;
						margin-top: 12rpx;
					}
					&-price {
						display: block;
						font-size: 18rpx;
					}
				}

				&-dot {
					right: 10%;
					top: 10%;
					width: 12upx;
					height: 12upx;
					border-radius: 12upx;
					&-disable {
						opacity: 0.2;
						background: #409eff;
					}
				}

				&-tips {
					bottom: 100%;
					left: 50%;
					transform: translateX(-50%);
					background: #4E4B46;
					color: #fff;
					border-radius: 12upx;
					padding: 10upx 20upx;
					font-size: 24upx;
					width: max-content;
					margin-bottom: 5px;
					pointer-events: none;

					&:after {
						content: "";
						position: absolute;
						top: 100%;
						left: 50%;
						transform: translateX(-50%);
						width: 0;
						height: 0;
						border-style: solid;
						border-width: 5px 5px 0 5px;
						border-color: #4E4B46 transparent transparent transparent;
					}
				}
			}
		}
	}

	@font-face {
		font-family: "mxdatepickericon";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMYAAsAAAAACBgAAALMAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDIgqDRIJiATYCJAMUCwwABCAFhG0HSRvfBsg+QCa3noNAyAQ9w6GDvbwpNp2vloCyn8bD/x+y+/5qDhtj+T4eRVEcbsCoKMFASzCgLdDkmqYDwgxkWQ6YH5L/YnppOlLEjlnter43YRjU7M6vJ3iGADVAgJn5kqjv/wEii23T86UsAQT+04fV+o97VTMx4PPZt4DlorLXwIQiGMA5uhaVrBWqGHfQXcTEiE+PE+g2SUlxWlLVBHwUYFMgrgwSB3wstTKSGzqF1nOyiGeeOtNjV4An/vvxR58PSc3AzrMViyDvPo/7dVEUzn5GROfIWAcU4rLXfMFdhte56y4We9gGNEVIezkBOOaQXUrbTf/hJVkhGpDdCw7dSOEzByMEn3kIic98hMxnAfeFPKWCbjRcA148/HxhCEkaA94eGWFaGolsblpaWz8/Po2WVuNHh1fmBpZHIpqal9fOjizhTteY+RZ9rv02I/pq0W6QVH3pSncBz3m55r9ZIPycHfmenvxe4uyutIgfT5u4bgkDusl9gcF0rnfnz+b2NpSaQWBFeu8GIL1xQj5AH/6FAsEr/50F28e/gA9ny6KjLrxIp0TE+UucmQOl5AFNLXkzZufWamWHYEI39PEP2If97CMdm51N6DSmIekwAVmneXTBr0PVYx+aTgfQbU3p+R4jKHdRurBq0oEw6AKSfm+QDbpGF/w3VOP+oBnMHbqdx409FjP4RRHHkAj5IWgQiBUjHfMTuQ1Icpg5avI4sQVRu8EHdWptM1aKrIjuscfeL+kZwxBTYoElztOQ2UygjRIjEphaZsyWodHgvm9SC8QC/JygEA6DiCDeEMhAQFhhOpvxa/18A0TiYMahIy0L2hYIZWeYH9JR085Al4qts1re5St2/SR6DINBGEVYQCWOETHDMAHZ+pcZIQJGTV4RtMmg8UbhuWL1+VLLA2RFHYC71kiRo0SNpjwQh8pj2EFU3oTNmS1WqgIA') format('woff2');
	}

	.picker-icon {
		font-family: "mxdatepickericon" !important;
	}

	.picker-icon-you:before {
		content: "\e63e";
	}

	.picker-icon-zuo:before {
		content: "\e640";
	}

	.picker-icon-zuozuo:before {
		content: "\e641";
	}

	.picker-icon-youyou:before {
		content: "\e642";
	}
</style>
