import Mock from "mockjs";
import config from "@/assets/js/conf/config";

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据
const noticeList = []; // 用于接受生成数据的数组
const helpCenterLis = [];

for (let i = 0; i < 30; i++) { // 可自定义生成的个数
    const template = {
        id: Random.id(),
        title: Random.ctitle(10, 15),
        content: Random.cparagraph(),
        createDate: Random.datetime("yyyy-MM-dd HH:mm:ss"),
        remarks: "",
    }
    noticeList.push(template)
}

for (let i = 0; i < 30; i++) { // 可自定义生成的个数
    const template = {
        id: Random.id(),
        title: Random.ctitle(10, 15),
        content: Random.cparagraph(),
        createDate: Random.datetime("yyyy-MM-dd HH:mm:ss"),
        remarks: "",
    }
    helpCenterLis.push(template)
}


Mock.mock(config.baseApi+"/common/getNoticeList", "post", function (opts) {
    let data = noticeList.slice(0,10);
    return {data:data, code:1000, message:"success"};
});
Mock.mock(config.baseApi+"/common/getNoticeListByPage", "post", function (opts) {
    let item = JSON.parse(opts.body);

    let [index, size, total] = [item.pageNo, item.pageSize, noticeList.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = noticeList.slice(index * size, (index + 1) * size);

    let data = {totalSize:total, pageNo:size, pageSize:item.pageSize, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});
Mock.mock(config.baseApi+"/common/getNoticeDoc", "post", function (opts) {
    let item = JSON.parse(opts.body);
    let data = noticeList.filter((notice)=>{ return notice.id === item.id; })[0];
    return {data:data, code:1000, message:"success"};
});

Mock.mock(config.baseApi+"/common/getHelpCenterList", "post", function (opts) {
    let item = JSON.parse(opts.body);

    let [index, size, total] = [item.pageNo, item.pageSize, helpCenterLis.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = helpCenterLis.slice(index * size, (index + 1) * size);

    let data = {totalSize:total, pageNo:size, pageSize:item.pageSize, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});
Mock.mock(config.baseApi+"/common/getHelpDoc", "post", function (opts) {
    let item = JSON.parse(opts.body);
    let data = helpCenterLis.filter((help)=>{ return help.id === item.id; })[0];
    return {data:data, code:1000, message:"success"};
});

const exchangeList = [
    {exchangeCode: "huobi", showCode: "HB", exchangeName: "hb", showName: "火币", iconUrl: "#icon-huobi-01", isValid: 1, homePageShow: 1, address:"", appAddress:"", techAddress: ""},
    {exchangeCode: "binance", showCode: "BA", exchangeName: "ba", showName: "Binance", iconUrl: "#icon-bian-01", isValid: 0, homePageShow: 0, address:"", appAddress:"", techAddress: ""},
    {exchangeCode: "okex", showCode: "OK", exchangeName: "ok", showName: "欧易OKEx", iconUrl: "#icon-okex", isValid: 0, homePageShow: 0, address:"", appAddress:"", techAddress: ""},
    // {exchangeCode: "Bter", showCode: "BT", exchangeName: "bt", showName: "比特儿", iconUrl: "", isValid: 0, homePageShow: 0, address:"", appAddress:"", techAddress: ""}
];
Mock.mock(config.baseApi+"/common/getExchangeList", "post", function (opts) {
    return {data:exchangeList, code:1000, message:"success"};
});