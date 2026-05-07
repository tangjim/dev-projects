<template>
    <div class="components-main">
        <div class="form">
           <div class="select-plane">
               <div class="input-group"><my-select :options="typeList" :value="order.type" v-on:selected="selectedType"></my-select></div>
           </div>
            <template v-if="order.type === 1">
                <div class="form-input-group" :class="priceInputCss">
                    <input type="text" v-model="order.price" placeholder="价格" @focus="priceInputFocus($event)" @blur="priceInputBlur" @input="changePrice"><span class="unit">USDT</span>
                </div>
                <p class="price_cny"><span class="fut-s" style="transform: scale(.8);width: 120%">≈99182.23&nbsp;CNY</span></p>
            </template>
            <template v-else>
                <div class="form-input-group" :class="price2InputCss">
                    <input type="text" placeholder="触发价格" @focus="price2InputFocus($event)" @blur="price2InputBlur"><span class="unit">USDT</span>
                </div>
                <div class="form-input-group" :class="price3InputCss">
                    <input type="text" placeholder="执行价格" @focus="price3InputFocus($event)" @blur="price3InputBlur"><span class="unit">USDT</span>
                </div>
            </template>
            <div class="select-price-type_plane">
                <div class="select-price-type-item" v-for="(item, index) in priceTypeList" :key="index" :class="{'active':item.value===order.priceType}" @click="selectedPriceType(index)">{{item.text}}</div>
            </div>
            <div class="form-input-group" :class="numInputCss">
                <input type="text" v-model="order.num" placeholder="数量" @focus="numInputFocus($event)" @blur="numInputBlur"><span class="unit">张</span>
            </div>
            <p class="price_cny"><span class="fut-s" style="transform: scale(.8);width: 120%">≈99182.23&nbsp;CNY</span></p>
            <div class="handle">
                <button class="green" v-waves>买入开多(看涨)</button>
                <div class="__wrap"><span><em class="fut-s">可平2张</em></span><span><em class="fut-s">持仓2张</em></span></div>
                <button class="red" v-waves>卖出开空(看跌)</button>
                <div class="__wrap"><span><em class="fut-s">可平1张</em></span><span><em class="fut-s">持仓1张</em></span></div>
            </div>
        </div>

        <!-- 倍数选择面板 -->
        <van-popup v-model="selectLeverOpen" :close-on-popstate="true" :style="{ position:'absolute', top:'7.9rem', width:'9.35rem'}" get-container=".main">
            <div class="lever-plane">
                <div class="title">调整多头杠杆<i class="iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-" @click="selectLeverOpen = !selectLeverOpen"></i></div>
                <div class="box">
                    <div class="lever-popup-input-group">
                        <input type="text" v-model="selectedLeverValue" readonly>
                        <span class="unit">X</span>
                        <span class="info"><em class="fut-s">|&nbsp;最高倍数100X</em></span>
                    </div>
                    <ul class="lever-select-plane">
                        <li v-for="(item, index) in leverList" :key="index" :class="{'active':item.value === selectedLeverValue}" @click="selectedLever(index)">
                            <span>{{item.text}}</span>
                        </li>
                    </ul>
                    <div class="tips">
                        <div class="txt"><p>当前杠杆倍数最高可开</p><p>张</p></div>
                        <div class="txt"><p>当前仓位所需保证金</p><p><em>0.00000000</em>&nbsp;&nbsp;USDT</p></div>
                        <div class="txt"><p>需追加保证金</p><p><em>0.00000000</em>&nbsp;&nbsp;USDT</p></div>
                    </div>
                    <div class="handle">
                        <button @click="confirmLeverSelected">确定</button>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import Vue from "vue";
    import { Popup } from "vant";
    import "vant/lib/popup/style";
    Vue.use(Popup);

    import MySelect from "@/components/select";
    import {SET_ITEM} from '@/store/modules/mutation-types';
    import {mapState, mapMutations} from 'vuex';
    export default {
        name: "contract-open-components-2",
        components: {MySelect},
        computed: {
            ...mapState({
                order: state => state.order
            }),
            getText() {
                return function (value) {
                    if (this.leverList.filter((item)=>{ return item.value === value; }).length > 0) {
                        return this.leverList.filter((item)=>{ return item.value === value; })[0].text;
                    } else {
                        return value+"X";
                    }
                };
            },
        },
        data() {
            return {
                // formData: {type: 1,lever: 3, num:"",codePrefix:"",codeSuffix:"",priceType:1,price:""},
                typeList: [{value:1, text:"普通委托"},{value:2, text:"计划委托"}],
                priceTypeList: [{value:2, text:"市价"},{value:3, text:"买一价"},{value:4, text:"卖一价格"}],
                leverList: [
                    {value:2, text:"2X"},{value:3, text:"3X"},{value:5, text:"5X"},{value:10, text:"10X"},
                    {value:20, text:"20X"},{value:25, text:"25X"},{value:50, text:"50X"},{value:100, text:"100X"}
                ],
                selectLeverOpen: false,
                selectedLeverValue: 0,
                priceInputCss: "form-input-group-default",
                price2InputCss: "form-input-group-default",
                price3InputCss: "form-input-group-default",
                numInputCss: "form-input-group-default"
            }
        },
        created() {
            this.selectedLeverValue = this.order.lever;
        },
        methods: {
            ...mapMutations({
                setOrder: "order/"+SET_ITEM,
            }),
            selectedType: function(item) {
                this.setOrder({type:item.value});
            },
            triggerSelectLeverPopup: function() {
                this.selectedLeverValue = this.order.lever;
                this.selectLeverOpen = !this.selectLeverOpen;
            },
            selectedLever: function(index) {
                this.selectedLeverValue = this.leverList[index].value;
            },
            confirmLeverSelected: function () {
                this.setOrder({lever:this.selectedLeverValue});
                this.selectLeverOpen = !this.selectLeverOpen;
            },
            priceInputFocus: function (event) {
                event.currentTarget.select();
                this.priceInputCss = "form-input-group-focus"
            },
            priceInputBlur: function () {
                this.priceInputCss = "form-input-group-default"
            },

            price2InputFocus: function (event) {
                event.currentTarget.select();
                this.price2InputCss = "form-input-group-focus"
            },
            price2InputBlur: function () {
                this.price2InputCss = "form-input-group-default"
            },

            price3InputFocus: function (event) {
                event.currentTarget.select();
                this.price3InputCss = "form-input-group-focus"
            },
            price3InputBlur: function () {
                this.price3InputCss = "form-input-group-default"
            },

            selectedPriceType: function (index) {
                this.setOrder({priceType:this.priceTypeList[index].value,price:this.priceTypeList[index].text});
            },
            changePrice: function () {
                this.setOrder({priceType:1});
            },
            numInputFocus: function (event) {
                this.numInputCss = "form-input-group-focus"
            },
            numInputBlur: function () {
                this.numInputCss = "form-input-group-default"
            },
        }
    }
</script>

<style scoped>
    .components-main {width: 400px;}
    .form {margin-top: 16px;width: 100%;}
    .form .select-plane {display: inline-block;width: 100%;}
    .form .select-plane .input-group {float: left;width: 100%;}
    .form .form-input-group {width: 376px;height: 50px;border: 2px solid;border-radius:6px;display: inline-table;padding: 0 12px;margin-top: 14px;}
    .form .form-input-group.form-input-group-default {border-color: rgba(204,204,204,1)}
    .form .form-input-group.form-input-group-focus {border-color: rgba(58,117,216,1)}
    .form .form-input-group > * {display: table-cell}
    .form .form-input-group input {width: 100%;height: 50px;padding: 0;margin: 0; font-size:24px;font-family:PingFang SC;font-weight:400;color:rgb(37, 112, 147);}
    .form .form-input-group input::-webkit-input-placeholder {
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
    }
    .form .form-input-group input:-moz-placeholder {
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
    }
    .form .form-input-group input:-ms-input-placeholder {
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
        background: transparent;
        border: 0;
    }
    .form .form-input-group .unit {width: 1px;font-size:24px;font-family:PingFang SC;font-weight:400;color:rgba(197,208,213,1);}

    .form .price_cny {font-size:16px;font-family:PingFang SC;font-weight:400;line-height:22px;color:rgba(197,208,213,1);margin-top: 6px;}

    .form .select-price-type_plane {width: 100%;margin-top: 10px;overflow: hidden}
    .form .select-price-type_plane .select-price-type-item {float:left;text-align: center;width:124px;height:42px;background:rgba(246,249,249,1);border-radius:6px;font-size:24px;font-family:PingFang SC;font-weight:400;color:rgba(140,161,169,1);line-height: 42px;margin-right: 14px;}
    .form .select-price-type_plane .select-price-type-item:last-child {margin-right: 0}
    .form .select-price-type_plane .select-price-type-item.active {color:rgba(60,115,214,1);background:rgba(246,250,254,1);}

    .form .handle {width: 100%;margin-top: 20px}
    .form .handle button {width: 100%;height:64px;border-radius:6px;font-size:24px;font-family:PingFang SC;font-weight:400;line-height:64px;color:rgba(255,255,255,1);text-align: center;}
    .form .handle button.green {background:rgba(76,185,113,1);}
    .form .handle button.red {background:rgba(237,101,94,1);}
    .form .handle .__wrap {width: 100%;margin: 4px 0 10px 0;overflow: hidden}
    .form .handle .__wrap span {font-size:20px;font-family:PingFang SC;font-weight:400;line-height:28px;color:rgba(140,161,169,1);}
    .form .handle .__wrap span:nth-child(1) {float: left;}
    .form .handle .__wrap span:nth-child(2) {float:right;}

    .lever-plane {width: 620px;padding: 0 40px;}
    .lever-plane .title {height: 78px;font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:78px;color:rgba(27,65,91,1);border-bottom:2px solid rgba(231,236,237,1);text-align: center}
    .lever-plane .title i {float: right;color:rgba(27,65,91,1);font-size: 28px;}
    .lever-plane .box {height: 500px;}
    .lever-plane .box .lever-popup-input-group {height: 84px;display: inline-flex;width: 100%;border-bottom: 2px solid rgba(247,247,248,1)}
    .lever-plane .box .lever-popup-input-group input {flex: 1;font-size:32px;font-family:Microsoft YaHei;color:rgba(27,65,91,1);}
    .lever-plane .box .lever-popup-input-group .unit {font-size:32px;font-family:Microsoft YaHei;font-weight:400;line-height:86px;color:rgba(27,65,91,1);text-align: center;flex:.05;}
    .lever-plane .box .lever-popup-input-group .info {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:84px;color:rgba(139,160,172,1);text-align: center;flex:.4;}

    .lever-plane .box .lever-select-plane {margin-top: 6px;overflow: hidden;}
    .lever-plane .box .lever-select-plane li {float: left;margin-top: 24px;width: 180px;}
    .lever-plane .box .lever-select-plane li:nth-child(4n+0) {width: 60px;}
    .lever-plane .box .lever-select-plane li span {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:32px;color:rgba(27,65,91,1);border-bottom: 4px solid rgba(197,208,213,1);display: inline-table;padding-bottom: 8px;}
    .lever-plane .box .lever-select-plane li.active span {border-color: rgba(27,65,91,1)}
    .lever-plane .box .tips {margin-top: 40px;width: 100%}
    .lever-plane .box .tips .txt {width: 100%;overflow: hidden;font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color:rgba(139,160,172,1);margin-bottom: 12px;}
    .lever-plane .box .tips .txt p:nth-child(1) {float: left;}
    .lever-plane .box .tips .txt p:nth-child(2) {float: right;}
    .lever-plane .box .tips .txt p em {color:rgba(48,118,237,1);}

    .lever-plane .box .handle {width: 100%;margin-top: 40px}
    .lever-plane .box .handle button {height:64px;background:rgba(76,185,113,1);border-radius:6px;font-size:24px;font-family:Microsoft YaHei;font-weight:400;color:rgba(255,255,255,1);line-height: 64px;width: 100%}

</style>