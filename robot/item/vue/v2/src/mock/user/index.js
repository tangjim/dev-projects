import Mock from "mockjs";
import config from "@/assets/js/conf/config";

let Random = Mock.Random;

Mock.Random.extend({
    phone: function () {
        let phonePrefixs = ["139","138","137","136","135","134","159","158","157","150","151","152","188","187","182","183","184","178","130","131","132","156","155","186","185","176","133","153","189","180","181","177"]; // 自己写前缀哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    },
    address: function () {
        let $chars = 'abcdefhijkmnprstwxyz2345678';
        let maxPos = $chars.length;
        let pwd = '';
        for (let i = 0; i < 41; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return "0x"+pwd;
    }
});

const userCode = "test";
const userInfo = {
    userCode: userCode,
    userName: "用户昵称",
    mobilePhone: Random.phone(),
    nickName: Random.cname(),
    photoUrl: "",
    inviteCode: Random.string("1234567890qwertyuiopasdfghjklzxcvbnm", 6),
    setTradePassword: Random.integer(0, 1),
    agentLevel: "V1",
    list: [{exchangeCode:"huobi", showCode:"HuoBi", showName:"火币", isOverdue:Random.integer(0, 1), dueDate:Mock.Random.date("yyyy-MM-dd")}]
};
const userAssetInfo = {
    userCode: userCode,
    totalGain: Random.float(1000, 2000, 4, 4),
    totalProfit: Random.float(500, 1000, 4, 4),
    assetState: Random.integer(0, 1),
    list: [{coinCode: "USDT", amount: Random.float(0, 10000, 8, 8), freezeAmount: 0}]
};

const withdrawalAddressList = [] // 用于接受生成数据的数组
for (let i = 0; i < 10; i++) { // 可自定义生成的个数
    const template = {
        id: Random.id(),
        coinCode: "USDT",
        protocolType: "TRC-20",
        address: Random.address(),
        remarks: ""
    }
    withdrawalAddressList.push(template)
}

const userRechargeAddress = {
    "TRC-20": {
        userCode: "test",
        address: Random.address(),
    }
}

Mock.mock(config.baseApi+"/user/register", "post", function (opts) {
    // let smsCode = Mock.Random.string("number", 4);
    console.log(opts);
    return {code:1000, message:"注册成败功"};
});

Mock.mock(config.baseApi+"/user/login", "post", function (opts) {
    // let smsCode = Mock.Random.string("number", 4);
    let item = JSON.parse(opts.body);
    // return {code:1000,message:"success"};
    if (item.userName === "test" && item.password === "123456") {
        return {
            data:{
                userCode: "test",
                userName: "test",
                mobilePhone: Random.phone(),
                nickName: Random.cname(),
                photoUrl: "",
                inviteCode: Random.string("1234567890qwertyuiopasdfghjklzxcvbnm", 6)
            },
            code: 1000,
            message: "success"
        }
    } else {
        return {
            data: {},
            code: 2000,
            message: "登录失败，用户名或密码错误"
        }
    }
});

Mock.mock(config.baseApi+"/user/createAddress", "post", function (opts) {
    // let smsCode = Mock.Random.string("number", 4);
    // console.log(opts);
    let item = JSON.parse(opts.body);
    return {
        data: {
            userCode: "test",
            coinCode: item.coinCode,
            protocolType: item.protocolType,
            address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
        },
        code: 1000,
        message: "success"
    }
});

Mock.mock(config.baseApi+"/user/getUserInfo", "post", function (opts) {
    // let smsCode = Mock.Random.string("number", 4);
    let item = JSON.parse(opts.body);
    return {data:userInfo, code: 1000, message: "success"}
});

Mock.mock(config.baseApi+"/user/getAssetInfo", "post", function (opts) {
    return {data: userAssetInfo, code: 1000, message: "success"}
});

Mock.mock(config.baseApi+"/user/getRechargeAddress", "post", function (opts) {
    let item = JSON.parse(opts.body);
    return {data:userRechargeAddress[item.protocolType], code: 1000, message: "success"}
});

Mock.mock(config.baseApi+"/user/getCheckCodeByPhone", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});

Mock.mock(config.baseApi+"/user/getCheckCodeByUserName", "post", function (opts) {
    return {data:{mobilePhone:userInfo.mobilePhone}, code: 1000, message: "success"}
});
Mock.mock(config.baseApi+"/user/getCheckCode", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});
Mock.mock(config.baseApi+"/user/findPassword", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});
Mock.mock(config.baseApi+"/user/setTradePassword", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});
Mock.mock(config.baseApi+"/user/updateTradePassword", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});
Mock.mock(config.baseApi+"/user/updatePassword", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});
Mock.mock(config.baseApi+"/user/bindMobilePhone", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});
Mock.mock(config.baseApi+"/user/addWithdrawalAddress", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});
Mock.mock(config.baseApi+"/user/getWithdrawalAddressList", "post", function (opts) {
    let item = JSON.parse(opts.body);

    let [index, size, total] = [item.pageNo, item.pageSize, withdrawalAddressList.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = withdrawalAddressList.slice(index * size, (index + 1) * size);

    let data = {userCode: "test", totalSize:total, pageNo:size, pageSize:item.pageSize, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});
Mock.mock(config.baseApi+"/user/deleteWithdrawalAddress", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});

Mock.mock(config.baseApi+"/user/logout", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});