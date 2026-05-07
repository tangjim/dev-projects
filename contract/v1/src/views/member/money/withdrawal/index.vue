<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">提币</div>
            <div class="header-right" slot="header-right" @click="openChildPanel('withdrawalRecord')"><i class="iconfont icon-wenjian1-copy"></i></div>
        </sub-header>
        <div class="main">
            <h3 class="title">提币</h3>
            <div class="plane1">
                <p>{{formData.productCode}}</p><p><span class="fut-s">选择币种</span></p>
            </div>

            <div class="form-plane">
                <p class="label">提币地址</p>
                <div class="form-input-group">
                    <input type="text" v-model="formData.withdrawalAddress" placeholder="输入或长按粘贴地址"/>
                    <div class="handle address"><i class="iconfont icon-dizhi_huaban-copy"></i></div>
                </div>
            </div>

            <div class="form-plane m52">
                <p class="label">数量</p>
                <div class="form-input-group">
                    <input type="text" v-model="txtAmount" placeholder="最小提币数量2"/>
                    <div class="handle amount"><span class="s1">{{formData.productCode}}</span><span class="cut">|</span><span class="b1" @click="allInCoinNumber">全部</span></div>
                </div>
            </div>

            <div class="plane3">
                <p>可用{{user.useable.toFixed(6)}}&nbsp;&nbsp;<i class="iconfont icon-yiwen-copy"></i></p><p>手续费 1 USDT</p>
            </div>

            <div class="tips">
                <h3>温馨提示</h3>
                <p><span class="fut-s">1、最小提币数量为：2USDT，最大提币金额不得超过您账户的可用数量。</span></p>
                <p><span class="fut-s">2、为保障资金安全，当您帐户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员联系。请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</span></p>
            </div>
        </div>

        <template v-if="childPanel.withdrawalRecord.load">
            <van-popup v-model="childPanel.withdrawalRecord.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <record v-on:close="closeChildPanel"/>
            </van-popup>
        </template>
    </div>
</template>

<script>
    import BackBtn from '../../../../components/back_btn';
    import SubHeader from "../../../../components/sub_header";

    import Vue from 'vue';

    import { Toast, Popup } from 'vant';
    import "vant/lib/toast/style";
    import "vant/lib/popup/style";
    Vue.use(Toast);
    Vue.use(Popup);

    import Record from "./record";
    export default {
        name: "withdrawal",
        components: {SubHeader, BackBtn, Record},
        data() {
            return {
                formData: {withdrawalAddress: "", amount:0, productCode:"USDT"},
                txtAmount:"",
                user: {useable: 199.749},
                childPanel: {
                    withdrawalRecord: {load: false, show:false}
                },
            }
        },
        created() {},
        methods: {
            onClose: function() {
                this.$emit("close", "withdrawal");
            },
            allInCoinNumber: function () {
                this.txtAmount = this.user.useable;
                this.formData.amount = this.user.useable;
            },
            openChildPanel: function(panel) {
                this.childPanel[panel].load = true;
                setTimeout(()=>{this.childPanel[panel].show=true}, 50);
            },
            closeChildPanel: function(panel) {
                this.childPanel[panel].show = false;
                setTimeout(()=>{this.childPanel[panel].load = false;}, 80);
            },
        }
    }
</script>

<style scoped>
    .box {width: 750px;margin: auto}

    .header-right, .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i, .header-right i  {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-right i  {font-size: 44px;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}

    .main {margin: 80px auto 0;background-color: rgba(255,255,255,1);overflow: hidden;width: 670px;}
    .main .title {font-size:40px;font-family:Microsoft YaHei;font-weight:400;line-height:52px;color:rgba(27,65,91,1);margin: 24px 0 20px 0}
    .main .plane1 {height: 90px;background:rgba(247,247,250,1);border-radius:6px;margin-bottom: 24px;padding: 0 28px;}
    .main .plane1 p:nth-child(1) {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:90px;color:rgba(27,65,91,1);float: left}
    .main .plane1 p:nth-child(2) {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:90px;color:rgba(27,65,91,1);float: right}
    .main .form-plane {margin-top: 60px;}
    .main .form-plane.m52 {margin-top: 52px;}
    .main .form-plane .label {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(27,65,91,1);margin-bottom: 20px;}


    .main .form-plane .form-input-group {height: 86px;border: 2px solid rgba(231,236,237,1);overflow: hidden;display: inline-table;width: 666px;}
    .main .form-plane .form-input-group input {display: table-cell;height: 86px;padding: 0;margin: 0;line-height: 86px;width: 100%;text-indent: 20px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;color: rgb(84, 94, 99);float: left}
    .main .form-plane .form-input-group .handle {display: table-cell;overflow: hidden;vertical-align: middle;width: 1px;white-space: nowrap}


    /*.main .form-plane .form-input-group {height: 86px;border: 2px solid rgba(231,236,237,1);overflow: hidden;display: table;width: 666px;}*/
    /*.main .form-plane .form-input-group input {display: table-cell;height: 86px;padding: 0;margin: 0;line-height: 86px;width: 100%;text-indent: 20px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;color: rgb(84, 94, 99);}*/
    /*.main .form-plane .form-input-group .handle {display: table-cell;overflow: hidden;vertical-align: middle;width: 245px;}*/


    /*.main .form-plane .form-input-group .handle.address {width: 50px;}*/
    /*.main .form-plane .form-input-group .handle.address .b1 {background: transparent;margin: 0 30px;padding: 0;}*/
    .main .form-plane .form-input-group .handle i {font-size:40px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(27,65,91,1);padding: 0 28px}

    /*.main .form-plane .form-input-group .handle.amount {width: 245px;}*/
    /*.main .form-plane .form-input-group .handle.amount .s1 {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(139,160,174,1);margin-right: 28px;margin-left:10px;}*/
    /*.main .form-plane .form-input-group .handle.amount .b1 {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(27,65,91,1);height: 86px;padding: 0 28px;background: transparent}*/
    /*.main .form-plane .form-input-group .handle.amount .cut {width:8px;height:42px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(231,236,237,1);}*/

    .main .form-plane .form-input-group .handle span {height: 82px;}
    .main .form-plane .form-input-group .handle span.s1 {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(139,160,174,1);margin-right: 28px;margin-left:10px;}
    .main .form-plane .form-input-group .handle span.b1 {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(27,65,91,1);height: 86px;margin: 0 28px;background: transparent}
    .main .form-plane .form-input-group .handle span.cut {width:8px;height:42px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(231,236,237,1);}

    .main .plane3 {margin-top: 14px;overflow: hidden;}
    .main .plane3 p {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(197,208,213,1);}
    .main .plane3 p:nth-child(1) {float: left;}
    .main .plane3 p:nth-child(2) {float: right;}


    .main .tips {width: 622px;background:rgba(247,247,250,1);border-radius:6px;margin-top: 60px;padding: 24px}
    .main .tips h3 {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(27,65,91,1);margin-bottom: 20px;}
    .main .tips p {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:34px;color:rgba(140,161,169,1);margin-bottom: 10px;text-align:justify;}


    input::-webkit-input-placeholder {
        font-size:32px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:86px;
        color:rgba(197,208,213,1);
    }
    input:-moz-placeholder {
        font-size:32px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:86px;
        color:rgba(197,208,213,1);
    }
    input:-ms-input-placeholder {
        font-size:32px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:86px;
        color:rgba(197,208,213,1);
        background: transparent;
        border: 0;
    }

</style>