<template>
    <div class="notice-main">
        <div class="notice-icon">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xinwengonggao"></use>
            </svg>
        </div>
        <div class="notice-list">
            <div class="notice-wrap-main">
                <transition-group name="notice" v-if="noticeList.length > 0">
                    <div class="notice-wrap" v-for="(item, index) in noticeList" :key="index" v-if="item.checked">{{item.title}}</div>
                </transition-group>
                <div class="notice-wrap" v-else>暂无公告</div>
            </div>
        </div>
        <div class="notice-more">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo"></use>
            </svg>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "notice",
        data() {
            return {
                noticeAnimate:false
            }
        },
        computed: {
            ...mapState({
                noticeList: state => state.notice.list
            }),
        },
        created() {
            let data = {
                success:(code) => {
                    if (code === 1000) {
                        this.index = 0;
                        this.changeList(this.index);
                        this.noticeInterval = setInterval(()=>{
                            this.index++;
                            if(this.index >= this.noticeList.length) {
                                this.index = 0;
                            }
                            this.changeList(this.index);
                        }, 2000);
                    }
                }
            };
            this.getNoticeArr(data);

        },
        destroyed() {
            clearInterval(this.noticeInterval);
        },
        methods: {
            ...mapActions({
                getNoticeArr: 'notice/list'
            }),
            changeList: function (index) {
                if (this.noticeList.length > 0) {
                    for (let i=0; i<this.noticeList.length; i++) {
                        if (this.noticeList[i].checked) {
                            this.noticeList[i].checked = false;
                            break;
                        }
                    }
                    this.noticeList[this.index].checked = true;
                    this.$set(this.noticeList, index, this.noticeList[index]);
                }
            }
        }
    }
</script>

<style scoped>
    .notice-main {width: 672px;height:70px;background:rgba(255,255,255,1);overflow: hidden;display: table;padding: 0 2px 4px;margin: auto}
    .notice-main .notice-icon {display: table-cell;white-space: nowrap;vertical-align: middle;}
    .notice-main .notice-list {display: table-cell;width: 100%;height: 70px;overflow: hidden;}
    .notice-main .notice-list .notice-wrap-main {height: 70px;overflow: hidden;margin: 0 12px;}
    .notice-main .notice-list .notice-wrap-main .anim {transition: all 0.5s;margin-top: -60px;}
    .notice-main .notice-list .notice-wrap-main .notice-wrap {font-size:24px;font-weight:400;line-height:66px;color:rgba(27,65,91,1);width: 550px;overflow: hidden;white-space: nowrap;}
    .notice-main .notice-more {display: table-cell;white-space: nowrap;vertical-align: middle;height: 24px;}

    .icon {
        width: 30px;
        height: 30px;
        fill: currentColor;
        overflow: hidden;
    }

    .notice-leave-active{transition: .5s;}
    .notice-leave-to{margin-top: -60px}

</style>