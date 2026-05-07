import Mock from "mockjs";
import config from "@/assets/js/conf/config";

let Random = Mock.Random;

Mock.Random.extend({
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

const rechargeWithdrawalList = [] // 用于接受生成数据的数组
for (let i = 0; i < 50; i++) { // 可自定义生成的个数
    const template = {
        coinCode: "USDT",
        protocolType: "TRC-20",
        amount: Random.float(100, 200, 8, 8),
        fee: 0,
        type: Random.integer(1, 2),
        // state: Random.integer(1, 2),
        createDate: Random.datetime("yyyy-MM-dd HH:mm:ss"),
        sourceAddress: Random.address(),
        targetAddress: Random.address()
    }
    if (template.type === 1) {
        template.state = Random.integer(1, 2);
    } else {
        template.auditState = Random.integer(1, 2, 3, 4);
    }
    rechargeWithdrawalList.push(template)
}

const userGainList = [];
for (let i = 0; i < 20; i++) { // 可自定义生成的个数
    const template = {
        amount: Random.float(10, 100, 6, 6),
        statisticsDate: Random.datetime("yyyy-MM-dd HH:mm:ss"),
    }
    userGainList.push(template)
}

const userGainDetailList = [];
for (let i = 0; i < 20; i++) { // 可自定义生成的个数
    const template = {
        orderNo: Random.id(),
        amount: Random.float(10, 100, 6, 6),
        rate: 0.1,
        createDate: Random.datetime("yyyy-MM-dd HH:mm:ss"),
    }
    userGainDetailList.push(template)
}

Mock.mock(config.baseApi+"/point/withdrawal", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"}
});

Mock.mock(config.baseApi+"/point/getRechargeWithdrawalByPage", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    let newRechargeWithdrawalList = rechargeWithdrawalList;
    newRechargeWithdrawalList.sort(function (a, b) {
        return new Date(b.createDate)-new Date(a.createDate)
    });
    if (postData.type !== 3) {
        newRechargeWithdrawalList = newRechargeWithdrawalList.filter((item)=>{ return item.type === postData.type; });
    }

    let [index, size, total] = [postData.pageNo, postData.pageSize, newRechargeWithdrawalList.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = newRechargeWithdrawalList.slice(index * size, (index + 1) * size);

    let data = {userCode: "test", totalSize:total, pageNo:size, pageSize:postData.pageSize, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});
Mock.mock(config.baseApi+"/point/transfer", "post", function (opts) {
    return {
        data:{},
        code: 1000,
        message: "success"
    }
});

const gainToday = Random.float(100, 1000, 4, 4);
const gain = Random.float(10000, 900000, 4, 4);
Mock.mock(config.baseApi+"/point/getUserGain", "post", function (opts) {
    return {
        data:{gainToday: gainToday, gain: gain},
        code: 1000,
        message: "success"
    }
});

Mock.mock(config.baseApi+"/gain/getUserGainByPage", "post", function (opts) {
    let item = JSON.parse(opts.body);

    userGainList.sort(function (a, b) {
        return new Date(b.statisticsDate)-new Date(a.statisticsDate)
    });

    let [index, size, total] = [item.pageNo, item.pageSize, userGainList.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = userGainList.slice(index * size, (index + 1) * size);

    let data = {userCode: "test", totalSize:total, pageNo:size, pageSize:item.pageSize, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});

Mock.mock(config.baseApi+"/point/getUserGainDetail", "post", function (opts) {
    let item = JSON.parse(opts.body);

    let [index, size, total] = [item.pageNo, item.pageSize, userGainDetailList.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = userGainDetailList.slice(index * size, (index + 1) * size);

    let data = {userCode: "test", totalSize:total, pageNo:size, pageSize:item.pageSize, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});