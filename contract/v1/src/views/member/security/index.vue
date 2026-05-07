<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">安全中心</div>
        </sub-header>
        <div class="main">
            <div class="main-tips">多重验证，以下两种方式需要至少开启一种</div>
            <div class="handle-list" v-for="(item, index) in handles" :key="index">
                <van-cell is-link v-for="(item2, index2) in item" :key="index2" @click="handleClick(item2.click)">
                    <template #title>
                        <span class="handle-txt">{{item2.text}}</span>
                    </template>
                    <template #default>
                        <div class="handle-value">
                            <span style="float: left"><em class="fut-s">{{item2.value}}</em></span>
                            <template v-if="item2.value !== '未绑定' && item2.type===0">
                                <i class="iconfont " :class="item2.show?'icon-1':'icon-kaiguan'" @click="changeShow(item2)"></i>
                            </template>
                        </div>
                    </template>
                    <template #right-icon>
                        <i class="iconfont icon-arrow-right-copy-copy-copy-copy"></i>
                    </template>
                </van-cell>
            </div>
        </div>

        <template v-if="childPanel.bindEmail.load">
            <van-popup v-model="childPanel.bindEmail.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <bind-email v-on:close="closeChildPanel"/>
            </van-popup>
        </template>
        <template v-if="childPanel.bindMobilePhone.load">
            <van-popup v-model="childPanel.bindMobilePhone.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <bind-mobile-phone v-on:close="closeChildPanel"/>
            </van-popup>
        </template>
    </div>
</template>

<script>
    import BackBtn from '../../../components/back_btn';
    import SubHeader from "../../../components/sub_header/index";

    import Vue from 'vue';
    import { Cell, Toast } from 'vant';
    import "vant/lib/cell/style";
    import "vant/lib/toast/style";
    Vue.use(Cell);
    Vue.use(Toast);
    import {mapState, mapActions, mapGetters} from 'vuex';

    import BindEmail from "./bind/email";
    import bindMobilePhone from "./bind/mobile";
    export default {
        name: "security",
        components: {SubHeader, BackBtn, BindEmail, bindMobilePhone},
        data() {
            return {
                childPanel: {
                    bindEmail: {load: false, show:false},
                    bindMobilePhone: {load: false, show:false},
                },
                handles: [
                    [
                        {text: "邮箱验证", value:"未绑定", v1:"", v2:"", type: 0, show:false, click: {use:true, jump:()=>{this.openChildPanel("bindEmail")}}},
                        {text: "手机验证", value:"未绑定", v1:"", v2:"", type: 0, show:false, click: {use:true, jump:()=>{this.openChildPanel("bindMobilePhone")}}}
                    ],
                    [
                        {text: "登录密码", value:"修改", type: 1, click: {use:false, jump:()=>{}}},
                        {text: "资金密码", value:"未设置", type: 1, click: {use:false, jump:()=>{}}}
                    ]
                ]
            }
        },
        computed: {
            ...mapState({
                user: state=>state.user
            }),
        },

        created() {
            // this.handles[0][0].value = this.user.email?this.user.email.replaceAll("(\\w?)(\\w+)(\\w)(@\\w+\\.[a-z]+(\\.[a-z]+)?)", "$1******$3$4"):"未绑定";
            if (this.user.email) {
                this.handles[0][0].value = this.user.email.replaceAll("(\\w?)(\\w+)(\\w)(@\\w+\\.[a-z]+(\\.[a-z]+)?)", "$1******$3$4");
                this.handles[0][0].v1 = this.user.email;
                this.handles[0][0].v2 = this.user.email.replaceAll("(\\w?)(\\w+)(\\w)(@\\w+\\.[a-z]+(\\.[a-z]+)?)", "$1******$3$4");
                this.handles[0][0].click.use = false;
            }

            if (this.user.mobilePhone) {
                this.handles[0][1].value = this.user.mobilePhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                this.handles[0][1].v1 = this.user.mobilePhone;
                this.handles[0][1].v2 = this.user.mobilePhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                this.handles[0][1].click.use = false;
            }
            // this.handles[0][1].value = this.user.mobilePhone?this.user.mobilePhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'):"未绑定";
            this.handles[1][1].value = this.user.setTransactionPassword===1?"":"未设置";
        },
        methods: {
            onClose: function() {
                this.$emit("close", "security");
            },
            handleClick:function (item) {
                if (item.use) {
                    if (typeof item.jump === "function") {
                        item.jump();
                    }
                }
            },
            changeShow: function (item) {
                item.show = !item.show;
                if (item.show) {
                    item.value = item.v1;
                } else {
                    item.value = item.v2;
                }
            },
            openChildPanel: function(panel) {
                // console.log(panel);
                this.childPanel[panel].load = true;
                setTimeout(()=>{this.childPanel[panel].show=true}, 50);
            },
            closeChildPanel: function(panel) {
                this.childPanel[panel].show = false;
                setTimeout(()=>{this.childPanel[panel].load = false;}, 80);
            }
        }
    }
</script>

<style scoped>
    .box {width: 750px;margin: auto}

    .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i, .refresh-btn i  {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}

    .main {margin: 80px auto 0;background-color: rgba(247,247,250,1);}
    .main .main-tips {width: 750px;height:44px;background:rgba(226,226,226,1);line-height: 44px;font-size:20px;font-family:PingFang SC;font-weight:400;color:rgba(71,71,71,1);text-indent: 40px;}

    .main .handle-list {overflow: hidden;margin-bottom: 24px;}
    .main .handle-list .van-cell {height: 100px;padding: 0 40px;margin: 0;}
    .main .handle-list .van-cell .van-cell__title {flex:0.3}
    .main .handle-list .van-icon {line-height: 100px;color: rgba(231,236,237,1);}
    .main .handle-list .van-cell:not(:last-child)::after {left: 0;border-bottom: 2px solid  rgba(231,236,237,1);transform:none;}
    .main .handle-list:last-child {margin-bottom: 0;border-bottom: 2px solid  rgba(231,236,237,1);}
    .main .handle-list .handle-txt {display: inline-block;line-height: 100px;font-size:28px;font-family:Microsoft YaHei;font-weight:400;color:rgba(27,65,91,1);}
    .main .handle-list .handle-value {display: inline-block;font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height: 94px;color:rgba(27,65,91,1);margin-right: 16px;}
    .main .handle-list .iconfont {font-size: 38px;line-height: 100px;color:rgba(231,236,237,1);}
    .main .handle-list .handle-value .iconfont {line-height: 105px;font-size: 46px;float: left;margin-left: 12px;}
    .main .handle-list .handle-value .iconfont.icon-1 {color: rgba(5,173,142,1)}
    .main .handle-list .handle-value .iconfont.icon-kaiguan {color: rgb(171, 174, 176)}


</style>