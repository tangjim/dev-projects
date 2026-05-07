<template>
    <div class="main">
        <sub-header :class="{'header-main':headerCss}">
            <back-btn class="back-btn" slot="header-left"><i class="iconfont icon-jiantou1"></i></back-btn>
            <div class="header-title" slot="header-middle">
                <div class="handle-title" @click="triggerTopMenuState">
                    <span>{{getTitleText}}</span><svg class="icon" aria-hidden="true" :class="{'active':openTopMenuState}"><use :xlink:href="'#icon-jiantou'"></use></svg>
                </div>

            </div>
            <div class="header-right" slot="header-right">
                <i class="iconfont icon-zijinshouzhiqushifenxi"></i>
                <i class="iconfont icon-gengduo"></i>
            </div>
        </sub-header>
        <div class="main-box">
            <div class="contract-tabs">
                <van-tabs v-model="contractTabsActive" animated :color="tabs[contractTabsActive].color" line-height="0.08rem" line-width="2.5rem">
                    <van-tab v-for="(item, index) in tabs" :title="item.text" :key="index">
                        <compoment :is="item.view"></compoment>
                    </van-tab>
                </van-tabs>
            </div>
        </div>

        <van-popup v-model="openTopMenuState" position="top" :close-on-popstate="true" :style="{ height: '40%', top: '1.07rem'}" get-container=".main-box">
            <div class="contract_select-plane">
                <van-tree-select :items="items" :main-active-index.sync="activeIndex" height="100%">
                    <template #content>
                        <ul>
                            <li v-for="(item, index) in items[activeIndex].children" :key="index" :class="{'active':item.id === activeId}" @click="selectChildrenItem(index)">
                                <span>{{item.text}}</span>
                                <span :class="item.increase > 0 ? 'color_red': 'color_green'"><em class="fut-s">{{item.increase}}%</em></span>
                            </li>
                        </ul>
                    </template>
                </van-tree-select>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import BackBtn from '../../components/back_btn';
    import RefreshBtn from '../../components/refresh_btn';
    import SubHeader from "../../components/sub_header";

    import Vue from "vue";
    import { Tab, Tabs, Popup, TreeSelect } from "vant";
    import "vant/lib/tabs/style";
    import "vant/lib/tab/style";
    import "vant/lib/popup/style";
    import "vant/lib/tree-select/style";
    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(Popup);
    Vue.use(TreeSelect);

    import Open from "./open";
    import {mapState, mapActions, mapGetters} from 'vuex';
    export default {
        name: "contract-index",
        components: {SubHeader, BackBtn, RefreshBtn, Open},
        computed: {
            getTitleText() {
                if (this.items[this.activeIndex].children.filter((item)=>{ return item.id === this.activeId; }).length > 0) {
                    return this.items[this.activeIndex].children.filter((item)=>{ return item.id === this.activeId; })[0].text;
                } else {
                    return "";
                }
            },
        },
        data() {
            return {
                openTopMenuState: false,
                headerCss: false,
                activeId: 1,
                activeIndex: 0,
                items:[
                    {
                        text:"USDT永续合约",
                        children: [
                            {text:"BTC/USDT永续合约", id:1, increase:1.35},
                            {text:"ETH/USDT永续合约", id:2, increase:-1.35},
                            {text:"BTH/USDT永续合约", id:3, increase:1.35},
                            {text:"EOS/USDT永续合约", id:4, increase:-1.35},
                            {text:"XRP/USDT永续合约", id:5, increase:1.35}
                        ]
                    },
                    {text:"币本位合约",
                        children: [
                            {text:"BTC/USDT币本位合约", id:6, increase:1.35},
                            {text:"ETH/USDT币本位合约", id:7, increase:-1.35}
                        ]}
                ],
                contractTabsActive: 0,
                tabs: [{text:"开仓", color:"#4CB971", view:"open"},{text:"持仓", color:"#ED655E"},{text:"委托", color:"#3076ED"},{text:"历史", color:"#474747"}]
            }
        },
        methods: {
            triggerTopMenuState: function() {
                this.openTopMenuState = !this.openTopMenuState;
                if (!this.openTopMenuState) {
                    setTimeout(()=>{
                        this.headerCss = this.openTopMenuState;
                    }, 500);
                } else {
                    this.headerCss = this.openTopMenuState;
                }
            },
            selectChildrenItem: function (index) {
                this.activeId = this.items[this.activeIndex].children[index].id;
                this.openTopMenuState = false;
            }
        }
    }
</script>

<style scoped>
    .main {width: 750px;height: calc(100vh - 230px);overflow-y: auto;position: relative;background-color: #ffffff;margin-top: 80px;}
    .header-main {z-index: 9999;position: relative}
    .header-right, .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i, .header-right i {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-right i {font-size: 44px;}
    .header-right i:nth-child(2) {margin-left: 28px;}
    .header-title {color:rgba(27,65,91,1);height: 80px}
    .header-title .handle-title {overflow: hidden;position: absolute;left: 50%;transform:translateX(-50%);white-space:nowrap}
    .header-title .handle-title span {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height: 80px;float:left;}
    .header-title .icon {
        width: 35px;
        height: 80px;
        fill: currentColor;
        overflow: hidden;
        display: table-cell;
        float: left;
        margin-left: 10px;
        transition: .3s;
        transform:rotate(-180deg);
    }
    .header-title .icon.active{
        transform:rotate(0deg);
        transition: .3s;
    }

    .main-box {position: relative;}

    .contract_select-plane {height: 100%;width: 100%;background-color: #F7F7FA}
    .contract_select-plane ul li {height:90px;background:rgba(255,255,255,1);border-bottom: 2px solid rgba(231,236,237,1);padding-left: 56px;padding-right: 20px;overflow: hidden}
    .contract_select-plane ul li span:nth-child(1) {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height: 90px;color:rgba(71,71,71,1);}
    .contract_select-plane ul li.active span:nth-child(1) {color:rgba(5,173,142,1);}
    .contract_select-plane ul li span:nth-child(2) {font-size:20px;font-family:Arial;font-weight:400;line-height:98px;float: right}
    .contract_select-plane ul li span:nth-child(2) em {transform-origin:right;}
    .color_red {color:rgba(216,73,98,1);}
    .color_green {color:rgba(5,173,142,1);}
</style>