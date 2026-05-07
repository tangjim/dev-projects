<template>
    <div>
        <div class="sub-header">
            <div class="header-left">
                <div class="logo"><img :src="'/images/logo.png'" /></div>
                <div class="sub-header-info">Hi，欢迎来到XXX</div>
            </div>
            <div class="header-right">
                <div class="wode"><router-link to="/authorize/login"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wode"></use></svg></router-link></div>
                <div class="xiaoxi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xiaoxi"></use></svg></div>
            </div>
        </div>
        <!--<van-pull-refresh v-model="isPullRefresh" :head-height="40" @refresh="onRefresh">-->
            <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
            <!--<template #pulling="props"><div class="loading-animation"><div class="sp sp-circle"></div></div></template>-->
            <!-- 释放提示 -->
            <!--<template #loosing>释放即可刷新....</template>-->
            <!-- 加载提示 -->
            <!--<template #loading><div class="loading-animation"><div class="sp sp-circle"></div></div></template>-->
            <div class="main">
                <!-- banner图 -->
                <div class="banner-swipe-plane">
                    <van-swipe class="banner-van-swipe" @change="swipeBannerChange">
                        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
                            <div class="banner-van-swipe-item" v-lazy-container="{selector:'img'}"><img :data-src="item" /></div>
                        </van-swipe-item>
                        <template #indicator>
                            <div class="banner-van-swipe__indicators" v-if="bannerList.length > 1">
                                <i class="banner-van-swipe__indicator" :class="{'banner-van-swipe__indicator--active':index===swipeBannerCurrent}" v-for="(item, index) in bannerList" :key="index"></i>
                            </div>
                        </template>
                    </van-swipe>
                </div>

                <div class="main-scroll-plane">
                    <!-- 指数 -->
                    <div class="coin-swipe-plane">
                        <van-swipe class="coin-van-swipe" :loop="false" @change="swipeIndexChange">
                            <van-swipe-item v-for="(list, index) in topCoinList" :key="index">
                                <div class="coin-van-swipe-item"  v-for="(item, index2) in list" :key="index2">
                                    <p>{{item.remarkPrefix}}/{{item.remarkSuffix}}</p>
                                    <p><span class="fut-s">{{item.type}}</span></p>
<!--                                    <p :class="parseFloat(item.increase.replace('%','')) > 0 ? 'red': 'green'">{{item.price.toFixed(item.front_precision)}}</p>-->
<!--                                    <p :class="parseFloat(item.increase.replace('%','')) > 0 ? 'red': 'green'"><span class="fut-s"><template v-if="parseFloat(item.increase.replace('%',''))>0">+</template>{{item.increase}}</span></p>-->
                                    <p><span class="fut-s">≈￥{{item.priceCny.toFixed(2)}} CNY</span></p>
                                </div>
                            </van-swipe-item>
                            <template #indicator>
                                <div class="coin-van-swipe__indicators" v-if="topCoinList.length > 1">
                                    <i class="coin-van-swipe__indicator" :class="{'coin-van-swipe__indicator--active':index===swipeIndexCurrent}" v-for="(item, index) in topCoinList" :key="index"></i>
                                </div>
                            </template>
                        </van-swipe>
                    </div>
                    <!-- 公告 -->
                    <notice></notice>
                    <!-- 返佣排行 -->
                    <div class="rebate-ranking-plane">
                        <div class="rebate-ranking-wrap">
                            <div class="rebate-ranking-title"><span>返佣排行榜</span><span><em class="fut-s">周榜</em></span></div>
                            <div class="rebate-ranking-content">
                                <rebate-ranking :num="3"></rebate-ranking>
                                <!--<ul class="rebate-ranking-list">-->
                                    <!--<li v-for="(item, index) in userRebateRanking" :key="index">-->
                                        <!--<template v-if="item.sequence < 4"><div v-lazy-container="{selector:'img'}"><img :data-src="'/images/ranking'+item.sequence+'.png'" /></div></template>-->
                                        <!--<template v-else><div class="sequence_txt"><span class="fut-s">{{item.sequence}}</span></div></template>-->
                                        <!--<span class="t1">-->
                                        <!--<template v-if="item.mobilePhone">{{item.mobilePhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</template>-->
                                        <!--<template v-else-if="item.email">{{item.email.replaceAll("(\\w?)(\\w+)(\\w)(@\\w+\\.[a-z]+(\\.[a-z]+)?)", "$1******$3$4")}}</template>-->
                                    <!--</span>-->
                                        <!--<span class="t2"><p class="fut-s_r">{{item.amount}}&nbsp;USDT</p></span>-->
                                    <!--</li>-->
                                <!--</ul>-->
                            </div>
                        </div>

                        <div class="banner-gg-swipe-plane">
                            <van-swipe class="banner-gg-van-swipe" @change="swipeBannerGGChange">
                                <van-swipe-item v-for="(item, index) in bannerGGList" :key="index">
                                    <div class="banner-gg-van-swipe-item" v-lazy-container="{selector:'img'}"><img :data-src="item" /></div>
                                </van-swipe-item>
                                <template #indicator>
                                    <div class="banner-gg-van-swipe__indicators" v-if="bannerGGList.length>1">
                                        <i class="banner-gg-van-swipe__indicator" :class="{'banner-gg-van-swipe__indicator--active':index===swipeBannerGGCurrent}" v-for="(item, index) in bannerGGList" :key="index"></i>
                                    </div>
                                </template>
                            </van-swipe>
                        </div>
                    </div>
                    <!-- tab -->
                    <div class="home-tabs">
                        <van-tabs v-model="coinActive" animated color="#1B415B" line-height="1px" title-active-color="#1B415B" title-inactive-color="#8BA0AC">
                            <van-tab v-for="(item, index) in coinTab" :title="item.title" :key="index">
                                <div class="table-header">
                                    <span>币种</span>
                                    <span>价格</span>
                                    <span>24H涨跌</span>
                                </div>
                                <ul class="table-list" v-if="item.data && item.data.length > 0">
                                    <li v-for="(item2, index2) in item.data" :key="index2">
                                        <div class="name"><span>{{item2.remarkPrefix}}</span><span><em class="fut-s">/{{item2.remarkSuffix}}</em></span></div>
<!--                                        <div class="price"><p :class="parseFloat(item2.increase.replace('%','')) > 0 ? 'red': 'green'">{{item2.price.toFixed(item2.front_precision)}}</p><p><span class="fut-s">≈￥{{item2.priceCny.toFixed(2)}}</span></p></div>-->
<!--                                        <div class="increase" :class="parseFloat(item2.increase.replace('%','')) > 0 ? 'red': 'green'"><span class="fut-s">{{item2.increase}}</span></div>-->
                                    </li>
                                </ul>
                                <div v-else class="coin-empty">暂无数据</div>
                            </van-tab>
                        </van-tabs>
                    </div>
                </div>

            </div>
        <!--</van-pull-refresh>-->

    </div>
</template>

<script>
    import Vue from "vue";
    import { PullRefresh, Toast, Lazyload, Swipe, SwipeItem, Tab, Tabs } from "vant";
    import "vant/lib/pull-refresh/style";
    import "vant/lib/toast/style";
    import "vant/lib/lazyload/style";
    import "vant/lib/swipe/style";
    import "vant/lib/swipe-item/style";
    import "vant/lib/tabs/style";
    import "vant/lib/tab/style";
    Vue.use(PullRefresh);
    Vue.use(Toast);
    Vue.use(Lazyload);
    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(Tab);
    Vue.use(Tabs);
    import {mapState, mapActions, mapGetters} from 'vuex';
    import SubHeader from '../../components/sub_header';
    import Notice from '../../components/notice';
    import RebateRanking from '../../components/rebate_ranking';

    export default {
        name: "Home",
        components: {SubHeader, Notice, RebateRanking},
        data() {
            return {
                isPullRefresh: false,
                swipeIndexCurrent:0,
                bannerList: ["/images/banner/1.png?v="+new Date().getTime(),"/images/banner/2.png?v="+new Date().getTime(),"/images/banner/3.png?v="+new Date().getTime(), "/images/banner/4.png?v="+new Date().getTime()],
                swipeBannerCurrent:0,
                bannerGGList: ["/images/banner/gg/1.png?v="+new Date().getTime()],
                swipeBannerGGCurrent:0,
                coinActive: 1,
                coinTab: [{title:"自选", data:[]},{title:"永续合约", data:[]},{title:"币本位合约", data:[]},{title:"币币", data:[]}]
            }
        },
        computed: {
            ...mapState({
                user: state=>state.user
            }),
            ...mapGetters({
                topCoinList: "product/getTopCoinList",
                susCoinList: "product/getSusCoinList",
            })
        },
        created() {
            this.coinTab[1].data = this.susCoinList;
        },
        mounted() {},
        destroyed() {
            // clearInterval(this.noticeInterval);
        },
        methods: {
            onRefresh: function() {
                setTimeout(()=>{
                    this.isPullRefresh = false;
                    Toast("刷新成功");
                }, 500);
            },
            swipeIndexChange: function (index) {
                this.swipeIndexCurrent = index;
            },
            swipeBannerChange: function (index) {
                this.swipeBannerCurrent = index;
            },
            swipeBannerGGChange: function (index) {
                this.swipeBannerGGCurrent = index;
            }
        },
        watch: {
            susCoinList: {
                handler(val) {
                    this.coinTab[1].data = val;
                }
            }
        }
    }
</script>

<style scoped>
    .sub-header {width:710px;height:76px;background: rgb(255, 255, 255);opacity:1;margin: auto 0;position: fixed;z-index: 9;display: flex;padding: 0 20px;top: 0}
    .sub-header .header-left {overflow: hidden;display: table-cell;flex: 1.8}
    .sub-header .header-left .logo {height: 52px;width: 55px;margin-top: 4px;margin-right: 16px;float: left}
    .sub-header .header-left .logo img {width: 100%}
    .sub-header .header-left .sub-header-info {font-size:32px;font-family:Tahoma;font-weight:400;line-height:38px;color:rgba(27,65,91,1);opacity:1;height:42px;margin-top: 10px;}
    .sub-header .header-right {display: table-cell;flex: 1;}
    .sub-header .header-right div {padding-top: 10px;float: right;}
    .sub-header .header-right .xiaoxi {margin-right: 30px;}
    .sub-header .header-right .wode {margin-right: 8px;}
    .sub-header .header-right .icon {width: 36px; height: 36px;fill:currentColor;overflow:hidden;}

    .main {margin: 76px 0 150px 0;width: 100%;position: relative;height:calc(100vh - 230px);font-family:Microsoft YaHei;}

    .main .main-scroll-plane {width: 750px;padding-top: 5px;height:calc(100vh - 533px);overflow: hidden;overflow-y: scroll;}

    .banner-swipe-plane {width: 750px;height: 300px;overflow: hidden;}
    .banner-van-swipe .van-swipe-item {height: 300px;overflow: hidden;text-align: center;background-color: #ffffff;}
    .banner-van-swipe .banner-van-swipe-item {width: 750px;float: left;height: 300px;}
    .banner-van-swipe .banner-van-swipe-item img {width: 100%}

    .banner-van-swipe__indicators {position:absolute;bottom:20px;left:50%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-transform:translateX(-50%);transform:translateX(-50%)}
    .banner-van-swipe__indicator {width:35px;height:4px;background-color:#ffffff;border-radius:0;opacity:.3;-webkit-transition:opacity .2s;transition:opacity .2s}
    .banner-van-swipe__indicator:not(:last-child) {margin-right:0;margin-bottom:0}
    .banner-van-swipe__indicator--active {background-color:#ffffff;opacity:.8}


    .coin-swipe-plane {width: 672px;height: 253px;overflow: hidden;margin: auto;border-bottom:4px solid rgba(231,236,237,1);}
    .coin-swipe-plane .coin-van-swipe {height: 253px;overflow: hidden;text-align: center;background-color: #ffffff;}
    .coin-van-swipe .coin-van-swipe-item {width: 224px;float: left;height: 180px;margin-top: 27px;}
    .coin-van-swipe .coin-van-swipe-item p {text-align: center;font-weight:400;color:rgba(140,161,169,1);}
    .coin-van-swipe .coin-van-swipe-item p:nth-child(1) {font-size:28px;font-family:Arial;line-height:32px;color:rgba(27,65,91,1);margin-bottom: 6px;}
    .coin-van-swipe .coin-van-swipe-item p:nth-child(2) {font-size:18px;line-height:24px;margin-bottom: 18px}
    .coin-van-swipe .coin-van-swipe-item p:nth-child(3) {font-size:36px;font-family:Arial;line-height:42px;margin-bottom: 4px}
    .coin-van-swipe .coin-van-swipe-item p:nth-child(4) {font-size:20px;font-family:Arial;line-height:22px;margin-bottom: 8px;}
    .coin-van-swipe .coin-van-swipe-item p:nth-child(5) {font-size:20px;font-family:Arial;line-height:22px;}
    .coin-van-swipe .coin-van-swipe-item p.red {color: #D84962}
    .coin-van-swipe .coin-van-swipe-item p.green {color: #05AD8E}

    .coin-van-swipe__indicators {position:absolute;bottom:20px;left:50%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-transform:translateX(-50%);transform:translateX(-50%)}
    .coin-van-swipe__indicator {width:44px;height:6px;background-color:#1B415B;border-radius:0;opacity:.16;-webkit-transition:opacity .2s;transition:opacity .2s}
    .coin-van-swipe__indicator:not(:last-child) {margin-right:0;margin-bottom:0}
    .coin-van-swipe__indicator--active {background-color:#1B415B;opacity:1}

    .rebate-ranking-plane {width: 750px;height:524px;background:rgba(247,247,250,1);overflow: hidden}
    .rebate-ranking-plane .rebate-ranking-wrap {width:670px;background:rgba(255,255,255,1);border-radius:6px;margin: 24px auto;overflow: hidden;height:314px;}
    .rebate-ranking-wrap .rebate-ranking-title {height: 74px;border-bottom:4px dotted rgba(231,236,237,1);padding:0 32px;}
    .rebate-ranking-wrap .rebate-ranking-title span:nth-child(1) {float: left;font-size:28px;font-weight:400;line-height:74px;color:rgba(27,65,91,1);}
    .rebate-ranking-wrap .rebate-ranking-title span:nth-child(2) {float: right;font-size:20px;font-family:Arial;font-weight:400;line-height:74px;color:rgba(140,161,169,1);}

    .rebate-ranking-wrap .rebate-ranking-content {height: 240px;overflow: hidden;overflow-y: auto}

    .banner-gg-swipe-plane {width: 670px;height: 138px;overflow: hidden;margin: auto}
    .banner-gg-van-swipe .van-swipe-item {height: 138px;overflow: hidden;text-align: center;background-color: #ffffff;}
    .banner-gg-van-swipe .banner-gg-van-swipe-item {width: 670px;float: left;height: 138px;}
    .banner-gg-van-swipe .banner-gg-van-swipe-item img {width: 100%}

    .banner-gg-van-swipe__indicators {position:absolute;bottom:12px;right:13px;display:-webkit-box;display:-webkit-flex;display:flex;}
    .banner-gg-van-swipe__indicator {width:35px;height:4px;background-color:#ffffff;border-radius:0;opacity:.3;-webkit-transition:opacity .2s;transition:opacity .2s}
    .banner-gg-van-swipe__indicator:not(:last-child) {margin-right:0;margin-bottom:0}
    .banner-gg-van-swipe__indicator--active {background-color:#ffffff;opacity:.8}

    .home-tabs .table-header {height: 90px;padding: 0 40px;}
    .home-tabs .table-header span {line-height: 32px;margin-top: 36px;font-size:24px;font-weight:400;color:rgba(139,160,172,1);font-family:Microsoft YaHei;display: inline-block}
    .home-tabs .table-header span:nth-child(1) {float: left;width: 214px;}
    .home-tabs .table-header span:nth-child(1) {float: left}
    .home-tabs .table-header span:nth-child(3) {float: right;}

    .home-tabs .table-list li {height: 90px;border-bottom: 2px solid rgba(231,236,237,1);width: 670px;padding: 0 40px;}
    .home-tabs .table-list li:last-child{border-bottom: 0}
    .home-tabs .table-list li .name {float: left;width: 214px;font-family:Arial;font-weight:400;}
    .home-tabs .table-list li .name span:nth-child(1) {font-size:28px;color:rgba(27,65,91,1);line-height: 90px;}
    .home-tabs .table-list li .name span:nth-child(2) {font-size:20px;color:rgba(197,208,213,1);display: inline-block;margin-left: 2px;}
    .home-tabs .table-list li .price {float: left;}
    .home-tabs .table-list li .price p:nth-child(1){font-size:28px;font-family:Arial;font-weight:400;line-height:32px;margin-top: 18px;}
    .home-tabs .table-list li .price p:nth-child(2){font-size:20px;font-family:Arial;font-weight:400;line-height:22px;color:rgba(140,161,169,1);}
    .home-tabs .table-list li .increase {width:112px;height:48px;border-radius:6px;font-size:20px;line-height: 48px;font-family:Arial;font-weight:400;color:rgba(245,255,255,1);float: right;text-align: center;margin-top: 24px;}
    .home-tabs .table-list li .price p.red {color: rgba(216,73,98,1);}
    .home-tabs .table-list li .price p.green {color: rgba(2,175,143,1);}
    .home-tabs .table-list li .increase.green {background:rgba(2,175,143,1);}
    .home-tabs .table-list li .increase.red {background:rgba(216,73,98,1);}

    .coin-empty {text-align: center;margin: 20px 0;font-size:24px;font-family:Microsoft YaHei;font-weight: 400;line-height: 32px;color:rgba(139,160,172,1);}
</style>
