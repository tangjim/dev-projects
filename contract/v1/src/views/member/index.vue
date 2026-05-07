<template>
    <div>
        <sub-header>
            <back-btn class="back-btn" slot="header-left"><i class="iconfont icon-jiantou1"></i></back-btn>
            <div class="header-title" slot="header-middle">{{$route.meta.title}}</div>
        </sub-header>

        <div class="main-box">
            <div class="main-top">
                <div class="main-info">
                    <i class="iconfont icon-yonghu1"></i>
                    <div class="user-info">
                        <p class="mobile">
                            <template v-if="user.mobilePhone">{{user.mobilePhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</template>
                            <template v-else-if="user.email">{{user.email.replaceAll("(\\w?)(\\w+)(\\w)(@\\w+\\.[a-z]+(\\.[a-z]+)?)", "$1******$3$4")}}</template>
                        </p>
                        <div class="user-d-info">
                            <span class="uid">UID : {{user.inviteCode}}<i class="iconfont icon-fuzhi-copy" v-clipboard:copy="user.inviteCode" v-clipboard:success="cpSuccess" v-clipboard:error="cpError"></i></span>
                            <span class="identity" @click="openChildPanel('authentication')"><i class="iconfont icon-credentials_icon"></i>身份认证<i class="iconfont icon-arrow-right-copy-copy-copy"></i></span>
                        </div>
                    </div>
                </div>
                <div class="main-handle">
                    <div class="handle-item" @click="openChildPanel('recharge')">
                        <div class="handle-btn"><i class="iconfont icon-tixianjilu-copy"></i><span>充币</span></div>
                    </div>
                    <div class="cut"></div>
                    <div class="handle-item" @click="openChildPanel('withdrawal')">
                        <div class="handle-btn"><i class="iconfont icon-tixian-copy"></i><span>提币</span></div>
                    </div>
                    <div class="cut"></div>
                    <div class="handle-item" @click="openChildPanel('transfer')">
                        <div class="handle-btn"><i class="iconfont icon-zhuanhuan-copy"></i><span>资金划转</span></div>
                    </div>
                </div>
            </div>
            <div class="nav-handle">
                <van-grid clickable :border="false" :column-num="3">
                    <van-grid-item v-for="(item, index) in navHandle" :key="index" @click="handleClick(item.click)">
                        <i class="iconfont" :class="item.icon"></i>
                        <p class="txt">{{item.text}}</p>
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="cut-24"></div>
            <div class="handle-plane">
                <div class="handle-list" v-for="(item, index) in handles" :key="index">
                    <van-cell v-waves v-for="(item2, index2) in item" :key="index2" @click="handleClick(item2.click)">
                        <template #title>
                            <svg class="icon" aria-hidden="true"><use :xlink:href="item2.icon"></use></svg>
                            <span class="handle-txt">{{item2.text}}</span>
                        </template>
                        <template #right-icon>
                            <i class="iconfont icon-arrow-right-copy-copy-copy-copy"></i>
                        </template>
                    </van-cell>
                </div>
                <div class="handle-exit">
                    <div class="exit-btn" @click="onLogout">
                        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-tuichu1"></use></svg>
                        <span class="txt">退出当前账户</span>
                    </div>
                </div>
            </div>
        </div>

        <template v-if="childPanel.security.load">
            <van-popup v-model="childPanel.security.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <security v-on:close="closeChildPanel"/>
            </van-popup>
        </template>

        <template v-if="childPanel.download.load">
            <van-popup v-model="childPanel.download.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <download v-on:close="closeChildPanel"/>
            </van-popup>
        </template>

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

        <template v-if="childPanel.address.load">
            <van-popup v-model="childPanel.address.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <my-address v-on:close="closeChildPanel"/>
            </van-popup>
        </template>

        <template v-if="childPanel.authentication.load">
            <van-popup v-model="childPanel.authentication.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <authentication v-on:close="closeChildPanel"/>
            </van-popup>
        </template>

        <template v-if="childPanel.invitation.load">
            <van-popup v-model="childPanel.invitation.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <invitation v-on:close="closeChildPanel"/>
            </van-popup>
        </template>

    </div>
</template>

<script>
    import BackBtn from '../../components/back_btn';
    import SubHeader from "../../components/sub_header";

    import Vue from 'vue';

    import { Grid, GridItem, Cell, Toast, Popup } from 'vant';
    import "vant/lib/grid/style";
    import "vant/lib/grid-item/style";
    import "vant/lib/cell/style";
    import "vant/lib/toast/style";
    import "vant/lib/popup/style";
    Vue.use(Grid);
    Vue.use(GridItem);
    Vue.use(Cell);
    Vue.use(Toast);
    Vue.use(Popup);

    import Security from "./security";
    import Download from "./download";
    import Recharge from "./money/recharge";
    import Withdrawal from "./money/withdrawal";
    import MyAddress from "./address";
    import Authentication from "./authentication";
    import Transfer from "./money/transfer";
    import Invitation from "./invitation";

    import {mapState, mapActions, mapGetters} from 'vuex';
    export default {
        name: "member-index",
        components: {SubHeader, BackBtn, Security, Download, Recharge, Withdrawal, MyAddress, Authentication, Transfer, Invitation},
        data() {
            return {
                isShow: true,
                checked: true,
                childPanel: {
                    security: {load: false, show:false},
                    download: {load: false, show:false},
                    recharge: {load: false, show:false},
                    withdrawal: {load: false, show:false},
                    address: {load: false, show:false},
                    authentication: {load:false, show:false},
                    transfer: {load:false, show:false},
                    invitation: {load:false, show:false},
                },
                // this.cashPanel.load = true;setTimeout(()=>{this.cashPanel.show=true}, 50);
                navHandle: [
                    {text: "邀请奖励", icon:"icon-lipin", click: {use:true, jump:()=>{this.openChildPanel("invitation")}}},
                    {text: "安全中心", icon:"icon-anquan1", click: {use:true, jump:()=>{this.openChildPanel("security")}}},
                    {text: "身份认证", icon:"icon-credentials_icon-copy", click: {use:true, jump:()=>{this.openChildPanel("authentication")}}}
                ],
                handles: [
                    [
                        {text: "地址管理", icon:"#icon-dizhi_huaban",  click: {use:true, jump:()=>{this.openChildPanel("address")}}},
                        {text: "消息中心", icon:"#icon-xinwengonggao", click: {use:false, jump:()=>{}}}
                    ],
                    [
                        {text: "推荐下载", icon:"#icon-lipin-copy", click: {use:true, jump:()=>{this.openChildPanel("download")}}},
                        {text: "联系客服", icon:"#icon-kefu", click: {use:false, jump:()=>{}}}
                    ],
                    [
                        {text: "账户设置", icon:"#icon-zhanghushezhi", click: {use:true, jump:()=>{this.openChildPanel("security")}}},
                        {text: "帮助中心", icon:"#icon-bangzhu", click: {use:false, jump:()=>{}}},
                        {text: "关于我们", icon:"#icon-icoguanyuwomen", click: {use:false, jump:()=>{}}}
                    ]
                ]
            }
        },
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        created() {},
        methods: {
            ...mapActions({
                logout: "user/logout"
            }),
            handleClick:function (item) {
                if (item.use) {
                    if (typeof item.jump === "function") {
                        item.jump();
                    }
                }
            },
            cpSuccess: function (e) {
                Toast("已复制");
            },
            cpError: function (e) {
                Toast("复制失败");
            },
            openChildPanel: function(panel) {
                // console.log(panel);
                this.childPanel[panel].load = true;
                setTimeout(()=>{this.childPanel[panel].show=true}, 50);
            },
            closeChildPanel: function(panel) {
                this.childPanel[panel].show = false;
                setTimeout(()=>{this.childPanel[panel].load = false;}, 80);
            },
            onLogout: function () {
                let data = {
                    success: (res) => {
                        if (res.code === 1000) {
                            this.$router.push("/authorize");
                        }
                    }
                };
                this.logout(data);
            }
        }
    }
</script>

<style scoped>
    .refresh-btn, .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i, .refresh-btn i  {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}

    .main-box {margin-top: 80px;background-color: rgba(247,247,250,1);}
    .main-box .main-top {width: 750px;height: 234px;background: url("../../assets/img/bg002.png");background-size: 100%;overflow: hidden;position: relative;}
    .main-top .main-info {margin-left: 36px;margin-top: 26px;overflow: hidden;height: 92px;}
    .main-top .main-info i.icon-yonghu1 {color:#ffffff;font-size: 92px;float: left}
    .main-top .main-info .user-info {float: left;margin-left: 20px;}
    .main-top .main-info .user-info .mobile {font-size:36px;font-family:Microsoft YaHei;font-weight:400;line-height:48px;color:rgba(255,255,255,1);}
    .main-top .main-info .user-info .user-d-info {margin-top: 6px;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(255,255,255,1);opacity: 0.7;}
    .main-top .main-info .user-info .user-d-info .uid i{margin-left: 10px;line-height:38px;font-size:28px;}

    .main-top .main-info .user-info .user-d-info .identity {margin-left: 74px;}
    .main-top .main-info .user-info .user-d-info .identity i.icon-credentials_icon {font-size:32px;line-height:46px;margin-right: 12px;}
    .main-top .main-info .user-info .user-d-info .identity i.icon-arrow-right-copy-copy-copy {margin-left: 8px;}

    .main-top .main-handle {position: absolute;bottom: 0;height: 92px;width: 750px;display: flex}
    .main-top .main-handle .handle-item {display: table-cell;width: 100%;line-height: 92px;font-size:28px;font-family:Microsoft YaHei;font-weight:400;color:rgba(255,255,255,1);position: relative}
    .main-top .main-handle .handle-item  .handle-btn {position: absolute;top: 50%;left: 50%;transform:translate(-50%,-50%);white-space:nowrap}
    .main-top .main-handle .handle-item i {font-size: 32px;line-height: 92px;float: left;margin-right: 12px;}
    .main-top .main-handle .cut {display: table-cell;width: 8px;height:20px;background-color: rgba(255,255,255,1);opacity:0.5;margin-top: 40px;}

    .nav-handle .iconfont {font-size: 52px;color:rgba(5,173,142,1);}
    .nav-handle .txt {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(27,65,91,1);margin-top: 6px;}

    .cut-24 {width: 750px;height: 24px;background:rgba(247,247,250,1);}

    .handle-plane {height: 52vh;overflow-y: auto;}
    .handle-plane .handle-list {overflow: hidden;margin-bottom: 24px;}
    .handle-plane .handle-list:last-child {margin-bottom: 0}
    .handle-plane .handle-list .icon {width: 40px; height: 40px;fill:currentColor;overflow:hidden;float: left;margin-top: 22px;}
    .handle-plane .handle-list .handle-txt {display: inline-block;line-height: 80px;margin-left: 20px;font-size:24px;font-family:Microsoft YaHei;font-weight:400;color:rgba(27,65,91,1);}
    .handle-plane .handle-list .van-cell {height: 80px;padding: 0 40px 0 42px;margin: 0;}
    .handle-plane .handle-list .van-icon {line-height: 80px;color: rgba(231,236,237,1);}
    .handle-plane .handle-list .van-cell:not(:last-child)::after {left: 0;border-bottom: 2px solid rgba(231,236,237,1);transform:none;}
    .handle-plane .handle-list .iconfont {font-size: 38px;line-height: 80px;color:rgba(231,236,237,1);}

    .handle-plane .handle-exit {width: 750px;height: 120px;overflow: hidden;position: relative}
    .handle-plane .handle-exit .exit-btn {overflow: hidden;position: absolute;left: 50%;transform:translate(-50%,0);margin-top: 28px;}
    .handle-plane .handle-exit .exit-btn .icon {width: 44px; height: 44px;fill:currentColor;overflow:hidden;float: left;}
    .handle-plane .handle-exit .exit-btn .txt {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(27,65,91,1);display: inline-block;margin-left: 18px;}
</style>