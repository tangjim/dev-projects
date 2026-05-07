<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">资金记录</div>
        </sub-header>

        <div class="main">
            <div class="handle-list">
                <van-cell is-link v-for="(item, index) in handles" :key="index" @click="handleClick(item.click)">
                    <template #title>
                        <span class="handle-txt">{{item.text}}</span>
                    </template>
                    <template #right-icon>
                        <i class="iconfont icon-arrow-right-copy-copy-copy-copy"></i>
                    </template>
                </van-cell>
            </div>
        </div>

        <template v-if="childPanel.rechargeRecord.load">
            <van-popup v-model="childPanel.rechargeRecord.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <recharge-record v-on:close="closeChildPanel"/>
            </van-popup>
        </template>
        <template v-if="childPanel.withdrawalRecord.load">
            <van-popup v-model="childPanel.withdrawalRecord.show" position="bottom" :overlay="false" duration="0.18" :style="{ height: '100%' }">
                <withdrawal-record v-on:close="closeChildPanel"/>
            </van-popup>
        </template>
    </div>
</template>

<script>
    import BackBtn from '../../../../components/back_btn';
    import RefreshBtn from '../../../../components/refresh_btn';
    import SubHeader from "../../../../components/sub_header";

    import Vue from 'vue';
    import { Grid, GridItem, Cell, Popup } from 'vant';
    import "vant/lib/grid/style";
    import "vant/lib/grid-item/style";
    import "vant/lib/cell/style";
    import "vant/lib/popup/style";
    Vue.use(Grid);
    Vue.use(GridItem);
    Vue.use(Cell);
    Vue.use(Popup);

    import RechargeRecord from "./../recharge/record";
    import WithdrawalRecord from "./../withdrawal/record";
    // import TransferRecord from "./../transfer/record";
    export default {
        name: "money-record",
        components: {SubHeader, BackBtn, RefreshBtn, RechargeRecord, WithdrawalRecord},
        data() {
            return {
                childPanel: {
                    rechargeRecord: {load: false, show:false},
                    withdrawalRecord: {load: false, show:false},
                    transferRecord: {load: false, show:false}
                },
                handles: [
                    {text: "充币记录", click: {use:true, jump:()=>{this.openChildPanel("rechargeRecord")}}},
                    {text: "提币记录", click: {use:true, jump:()=>{this.openChildPanel("withdrawalRecord")}}},
                    {text: "资金划转记录", click: {use:false, jump:()=>{this.openChildPanel("transferRecord")}}}
                ]
            }
        },
        methods: {
            onClose: function() {
                this.$emit("close", "record");
            },
            openChildPanel: function(panel) {
                this.childPanel[panel].load = true;
                setTimeout(()=>{this.childPanel[panel].show=true}, 50);
            },
            closeChildPanel: function(panel) {
                this.childPanel[panel].show = false;
                setTimeout(()=>{this.childPanel[panel].load = false;}, 80);
            },
            handleClick:function (item) {
                if (item.use) {
                    if (typeof item.jump === "function") {
                        item.jump();
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .box {width: 750px;margin: auto;background-color: #f7f8fa;height: 100vh;overflow: hidden}
    .header-right, .back-btn {cursor: pointer;display: inline-block;}
    .back-btn {margin-left: 2px}
    .back-btn i, .header-right i  {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-right i  {font-size: 44px;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}

    .main {margin: 80px auto 0;background-color: #f7f8fa;overflow: hidden;width: 720px;}

    .handle-list {overflow: hidden;margin-top: 20px;border-radius: 18px;}
    .handle-list:last-child {margin-bottom: 0}
    .handle-list .handle-txt {display: inline-block;line-height: 80px;font-size:24px;font-family:Microsoft YaHei;font-weight:400;color:rgba(27,65,91,1);}
    .handle-list .van-cell {height: 80px;padding: 0 25px;margin: 0;}
    .handle-list .van-icon {line-height: 80px;color: rgba(231,236,237,1);}
    .handle-list .van-cell:not(:last-child)::after {left: 0;border-bottom: 1px solid rgb(235, 237, 240);transform:scaleY(1);}
    .handle-list .iconfont {font-size: 38px;line-height: 80px;color:rgba(231,236,237,1);}
</style>