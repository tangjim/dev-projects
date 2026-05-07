<template>
    <div>
        <div class="plane">
            <div class="plane-wrap">
                <div class="plane-wrap_title_text t30">
                    <div class="t1 tl red">开空</div>
                    <div class="t2 tr"><span><em class="fut-s_r" style="display: inline-block">2020-02-22 12:10</em></span><span>撤销</span></div>
                </div>
                <div class="plane-wrap_tab t24">
                    <div class="header">
                        <span><em class="fut-s">触发价(USDT)</em></span>
                        <span><em class="fut-s">执行价(USDT)</em></span>
                        <span><em class="fut-s">委托量(张)</em></span>
                    </div>
                    <div class="body">
                        <span>≥ ₮261.90</span>
                        <span>₮261.90</span>
                        <span>1</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="plane">
            <div class="plane-wrap">
                <div class="plane-wrap_title_text t30">
                    <div class="t1 tl green">开多</div>
                    <div class="t2 tr"><span><em class="fut-s_r" style="display: inline-block">2020-02-22 12:10</em></span><span>撤销</span></div>
                </div>
                <div class="plane-wrap_tab t24">
                    <div class="header">
                        <span><em class="fut-s">触发价(USDT)</em></span>
                        <span><em class="fut-s">执行价(USDT)</em></span>
                        <span><em class="fut-s">委托量(张)</em></span>
                    </div>
                    <div class="body">
                        <span>≥ ₮261.90</span>
                        <span>₮261.90</span>
                        <span>1</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "plan"
    }
</script>

<style scoped>
    .plane {height: 190px;width: 100%;padding-bottom: 24px;background:rgba(247,247,250,1);}
    .plane:last-child {padding-bottom: 0}
    .plane .plane-wrap {height: 190px;padding: 0 40px;overflow: hidden;background-color: #ffffff;}
    .plane .plane-wrap .plane-wrap_title_text {width: 100%;overflow: hidden;}
    .plane .plane-wrap .t30 {margin-top: 30px}
    .plane .plane-wrap .t24 {margin-top: 24px}
    .plane .plane-wrap .plane-wrap_title_text .tl {float: left}
    .plane .plane-wrap .plane-wrap_title_text .tr {float: right}
    .plane .plane-wrap .red {color:rgba(237,101,94,1);}
    .plane .plane-wrap .green {color:rgba(5,173,142,1);}
    .plane .plane-wrap .plane-wrap_title_text .t1 {font-size:32px;font-family:PingFang SC;font-weight:400;line-height:44px;}
    .plane .plane-wrap .plane-wrap_title_text .t2 {overflow: hidden}
    .plane .plane-wrap .plane-wrap_title_text .t2 span:nth-child(1) {font-size:20px;font-family:PingFang SC;font-weight:400;line-height:28px;color:rgba(197,208,213,1);float: left;margin-top: 4px;}
    .plane .plane-wrap .plane-wrap_title_text .t2 span:nth-child(2) {font-size:24px;font-family:PingFang SC;font-weight:400;line-height:34px;color:rgba(48,118,237,1);margin-left: 20px}

    .plane .plane-wrap .plane-wrap_tab {width: 100%;overflow: hidden}
    .plane .plane-wrap .plane-wrap_tab .header {display: flex}
    .plane .plane-wrap .plane-wrap_tab .header > span {flex: 1;font-size:20px;font-family:PingFang SC;font-weight:400;line-height:28px;color:rgba(197,208,213,1);}
    .plane .plane-wrap .plane-wrap_tab .header > span:last-child {flex: .36;}

    .plane .plane-wrap .plane-wrap_tab .body {display: flex;margin-top: 10px;}
    .plane .plane-wrap .plane-wrap_tab .body > span {flex: 1;font-size:24px;font-family:PingFang SC;font-weight:400;line-height:28px;color:rgba(71,71,71,1);}
    .plane .plane-wrap .plane-wrap_tab .body > span:last-child {flex: .36;}
</style>