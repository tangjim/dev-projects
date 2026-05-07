<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">资金划转</div>
            <div class="header-right" slot="header-right" @click="openChildPanel('record')"><i class="iconfont icon-wenjian1-copy"></i></div>
        </sub-header>
        <div class="main">
            <h3 class="title">资产划转</h3>
            <div class="form-plane form-plane_group">
                <div class="form-plane_group_label">
                    <p class="txt">从</p>
                    <p class="txt">到</p>
                </div>
                <div class="form-plane_group_input">
                    <div class="group_input_cut"></div>
                    <div class="form-input-group" @click="openSelectAccountPanel(index)" :class="item.location==='sourceAccount'?'top':'bottom'" v-for="(item, index) in tempAccountArr" :key="index">
                        <div v-waves class="form-input-waves-btn">
                            <input type="button" :value="getAccountName(item.id)" class="form-input" readonly /><div class="handle"><i class="iconfont icon-arrow-right-copy-copy-copy-copy"></i></div>
                        </div>
                    </div>
                    <!--<div class="form-input-group" :class="exchange2"><input type="text" :value="getAccountName(formData.targetAccount)" class="form-input" readonly /><div class="handle"><i class="iconfont icon-arrow-right-copy-copy-copy-copy"></i></div></div>-->
                </div>
                <button class="form-plane_button" @click="exchange"><i class="iconfont icon-zhuanhuan1"></i></button>
            </div>

            <div class="form-plane">
                <p class="label">币种</p>
                <div class="form-input-group" v-waves>
                    <input type="button" :value="getCoinByCode(formData.coinCode).coinShowName" placeholder="请选择币种" readonly/>
                    <div class="handle"><i class="iconfont icon-arrow-right-copy-copy-copy-copy"></i></div>
                </div>
            </div>

            <div class="form-plane m52">
                <p class="label">划转数量</p>
                <div class="form-input-group">
                    <input type="text" v-model="txtAmount" placeholder="请输入划转数量"/>
                    <div class="handle"><span class="s1">{{getCoinByCode(formData.coinCode).coinShowName}}</span><span class="cut">|</span><span class="b1" @click="allInCoinNumber">全部</span></div>
                </div>
            </div>

            <div class="plane3">
                <p>可用{{getCoinByCode(formData.coinCode).coinUseable.toFixed(6)}}</p>
            </div>

            <div class="tips">
                <h3>温馨提示</h3>
                <p><span class="fut-s">只有将资产划转到对应账户才可进行交易。账户间的划转不收取手续费。</span></p>
            </div>
        </div>

        <template v-if="childPanel.selectAccount.load">
            <van-popup v-model="childPanel.selectAccount.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }" :close-on-popstate="true">
                <select-account-list :list="account" :selected="childPanel.selectAccount.selected" v-on:selected="selectedAccount" v-on:close="closeChildPanel"/>
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

    import {mapState, mapActions} from 'vuex';
    import SelectAccountList from "../../../../components/select_list/account/index";
    export default {
        name: "transfer",
        components: {SubHeader, BackBtn, SelectAccountList},
        data() {
            return {
                formData: {coinCode: "USDT", amount:0, sourceAccount:0, targetAccount:0},
                txtAmount:"",
                // user: {useable: 199.749},
                // account: [{id:1,txt:"法币账户"},{id:2,txt:"币币账户"},{id:3,txt:"合约账户"}],
                account: [{id:1,txt:"法币账户"},{id:3,txt:"合约账户"}],
                tempAccountArr: [{id:1, location:"sourceAccount"},{id:3, location:"targetAccount"}],
                childPanel: {
                    record: {load: false, show:false},
                    selectAccount: {load: false, show:false, selected:0}
                },
            }
        },
        computed: {
            ...mapState({
                asset: state=>state.asset
            }),
            getAccountName() {
                return function (id) {
                    return this.account.filter((item)=>{ return item.id === id; })[0].txt;
                };
            },
            getCoinByCode() {
                return function (coinCode, accountId) {
                    let coin = this.asset.coinDetails.filter((item)=>{ return item.coinCode === coinCode; });
                    if (coin.length > 0) {
                        return this.asset.coinDetails.filter((item)=>{ return item.coinCode === coinCode; })[0];
                    } else {
                        return {coinUseable:0, coinShowName:""};
                    }
                };
            }
        },
        created() {
            let data = {
                success: (res) => {
                    this.formData.coinCode = this.asset.coinDetails[0].coinCode;
                }
            };
            this.getAsset(data);
        },
        methods: {
            ...mapActions({
                getAsset: 'asset/get'
            }),
            onClose: function() {
                this.$emit("close", "transfer");
            },
            allInCoinNumber: function () {
                this.txtAmount = this.user.useable;
                this.formData.amount = this.user.useable;
            },
            openSelectAccountPanel(index) {
                this.childPanel.selectAccount.selected = this.tempAccountArr[index].id;
                this.openChildPanel("selectAccount");
            },
            openChildPanel: function(panel) {
                this.childPanel[panel].load = true;
                setTimeout(()=>{this.childPanel[panel].show=true}, 50);
            },
            closeChildPanel: function(panel) {
                this.childPanel[panel].show = false;
                setTimeout(()=>{this.childPanel[panel].load = false;}, 80);
            },
            selectedAccount: function(item) {
                this.closeChildPanel("selectAccount");
            },
            exchange: function () {
                [this.tempAccountArr[0].location, this.tempAccountArr[1].location] = [this.tempAccountArr[1].location, this.tempAccountArr[0].location]
            }
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

    .main .form-plane {margin-top: 60px;overflow: hidden;}
    .main .form-plane.m52 {margin-top: 52px;}

    .main .form-plane .label {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(27,65,91,1);margin-bottom: 20px;}

    .main .form-plane_group {margin-top: 0;border: 2px solid rgba(231,236,237,1);border-radius: 6px;}
    .main .form-plane_group .form-plane_group_label {float: left;width: 70px;}
    .main .form-plane_group .form-plane_group_label .txt {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:84px;color:rgba(197,208,213,1);vertical-align: middle;padding: 0 22px;}
    .main .form-plane_group .form-plane_group_label .txt:nth-child(1) {border-bottom: 2px solid rgba(231,236,237,1)}
    .main .form-plane_group .form-plane_group_input {position: relative;float: left;width: 430px;overflow: hidden;height: 170px;}
    .main .form-plane_group .form-plane_group_input .form-input-group {border: 0;width: 100%;float:left;position: absolute;transition: .5s;left:0;top:0;}
    .main .form-plane_group .form-plane_group_input .form-input-group.top {left:0;top:0;transition: .5s;}
    .main .form-plane_group .form-plane_group_input .form-input-group.bottom {left:0;top: 86px;transition: .5s;}
    .main .form-plane_group .form-plane_group_input .group_input_cut {height: 2px;width:100%;background: rgba(231,236,237,1);position: absolute;top: 84px;left: 0;}
    /*.main .form-plane_group .form-plane_group_input .form-input-group:nth-child(1) {border-bottom: 2px solid rgba(231,236,237,1);}*/

    .main .form-plane_group .form-plane_button {float:left;width:166px;height:170px;padding: 0;margin: 0;background:rgba(247,247,250,1);border-left: 2px solid rgba(231,236,237,1);}
    .main .form-plane_group .form-plane_button:active{background: rgb(234, 234, 237);}
    .main .form-plane_group .form-plane_button i {font-size: 86px;color:rgba(5,173,142,1);}

    .main .form-plane .form-input-group {height: 84px;border: 2px solid rgba(231,236,237,1);overflow: hidden;display: inline-table;width: calc(100% - 4px);}
    .main .form-plane .form-input-group > * {display: table-cell;}

    .main .form-plane .form-input-group .form-input-waves-btn {display:inline-table;width: 100%;height: 84px;}
    .main .form-plane .form-input-group .form-input-waves-btn > * {display: table-cell;}

    .main .form-plane .form-input-group input {height: 84px;padding: 0;margin: 0;line-height: 84px;width: 100%;text-indent: 20px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;color: rgb(27,65,91);float: left;text-align: left;background: #ffffff}
    .main .form-plane .form-input-group .handle {overflow: hidden;vertical-align: middle;width: 1px;white-space: nowrap;background: #ffffff}

    .main .form-plane .form-input-group .handle i {font-size:40px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(231,236,237,1);float: left;margin: 0;padding: 0 10px;}

    .main .form-plane .form-input-group .handle span {height: 82px;}
    .main .form-plane .form-input-group .handle span.s1 {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(139,160,174,1);margin-right: 28px;margin-left:10px;}
    .main .form-plane .form-input-group .handle span.b1 {font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:38px;color:rgba(27,65,91,1);height: 86px;margin: 0 28px;background: transparent}
    .main .form-plane .form-input-group .handle span.cut {width:8px;height:42px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:42px;color:rgba(231,236,237,1);}



    .main .plane3 {margin-top: 14px;overflow: hidden;}
    .main .plane3 p {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(197,208,213,1);}
    .main .plane3 p:nth-child(1) {float: left;}
    .main .plane3 p:nth-child(2) {float: right;}


    .main .tips {width: 622px;background:rgba(247,247,250,1);border-radius:6px;margin: 60px auto 0;padding: 24px}
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