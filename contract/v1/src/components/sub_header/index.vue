<template>
    <div>
        <div class="sub-header">
            <div class="header-l"><slot name="header-left"></slot></div>
            <div class="header-m"><slot name="header-middle"></slot></div>
            <div class="header-r"><slot name="header-right"></slot></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sub-header"
    }
</script>

<style scoped>
    .sub-header {width:672px;height:80px;background: rgb(255, 255, 255);opacity:1;margin: auto 0;position: fixed;z-index: 9;display: flex;padding: 0 40px 0 38px;top: 0;}
    .sub-header .header-l, .sub-header .header-r, .sub-header .header-m {display: table-cell;}
    .sub-header .header-l {width: 230px;}
    .sub-header .header-r {width: 230px;}
    .sub-header .header-r {text-align: right;}
    .sub-header .header-m {width: 100%;}
</style>