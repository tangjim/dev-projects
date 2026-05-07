<template>
    <ul class="rebate-ranking-list">
        <li v-for="(item, index) in userRebateRanking" :key="index">
            <template v-if="item.sequence < 4"><div v-lazy-container="{selector:'img'}"><img :data-src="'/images/ranking'+item.sequence+'.png'" /></div></template>
            <template v-else><div class="sequence_txt"><span class="fut-s">{{item.sequence}}</span></div></template>
            <span class="t1">
                <template v-if="item.mobilePhone">{{item.mobilePhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</template>
                <template v-else-if="item.email">{{item.email.replaceAll("(\\w?)(\\w+)(\\w)(@\\w+\\.[a-z]+(\\.[a-z]+)?)", "$1******$3$4")}}</template>
            </span>
            <span class="t2"><p class="fut-s_r">{{item.amount}}&nbsp;USDT</p></span>
        </li>
    </ul>
</template>

<script>
    import Vue from "vue";
    import { Lazyload } from "vant";
    import "vant/lib/lazyload/style";
    Vue.use(Lazyload);

    import {mapState, mapActions} from 'vuex';
    export default {
        name: "rebate-ranking",
        props: {
            num: {
                type: Number,
                default: 10
            }
        },
        computed: {
            ...mapState({
                userRebateRanking: state=>state.userRebateRanking.list,
            })
        },
        created() {
            this.getUserRebateRankingList({formData:{num:this.num}});
        },
        methods: {
            ...mapActions({
                getUserRebateRankingList: 'userRebateRanking/list'
            }),
        }
    }
</script>

<style scoped>
    .rebate-ranking-list li {height: 78px;border-bottom: 2px solid rgba(247,247,248,1);}
    .rebate-ranking-list li:last-child {border-bottom: 0;height: 80px;}
    .rebate-ranking-list li img {width: 52px;height: 48px;margin-left: 20px;margin-top: 16px;float: left}
    .rebate-ranking-list li .sequence_txt {width:36px;height:36px;background:rgba(27,65,91,1);border-radius:50%;font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(255,255,255,1);line-height: 35px;text-align: center;float:left;margin-left: 33px;margin-top: 16px;}

    .rebate-ranking-list li span.t1 {float: left;font-size:28px;font-weight:400;color:rgba(27,65,91,1);margin-left: 20px;line-height: 78px;}
    .rebate-ranking-list li span.t2 {float: right;margin-right: 32px;font-size:20px;font-weight:400;color:rgba(27,65,91,1);line-height: 78px;}
</style>