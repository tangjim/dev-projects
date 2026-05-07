<template>
    <div class="main">
        <sub-header>
            <back-btn class="back-btn" slot="header-left"><i class="iconfont icon-jiantou1"></i></back-btn>
            <div class="header-title" slot="header-middle">{{$route.meta.title}}</div>
        </sub-header>

        <div class="main-box">
            <div class="quotation-tabs">
                <van-tabs v-model="coinActive" animated color="#1B415B" line-height="0.08rem" title-active-color="#1B415B" title-inactive-color="#8BA0AC">
                    <van-tab v-for="(item, index) in coinTab" :title="item.title" :key="index">
                        <div class="table-header">
                            <span>币种</span>
                            <span>价格</span>
                            <span>24H涨跌</span>
                        </div>
                        <ul class="table-list" v-if="item.data && item.data.length > 0">
                            <li v-for="(item2, index2) in item.data" :key="index2" v-waves>
                                <div class="name"><span>{{item2.remarkPrefix}}</span><span><em class="fut-s">/{{item2.remarkSuffix}}</em></span></div>
                                <div class="price"><p :class="parseFloat(item2.increase.replace('%','')) > 0 ? 'red': 'green'">{{item2.price.toFixed(item2.front_precision)}}</p><p><span class="fut-s">≈￥{{item2.priceCny.toFixed(2)}}</span></p></div>
                                <div class="increase" :class="parseFloat(item2.increase.replace('%','')) > 0 ? 'red': 'green'"><span class="fut-s">{{item2.increase}}</span></div>
                            </li>
                        </ul>
                        <div v-else class="coin-empty">暂无数据</div>
                    </van-tab>
                </van-tabs>
            </div>

        </div>
    </div>
</template>

<script>
    import BackBtn from '../../components/back_btn';
    import RefreshBtn from '../../components/refresh_btn';
    import SubHeader from "../../components/sub_header";

    import Vue from "vue";
    import { Tab, Tabs } from "vant";
    import "vant/lib/tabs/style";
    import "vant/lib/tab/style";
    Vue.use(Tab);
    Vue.use(Tabs);

    import {mapState, mapActions, mapGetters} from 'vuex';
    export default {
        name: "quotation-index",
        components: {SubHeader, BackBtn, RefreshBtn},
        data() {
            return {
                coinActive: 1,
                coinTab: [{title:"自选", data:[]},{title:"永续合约", data:[]},{title:"币本位合约", data:[]},{title:"币币", data:[]}]
            }
        },
        computed: {
            ...mapGetters({
                susCoinList: "product/getSusCoinList",
            })
        },
        created() {
            this.coinTab[1].data = this.susCoinList;
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
    .main {width: 100%;height: 100vh;overflow: hidden;position: relative;background-color: #ffffff;}
    .refresh-btn, .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i, .refresh-btn i  {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}
    .main-box {margin-top: 80px;}

    .quotation-tabs .table-header {height: 100px;padding: 0 40px;}
    .quotation-tabs .table-header span {line-height: 32px;margin-top: 42px;font-size:24px;font-weight:400;color:rgba(139,160,172,1);font-family:Microsoft YaHei;display: inline-block}
    .quotation-tabs .table-header span:nth-child(1) {float: left;width: 214px;}
    .quotation-tabs .table-header span:nth-child(1) {float: left}
    .quotation-tabs .table-header span:nth-child(3) {float: right;}

    .quotation-tabs .table-list li {height: 96px;border-bottom: 2px solid rgba(231,236,237,1);width: 670px;padding: 0 40px;transition: .5s;outline:none;}
    /*.quotation-tabs .table-list li:active{background-color: rgba(214, 214, 214, 0.3);transition: .3s}*/
    .quotation-tabs .table-list li:last-child{border-bottom: 0}
    .quotation-tabs .table-list li .name {float: left;width: 214px;font-family:Arial;font-weight:400;}
    .quotation-tabs .table-list li .name span:nth-child(1) {font-size:28px;color:rgba(27,65,91,1);line-height: 96px;}
    .quotation-tabs .table-list li .name span:nth-child(2) {font-size:20px;color:rgba(197,208,213,1);display: inline-block;}
    .quotation-tabs .table-list li .price {float: left;}
    .quotation-tabs .table-list li .price p:nth-child(1){font-size:28px;font-family:Arial;font-weight:400;line-height:32px;margin-top: 18px;}
    .quotation-tabs .table-list li .price p:nth-child(2){font-size:20px;font-family:Arial;font-weight:400;line-height:22px;color:rgba(140,161,169,1);}
    .quotation-tabs .table-list li .increase {width:112px;height:48px;border-radius:6px;font-size:20px;line-height: 48px;font-family:Arial;font-weight:400;color:rgba(245,255,255,1);float: right;text-align: center;margin-top: 24px;}
    .quotation-tabs .table-list li .price p.red {color: rgba(216,73,98,1);}
    .quotation-tabs .table-list li .price p.green {color: rgba(2,175,143,1);}
    .quotation-tabs .table-list li .increase.green {background:rgba(2,175,143,1);}
    .quotation-tabs .table-list li .increase.red {background:rgba(216,73,98,1);}

    .coin-empty {text-align: center;margin: 20px 0;font-size:24px;font-family:Microsoft YaHei;font-weight: 400;line-height: 32px;color:rgba(139,160,172,1);}
</style>