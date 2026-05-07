<template>
    <div class="box">
        <sub-header>
            <a class="back-btn" @click="onClose" slot="header-left"><i class="iconfont icon-jiantou1"></i></a>
            <div class="header-title" slot="header-middle">选择账户</div>
        </sub-header>
        <div class="main">
            <van-cell-group>
                <van-cell v-waves :title="item.txt" v-for="(item, index) in list" :key="index" @click="selectedItem(index)">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon v-if="item.id === selected">
                        <i class="iconfont icon-tubiao-"></i>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import BackBtn from '../../back_btn/index';
    import SubHeader from "../../sub_header/index";

    import Vue from 'vue';

    import { Cell, CellGroup } from 'vant';
    import "vant/lib/cell/style";
    import "vant/lib/cell-group/style";
    Vue.use(Cell);
    Vue.use(CellGroup);

    export default {
        name: "select_account_list",
        components: {SubHeader, BackBtn},
        props: {
            selected: {
                type: Number,
                default: 0
            },
            list: {
                type: Array,
                required: true
            }
        },
        data () {
            return {}
        },
        created() {
            // console.log(this.list);
            // console.log(this.selected)
        },
        methods: {
            onClose: function() {
                this.$emit("close", "selectAccount");
            },
            selectedItem: function (index) {
                setTimeout(()=>{
                    this.$emit("selected", this.list[index]);
                }, 250)

            }
        }
    }
</script>

<style scoped>
    .box {width: 750px;margin: auto}
    .back-btn {cursor: pointer;display: inline-block;margin-left: 2px}
    .back-btn i {color:rgba(27,65,91,1);line-height: 80px;font-size: 42px;font-weight:400;}
    .header-title {text-align: center;font-size:28px;font-family:Microsoft YaHei;font-weight:400;line-height:80px;color:rgba(27,65,91,1);}

    .main {margin: 80px auto 0;background-color: rgba(255,255,255,1);overflow: hidden;width: 750px;}
    .iconfont {color:rgba(5,173,142,1);font-size: 32px;}
</style>