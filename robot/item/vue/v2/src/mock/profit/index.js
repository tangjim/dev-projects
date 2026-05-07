import Mock from "mockjs";
import config from "@/assets/js/conf/config";

let Random = Mock.Random;

Mock.Random.extend({
    phone: function () {
        let phonePrefixs = ["139","138","137","136","135","134","159","158","157","150","151","152","188","187","182","183","184","178","130","131","132","156","155","186","185","176","133","153","189","180","181","177"]; // 自己写前缀哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    },
});

const rankingList = [] // 用于接受生成数据的数组
for (let i = 0; i < 50; i++) { // 可自定义生成的个数
    const template = {
        userCode: Random.guid(),
        type: Random.integer(1, 2, 3, 4),
        mobilePhone: Random.phone(),
        amount: Random.float(2000, 20000, 2, 2),
    }
    rankingList.push(template)
}


Mock.mock(config.baseApi+"/profit/getRankingList", "post", function (opts) {
    let postData = JSON.parse(opts.body);
    let filterData = rankingList.filter((item)=>{ return item.type === postData.type; });
    filterData.sort(function (a, b) {
        return b.amount-a.amount
    });

    let newData = filterData.slice(0, postData.rows);
    // for (let i=0; i<newData.length; i++) {
    //     newData[i].sequence = (i+1);
    // }

    return {data:newData, code:1000, message:"success"};
});