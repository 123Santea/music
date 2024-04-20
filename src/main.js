import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import { Toast } from 'vant'
import { Button } from 'vant'
import 'vant/lib/index.css'
// 引入cookie
import { setCookie, getCookie, delCookie } from './js/cookie'
// 全局注入cookie的设置获取删除方法
Vue.prototype.$cookie = {
    setCookie,
    getCookie,
    delCookie
}
Vue.config.productionTip = false

Vue.use(Toast)
Vue.use(Button)


let musicStore = {
    musicID: null,
    musicObj: null,
    musicList: [],
}
new Vue({
    data: {
        musicStore,
        // 歌词
        lyrics: null,
        // 当前时间
        currentTime: 0,
        // 总时间
        totalTime: 0,
        // 播放状态
        // true表示播放状态
        flag: true,
        // 播放器
        audio: null,
        // 迷你播放器的图片
        miImg: null,
        // 是否有歌词
        hasLrc: true,
        // 播放模式
        // 0表示顺序播放
        // 1表示单曲(随机播放)
        // 2表示随机(单曲)
        playMode: 0,
        playMode1: 0,
        // 随机音乐列表
        randomList: [],
        // 单曲循坏
        dsingleList: [],
        // 歌单是否有数据
        gd: false,
    },
    watch: {
        musicStore: {
            handler() { //侦听执行函数
                // console.log("切歌啦");
                this.lyrics = null;
                let musicID = this.musicStore.musicID;
                // console.log("音乐id=>", musicID);
                this.axios.get("http://music.kele8.cn/lyric?id=" + musicID).then(res => {
                    // console.log(res);
                    if (res.data.needDesc) {
                        this.hasLrc = false;
                        console.log("暂无歌词");
                    } else {
                        this.hasLrc = true;
                        let lyricsArr = res.data.lrc.lyric.split('\n');
                        lyricsArr.pop();
                        let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
                        let newLyrics = lyricsArr.map(d => {
                            if (reg.test(d)) {
                                return {
                                    time: (parseInt(RegExp.$1) * 60) + parseFloat(RegExp.$2),
                                    lyric: RegExp.$3
                                }
                            }
                        });
                        // 删除空白歌词
                        for (let i = 0; i < newLyrics.length; i++) {
                            if (newLyrics[i].lyric == "") {
                                newLyrics.splice(i, 1);
                                i--;
                            }
                        }
                        this.lyrics = newLyrics;
                    }
                })
            },
            deep: true, //侦听对象里面所有的变化
        },
        flag: {
            handler() {
                if (this.flag) {
                    this.audio.play().catch(error => {
                        // 当播放异常时，走异常流程
                        console.log(error);
                    });
                    this.miImg.style.animationPlayState = "running"
                } else {
                    this.audio.pause();
                    this.miImg.style.animationPlayState = "paused"
                }
                // console.log(this.audio);
            },
            deep: true,
        },
        playMode: {
            handler() {
                this.randomList = [];
                this.dsingleList = [];
                if (this.playMode == 2) {
                    // 随机播放
                    this.randomList = this.randomSort(this.musicStore.musicList);
                    // console.log(this.randomList);
                } else
                if (this.playMode == 1) {
                    // 单曲
                    for (let i = 0; i < this.musicStore.musicList.length; i++) {
                        this.dsingleList.push(this.musicStore.musicObj);
                    }
                }
            },
            deep: true,
        }
    },
    methods: {
        randomSort(arr) {
            let array = arr.slice();
            array.sort(function() {
                return 0.5 - Math.random()
            })
            return array
        }
    },
    created() {
        // console.log(this.$cookie);
        this.$cookie.setCookie("hist", '');
    },
    router,
    render: h => h(App)
}).$mount('#app')