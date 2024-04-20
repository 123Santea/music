<template>
    <!-- 歌词组件 -->
    <div class="lyrics-box">
        <!-- 高斯模糊区 -->
        <template v-if="$root.musicStore.musicObj.song">
            <div class="lyrics-bg" :style="{background:`url('${$root.musicStore.musicObj.picUrl}')`}"></div>
        </template>
        <template v-if="$root.musicStore.musicObj.artists">
            <div class="lyrics-bg" :style="{background:`url('${$root.musicStore.musicObj.artists[0].img1v1Url}')`}"></div>
        </template>
        <!-- 歌单音乐播放界面 -->
        <template v-if="$root.musicStore.musicObj.al">
            <div class="lyrics-bg" :style="{background:`url('${$root.musicStore.musicObj.al.picUrl }')`}"></div>
        </template>
        <!-- 高斯模糊遮罩层 -->
        <div class="lyrics-mask"></div>
        <!-- 顶部控件 -->
        <div class="lyrics-top">
            <div class="lyrics-top-back">
                <i class="iconfont icon-withdraw-fill" @click="$emit('hideLyrics')"></i>
            </div>
            <div class="lyrics-top-title">
                <!-- this.$root.musicStore.musicObj -->
                <!-- 最新音乐里面 -->
                <template v-if="$root.musicStore.musicObj.song">
                    <div>{{this.$root.musicStore.musicObj.name}}</div>
                    <div>{{this.$root.musicStore.musicObj.song.artists[0].name}}</div>
                </template>
                <!-- 搜索结果里面 -->
                <template v-if="$root.musicStore.musicObj.artists">
                    <div>{{this.$root.musicStore.musicObj.name}}</div>
                    <div>{{this.$root.musicStore.musicObj.artists[0].name}}</div>
                </template>
                <!-- 歌单的演唱者 -->
                <template v-if="$root.musicStore.musicObj.ar">
                    <div>{{this.$root.musicStore.musicObj.name}}</div>
                    <div>{{$root.musicStore.musicObj.ar[0].name}}</div>
                </template>
            </div>
        </div>
        <!-- 中部盒子 -->
        <div class="lyrics-center" @click="show">
            <!-- 中部旋转图片层 -->
            <div class="lyrics-center-img" ref="lyricsImg">
                <div>
                    <!-- <div class="disc" :style="{backgroundImage:`url('${$root.musicStore.musicObj.al.picUrl}')`}">
                        最新音乐里面
                        <template v-if="$root.musicStore.musicObj.song">
                            <img :src="$root.musicStore.musicObj.picUrl">
                        </template>
                        搜索结果
                        <template v-if="$root.musicStore.musicObj.artists">
                            <img :src="$root.musicStore.musicObj.artists[0].img1v1Url">
                        </template>
                        歌单图片
                        <template v-if="$root.musicStore.musicObj.al">
                          <img :src="$root.musicStore.musicObj.al.picUrl"/>
                        </template>
                    </div> -->
                     <!-- 最新音乐里面 -->
                    <template v-if="$root.musicStore.musicObj.song">
                        <div class="disc" :style="{backgroundImage:`url('${$root.musicStore.musicObj.picUrl}')`}">
                        </div>
                    </template>
                    <!-- 搜索结果 -->
                    <template v-if="$root.musicStore.musicObj.artists">
                        <div class="disc" :style="{backgroundImage:`url('${$root.musicStore.musicObj.artists[0].img1v1Url}')`}">
                        </div>
                    </template>
                    <!-- 歌单图片 -->
                    <template v-if="$root.musicStore.musicObj.al">
                        <div class="disc" :style="{backgroundImage:`url('${$root.musicStore.musicObj.al.picUrl}')`}">
                        </div>
                    </template>
                    <div class="circle" :class="state?'play':'pause'"></div>
                    <div class="circle" :class="state?'play':'pause'"></div>
                    <div class="circle" :class="state?'play':'pause'"></div>
                    <div class="circle" :class="state?'play':'pause'"></div>
                    <div class="circle" :class="state?'play':'pause'"></div>
                </div>
            </div>
            <!-- 中部歌词层 -->
            <div class="lyrics-center-lrc" ref="lyricsLrc">
                <!-- <template v-if="$root.musicStore.musicObj.song">
                    <div class="lyrics-center-lrc-bg" :style="{background:`url('${$root.musicStore.musicObj.picUrl}')`}"></div>
                </template>
                <template v-if="$root.musicStore.musicObj.artists">
                    <div class="lyrics-center-lrc-bg" :style="{background:`url('${$root.musicStore.musicObj.artists[0].img1v1Url}')`}"></div>
                </template>
                <template v-if="$root.musicStore.musicObj.al">
                    <div class="lyrics-center-lrc-bg" :style="{background:`url('${$root.musicStore.musicObj.al.picUrl }')`}"></div>
                </template>
                <div class="lyrics-center-lrc-mask"></div> -->
                <!-- :style="{transform:`translateY(${y}px)`}" -->
                <ul ref="lyricsUl" class="lyricsUl" v-if="$root.hasLrc">
                    <li v-for="(i,index) in $root.lyrics" :key="index" ref="lyricsLi" :class="{active:index==curIndex}">
                        {{i.lyric}}
                    </li>
                </ul>
                <ul v-if="!$root.hasLrc">
                    <li>暂无歌词敬请欣赏音乐</li>
                </ul>
            </div>
            <!-- 小型歌词 -->
            <!-- <div class="lyrics-center-min-lrc"></div> -->
        </div>
        <!-- 底部播放控件 -->
        <div class="lyrics-bt">
            <div class="lyrics-bt-input">
                <template v-if="$root.currentTime">
                    <span>{{$root.currentTime|filtration}}</span>
                </template>
                <div class="lyrics-bt-ipt">
                    <input type="range" min="0" :max="$root.totalTime" :value="$root.currentTime" @change="changeValue" ref="range">
                    <i :style="{width:`${($root.currentTime/$root.totalTime)*80}vw`}"></i>
                </div>
                <template v-if="$root.currentTime">
                    <span>{{$root.totalTime|filtration}}</span>
                </template>
            </div>
            <div class="lyrics-bt-op">
                <ul>
                    <!-- iconfont -->
                    <li class="playMode">
                        <i class="iconfont" :class="$root.playMode==0?'icon-ziyuanldpi':$root.playMode==2?'icon-suiji':'icon-hanhan-01-01'" @click="changeMode"></i>
                    </li>
                    <li class="prev">
                        <i class="iconfont icon-shangyishou" @click="prevSong"></i>
                    </li>
                    <li class="statePlay">
                        <!-- <i class="iconfont icon-play-full"></i> -->
                        <i class="iconfont" :class="$root.flag?'icon-iconfront-':'icon-play-full'" @click="change"></i>
                    </li>
                    <li class="next">
                        <i class="iconfont icon-xiayishou" @click="nextSong"></i>
                    </li>
                    <li class="playlist">
                        <i class="iconfont icon-bofangliebiao" @click="$emit('sidebarShow')"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
     data(){
         return{
            //  flag:false,
            // curTime:0,
            curIndex:0,
            // y:0,
         }
     },
     props:["audioTime"],
     computed:{
         state(){
            // let circle = document.querySelectorAll(".lyrics-center-img>div>.circle");
            // if(this.$root.flag){

            // }
            return this.$root.flag;
         }
     },
     methods:{
         changeMode(){
             this.$root.playMode1++;
             this.$root.playMode = (this.$root.playMode1)%3;
             if(this.$root.playMode==0){
                 this.$toast.success({
                     duration:300,
                     message:"顺序播放",
                 });
             }else if(this.$root.playMode==1){
                 this.$toast.success({
                     duration:300,
                     message:"单曲循坏",
                 });
             }else{
                 this.$toast.success({
                     duration:300,
                     message:"随机播放",
                 });
             }
            //  console.log(this.$root.playMode);
         },
        /***滑动限制***/
        stop(){
          var mo=function(e){e.preventDefault();};
          document.body.style.overflow='hidden';
          document.addEventListener("touchmove",mo,false);//禁止页面滑动
        },
        /***取消滑动限制***/
        move(){
          var mo=function(e){e.preventDefault();};
          document.body.style.overflow='';//出现滚动条
          document.removeEventListener("touchmove",mo,true);//页面可以滑动
        },
        change(){
            let circle = document.querySelectorAll(".lyrics-center-img>div>.circle");
            if(this.$root.flag){
              for(let i =0;i<circle.length;i++){
                  circle[i].style.display = "none";
              }
              this.$root.flag =false;
            }else{
                for(let i =0;i<circle.length;i++){
                      circle[i].style.display = "block";
                  }
                this.$root.flag=true;
            }
        },
        // 拖动进度条
        changeValue(event){
            this.$root.currentTime=event.target.value;
            this.$root.audio.currentTime=event.target.value;
        },
        toggle(flag){
            let currentIndex = 0;
            let musicList = this.$root.musicStore.musicList;
            for(let i in musicList){
                if(musicList[i].id == this.$root.musicStore.musicID){
                    currentIndex = i;
                    break;
                }
            }
          //   上一首
            if(flag){
                currentIndex--;
                currentIndex = currentIndex<0? musicList.length-1:currentIndex;
            }else{
              //   下一首
                currentIndex++;
                currentIndex = currentIndex>musicList.length-1 ? 0 :currentIndex;
            }
            // 下一首随机
            if(this.$root.playMode==2){
                // 随机
                this.$root.musicStore.musicID = this.$root.randomList[currentIndex].id;
                this.$root.musicStore.musicObj = this.$root.randomList[currentIndex];
            }else if(this.$root.playMode==0){
                // 顺序
                this.$root.musicStore.musicID = musicList[currentIndex].id;
                this.$root.musicStore.musicObj = musicList[currentIndex];
            }else if(this.$root.playMode==1){
                // 单曲
                this.$root.musicStore.musicID = this.$root.dsingleList[currentIndex].id;
                this.$root.musicStore.musicObj = this.$root.dsingleList[currentIndex];
            }
        },
        prevSong(){
            this.toggle(true);
            this.$root.flag=true;
        },
        nextSong(){
            this.toggle(false);
            this.$root.flag=true;
        },
        // 显示歌词层
        show(){
            this.$refs.lyricsImg.style.display="none";
            this.$refs.lyricsLrc.style.display="block";
        },
        // 滚动条动画滚动
        ScrollTop12(node,number = 0, time){
            if (!time) {
               node.scrollTop = number;
                return number;
            }
            const spacingTime = 40; // 设置循环的间隔时间  值越小消耗性能越高
            let spacingInex = time / spacingTime; // 计算循环的次数
            let nowTop =node.scrollTop; // 获取当前滚动条位置
            let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
            let scrollTimer = setInterval(() => {
                if (spacingInex > 0) {
                    spacingInex--;
                    this.ScrollTop12(node,nowTop += everTop);
                } else {
                    clearInterval(scrollTimer); // 清除计时器
                }
            }, spacingTime);
        },
    },
    created(){
        this.stop();
        this.curIndex=0;
        this.mode=0;
        // console.log(this.curTime);
    },
    watch:{
        // curTime(){
            // return this.$root.currentTime;
            // console.log("aa");
        // }s
        audioTime(news){
            // console.log(news);
            // for(let i in this.$root.lyrics){
            //     console.log(this.$root.lyrics[i].lyric);
            // }
            // let ul12 =this.$refs.lyricsUl;
            // this.$root.lyrics.forEach((item,index)=>{
            //     if(news>item.time){
            //         this.curIndex = index;
            //         this.y = -index*30;
            //         let y = -index*30
            //         this.lyricsLi.forEach(item=>{
            //             item.style.transform=`translateY(${y}px)`;
            //         })
            //         if(index>7){
            //             let i = index-8;
            //             ul12.scrollTop = (index-7)*30;
            //             let top =(index-7)*30;
            //             console.log(top);
            //             $('.lyricsUl').animate({scrollTop: top},200);
            //         }
            //     }
            // })
            // if(!(this.$root.hasLrc)) return false;
            // let cs = this.$root.lyrics;
            if(this.$root.hasLrc&&this.$root.lyrics){
                for(let i=0;i<this.$root.lyrics.length;i++){
                    if(i<this.$root.lyrics.length-1){
                        if(news>=this.$root.lyrics[i].time && news<this.$root.lyrics[i+1].time){
                            this.curIndex =  i;
                            if(i>7){
                                let top =(i-7)*30;
                                $('.lyricsUl').animate({scrollTop: top},200);
                            }
                        }
                    }
                }
                if(news>=this.$root.lyrics[this.$root.lyrics.length-1].time){
                    this.curIndex =  this.$root.lyrics.length-1;
                }
            }
            // for(let i=0;i<this.$root.lyrics.length;i++){
            //     if(news>=this.$root.lyrics[i].time && news<this.$root.lyrics[i+1].time){
            //         this.curIndex =  i;
            //         if(i>7){
            //             let top =(i-7)*30;
            //             $('.lyricsUl').animate({scrollTop: top},200);
            //         }
            //     }
            // }
        }
    },
    // bodyScroll(event){
    //     event.preventDefault();  
    // },
    destroyed(){
       this.move();
    },
    filters:{
        filtration:function(val){
            let min = parseInt(val/60);
            val = parseInt(val%60);
            min=min < 10 ? '0'+min : min;
            val = val <10 ? '0'+val : val;
            return min+":"+val
        }
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>
.lyrics-box{
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    // position: absolute;
    // top: 0;
    // left: 0;
    .lyrics-bg{
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        // filter: blur(50px);
        filter: blur(25px);
        background-repeat: no-repeat;
        // z-index: -3;
        z-index: 99999;
        background-image: url("../assets/06.jpg");
    }
    .lyrics-mask{
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        // z-index: -1;
        z-index: 999;
        // background-color: rgba(0,0,0,0.96);
        background-color: rgba(222,226,230,0.96);
    }
    .lyrics-top{
        height: 7vh;
        // background-color: red;
        box-sizing: border-box;
        padding-top: 5px;
        display: flex;
        position: relative;
        z-index: 9999999;
        .lyrics-top-back{
            width: 7.5vw;
            // background-color: yellow;
            i{
                font-size: 1.7rem;
                color: #ecf0f1;
            }
        }
        .lyrics-top-title{
            flex: 1;
            div:first-child{
                color: #fff;
            }
            div:last-child{
                color: #bababa;
                font-size: 12px;
            }
        }
    }
    .lyrics-center{
        height: 82vh;
        // background-color: yellow;
        position: relative;
        z-index: 9999999;
        box-sizing: border-box;
        // 中部图片
        .lyrics-center-img{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            // opacity: 0;
            // display: none;
            .disc{
                width: 15rem;
                height: 15rem;
                border-radius: 50%;
                position: absolute;
                top: 0;
                left: 0;
                overflow: hidden;
                // top: 50%;
                // left: 50%;
                // margin-left: calc(-15rem / 2);
                // margin-top: calc(-15rem / 2);
                // transform: rotate(45deg);
                background-image: radial-gradient(5em 30em ellipse, #fff, #000);
                border: 2px solid #131313;
                box-shadow: 0 0 0 10px #343935;
                box-sizing: border-box;
                padding: 4px;
                background-size: cover;
                opacity: 0.7;
                img{
                    width: 100%;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
        }
        // 中部歌词
        .lyrics-center-lrc{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 3vh 0;
            position: absolute;
            top: 0;
            left: 0;
            display: none;
            // overflow: hidden;
            .lyrics-center-lrc-bg,.lyrics-center-lrc-mask{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
            .lyrics-center-lrc-bg{
                z-index: 9999;
                background-size: 400% 400%;
                filter: blur(20px);
            }
            .lyrics-center-lrc-mask{
                z-index: 999;
                background-color: rgba(0,0,0,0.9);
            }
            ul{
                position: relative;
                overflow-y: auto;
                width: 100%;
                height: 100%;
                z-index: 99999;
                color: white;
                transition: all 1s linear; 
                li{
                    height: 30px;
                    line-height: 30px;
                    &.active{
                        color: #0c8ed9;
                    }
                }
            }
        }
        .lyrics-center-min-lrc{
            width: 100%;
            height: 20vh;
            background-color: white;
            position: absolute;
            bottom: 5px;
        }
    }
    .lyrics-bt{
        height: 11vh;
        position: relative;
        z-index: 9999999;
        // background-color: violet;
        .lyrics-bt-input{
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                margin: 0 5px;
                // color: #B6B6B5;
                // font-size: 14px;
                // color: #a1a1a1;
                font-size: 1.933vw;
                color: hsla(0,0%,100%,.6);
            }
            input[type=range] {
                -webkit-appearance: none;
                width: 80vw;
                height: 8px;
                border-radius: 10px;
                position: relative;
                z-index: 3;
                // background-color: #fff;
                background: hsla(0,0%,100%,.08);
            }
            input[type=range]::-webkit-slider-thumb{
                -webkit-appearance: none;
                // background-color: #fff;
            } 
            input[type=range]::-webkit-slider-runnable-track {
                height: 8px;
                border-radius: 20px;
            }
            input[type=range]:focus {
                outline: none;
            }
            input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                margin-top: -3px;
                height: 14px;
                width: 14px;
                background: #fff;
                border-radius: 50%;
                border: solid 3px #fff;
                box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
            }
        }
        .lyrics-bt-op{
            margin-top: 2vh;
            ul{
                display: flex;
                li{
                    // width: 33%;
                    flex: 1;
                    // width: 4.578vw;
                    // height: 6vh;
                    // border-radius: 50%;
                    // background-color: red;
                    i{
                        font-size: 1.75rem;
                        color: #fff;
                    }
                }
            }
        }
    }
}
.lyrics-center-img>div{
                width: 15rem;
                height: 15rem;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: calc(-15rem / 2);
                margin-top: calc(-15rem / 2);
                .circle{
                    width: 15rem;
                    height: 15rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    border: 1px solid #ccc;
                    border-radius: 50%;
                    opacity: 0;
                    animation-name: change;
                    animation-duration: 3s;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    
                    &.play{
                        animation-play-state: running;
                    }
                    &.pause{
                        animation-play-state: paused;
                    }
                    // animation-play-state: running;
                    &:first-child{
                        animation-delay: 0s;
                    }
                    &:nth-child(2){
                        animation-delay: 0.8s;
                    }
                    &:nth-child(3){
                        animation-delay: 1.6s;
                    }
                    &:nth-child(4){
                        animation-delay: 2.4s;
                    }
                    &:nth-child(5){
                        animation-delay: 3.2s;
                    }
                }
}
@keyframes change {
			0% {
				transform: scale(1,1);
				opacity: 0.4;
			}
			100% {
				transform: scale(2,2);
				opacity: 0;
			}
		}
.lyrics-bt-ipt{
    position: relative;
    display: flex;
    align-items: center;
    i{
        // width: 50px;
        height: 8px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        // border-radius: 10px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color:#1e90ff ;
        // background-color:#0c8ed9 ;
    }
}
</style>
<style lang="css">
.van-toast{
    z-index: 999999 !important;
}
/* van-toast--middle van-toast--text */
</style>