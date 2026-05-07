<template>
    <div class="main">
        <sub-header>
            <back-btn class="back-btn" slot="header-left"><i class="iconfont icon-jiantou1"></i></back-btn>
            <div class="header-title" slot="header-middle">{{$route.meta.title}}</div>
        </sub-header>

        <div class="main-box">
            <div class="main-top">
                <div class="plane1">
                    <p>币币资产估值(BTC)</p>
                    <p>{{isShow?"฿"+asset.coinTotal.toFixed(6):"****"}}</p>
                    <p><span class="fut-s">{{isShow?"≈"+asset.coinTotalCny.toFixed(2):"****"}}</span></p>
                </div>
                <div class="plane2"><i class="iconfont" :class="isShow?'icon-ai44':'icon-yincang'" @click="isShow=!isShow"></i></div>
                <div class="plane3">
                    <div class="p1">
                        <p><span class="fut-s">合约资产</span><i class="iconfont icon-arrow-right-copy-copy-copy-copy"></i></p>
                        <p>{{isShow?"฿"+asset.coinTotal.toFixed(6):"****"}}</p>
                    </div>
                    <div class="cut"></div>
                    <div class="p2">
                        <p><span class="fut-s">法币资产</span><i class="iconfont icon-arrow-right-copy-copy-copy-copy"></i></p>
                        <p>{{isShow?"฿"+asset.coinTotalCny.toFixed(2):"****"}}</p>
                    </div>
                </div>
            </div>
            <div class="nav-handle">
                <van-grid clickable :border="false" :column-num="4">
                    <van-grid-item @click="openChildPanel('recharge')">
                        <i class="iconfont icon-tixianjilu"></i>
                        <p class="txt">充币</p>
                    </van-grid-item>
                    <van-grid-item @click="openChildPanel('withdrawal')">
                        <i class="iconfont icon-tixian"></i>
                        <p class="txt">提币</p>
                    </van-grid-item>
                    <van-grid-item @click="openChildPanel('transfer')">
                        <i class="iconfont icon-zhuanhuan"></i>
                        <p class="txt">资金划转</p>
                    </van-grid-item>
                    <van-grid-item @click="openChildPanel('record')">
                        <i class="iconfont icon-wenjian1"></i>
                        <p class="txt">资金记录</p>
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="cut-24"></div>
            <div class="main-list">
                <div class="list-header">
                    <h3>资产明细</h3>
                    <div class="handle">
                        <van-checkbox v-model="checked">
                            <div class="checked-txt"><em class="fut-s">隐藏小额币种</em></div>
                            <template #icon="props">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="props.checked ? '#icon-icon-test':'#icon-icon-test1'"></use>
                                </svg>
                            </template>
                        </van-checkbox>
                    </div>
                </div>
                <div class="list-wrap">
                    <ul><li class="list-item" v-for="(item, index) in asset.coinDetails" :key="index">
                        <h3>{{item.coinShowName}}</h3>
                        <div class="item-wrap">
                            <div class="item-item-wrap"><p><span class="fut-s">可用</span></p><p>{{item.coinUseable}}</p></div>
                            <div class="item-item-wrap"><p><span class="fut-s">冻结</span></p><p>{{item.coinFreeze}}</p></div>
                            <div class="item-item-wrap"><p><span class="fut-s">折合资金</span></p><p>≈￥{{item.coinTotalCny}}</p></div>
                        </div>
                    </li></ul>
                </div>
            </div>
        </div>

        <template v-if="childPanel.recharge.load">
            <van-popup v-model="childPanel.recharge.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <recharge v-on:close="closeChildPanel"/>
            </van-popup>
        </template>

        <template v-if="childPanel.withdrawal.load">
            <van-popup v-model="childPanel.withdrawal.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <withdrawal v-on:close="closeChildPanel"/>
            </van-popup>
        </template>

        <template v-if="childPanel.transfer.load">
            <van-popup v-model="childPanel.transfer.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <transfer v-on:close="closeChildPanel"/>
            </van-popup>
        </template>

        <template v-if="childPanel.record.load">
            <van-popup v-model="childPanel.record.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <record v-on:close="closeChildPanel"/>
            </van-popup>
        </template>
    </div>
</template>

<script>
    import BackBtn from '../../components/back_btn';
    import RefreshBtn from '../../components/refresh_btn';
    import SubHeader from "../../components/sub_header";

    import Vue from 'vue';

    import { Grid, GridItem, Checkbox, Popup} from 'vant';
    import "vant/lib/grid/style";
    import "vant/lib/grid-item/style";
    import "vant/lib/checkbox/style";
    import "vant/lib/popup/style";
    Vue.use(Grid);
    Vue.use(GridItem);
    Vue.use(Checkbox);
    Vue.use(Popup);

    import {mapState, mapActions, mapGetters} from 'vuex';

    import Recharge from "../member/money/recharge";
    import Withdrawal from "../member/money/withdrawal";
    import Transfer from "../member/money/transfer";
    import Record from "../member/money/record";
    export default {
        name: "assets-index",
        components: {SubHeader, BackBtn, RefreshBtn, Recharge, Withdrawal, Transfer, Record},
        data() {
            return {
                isShow: true,
                checked: true,
                childPanel: {
                    recharge: {load: false, show:false},
                    withdrawal: {load: false, show:false},
                    transfer: {load: false, show:false},
                    record: {load: false, show:false},
                },
            }
        },
        computed: {
            ...mapState({
                asset: state=>state.asset
            }),
        },
        methods: {
            ...mapActions({
                getAsset: 'asset/get'
            }),
            openChildPanel: function(panel) {
                this.childPanel[panel].load = true;
                setTimeout(()=>{this.childPanel[panel].show=true}, 50);
            },
            closeChildPanel: function(panel) {
                this.childPanel[panel].show = false;
                setTimeout(()=>{this.childPanel[panel].load = false;}, 80);
            },
        },
        created() {
            this.getAsset();
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
    .main-box .main-top {width: 750px;height: 242px;background: url("../../assets/img/bg001.png");background-size: 100%;position: relative}
    .main-top .plane1 {position: absolute;left: 32px;top: 40px;}
    .main-top .plane1 p:nth-child(1) {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(255,255,255,1);opacity:0.5;}
    .main-top .plane1 p:nth-child(2) {font-size:40px;font-family:Microsoft YaHei;font-weight:400;line-height:52px;color:rgba(255,255,255,1);margin-top: 12px;}
    .main-top .plane1 p:nth-child(3) {font-size:20px;font-family:Arial;font-weight:400;line-height:22px;color:rgba(140,161,169,1);margin-left: 6px;}
    .main-top .plane2 {position: absolute;top: 46px;right: 36px;}
    .main-top .plane2 i {font-size: 42px;color: rgba(255,255,255,1);opacity: 0.7;line-height: 25px;}
    .main-top .plane3 {position: absolute;bottom: 0;height: 88px;width: 750px;}
    /*.main-top .plane3 .p1, .main-top .plane3 .p2, .main-top .plane3 .cut {position: absolute}*/
    .plane3 .cut {height: 40px;width: 2px;background-color: rgba(255,255,255,1);opacity: 0.5;top: 14px;right: 246px;position: absolute;}
    .main-top .plane3 .p1, .main-top .plane3 .p2 {position: absolute;}
    .main-top .plane3 .p1 {right: 314px;top: 0}
    .main-top .plane3 .p2 {right: 42px;top: 0}
    .main-top .plane3 .p1 p:nth-child(1), .main-top .plane3 .p2 p:nth-child(1) {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color:rgba(255,255,255,1);opacity:0.5;position: absolute;right: 6px;width: 125px;}
    .main-top .plane3 .p1 p:nth-child(1) i, .main-top .plane3 .p2 p:nth-child(1) i {opacity:0.52;color:rgba(255,255,255,1);font-size: 13px;margin-left: 5px;}
    .main-top .plane3 .p1 p:nth-child(2), .main-top .plane3 .p2 p:nth-child(2) {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(255,255,255,1);position: absolute;right: 0;top: 34px;}

    .nav-handle .iconfont {font-size: 52px;color:rgba(5,173,142,1);}
    .nav-handle .txt {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(27,65,91,1);margin-top: 6px;}

    .cut-24 {width: 750px;height: 24px;background:rgba(247,247,250,1);}

    .main-list {padding-top: 36px;}
    .list-header {overflow: hidden;margin-bottom: 40px;padding: 0 40px;}
    .list-header h3 {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(27,65,91,1);margin: 0;padding: 0;float: left}

    .handle {float: right;margin-top: 5px;}
    .handle .checked-txt {font-size:20px;font-family:Arial;font-weight:400;line-height:28px;color:rgba(140,161,169,1);}
    .handle .checked-txt span {color:rgba(48,118,237,1);}
    .icon {
        width: 30px;
        height: 30px;
        fill: currentColor;
        overflow: hidden;
    }

    .list-wrap {height: 42vh;overflow-y: scroll;padding: 0 40px;}
    .list-wrap ul {margin-bottom: 58px;}
    .list-wrap li.list-item {height: 156px;border-bottom: 2px solid rgba(231,236,237,1);padding-top: 24px;}
    .list-wrap li.list-item h3 {font-size:36px;font-family:Microsoft YaHei;font-weight:400;line-height:48px;color:rgba(27,65,91,1);padding: 0;margin: 0;}
    .list-wrap li.list-item .item-wrap {width: 100%;position: relative}
    .list-wrap li.list-item .item-wrap .item-item-wrap {margin-top: 28px;position: absolute}
    .list-wrap li.list-item .item-wrap .item-item-wrap:nth-child(1) {left: 0}
    .list-wrap li.list-item .item-wrap .item-item-wrap:nth-child(2) {left: 260px}
    .list-wrap li.list-item .item-wrap .item-item-wrap:nth-child(3) {left: 510px}
    .list-wrap li.list-item .item-wrap .item-item-wrap p:nth-child(1) {font-size:20px;font-family:Arial;font-weight:400;line-height:22px;color:rgba(140,161,169,1);}
    .list-wrap li.list-item .item-wrap .item-item-wrap p:nth-child(2) {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(27,65,91,1);margin-top: 4px;}
    /*.list-wrap ul .list-item:last-child {border-bottom: 0}*/
</style>