<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">身份认证</div>
        </sub-header>
        <div class="main">
            <div class="plane1">
                <h3>个人身份认证</h3>
                <div class="id-info" v-if="idCard.idCard && idCard.realName">
                    <span>{{idCard.realName}}</span>
                    <span><em class="fut-s">{{idCard.idCard.replace(/^(.{3})(?:\d+)(.{3})$/,"$1****************$2")}}</em></span>
                </div>
                <div class="no-auth" v-else><i class="iconfont icon-icoguanyuwomen-copy"></i><span>未认证</span></div>
            </div>
            <div class="cut"></div>
            <div class="plane2">
                <div class="t">
                    <h3>初级认证</h3>
                    <div v-if="idCard.idCard && idCard.realName" class="auth-success">
                        <i class="iconfont icon-zhengque"></i><span>已认证</span>
                    </div>
                    <div class="handle" v-else @click="openChildPanel('primaryAuth')">
                        <i class="iconfont icon-icoguanyuwomen-copy"></i><span>未认证</span><i class="iconfont icon-arrow-right-copy-copy-copy-copy-copy"></i>
                    </div>
                </div>
                <p class="tips tips1"><i class="iconfont icon-zhengque"></i><span>可获得OTC交易、抵押贷款权限</span></p>
                <p class="tips tips2"><i class="iconfont icon-zhengque"></i><span>提现24小时限额3BTC、1次</span></p>
            </div>
            <div class="cut"></div>
            <div class="plane2">
                <div class="t">
                    <h3>高级认证</h3>
                    <template v-if="!idCard.idCard || !idCard.realName">
                        <div class="handle2"><span class="fut-s">请先完成初级认证</span></div>
                    </template>
                    <template v-else>
                        <div class="handle">
                            <i class="iconfont icon-icoguanyuwomen-copy"></i><span>未认证</span><i class="iconfont icon-arrow-right-copy-copy-copy-copy-copy"></i>
                        </div>
                    </template>
                </div>
                <p class="tips tips1"><i class="iconfont icon-zhengque"></i><span>可获得OTC交易“发布广告”权限</span></p>
                <p class="tips tips2"><i class="iconfont icon-zhengque"></i><span>提现24小时限额100BTC、5次</span></p>
            </div>
            <div class="cut"></div>
        </div>

        <template v-if="childPanel.primaryAuth.load">
            <van-popup v-model="childPanel.primaryAuth.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <primary-auth v-on:close="closeChildPanel"/>
            </van-popup>
        </template>
    </div>
</template>

<script>
    import BackBtn from '../../../components/back_btn';
    import SubHeader from "../../../components/sub_header/index";

    import Vue from 'vue';

    import { Popup } from 'vant';
    import "vant/lib/popup/style";
    Vue.use(Popup);

    import PrimaryAuth from "./primaryAuth";

    import {mapState, mapActions, mapMutations} from 'vuex';
    export default {
        name: "authentication",
        components: {SubHeader, BackBtn, PrimaryAuth},
        data() {
            return {
                childPanel: {
                    primaryAuth: {load: false, show:false}
                }
            }
        },
        computed: {
            ...mapState({
                idCard: state=>state.idCard
            }),
        },
        created() {
            this.getIdCard();
        },
        methods: {
            ...mapActions({
                getIdCard: 'idCard/get'
            }),
            onClose: function() {
                this.$emit("close", "authentication");
            },
            openChildPanel: function(panel) {
                this.childPanel[panel].load = true;
                setTimeout(()=>{this.childPanel[panel].show=true}, 50);
            },
            closeChildPanel: function(panel) {
                this.childPanel[panel].show = false;
                setTimeout(()=>{this.childPanel[panel].load = false;this.getIdCard();}, 80);
            },
        }
    }
</script>

<style scoped>
    .box {width: 750px;margin: auto}

    .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}

    .main {margin: 80px auto 0;background-color: rgb(255, 255, 255);height: calc(100vh - 80px);width: 750px;}
    .main .plane1 {height: 180px;padding: 0 40px;overflow: hidden}
    .main .plane1 h3 {font-size:40px;font-family:Microsoft YaHei;font-weight:400;line-height:52px;color:rgba(27,65,91,1);margin: 26px 0 36px;}
    .main .plane1 .id-info span {display: inline-block;float: left;font-family:Microsoft YaHei;font-weight:400;color:rgba(27,65,91,1);}
    .main .plane1 .id-info span:nth-child(1) {font-size:24px;line-height:32px;}
    .main .plane1 .id-info span:nth-child(2) {font-size:20px;line-height:28px;margin: 4px 0 0 80px;}
    .main .plane1 .no-auth {font-family:Microsoft YaHei;font-weight:400;font-size:24px;line-height:32px;color:rgba(216,30,6,1);}
    .main .plane1 .no-auth i {display: inline-block;}
    .main .plane1 .no-auth span {display: inline-block;margin-left: 5px;}
    .main .plane2 {height: 244px;padding: 0 40px;overflow: hidden}
    .main .plane2 .t {overflow: hidden;margin-top: 30px;}
    .main .plane2 .t h3 {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(27,65,91,1);margin: 0;float: left}
    .main .plane2 .t .handle {float: right;margin-right: 2px;font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color:rgba(216,30,6,1);margin-top: 8px;}
    .main .plane2 .t .handle span {display: inline-block;margin: 0 12px;}
    .main .plane2 .t .handle2 {float: right;margin-right: 2px;font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color:rgba(27,65,91,1);margin-top: 8px;}

    .main .plane2 .t .auth-success {float: right;margin-right: 2px;font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color: rgba(76,185,113,1);margin-top: 8px;}
    .main .plane2 .t .auth-success span {display: inline-block;margin: 0 12px;}

    .main .plane2 .tips {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(197,208,213,1);}
    .main .plane2 .tips span {display: inline-block;margin-left: 16px;}
    .main .plane2 .tips1 {margin-bottom: 16px;margin-top: 60px;}

    .cut {width: 750px;height: 24px;background:rgba(247,247,250,1);}
</style>