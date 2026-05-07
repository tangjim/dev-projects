import config from "@/assets/js/websocket/config";
import allStore from '@/store';
let Socket = {
    lockReconnect: false,
    tt: null,
    readyState: false,
    // 创建
    create() {
        try {
            // console.log(process.env["VUE_APP_"+allStore.getters["exchange/currentExchangeShowCode"]+"_SOCKET_ADDRESS_IP"]);
            let ip = process.env["VUE_APP_"+allStore.getters["exchange/currentExchangeShowCode"]+"_SOCKET_ADDRESS_IP"];
            let port = process.env["VUE_APP_"+allStore.getters["exchange/currentExchangeShowCode"]+"_SOCKET_ADDRESS_PORT"];
            console.log("创建socket---");
            this.WS = new WebSocket("ws://" + ip + ":" + port + "/" + config.dir);
            this.init();
        } catch(e) {
            console.log('catch');
            this.reconnect();
        }
    },
    // 初始化
    init() {
        if (!this.WS) {
            this.create();
        } else {
            this.WS.onerror = this.onError;
            this.WS.onclose = this.onClose;
            this.WS.onopen = this.onOpen;
            this.WS.onmessage = this.onMessage;
        }
    },
    /**
     * 获取数据回调
     */
    onMessage(res) {
        try {
            let resData = JSON.parse(res.data);
            if (resData.pushType === 1 || resData.pushType === 3) {
                allStore.dispatch("coinPair/socketMessage", resData).then();
            }
        } catch (e) {
            console.log(e);
        }
    },
    // 获取失败回调
    onError() {
        console.log("连接错误");
        Socket.reconnect();
    },
    // 关闭连接回调
    onClose() {
        console.log("连接关闭");
        Socket.reconnect();
    },
    onOpen() {
        console.log("连接成功，开启心跳检测重置---"+Socket.WS.readyState);
        if (allStore.getters["user/loginState"]) {
            Socket.send({pushType:2, userCode:allStore.getters["user/get"].userCode});
        }
        //开启心跳检测
        heartCheck.start();
    },

    /**
     * 关闭连接
     */
    close() {
        this.WS.close();
        this.WS = null;
    },

    /**
     * 发送数据
     * @param data
     */
    send(data) {
        console.log("send->"+JSON.stringify(data))
        this.waitForConnection(()=>{
            this.WS.send(JSON.stringify(data));
            // if (typeof callback !== "undefined") {
            //     callback();
            // }
        }, 1000);
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
     * socket重连
     */
    reconnect() {
        if(this.lockReconnect) return;
        this.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        this.tt && clearTimeout(this.tt);
        this.tt = setTimeout(()=> {
            this.create();
            this.lockReconnect = false;
        }, 4000);
    }
};

// 心跳检测
let heartCheck = {
    timeout: 3000,
    timeoutObj: null,
    serverTimeoutObj: null,
    start: function() {
        // console.log('start');
        let self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function() {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            if (Socket.WS && (Socket.WS.readyState === 2 || Socket.WS.readyState === 3)) {
                Socket.WS.close();
            } else {
                self.start();
            }
        }, this.timeout);
    }
}

export default Socket;