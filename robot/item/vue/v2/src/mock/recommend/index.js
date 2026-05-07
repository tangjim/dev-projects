import Mock from "mockjs";
import config from "@/assets/js/conf/config";

let Random = Mock.Random;

Mock.Random.extend({
    phone: function () {
        let phonePrefixs = ["139","138","137","136","135","134","159","158","157","150","151","152","188","187","182","183","184","178","130","131","132","156","155","186","185","176","133","153","189","180","181","177"]; // 自己写前缀哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    },
});


const recommendTotal = Random.integer(0, 200);
const activateProfitTotal = Random.float(1000000, 3000000, 0, 2);
const orderProfitTotal = Random.float(100000, 900000, 0, 2);
Mock.mock(config.baseApi+"/recommend/getRecommendInfo", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    return {data: {recommendTotal: recommendTotal, activateProfitTotal: activateProfitTotal, orderProfitTotal: orderProfitTotal}, code:1000, message:"success"};
});

const recommendList = [];
for (let i = 0; i < 50; i++) { // 可自定义生成的个数
    const template = {
        nickName: Random.name(),
        mobilePhone: Random.phone(),
        createDate: Random.datetime("yyyy-MM-dd HH:mm:ss"),
    }
    recommendList.push(template)
}

Mock.mock(config.baseApi+"/recommend/getRecommendList", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    recommendList.sort(function (a, b) {
        return new Date(b.createDate)-new Date(a.createDate)
    });
    let newData = recommendList.slice(0, postData.rows);
    return {data:newData, code:1000, message:"success"};
});
Mock.mock(config.baseApi+"/recommend/getRecommendListByPage", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    recommendList.sort(function (a, b) {
        return new Date(b.createDate)-new Date(a.createDate)
    });

    let [index, size, total] = [postData.pageNo, postData.pageSize, recommendList.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = recommendList.slice(index * size, (index + 1) * size);

    let data = {totalSize:total, pageNo:size, pageSize:postData.pageSize, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});

const recommendProfitList = [];
for (let i = 0; i < 50; i++) { // 可自定义生成的个数
    const template = {
        nickName: Random.name(),
        mobilePhone: Random.phone(),
        amount: Random.float(1000, 90000, 0, 2),
        type: Random.integer(1, 2),
        subType: Random.integer(1, 2),
        orderNo: Random.datetime("yyyyMMddHHmmss"),
        createDate: Random.datetime("yyyy-MM-dd HH:mm:ss"),
    }
    recommendProfitList.push(template)
}

Mock.mock(config.baseApi+"/recommend/getRecommendProfitList", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    recommendProfitList.sort(function (a, b) {
        return new Date(b.createDate)-new Date(a.createDate)
    });
    let newData = recommendProfitList.slice(0, postData.rows);
    return {data:newData, code:1000, message:"success"};
});
Mock.mock(config.baseApi+"/recommend/getRecommendProfitListByPage", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    recommendProfitList.sort(function (a, b) {
        return new Date(b.createDate)-new Date(a.createDate)
    });

    let [index, size, total] = [postData.pageNo, postData.pageSize, recommendProfitList.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = recommendProfitList.slice(index * size, (index + 1) * size);

    let data = {totalSize:total, pageNo:size, pageSize:postData.pageSize, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});

const teamTotal = Random.integer(0, 500);
const profitTotal = Random.float(100000, 900000, 0, 2);
Mock.mock(config.baseApi+"/recommend/getTeamInfo", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    return {data: {teamTotal: teamTotal, profitTotal: profitTotal}, code:1000, message:"success"};
});

const teamRecommendList = [];
for (let i = 0; i < 50; i++) { // 可自定义生成的个数
    const template = {
        nickName: Random.name(),
        mobilePhone: Random.phone(),
        createDate: Random.datetime("yyyy-MM-dd HH:mm:ss"),
    }
    teamRecommendList.push(template)
}

Mock.mock(config.baseApi+"/recommend/getTeamRecommendList", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    teamRecommendList.sort(function (a, b) {
        return new Date(b.createDate)-new Date(a.createDate)
    });
    let newData = teamRecommendList.slice(0, postData.rows);
    return {data:newData, code:1000, message:"success"};
});
Mock.mock(config.baseApi+"/recommend/getTeamRecommendListByPage", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    teamRecommendList.sort(function (a, b) {
        return new Date(b.createDate)-new Date(a.createDate)
    });

    let [index, size, total] = [postData.pageNo, postData.pageSize, teamRecommendList.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = teamRecommendList.slice(index * size, (index + 1) * size);

    let data = {totalSize:total, pageNo:size, pageSize:postData.pageSize, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});

const teamRecommendProfitList = [];
for (let i = 0; i < 50; i++) { // 可自定义生成的个数
    const template = {
        nickName: Random.name(),
        mobilePhone: Random.phone(),
        amount: Random.float(1000, 90000, 0, 2),
        type: Random.integer(1, 2),
        subType: Random.integer(1, 2),
        orderNo: Random.datetime("yyyyMMddHHmmss"),
        createDate: Random.datetime("yyyy-MM-dd HH:mm:ss"),
    }
    teamRecommendProfitList.push(template)
}

Mock.mock(config.baseApi+"/recommend/getTeamProfitList", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    teamRecommendProfitList.sort(function (a, b) {
        return new Date(b.createDate)-new Date(a.createDate)
    });
    let newData = teamRecommendProfitList.slice(0, postData.rows);
    return {data:newData, code:1000, message:"success"};
});
Mock.mock(config.baseApi+"/recommend/getTeamProfitListByPage", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    teamRecommendProfitList.sort(function (a, b) {
        return new Date(b.createDate)-new Date(a.createDate)
    });

    let [index, size, total] = [postData.pageNo, postData.pageSize, teamRecommendProfitList.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = teamRecommendProfitList.slice(index * size, (index + 1) * size);

    let data = {totalSize:total, pageNo:size, pageSize:postData.pageSize, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});
