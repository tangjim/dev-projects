import Mock from "mockjs";
import config from "@/assets/js/conf/config";

let Random = Mock.Random;
let coinPairList = {
    huobi: [
        {exchangeCode: Random.id(), coinCode: "BTC-USDT", showCode: "BTC/USDT", iconUrl: "", homePageShow: 1, sequence: 1, price:Random.float(9700, 9710, 2, 2), increase: Random.float(-2, 2, 2, 2)},
        {exchangeCode: Random.id(), coinCode: "ETH-USDT", showCode: "ETH/USDT", iconUrl: "", homePageShow: 1, sequence: 2, price:Random.float(270, 272, 2, 2), increase: Random.float(-2, 2, 2, 2)},
        {exchangeCode: Random.id(), coinCode: "LTC-USDT", showCode: "LTC/USDT", iconUrl: "", homePageShow: 1, sequence: 3, front_precision: 4, price:Random.float(5, 5, 4, 4), increase: Random.float(-2, 2, 2, 2)},
        {exchangeCode: Random.id(), coinCode: "BTH-USDT", showCode: "BTH/USDT", iconUrl: "", homePageShow: 1, sequence: 4, price:Random.float(70, 71, 2, 2), increase: Random.float(-2, 2, 2, 2)}
    ]
}

Mock.mock(config.baseApi+"/coinPair/getByExchangeCode", "post", function (opts) {
    // console.log(opts);
    let item = JSON.parse(opts.body);
    return {data: coinPairList[item.exchangeCode], code: 1000, message: "success"};
});