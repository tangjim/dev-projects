import Mock from "mockjs";
import config from "@/assets/js/conf/config";

const general = {
    firstAmount: 500,
    addTimes: 3,
    winRate: 0.1,
    loseRate: 0.3,
    additionalWinRate: 0.03,
    additionalLoseRate: 0.05,
    loseRateList: [
        {
            // loseRate:
        }
    ],
    addAmountTimesList: [
        {

        }
    ]
}
const advanced = {
    firstAmount: 500,
    addTimes: 3,
    winRate: 0.1,
    loseRate: 0.3,
    additionalWinRate: 0.03,
    additionalLoseRate: 0.05,
}
Mock.mock(config.baseApi+"/strategy/getDefaultStrategyItem", "post", function (opts) {
    // console.log(opts);
    let item = JSON.parse(opts.body);
    return {data: (item.level === 0 ? general : advanced), code: 1000, message: "success"};
});
