import Mock from "mockjs";
import config from "@/assets/js/conf/config";

let periodCostInfo = {
    huobi:[
        {periodType: 1, days:30, cost:20, discountCost: 15},
        {periodType: 2, days:60, cost:60, discountCost: 40},
        {periodType: 3, days:1, cost:240, discountCost: 120},
    ]
};


Mock.mock(config.baseApi+"/robot/getPeriodCostInfo", "post", function (opts) {
    // console.log(opts);
    let item = JSON.parse(opts.body);
    return {data: periodCostInfo[item.exchangeCode], code: 1000, message: "success"};
});

Mock.mock(config.baseApi+"/robot/buy", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"};
});

Mock.mock(config.baseApi+"/robot/apiAuthorization", "post", function (opts) {
    return {data:{}, code: 1000, message: "success"};
});
