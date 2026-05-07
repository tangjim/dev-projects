import config from "../assets/js/conf/config";
import Mock from "mockjs";

Mock.Random.extend({
    phone: function () {
        let phonePrefixs = ["139","138","137","136","135","134","159","158","157","150","151","152","188","187","182","183","184","178","130","131","132","156","155","186","185","176","133","153","189","180","181","177"]; // 自己写前缀哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    },
    addressType: function () {
        let type = ["ERC20","TRC20","OMNI"];
        return this.pick(type);
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

Mock.mock(config.baseApi+"/member/getCheckCode", "post", function (opts) {
    // let smsCode = Mock.Random.string("number", 4);
    console.log(opts);
    return {code:1000,message:"success"};
});
Mock.mock(config.baseApi+"/member/login", "post", function (opts) {
    // let smsCode = Mock.Random.string("number", 4);
    console.log(opts);
    return {code:1000,message:"success"};
});
Mock.mock(config.baseApi+"/member/logout", "post", function (opts) {
    // let smsCode = Mock.Random.string("number", 4);
    console.log(opts);
    return {code:1000,message:"success"};
});

Mock.mock(config.baseApi+"/member/idNoCheck", "post", function (opts) {
    // let smsCode = Mock.Random.string("number", 4);
    console.log(opts);
    return {code:1000,message:"success"};
});

Mock.mock(config.baseApi+"/member/register", "post", function (opts) {
    // let smsCode = Mock.Random.string("number", 4);
    console.log(opts);
    return {code:1000,message:"注册成败功"};
});
Mock.mock(RegExp(config.baseApi+"/member/getMemberInfo" + ".*"), "get", {
    "data":{
        "userCode":Mock.Random.guid(),
        "mobilePhone": Mock.Random.phone(),
        "email": "",//Mock.Random.email(),
        "photoUrl": "/pic/1232131387/head/aaa.jpg",
        "setTransactionPassword": 0,
        "inviteUrl": "https://www.iconfont.cn/search/index?q=%E5%A4%8D",
        "inviteCode": "3eg4q9"
    },
    code:1000,
    message:"success"
});
Mock.mock(RegExp(config.baseApi+"/member/getAddressInfo" + ".*"), "get", {
    "data":{
        "userCode":Mock.Random.guid(),
        "addressInfo|5":[
            {
                "productCode":"USDT",
                "address|+1":[Mock.Random.address,Mock.Random.address,Mock.Random.address,Mock.Random.address,Mock.Random.address],
                "type|+1":[Mock.Random.addressType(),Mock.Random.addressType(),Mock.Random.addressType(),Mock.Random.addressType(),Mock.Random.addressType()],
            }
        ],
    },
    code:1000,
    message:"success"
});

Mock.mock(RegExp(config.baseApi+"/member/getIdInfo" + ".*"), "get", {
    "data":{
        "userCode":Mock.Random.guid(),
        // "idCard":Mock.Random.id(),
        // "realName":Mock.Random.cname(),
        "idCard":"",
        "realName":"",
    },
    code:1000,
    message:"success"
});

Mock.mock(RegExp(config.baseApi+"/profit/getProfitInfo" + ".*"), "get", function (opts) {
    let item = JSON.parse(opts.body);
    let data = {userCode:Mock.Random.guid(),type:item.type, list:[]};
    for (let i=0; i<item.num; i++) {
        let d = {mobilePhone:Mock.Random.phone().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'), email: "",amount:Mock.Random.float(1, 20, 2, 2),registerDate:Mock.Random.date("yyyy-MM-dd HH:mm:ss")};
        data.list.push(d);
    }
    return {data:data, code:1000, message:"success"};
});

Mock.mock(RegExp(config.baseApi+"/profit/weekProfitOrder" + ".*"), "get", function (opts) {
    let item = JSON.parse(opts.body);
    let data = [];
    for (let i=0; i<item.num; i++) {
        let d = {
            userCode: Mock.Random.guid(),
            mobilePhone: Mock.Random.phone(),
            email: "",
            amount: Mock.Random.float(600, 2000, 2, 2),
            // sequence: (i+1)
        };
        data.push(d);
    }
    data.sort(function (a, b) {
        return b.amount-a.amount
    });
    for (let i=0; i<data.length; i++) {
        data[i].sequence = (i+1);
    }
    return {data:data, code:1000, message:"success"};
});


Mock.mock(config.baseApi+"/susProduct/getSusProductInfo", "get", {
    "data|4":[{
        // "productCode|+1":["BTC/USDT", "ETH/USDT", "LTC/USDT", "EOS/USDT", "ETH/USDT"],
        // "productName|+1":["比特币对泰达币", "以太币对泰达币", "莱特币对泰达币" ,"柚子币对泰达币" ,"以太币对泰达币"],
        // "productRemark|+1": ["BTC/USDT", "ETH/USDT", "LTC/USDT", "EOS/USDT", "ETH/USDT"],
        "codePrefix|+1":["BTC", "ETH", "LTC", "EOS", "ETH"],
        "codeSuffix":"USDT",
        "namePrefix|+1":["比特币", "以太币", "莱特币", "柚子币", "以太币"],
        "nameSuffix|+1":"泰达币",
        "remarkPrefix|+1":["BTC", "ETH", "LTC", "EOS", "ETH"],
        "remarkSuffix":"USDT",
        "type":"永续合约",
        "price|+1":[Mock.Random.float(9700, 9710, 2, 2),Mock.Random.float(270, 272, 2, 2),Mock.Random.float(5, 5, 4, 4), Mock.Random.float(70, 71, 2, 2),Mock.Random.float(9700, 9710, 2, 2)],
        "increase|+1":[Mock.Random.float(-2, 2, 2, 2),Mock.Random.float(-2, 2, 2, 2),Mock.Random.float(-2, 2, 2, 2),Mock.Random.float(-2, 2, 2, 2),Mock.Random.float(-2, 2, 2, 2)],
        "priceCny|+1":[Mock.Random.float(80000, 90000, 2, 2),Mock.Random.float(1000, 2000, 2, 2),Mock.Random.float(30, 40, 2, 2),Mock.Random.float(400, 500, 2, 2),Mock.Random.float(80000, 90000, 2, 2)]
    }],
    code:1000,
    message:"success"
});

// Mock.mock(config.baseApi+"/susProduct/getPriceInfo", "get", {
//     "data|4":[{
//         // "productCode|+1":["BTC/USDT", "ETH/USDT", "LTC/USDT", "EOS/USDT", "ETH/USDT"],
//         // "productName|+1":["比特币对泰达币", "以太币对泰达币", "莱特币对泰达币" ,"柚子币对泰达币" ,"以太币对泰达币"],
//         // "productRemark|+1": ["BTC/USDT", "ETH/USDT", "LTC/USDT", "EOS/USDT", "ETH/USDT"],
//         "codePrefix|+1":["BTC", "ETH", "LTC", "EOS", "ETH"],
//         "codeSuffix":"USDT",
//         "namePrefix|+1":["比特币", "以太币", "莱特币", "柚子币", "以太币"],
//         "nameSuffix|+1":"泰达币",
//         "remarkPrefix|+1":["BTC", "ETH", "LTC", "EOS", "ETH"],
//         "remarkSuffix":"USDT",
//         "type":"永续合约",
//         "price|+1":[Mock.Random.float(9700, 9710, 2, 2),Mock.Random.float(270, 272, 2, 2),Mock.Random.float(5, 5, 4, 4), Mock.Random.float(70, 71, 2, 2),Mock.Random.float(9700, 9710, 2, 2)],
//         "increase|+1":[Mock.Random.float(-2, 2, 2, 2),Mock.Random.float(-2, 2, 2, 2),Mock.Random.float(-2, 2, 2, 2),Mock.Random.float(-2, 2, 2, 2),Mock.Random.float(-2, 2, 2, 2)],
//         "priceCny|+1":[Mock.Random.float(80000, 90000, 2, 2),Mock.Random.float(1000, 2000, 2, 2),Mock.Random.float(30, 40, 2, 2),Mock.Random.float(400, 500, 2, 2),Mock.Random.float(80000, 90000, 2, 2)]
//     }],
//     code:1000,
//     message:"success"
// });

Mock.mock(config.baseApi+"/susProduct/getPriceInfo", "post", function (opts) {
    let item = JSON.parse(opts.body);
    let data = {
        "codePrefix": "BTC",
        "codeSuffix": "USDT",
        "namePrefix": "比特币",
        "nameSuffix": "泰达币",
        "remarkPrefix": "BTC",
        "remarkSuffix": "USDT",
        "price": 1000.00,
        "priceCny": 7000.00,
        "increase": "10%"
    };
    return {data:data, code:1000, message:"success"};
});

Mock.mock(RegExp(config.baseApi+"/member/getAssetInfo" + ".*"), "get", {
    data:{
        userCode:Mock.Random.guid(),
        contractTotal:12,
        contractTotalCny: 100000,
        coinTotal: 12,
        coinTotalCny: 100000,
        "contractDetails|1":
            [
                {
                    "coinCode": "BTC-USDT",
                    "coinName": "比特币对泰达币",
                    "coinShowName": "BTC/USDT",
                    "coinRight": 1000.00,
                    "coinUseable": 1000.00,
                    "coinFreeze": 1000.00
                }
            ],
        "coinDetails|5":
            [
                {
                    "coinCode|+1": ["BTC","ETH","LTC","EOS","USDT"],
                    "coinName|+1": ["比特币", "以太币", "莱特币", "柚子币", "泰达币"],
                    "coinShowName|+1": ["BTC","ETH","LTC","EOS","USDT"],
                    "coinUseable|+1": [Mock.Random.float(500, 1000, 6, 6),Mock.Random.float(500, 1000, 6, 6),Mock.Random.float(500, 1000, 6, 6), Mock.Random.float(500, 1000, 6, 6),Mock.Random.float(500, 1000, 6, 6)],
                    "coinFreeze|+1": [Mock.Random.float(500, 1000, 6, 6),Mock.Random.float(500, 1000, 6, 6),Mock.Random.float(500, 1000, 6, 6), Mock.Random.float(500, 1000, 6, 6),Mock.Random.float(500, 1000, 6, 6)],
                    "coinTotalCny|+1": [Mock.Random.float(100000, 999999, 2, 2),Mock.Random.float(100000, 999999, 2, 2),Mock.Random.float(100000, 999999, 2, 2),Mock.Random.float(100000, 999999, 2, 2),Mock.Random.float(100000, 999999, 2, 2),]
                }
            ],
    },
    code:1000,
    message:"success"
});

Mock.mock(RegExp(config.baseApi+"/member/withdrawal/record" + ".*"), "get", {
    "data":{
        "userCode":Mock.Random.guid(),
        "list|15":[
            {
                "productCode":"USDT",
                "address|+1":[Mock.Random.address,Mock.Random.address,Mock.Random.address,Mock.Random.address,Mock.Random.address],
                "type|+1":[Mock.Random.addressType(),Mock.Random.addressType(),Mock.Random.addressType(),Mock.Random.addressType(),Mock.Random.addressType()],
                "amount|+1":[Mock.Random.float(600, 2000, 2, 2),Mock.Random.float(600, 2000, 2, 2),Mock.Random.float(600, 2000, 2, 2)],
                "date|+1":[Mock.Random.date("yyyy-MM-dd HH:mm:ss"),Mock.Random.date("yyyy-MM-dd HH:mm:ss"),Mock.Random.date("yyyy-MM-dd HH:mm:ss"),Mock.Random.date("yyyy-MM-dd HH:mm:ss"),Mock.Random.date("yyyy-MM-dd HH:mm:ss")],
                "state|+1":[0,1],
            }
        ],
        "total": 30
    },
    code:1000,
    message:"success"
});

Mock.mock(RegExp(config.baseApi+"/member/recharge/record" + ".*"), "get", {
    "data":{
        "userCode":Mock.Random.guid(),
        "list|15":[
            {
                "productCode":"USDT",
                "address|+1":[Mock.Random.address,Mock.Random.address,Mock.Random.address,Mock.Random.address,Mock.Random.address],
                "type|+1":[Mock.Random.addressType(),Mock.Random.addressType(),Mock.Random.addressType(),Mock.Random.addressType(),Mock.Random.addressType()],
                "amount|+1":[Mock.Random.float(600, 2000, 2, 2),Mock.Random.float(600, 2000, 2, 2),Mock.Random.float(600, 2000, 2, 2)],
                "date|+1":[Mock.Random.date("yyyy-MM-dd HH:mm:ss"),Mock.Random.date("yyyy-MM-dd HH:mm:ss"),Mock.Random.date("yyyy-MM-dd HH:mm:ss"),Mock.Random.date("yyyy-MM-dd HH:mm:ss"),Mock.Random.date("yyyy-MM-dd HH:mm:ss")],
                "state|+1":[1],
            }
        ],
        "total": 30
    },
    code:1000,
    message:"success"
});