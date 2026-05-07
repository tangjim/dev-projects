<template>
    <div>
        <div class="plane">
            <div class="plane-wrap">
                <div class="plane-wrap_title_text t30">
                    <div class="t1 tl red">空头 20X<i class="iconfont icon-bianji"></i></div>
                    <div class="t2 tr"><i class="iconfont icon-xinxi"></i>自动追加保证金<i class="iconfont icon-fuxuankuang"></i></div>
                </div>
                <div class="plane-wrap_title_text t24">
                    <div class="t2 tl">已实现盈亏(USDT)</div>
                    <div class="t2 tr">未实现盈亏(USDT)</div>
                </div>
                <div class="plane-wrap_title_text t8">
                    <div class="t3 tl">0.00000000</div>
                    <div class="t3 tr">0.00250000</div>
                </div>
                <div class="plane-line t24"></div>
                <div class="plane-wrap_order_text">
                    <div class="plane-wrap_order_left-text">
                        <p><span>持仓(张)</span><span>1</span></p>
                        <p><span>可平(张)</span><span>1</span></p>
                        <p><span>保证金(USDT)</span><span>0.14231123</span></p>
                    </div>
                    <div class="plane-wrap_order_right-text">
                        <p><span>开仓均价</span><span>₮261.90</span></p>
                        <p><span><i class="iconfont icon-xinxi">预估强平价</i></span><span>₮271.90</span></p>
                        <p><span>回报率</span><span class="green">+14.11%</span></p>
                    </div>
                </div>
                <div class="handle">
                    <button @click="suretyPlane=!suretyPlane" v-waves>调整保证金</button>
                    <button @click="unwindPlane=!unwindPlane" v-waves>平仓</button>
                    <button v-waves>分享</button>
                </div>
            </div>
        </div>
        <div class="plane">
            <div class="plane-wrap">
                <div class="plane-wrap_title_text t30">
                    <div class="t1 tl green">多头 20X<i class="iconfont icon-bianji"></i></div>
                    <div class="t2 tr"><i class="iconfont icon-xinxi"></i>自动追加保证金<i class="iconfont icon-fuxuankuang"></i></div>
                </div>
                <div class="plane-wrap_title_text t24">
                    <div class="t2 tl">已实现盈亏(USDT)</div>
                    <div class="t2 tr">未实现盈亏(USDT)</div>
                </div>
                <div class="plane-wrap_title_text t8">
                    <div class="t3 tl">0.00000000</div>
                    <div class="t3 tr">0.00250000</div>
                </div>
                <div class="plane-line t24"></div>
                <div class="plane-wrap_order_text">
                    <div class="plane-wrap_order_left-text">
                        <p><span>持仓(张)</span><span>2</span></p>
                        <p><span>可平(张)</span><span>2</span></p>
                        <p><span>保证金(USDT)</span><span>0.14231123</span></p>
                    </div>
                    <div class="plane-wrap_order_right-text">
                        <p><span>开仓均价</span><span>₮261.90</span></p>
                        <p><span><i class="iconfont icon-xinxi">预估强平价</i></span><span>₮271.90</span></p>
                        <p><span>回报率</span><span class="green">+14.11%</span></p>
                    </div>
                </div>
                <div class="handle">
                    <button @click="suretyPlane=!suretyPlane" v-waves>调整保证金</button>
                    <button @click="unwindPlane=!unwindPlane"  v-waves>平仓</button>
                    <button v-waves>分享</button>
                </div>
            </div>
        </div>


        <!-- 调整保证金面板 -->
        <van-popup v-model="suretyPlane" :close-on-popstate="true" :style="{ top:'7.9rem', width:'9.35rem'}" get-container=".main">
            <div class="surety_plane">
                <div class="title">
                    <ul class="title-tab">
                        <li v-for="(item, index) in suretyPlaneTabs" :key="index" :class="{'active':suretyPlaneTabActive===item.value}" @click="selectSuretyPlaneTab(index)"><span>{{item.text}}</span></li>
                    </ul>
                    <i class="iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-" @click="suretyPlane = !suretyPlane"></i>
                </div>
                <div class="box">
                    <div class="surety_popup-input-group">
                        <input type="text" placeholder="请输入数量">
                        <div class="unit">USDT<em>|</em><span>全部</span></div>
                    </div>

                    <div class="tips">
                        <div class="txt"><p>最多可增加</p><p><em>0.00000000</em>&nbsp;&nbsp;USDT</p></div>
                        <div class="txt"><p>增加后的预估强平价</p><p><em>0.00000000</em>&nbsp;&nbsp;USDT</p></div>
                    </div>
                    <div class="handle">
                        <button @click="confirmSuretySelected" v-waves>确定</button>
                    </div>
                </div>
            </div>
        </van-popup>

        <!-- 平仓面板 -->
        <van-popup v-model="unwindPlane" :close-on-popstate="true" :style="{ top:'7.9rem', width:'9.35rem'}" get-container=".main">
            <div class="unwind_plane">
                <div class="title">
                    <ul class="title-tab">
                        <li v-for="(item, index) in unwindPlaneTabs" :key="index" :class="{'active':unwindPlaneTabActive===item.value}" @click="selectUnwindPlaneTab(index)"><span>{{item.text}}</span></li>
                    </ul>
                    <i class="iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-" @click="unwindPlane = !unwindPlane"></i>
                </div>
                <div class="box">
                    <div class="unwind_popup-input-group">
                        <input type="text" placeholder="最优价格成交">
                        <div class="unit">USDT</div>
                    </div>
                    <div class="unwind_popup-input-group2">
                        <input type="text" placeholder="请输入数量">
                        <div class="unit">张</div>
                    </div>

                    <div class="tips">
                        <div class="txt"><p>冻结&nbsp;<em>0</em>&nbsp;张</p><p>可平&nbsp;<em>3</em>&nbsp;张</p></div>
                    </div>
                    <div class="handle">
                        <button @click="confirmUunwindSelected" v-waves>确定</button>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import Vue from "vue";
    import {  Popup } from "vant";
    import "vant/lib/popup/style";
    Vue.use(Popup);
    export default {
        name: "position",
        data() {
            return {
                suretyPlane: false,
                suretyPlaneTabActive: 0,
                suretyPlaneTabs: [{text:"增加保证金", value:0},{text:"减少保证金", value:1}],

                unwindPlane: false,
                unwindPlaneTabActive: 0,
                unwindPlaneTabs: [{text:"闪电平仓", value:0},{text:"限价平仓", value:1}],
            }
        },
        methods: {
            confirmSuretySelected: function () {
                this.suretyPlane = !this.suretyPlane;
            },
            selectSuretyPlaneTab: function (index) {
                this.suretyPlaneTabActive = this.suretyPlaneTabs[index].value;
            },
            confirmUunwindSelected: function () {
                this.unwindPlane = !this.unwindPlane;
            },
            selectUnwindPlaneTab: function (index) {
                this.unwindPlaneTabActive = this.unwindPlaneTabs[index].value;
            }

        }
    }
</script>

<style scoped>
    .plane {height: 490px;width: 100%;padding-bottom: 24px;background:rgba(247,247,250,1);}
    .plane:last-child {padding-bottom: 0}
    .plane .plane-wrap {height: 490px;padding: 0 40px;overflow: hidden;background-color: #ffffff;}
    .plane .plane-wrap .plane-wrap_title_text {width: 100%;overflow: hidden;}
    .plane .plane-wrap .t30 {margin-top: 30px}
    .plane .plane-wrap .t24 {margin-top: 24px}
    .plane .plane-wrap .t8 {margin-top: 8px}
    .plane .plane-wrap .plane-wrap_title_text .tl {float: left}
    .plane .plane-wrap .plane-wrap_title_text .tr {float: right}
    .plane .plane-wrap .red {color:rgba(237,101,94,1);}
    .plane .plane-wrap .green {color:rgba(5,173,142,1);}
    .plane .plane-wrap .plane-wrap_title_text .t1 {font-size:32px;font-family:PingFang SC;font-weight:400;line-height:44px;}
    .plane .plane-wrap .plane-wrap_title_text .t1 i {font-size: 38px;margin-left: 18px;}
    .plane .plane-wrap .plane-wrap_title_text .t2 {font-size:24px;font-family:PingFang SC;font-weight:400;line-height:34px;color:rgba(197,208,213,1);}
    .plane .plane-wrap .plane-wrap_title_text .t2 i {font-size: 26px;}
    .plane .plane-wrap .plane-wrap_title_text .t2 i:nth-child(1) {margin-right: 8px;}
    .plane .plane-wrap .plane-wrap_title_text .t2 i:nth-child(2) {margin-left: 8px;}
    .plane .plane-wrap .plane-wrap_title_text .t3 {font-size:24px;font-family:PingFang SC;font-weight:400;line-height:34px;color:rgba(71,71,71,1);}

    .plane .plane-wrap .plane-wrap_order_text {width: 100%;overflow: hidden;margin-top: 24px;}
    .plane .plane-wrap .plane-wrap_order_text .plane-wrap_order_left-text {float:left;width: 46%}
    .plane .plane-wrap .plane-wrap_order_text .plane-wrap_order_right-text {float:right;width: 46%}

    .plane .plane-wrap .plane-wrap_order_text p {font-size:24px;font-family:PingFang SC;font-weight:400;line-height:34px;display: inline-block;width: 100%;margin-top: 8px;}
    .plane .plane-wrap .plane-wrap_order_text p:nth-child(1) {margin-top: 0}
    .plane .plane-wrap .plane-wrap_order_text p span:nth-child(1) {float:left;color:rgba(197,208,213,1);}
    .plane .plane-wrap .plane-wrap_order_text p span:nth-child(2) {float:right;color:rgba(71,71,71,1);}
    .plane .plane-wrap .plane-wrap_order_text p span.red {color:rgba(237,101,94,1);}
    .plane .plane-wrap .plane-wrap_order_text p span.green {color:rgba(5,173,142,1);}

    .plane .plane-wrap .plane-line {height: 2px;background-color: rgba(247,247,248,1);width: 100%;overflow: hidden}

    .plane .plane-wrap .handle {width: 100%;overflow: hidden;margin-top: 36px;}
    .plane .plane-wrap .handle button {height:62px;float: left;background:rgba(255,255,255,1);border:2px solid rgba(48,118,237,1);border-radius:60px;font-size:24px;font-family:PingFang SC;font-weight:400;color:rgba(48,118,237,1);line-height: 60px;text-align: center;padding: 0;margin: 0}
    .plane .plane-wrap .handle button:nth-child(1), .plane .plane-wrap .handle button:nth-child(2) {width:240px;margin-right: 20px;}
    .plane .plane-wrap .handle button:nth-child(3) {width:150px;}


    .surety_plane {width: 620px;padding: 0 40px;}
    .surety_plane .title {height: 90px;font-weight:400;line-height:90px;color:rgba(27,65,91,1);border-bottom:2px solid rgba(231,236,237,1);text-align: center}
    .surety_plane .title .title-tab {float: left;}
    .surety_plane .title .title-tab li {float:left;font-size:28px;font-family:PingFang SC;font-weight:400;color:rgba(139,160,172,1);margin-right: 50px;}
    .surety_plane .title .title-tab li span {display: inline-block;height: 88px}
    .surety_plane .title .title-tab li.active {font-family:Microsoft YaHei;color:rgba(48,118,237,1);}
    .surety_plane .title .title-tab li.active span {border-bottom: 6px solid rgba(48,118,237,1);}
    .surety_plane .title i {float: right;color:rgba(27,65,91,1);font-size: 38px;}
    .surety_plane .box {height: 340px;}
    .surety_plane .box .surety_popup-input-group {height: 75px;display: inline-flex;width: 100%;border-bottom: 2px solid rgba(247,247,248,1);margin-top: 25px;}
    .surety_plane .box .surety_popup-input-group input {flex: 1;font-size:32px;font-family:Microsoft YaHei;color:rgba(27,65,91,1);}
    .surety_plane .box .surety_popup-input-group input::-webkit-input-placeholder {
        font-size:32px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
    }
    .surety_plane .box .surety_popup-input-group input:-moz-placeholder {
        font-size:32px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
    }
    .surety_plane .box .surety_popup-input-group input:-ms-input-placeholder {
        font-size:32px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
        background: transparent;
        border: 0;
    }

    .surety_plane .box .surety_popup-input-group .unit {font-size:24px;font-family:PingFang SC;font-weight:400;line-height:86px;color:rgba(27,65,91,1);text-align: center;flex:.4;}
    .surety_plane .box .surety_popup-input-group .unit span {font-family:Microsoft YaHei;color:rgba(48,118,237,1);}
    .surety_plane .box .surety_popup-input-group .unit em {margin: 0 22px;}

    .surety_plane .box .tips {margin-top: 40px;width: 100%}
    .surety_plane .box .tips .txt {width: 100%;overflow: hidden;font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color:rgba(139,160,172,1);margin-bottom: 12px;}
    .surety_plane .box .tips .txt p:nth-child(1) {float: left;}
    .surety_plane .box .tips .txt p:nth-child(2) {float: right;}
    .surety_plane .box .tips .txt p em {color:rgba(48,118,237,1);}

    .surety_plane .box .handle {width: 100%;margin-top: 40px}
    .surety_plane .box .handle button {height:64px;background:rgba(76,185,113,1);border-radius:6px;font-size:24px;font-family:Microsoft YaHei;font-weight:400;color:rgba(255,255,255,1);line-height: 64px;width: 100%}




    .unwind_plane {width: 620px;padding: 0 40px;}
    .unwind_plane .title {height: 90px;font-weight:400;line-height:90px;color:rgba(27,65,91,1);border-bottom:2px solid rgba(231,236,237,1);text-align: center}
    .unwind_plane .title .title-tab {float: left;}
    .unwind_plane .title .title-tab li {float:left;font-size:28px;font-family:PingFang SC;font-weight:400;color:rgba(139,160,172,1);margin-right: 50px;}
    .unwind_plane .title .title-tab li span {display: inline-block;height: 88px}
    .unwind_plane .title .title-tab li.active {font-family:Microsoft YaHei;color:rgba(48,118,237,1);}
    .unwind_plane .title .title-tab li.active span {border-bottom: 6px solid rgba(48,118,237,1);}
    .unwind_plane .title i {float: right;color:rgba(27,65,91,1);font-size: 38px;}
    .unwind_plane .box {height: 384px;}
    .unwind_plane .box .unwind_popup-input-group {height: 74px;display: inline-table;width: 100%;border-bottom: 2px solid rgba(247,247,248,1);}
    .unwind_plane .box .unwind_popup-input-group input {width: 100%;height: 100%;display: table-cell;font-size:24px;font-family:PingFang SC;color:rgba(27,65,91,1);}
    .unwind_plane .box .unwind_popup-input-group input::-webkit-input-placeholder {
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
    }
    .unwind_plane .box .unwind_popup-input-group input:-moz-placeholder {
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
    }
    .unwind_plane .box .unwind_popup-input-group input:-ms-input-placeholder {
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
        background: transparent;
        border: 0;
    }

    .unwind_plane .box .unwind_popup-input-group .unit {font-size:24px;font-family:PingFang SC;font-weight:400;line-height:86px;color:rgba(197,208,213,1);text-align: center;display: table-cell;width: 1px;}


    .unwind_plane .box .unwind_popup-input-group2 {height: 86px;display: inline-table;width: 100%;border-bottom: 2px solid rgba(247,247,248,1);}
    .unwind_plane .box .unwind_popup-input-group2 input {width: 100%;height: 100%;display: table-cell;font-size:32px;font-family:PingFang SC;color:rgba(27,65,91,1);}
    .unwind_plane .box .unwind_popup-input-group2 input::-webkit-input-placeholder {
        font-size:32px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
    }
    .unwind_plane .box .unwind_popup-input-group2 input:-moz-placeholder {
        font-size:32px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
    }
    .unwind_plane .box .unwind_popup-input-group2 input:-ms-input-placeholder {
        font-size:32px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
        color:rgba(197,208,213,1);
        background: transparent;
        border: 0;
    }

    .unwind_plane .box .unwind_popup-input-group2 .unit {font-size:24px;font-family:PingFang SC;font-weight:400;line-height:86px;color:rgba(197,208,213,1);text-align: center;display: table-cell;width: 1px;}

    .unwind_plane .box .tips {margin-top: 40px;width: 100%}
    .unwind_plane .box .tips .txt {width: 100%;overflow: hidden;font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color:rgba(139,160,172,1);margin-bottom: 12px;}
    .unwind_plane .box .tips .txt p:nth-child(1) {float: left;}
    .unwind_plane .box .tips .txt p:nth-child(2) {float: right;}
    .unwind_plane .box .tips .txt p em {color:rgba(48,118,237,1);}

    .unwind_plane .box .handle {width: 100%;margin-top: 40px}
    .unwind_plane .box .handle button {height:64px;background:rgba(76,185,113,1);border-radius:6px;font-size:24px;font-family:Microsoft YaHei;font-weight:400;color:rgba(255,255,255,1);line-height: 64px;width: 100%}
</style>