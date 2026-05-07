<template>
    <div class="my-input">
        <div class="form-group" :class="groupCss">
            <i class="iconfont" :class="icon" v-if="icon"></i>
            <input type="password" :value="value" :type="type" :minlength="minlength" :maxlength="maxlength" :placeholder="placeholder" v-on:input="onInput($event.target.value)" @focus="onFocus" @blur="onBlur" />
            <div class="form-group-btn" v-if="isRBtn"><slot name="input-btn"></slot></div>
        </div>
        <div class="message" v-if="message">{{message}}</div>
    </div>
</template>

<script>
    // import {required, email} from"../../utils/validate"
    export default {
        name: "my-input",
        props: {
            type: {
                type: String,
                default: "text"
            },
            placeholder: {
                type: String,
                default: ""
            },
            icon: {
                type: String,
                default: ""
            },
            isRBtn: {
                type:Boolean,
                default: false
            },
            minlength: {
                type:Number
            },
            maxlength: {
                type:Number
            },
            value: {
                type: String
            },
            rules: {
                type: Array,
                required: false,
            }
        },
        data() {
            return {
                groupCss:"form-group-default",
                message: "",
                flag: true
            }
        },
        methods: {
            onFocus: function () {
                if (this.groupCss !== "form-group-error") {
                    this.groupCss = "form-group-focus";
                }
            },
            onBlur: function () {
                let groupCss = "form-group-default";
                this.validate();
                if (!this.flag) {
                    groupCss = "form-group-error";
                } else {
                    this.message = "";
                }
                this.groupCss = groupCss;
                // this.$emit("validate", flag);
            },
            onInput: function (value) {
                this.$emit("input", value);
            },
            validate: function () {
                this.flag = true;
                if (this.rules && this.rules.length > 0) {
                    // 根据规则验证文本
                    for (let i = 0; i < this.rules.length; i++) {
                        for (let rule in this.rules[i]) {
                            // let fun = eval("this."+rule);
                            // if (eval(rule + "('"+this.value+"', "+this.rules[i][rule]+")")) {
                            // if (new fun(this.value, this.rules[i][rule])) {
                            if (this.doCallback(eval("this." + rule), [this.value, this.rules[i][rule]])) {
                                this.message = this.rules[i].message;
                                this.groupCss = "form-group-error";
                                this.flag = false;
                                return;
                            }
                        }
                    }
                }
            },
            doCallback: function (fn, args) {
                if (fn.apply) {
                    return fn.apply(this, args);
                }
            },
            required: function (txt, rule) {
                return txt.match(/^\s*$/);
            },
            email: function (txt, rule) {
                return (txt.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) === -1);
            },
            repeat: function (txt, rule) {
                return txt !== eval("this.$parent."+rule);
            },
            len: function (txt, rule) {
                return (this.minLen(txt, rule[0]) || this.maxLen(txt, rule[1]));
            },
            minLen: function (txt, rule) {
                return (txt.length < rule);
            },
            maxLen: function (txt, rule) {
                return txt.length > rule;
            },
            checkPassword: function (txt, rule) {
                let flag = false;
                if (rule.indexOf("letterAndNumber") > -1) {
                    flag = txt.match(/^(?![^a-zA-Z]+$)(?!\D+$)/);
                }
                if (rule.indexOf("letter") > -1) {
                    flag = txt.match(/^(?![^a-zA-Z]+$)/);
                }
                if (rule.indexOf("number") > -1) {
                    flag = txt.match(/^(?!\D+$)/);
                }
                return !flag;
            }
        }
    }
</script>

<style scoped>
    .my-input {position: relative}
    .my-input .message {font-size:20px;font-family:Microsoft YaHei;font-weight:400;line-height:28px;color:rgba(255,64,64,1);margin-top: 10px;}
    .form-group {width:100%;margin: 0 auto;border:2px solid;height: 80px;line-height: 80px;display: table;position: relative;overflow: hidden;border-radius:10px;}
    .form-group-default {border-color: rgba(199,220,255,1);}
    .form-group-focus {border-color: rgb(160, 202, 255)}
    .form-group-error {border-color: rgba(255,64,64,1);}
    .form-group i {text-align: center;width: 38px;display: table-cell;white-space: nowrap;vertical-align: middle;}
    .form-group i.iconfont {color: rgba(94,94,94,1);font-size: 36px;}
    .form-group input {float: left;border: 0;padding: 0;margin: 0;height: 100%;line-height: 80px;display: table-cell;width: 100%;color: #666666;text-indent: 20px;font-size:32px;font-family:Microsoft YaHei;font-weight:400;color:rgba(27,65,91,1);border-radius:10px;}
    /*.form-group input:focus {}*/
    .form-group .form-group-btn {display: table-cell;overflow: hidden;height: 100%;border-radius: 10px;text-align: center;}

    input::-webkit-input-placeholder {
        font-size:32px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:80px;
        color:rgba(197,208,213,1);
    }
    input:-moz-placeholder {
        font-size:32px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:80px;
        color:rgba(197,208,213,1);
    }
    input:-ms-input-placeholder {
        font-size:32px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:80px;
        color:rgba(197,208,213,1);
        background: transparent;
        border: 0;
    }
</style>