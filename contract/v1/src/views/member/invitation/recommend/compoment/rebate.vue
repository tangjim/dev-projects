<template>
    <div>
        <div class="tab-header">
            <span class="fut-s">帐号</span>
            <span class="fut-s">返佣数量</span>
            <span class="fut-s fr">返佣时间</span>
        </div>

        <van-list v-model="loading" :finished="finished"  @load="onLoad">
            <van-cell v-for="(item, index) in list" :key="index">
                <div class="item-wrap">
                    <span>{{item.mobilePhone}}</span>
                    <span>{{item.amount}}</span>
                    <span class="fr">{{item.registerDate}}</span>
                </div>
            </van-cell>
        </van-list>
        <div class="emp" v-if="list.length === 0">暂无数据</div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { List } from 'vant';
    import "vant/lib/list/style";
    Vue.use(List);

    import {DELETE_ALL} from "../../../../../store/modules/mutation-types";
    import {mapState, mapActions, mapMutations} from 'vuex';
    export default {
        name: "invitation-compoment-rebate-compoment",
        data() {
            return {
                loading: false,
                finished: false,
            }
        },
        computed: {
            ...mapState({
                list: state=>state.userRebateProfit.list
            }),
        },
        created() {
            this.emptyList();
        },
        methods: {
            ...mapMutations({
                emptyList: "userRebateProfit/"+DELETE_ALL
            }),
            ...mapActions({
                getData: 'userRebateProfit/list10'
            }),
            onLoad: function () {
                let data = {
                    success:(res) => {
                        // console.log(this.list);
                        this.loading = false;
                        this.finished = true;
                    }, formData:{userCode:"abc", type:1, num: 10}
                };
                this.getData(data);
            }
        }
    }
</script>

<style scoped>
    .tab-header {width: 670px;padding: 22px 40px 0;overflow: hidden}
    .tab-header > span {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color:rgba(139,160,172,1);float:left;}
    .tab-header > span:nth-child(1) {width: 213px;}
    .tab-header > span:nth-child(2) {width: 203px;}
    .tab-header > span:nth-child(3) {width: 253px;}
    .fr {text-align: right;transform-origin:right;}

    .item-wrap {width: 100%;overflow: hidden;}
    .item-wrap > span {font-size:24px;font-family:Microsoft YaHei;font-weight:400;line-height:76px;color:rgba(139,160,172,1);float:left;}
    .item-wrap > span:nth-child(1) {width: 213px;}
    .item-wrap > span:nth-child(2) {width: 203px;}
    .item-wrap > span:nth-child(3) {width: 253px;}
    .van-cell {height: 76px;padding: 0 40px;margin: 0;}
    .van-cell:not(:last-child)::after {width: 670px; border-bottom: 2px solid rgba(247,247,248,1);transform:none;}

    .emp {width: 100%;text-align: center;font-family: Microsoft YaHei;font-size: 24px;color: rgb(198, 198, 198);line-height: 100px;}
</style>