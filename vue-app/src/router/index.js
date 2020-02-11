import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import Register from '../views/register'
import NoFind from '../views/404'
import Login from '../views/login'
import Home from '../views/Home'
import Infoshow from '../views/infoshow'
import Fundlist from '../views/fundlist'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect:'/index'
        },
        {
            path: '/index',
            component: Index,
            meta:{title:'首页'},
            children:[
                {path: '',component: Home,meta:{title:'主页'}},
                {path:'/home',name:'home',component:Home,meta:{title:'主页'}},
                {path:'/infoshow',name:'infoshow',component:Infoshow,meta:{title:'个人信息'}},
                {path:'/foundlist',name:'foundlist',component:Fundlist,meta:{title:'收支流水'}}
            ]
        },
        {
            path: '/register',
            component: Register,
            meta:{title:'注册'}
        },
        {
            path: '*',
            component: NoFind,
            meta:{title:'404'}
        },
        {
            path: '/login',
            component: Login,
            meta:{title:'登录'}
        }
    ]
})

//路由守卫
router.beforeEach((to, from, next) => {
    // 添加页面title
    if (to.meta.title){
        document.title = to.meta.title;
    }
    // token判定
    const isLogin = localStorage.eleToken;
    if (to.path == '/login' || to.path == '/register'){
        next()
    }else {
        if (isLogin){
            next()
        }else {
            next('/login')
        }
    }
})

export default router
