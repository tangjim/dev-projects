import Vue from "vue";
// 导入vue-router
import Router from "vue-router";
// 使用路由插件
Vue.use(Router);

// 实例化路由
let router = new Router({
    mode: "hash", // 1、hash:url带#号；2、history历史:url不带#号
    base: process.env.BASE_URL, // 自动获取根目录路径
    routes: [
        {
            path:"/",
            name:"main",
            component: () => import("./pages/main") // 路由懒加载，将路由分成多个文件出现
        }, {
            path: "*",
            redirect: "/"
        }
    ]
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // console.log(navigator);
    // if (process.env.VUE_APP_DETECTION === "true") {
    //     if (!to.meta.isApp && !isApp()) {
    //         router.push("/authorize/register/u");
    //     }
    // }
    // router.options.routes[0].children[0].meta.backUrl = from.path;
    next();
});

const originalPush = Router.prototype.push;
Router.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router;