import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
import {safe} from "../src/api/user";

let router = new Router({
    // 子路由切换用replace
    mode: "history", // 1.hash：有#号，2.history:没有#号
    base: process.env.BASE_URL, // 自动获取根目录路径
    routes: [
        {
            path: "/authorize",
            name: "authorize",
            component: () => import("./views/authorize"), // 路由懒加载，将路由分成多个文件出现
            meta: {backUrl: '', keepAlive: true},
            redirect:"authorize/login", // 页面重定向
            children: [
                {
                    path: "login",
                    name: "login",
                    component: () => import("./views/authorize/login"), // 路由懒加载，将路由分成多个文件出现
                    meta: {keepAlive: false, title: "登录", transition: false}
                }, {
                    path: "register",
                    name: "register",
                    component: () => import("./views/authorize/register"), // 路由懒加载，将路由分成多个文件出现
                    meta: {keepAlive: false, title: "注册", transition: false},
                    redirect:"register/m", // 页面重定向
                    children: [
                        {
                            path: "m",
                            name: "register-m",
                            component: () => import("./views/authorize/register/mobile"), // 路由懒加载，将路由分成多个文件出现
                            meta: {backUrl: '',keepAlive: false, title: "注册"}
                        },
                        {
                            path: "e",
                            name: "register-e",
                            component: () => import("./views/authorize/register/email"), // 路由懒加载，将路由分成多个文件出现
                            meta: {backUrl: '',keepAlive: false, title: "注册"},
                        }
                    ]
                }
            ]
        }, {
            path: "/find/pwd",
            name: "findPwd",
            component: () => import("./views/findPwd"), // 路由懒加载，将路由分成多个文件出现
            meta: {keepAlive: false, backUrl:"", title: "找回密码"},
            redirect:"find/pwd/m", // 页面重定向
            children: [
                {
                    path: "m",
                    name: "findPwd-m",
                    component: () => import("./views/findPwd/mobile"), // 路由懒加载，将路由分成多个文件出现
                    meta: {backUrl: '',keepAlive: false, title: "找回密码"}
                },
                {
                    path: "e",
                    name: "findPwd-e",
                    component: () => import("./views/findPwd/email"), // 路由懒加载，将路由分成多个文件出现
                    meta: {backUrl: '',keepAlive: false, title: "找回密码"},
                }
            ]
        }, {
            path: "/",
            name: "main",
            component: () => import("./views/main"), // 路由懒加载，将路由分成多个文件出现
            redirect:"home", // 页面重定向
            meta: {keepAlive: false},
            children: [
                {
                    path: "home",
                    name: "home",
                    component: () => import("./views/home"), // 路由懒加载，将路由分成多个文件出现
                    meta: {keepAlive: false, title: "首页", jump:"push"}
                }, {
                    path: "quotation",
                    name: "quotation",
                    component: () => import("./views/quotation"), // 路由懒加载，将路由分成多个文件出现
                    meta: {keepAlive: false, title: "行情", backUrl:"/", jump:"push"}
                }, {
                    path: "contract",
                    name: "contract",
                    component: () => import("./views/contract"), // 路由懒加载，将路由分成多个文件出现
                    meta: {keepAlive: false, title:"合约", backUrl:"/", jump:"push"}
                }, {
                    path: "assets",
                    name: "assets",
                    component: () => import("./views/assets"), // 路由懒加载，将路由分成多个文件出现
                    meta: {keepAlive: false, auth: true, title: "资产", backUrl:"/", jump:"push"}
                }, {
                    path: "my",
                    name: "my",
                    component: () => import("./views/member"), // 路由懒加载，将路由分成多个文件出现
                    meta: {keepAlive: false, auth: true, title: "我的", backUrl:"/", jump:"push"}
                }
            ]
        }, {
            path: "/test",
            name: "test",
            component: () => import("./views/test"), // 路由懒加载，将路由分成多个文件出现
        }/*, {
            path: "/purchase/:code",
            name: "purchase",
            component: () => import("./views/purchase"), // 路由懒加载，将路由分成多个文件出现
            meta: {keepAlive: false, auth: false, backUrl:"/", jump:"push"}
        }, {
            path: "/purchase/:code/cart",
            name: "cart",
            component: () => import("./views/purchase/cart"), // 路由懒加载，将路由分成多个文件出现
            meta: {keepAlive: false, auth: false, backUrl:"", jump:"push"}
        }*/, {
            path: "*",
            redirect: "/"
        }
    ]
});
// 全局前置守卫
router.beforeEach((to, from, next) => {
    // console.log(from);
    router.options.routes[0].children[0].meta.backUrl = from.path;
    if (to.meta && to.meta.auth !== undefined && to.meta.auth) {
        // 判断用户登录状态

        // safe().then(res => {
        //     if (res.code === 1001) {
        //         // conText.commit(SET_USER_STATE, {loginState: false});
        //         // 弹出登录页面
        //         router.options.routes[0].children[0].meta.transition = true;
        //         // router.options.routes[0].children[0].meta.enterActiveClass = "animated fadeInDown";
        //         // router.options.routes[0].children[0].meta.leaveActiveClass = "animated fadeInDown";
        //         router.push("/authorize");
        //         // console.log(router);
        //     } else {
        //         next();
        //     }
        // });
        next();
    } else {
        next();
    }
});
export default router;
