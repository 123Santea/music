import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import "@/css/animate.min.css"
import "@/css/minireset.min.css"
// 引入字体图标
import "@/css/iconfont.css"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/css/swiper.css'

Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/search',
    component: () =>
        import ('@/views/Search.vue')
}, {
    path: '/recommendedDai',
    name: 'RecommendedDai',
    component: () =>
        import ('@/views/RecommendedDai.vue')
}, {
    path: '/singer',
    name: 'Singer',
    component: () =>
        import ('@/views/Singer.vue')
}, {
    path: '/singer/details/:id',
    name: 'Details',
    children: [{
        path: '/singer/details/singerAnisong',
        name: 'SingerAnisong',
        component: () =>
            import ('../components/Singer/SingerAnisong.vue')
    }, {
        path: '/singer/details/singerDvd',
        name: 'SingerDvd',
        component: () =>
            import ('../components/Singer/SingerDve.vue')
    }],
    component: () =>
        import ('@/components/Singer/SongerDetails.vue')
}, {
    path: '/songMenu',
    name: 'SongMenu',
    redirect: '/songMenu/hot',
    children: [{
            path: '/songMenu/hot',
            name: 'Hot',
            component: () =>
                import ('@/components/SongMenu/Hot.vue')
        },
        {
            path: '/songMenu/chinese',
            name: 'Chinese',
            component: () =>
                import ('@/components/SongMenu/Chinese.vue')
        },
        {
            path: '/songMenu/boutique',
            name: 'Boutique',
            component: () =>
                import ('@/components/SongMenu/Boutique.vue')
        },
        {
            path: '/songMenu/pop',
            name: 'Pop',
            component: () =>
                import ('@/components/SongMenu/Pop.vue')
        },
        {
            path: '/songMenu/lightMusic',
            name: 'LightMusic',
            component: () =>
                import ('@/components/SongMenu//LightMusic.vue')
        },
        {
            path: '/songMenu/antique',
            name: 'Antique',
            component: () =>
                import ('@/components/SongMenu/Antique.vue')
        },
        {
            path: '/songMenu/rockRoll',
            name: 'RockRoll',
            component: () =>
                import ('@/components/SongMenu/RockRoll.vue')
        }
    ],
    component: () =>
        import ('@/views/SongMenu.vue'),
}, {
    path: '/songListDetails/:id',
    name: 'SongListDetails',
    component: () =>
        import ('@/components/SongMenu/SongListDetails.vue')
}, {
    path: '/musicCharts',
    name: 'MusicCharts',
    component: () =>
        import ('@/views/MusicCharts.vue')
}, {
    path: '/album/:id',
    name: 'Albums',
    component: () =>
        import ('../components/Singer/SingerAlbum.vue')
}]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router