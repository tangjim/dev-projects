<template>
    <div class="open-main">
        <div class="buy-plane">
            <div class="contract-open_tabs">
                <van-tabs v-model="active" type="card">
                    <van-tab v-for="(item, index) in tabs" :title="item.text" :key="index" >
                        <compoment :is="item.view"></compoment>
                    </van-tab>
                </van-tabs>
            </div>
            <div class="right-price-plane">
                <div class="top">
                    <span>9708.25</span><span><em class="fut-s_r">-1.35%</em></span>
                </div>
                <div class="data-plane wrap-top">
                    <div class="header"><span><em class="fut-s">价格(USDT)</em></span><span><em class="fut-s_r">数量(张)</em></span></div>
                    <ul class="data-wrap">
                        <li @click="selectPrice(9708.25)" v-waves><span><em class="fut-s">9708.25</em></span><span><em class="fut-s_r">169</em></span></li>
                        <li @click="selectPrice(9708.15)" v-waves><span><em class="fut-s">9708.15</em></span><span><em class="fut-s_r">9</em></span></li>
                        <li @click="selectPrice(9708.05)" v-waves><span><em class="fut-s">9708.05</em></span><span><em class="fut-s_r">135</em></span></li>
                        <li @click="selectPrice(9707.89)" v-waves><span><em class="fut-s">9707.89</em></span><span><em class="fut-s_r">9913</em></span></li>
                        <li @click="selectPrice(9707.13)" v-waves><span><em class="fut-s">9707.13</em></span><span><em class="fut-s_r">37</em></span></li>
                    </ul>
                </div>
                <div class="data-plane wrap-bottom">
                    <ul class="data-wrap">
                        <li @click="selectPrice(9708.25)" v-waves><span><em class="fut-s">9708.25</em></span><span><em class="fut-s_r">999</em></span></li>
                        <li @click="selectPrice(9708.55)" v-waves><span><em class="fut-s">9708.55</em></span><span><em class="fut-s_r">812</em></span></li>
                        <li @click="selectPrice(9708.75)" v-waves><span><em class="fut-s">9708.75</em></span><span><em class="fut-s_r">12</em></span></li>
                        <li @click="selectPrice(9708.92)" v-waves><span><em class="fut-s">9708.92</em></span><span><em class="fut-s_r">3000</em></span></li>
                        <li @click="selectPrice(9708.99)" v-waves><span><em class="fut-s">9708.99</em></span><span><em class="fut-s_r">1580</em></span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="cut-24"></div>

        <div class="contract-order_tabs">
            <van-tabs v-model="orderActive" animated color="#3076ED" line-height="0.08rem" title-active-color="#3076ED" title-inactive-color="#8BA0AC">
                <van-tab v-for="(item, index) in orderTabs" :title="item.text" :key="index" >
                    <compoment :is="item.view"></compoment>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { Tab, Tabs, Popup } from "vant";
    import "vant/lib/tabs/style";
    import "vant/lib/tab/style";
    import "vant/lib/popup/style";
    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(Popup);

    import component_1 from "./components/form/1"
    import component_2 from "./components/form/2";

    import position from "./components/order/position";
    import general from "./components/order/general";
    import plan from "./components/order/plan";

    import {SET_ITEM} from '@/store/modules/mutation-types';
    import {mapMutations, mapState} from 'vuex';
    export default {
        name: "contract-open-index",
        components: {component_1, component_2, position, general, plan},
        data() {
            return {
                active: 0,
                tabs: [{text:"开仓", view:"component_1"},{text:"平仓",  view:"component_2"}],
                orderActive: 0,
                orderTabs: [{text:"持仓", view:"position"},{text:"普通委托", view:"general"},{text:"计划委托", view:"plan"}]
            }
        },
        computed: {
            ...mapState({
                order: state => state.order
            }),
        },

        methods: {
            ...mapMutations({
                setOrder: "order/"+SET_ITEM,
            }),
            selectPrice: function (price) {
                this.setOrder({priceType: 1, price:price})
            }
        }
    }
</script>

<style scoped>
    .open-main {width: 750px;margin: 0 auto}
    .buy-plane {overflow: hidden;padding: 24px 40px 30px;}
    .buy-plane .contract-open_tabs {width: 400px;float: left;margin-right: 28px;}

    .right-price-plane {float: left;width: 242px}
    .right-price-plane .top {overflow: hidden;}
    .right-price-plane .top span {font-family:Arial;font-weight:400;color:rgba(216,73,98,1);padding-bottom: 20px;}
    .right-price-plane .top span:nth-child(1) {font-size:28px;line-height:32px;float: left}
    .right-price-plane .top span:nth-child(2) {font-size:20px;line-height:38px;float: right;}
    .right-price-plane .top span:nth-child(2) em {display: inline-block}

    .right-price-plane .data-plane {border-top: 2px solid rgba(231,236,237,1);overflow: hidden;padding-top: 22px;padding-bottom: 28px;}
    .right-price-plane .data-plane.wrap-bottom {padding-top: 6px;}
    .right-price-plane .data-plane .header {overflow: hidden;display: inline-block;width: 100%;}
    .right-price-plane .data-plane .header span {font-size:20px;font-family:PingFang SC;font-weight:400;line-height:28px;color:rgba(140,161,169,1);}
    .right-price-plane .data-plane .header span:nth-child(1) {float: left;}
    .right-price-plane .data-plane .header span:nth-child(2) {float:right;}
    .right-price-plane .data-plane .header span em {display: inline-block}

    .right-price-plane .data-plane .data-wrap {overflow: hidden;margin-top: 10px;width: 100%;display: inline-block}
    .right-price-plane .data-plane .data-wrap li {overflow: hidden;width: 100%;margin-top: 20px;transition: .8s}
    /*.right-price-plane .data-plane .data-wrap li:active {background: rgba(215, 215, 215, 0.5);transition: .5s}*/
    .right-price-plane .data-plane .data-wrap span {font-size:20px;font-family:PingFang SC;font-weight:400;line-height:28px;}
    .right-price-plane .data-plane.wrap-top .data-wrap span:nth-child(1) {float: left;color:rgba(216,73,98,1);}
    .right-price-plane .data-plane.wrap-bottom .data-wrap span:nth-child(1) {float: left;color:rgba(5,173,142,1);}
    .right-price-plane .data-plane .data-wrap span:nth-child(2) {float:right;color:rgba(140,161,169,1);}
    .right-price-plane .data-plane .data-wrap span em {display: inline-block}

    .contract-order_tabs {width: 100%;}

    .cut-24 {
        width: 10rem;
        height: 0.32rem;
        background: rgba(247,247,250,1);
    }
</style>