// import Vue from 'vue';
// const ip = "127.0.0.1";
// 测试
const ip = "8.210.96.227";

const port = "8989";
const dir = "ws";

let Socket = {
    // 初始化
    init() {
        // let loginSession = "";
        // const getUrlParam = (name) => {
        //     let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        //     let r = window.location.search.substr(1).match(reg);    // 匹配目标参数
        //     if (r != null) return unescape(r[2]);
        //     return null;    // 返回参数值
        // };
        // loginSession = getUrlParam("login");
        // console.log(loginSession);

        this.WS = new WebSocket("ws://" + ip + ":" + port + "/" + dir);
        this.onError();
        this.onClose();
    },
    close() {
        this.WS.close();
    },

    /**
     * 发送数据
     * @param data
     */
    send(data) {
        this.waitForConnection(()=>{
            this.WS.send(JSON.stringify(data));
            if (typeof callback !== "undefined") {
                callback();
            }
        }, 1000)
    },
    /**
     * 发送器
     * @param callback
     * @param interval
     */
    waitForConnection(callback, interval) {
        if (this.WS.readyState === 1) {
            callback();
        } else {
            setTimeout(()=>{
                this.waitForConnection(callback, interval)
            }, interval);
        }
    },
    /**
     * 获取数据回调
     * @param callback
     */
    onMessage(callback) {
        this.WS.onmessage = (res) => {
            try {
                let resData = JSON.parse(res.data);
                callback(resData);
            } catch (e) {
                console.log(e);
            }
        };
    },
    // 获取失败回调
    onError() {
        this.WS.onerror = (res) => {
            console.log("连接错误");
        };
    },
    // 关闭连接回调
    onClose() {
        this.WS.onclose = (res) => {};
    }
};
export default Socket;