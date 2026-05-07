// 导入mutations命名常量
import {SET_ITEM} from '../mutation-types';
// import {getList} from "../../../api/lottery";

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: { // 同步操作方法
        [SET_ITEM](state, payload) {
            state.list = payload.list;
        }
    },
    actions: { // 异步操作，用于操作mutations里面的方法，如果mutations里面的方法操作量大最好写在actions里面
        list(conText, payload) {
            let noticeList = [];
            for (let i=0; i<5; i++) {
                let notice = {id: i, title: i+" 全球站关于推出做市商6周年活动的公告及调整"};
                noticeList.push(notice);
            }
            conText.commit(SET_ITEM, {list: noticeList});

            if (payload && payload.success) {
                payload.success(1000);
            }

            // getList().then(res => {
            //     // console.log(res);
            //     if (res.code === 1000) {
            //         conText.commit(SET_ITEM, {list: res.data});
            //     }
            //     if (payload.success) {
            //         payload.success(res.code);
            //     }
            // });
        }
    },
    getters: {}
}
