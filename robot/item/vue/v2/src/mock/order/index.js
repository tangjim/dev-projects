import Mock from "mockjs";
import config from "@/assets/js/conf/config";
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据
const dataList = [] // 用于接受生成数据的数组

for (let i = 0; i < 30; i++) { // 可自定义生成的个数
    const template = {
        "orderNo": Random.id(),
        "settlementState|+1":[0, 1, 2],
        "type|+1": [0, 1],
        "coinCode|+1": ["BTC/USDT", "ETH/USDT", "LTC/USDT", "BTH/USDT"],
        "exchangeName": "火币",
        "amount":Random.float(50, 100, 8, 8),
        "fee":Random.float(5, 20, 8, 8),
        "averagePrice":Random.float(20, 25, 8, 8),
        "gain": Random.float(1, 5, 8, 8),
        "num": Random.float(50, 70, 8, 8),
        "createCate": Random.datetime("yyyy-MM-dd HH:mm:ss"),
        "settlementDate": Random.datetime("yyyy-MM-dd HH:mm:ss"),
        "addTimes|+1": [1,2,3],
        "orderDetail": []
    }
    dataList.push(template)
}

const orders = [
    {
        orderNo: Random.id(),
        type: [0, 1],
        strategyCode: "",
        exchangeCode: "huobi",
        coinCode: "BTC-USDT",
        orderCoinCode: "USDT",
        firstAmount: Random.integer(100, 500),
        addTimes: 0,
        autoAddTimes: 0,
        handAddTimes: 0,
        num: 0,
        averagePrice: Random.float(20, 25, 8, 8),
        amount:Random.float(50, 100, 8, 8),
        fee:Random.float(5, 20, 8, 8),
        gain: Random.float(1, 5, 8, 8),
        settlementState: [0, 1, 2],
        settlementDate: "",
        createDate: "",
        remarks: ""
    }
];

Mock.mock(config.baseApi+"/order/list", "post", function (opts) {
    let item = JSON.parse(opts.body);
    let [index, size, total] = [item.pageNo, item.pageSize, dataList.length];
    let len = total / size;
    let totalPages = len - len > 0 ? len + 1 : len;
    let newDataList = dataList.slice(index * size, (index + 1) * size);

    for (let i=0; i<newDataList.length; i++) {
        newDataList[i].isOpen = false;
    }

    let data = {total:total, pageNo:size, list:newDataList, totalPages:totalPages};
    return {data:data, code:1000, message:"success"};
});
