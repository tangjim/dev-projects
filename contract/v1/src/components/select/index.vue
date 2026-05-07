<template>
    <div class="form-select" @click="open = !open">
        <div class="text">{{getText(value)}}</div>
        <svg class="icon" aria-hidden="true" :class="{'open':open}"><use :xlink:href="'#icon-jiantou1-copy'"></use></svg>
        <transition name="van-fade">
            <div class="option-wrapper" v-show="open">
                <ul>
                    <li v-for="(item, index) in options" :key="index" :class="{'active':item.value===value}" @click.shop="selected(index)">{{item.text}}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "my-select",
        props: {
            options: { type: Array },
            value: { type: Number }
        },
        computed: {
            getText() {
                return function (value) {
                    return this.options.filter((item)=>{ return item.value === value; })[0].text;
                };
            },
        },
        data() {
            return {
                open: false
            }
        },
        methods:{
            selected: function (index) {
                this.$emit("selected", this.options[index]);
            }
        }
    }
</script>

<style scoped>
    .option-wrapper {position: absolute;top: 60px;left:0;display: block;width: 100%;border-radius: 6px;background-color: #ffffff;z-index: 999;box-shadow: 0 0 5px rgba(204,204,204,1);max-height: 200px;overflow: hidden;overflow-y: auto}
    .option-wrapper ul {padding: 6px 0}
    .option-wrapper li {font-size: 24px;font-family:PingFang SC;font-weight:400;color: rgba(27,65,91,1);line-height: 50px;text-indent: 20px;}
    .option-wrapper li.active {background-color: #f3f3f3;color:rgb(37, 112, 147)}
</style>