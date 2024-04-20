<template>
<!-- 底部音乐控件组件 -->
  <div class="playmusic">
    <div class="bottom-music">
      <div class="music-lt" @click="$emit('showLyrics')">
        <div class="lt-avator" ref="rotatImg">
          <!-- 最新音乐的歌曲图片 -->
          <template v-if="$root.musicStore.musicObj.picUrl">
            <img :src="$root.musicStore.musicObj.picUrl"/>
          </template>
          <!-- 搜索结果的歌曲图片 -->
          <template v-if="$root.musicStore.musicObj.artists">
            <img :src="$root.musicStore.musicObj.artists[0].img1v1Url"/>
          </template>
          <!-- 歌单图片 -->
          <template v-if="$root.musicStore.musicObj.al">
            <img :src="$root.musicStore.musicObj.al.picUrl"/>
          </template>
        </div>
        <div class="lt-title" v-if="$root.musicStore.musicObj">
          <span class="title">{{$root.musicStore.musicObj.name}}</span>-
          <!-- 最新音乐的歌曲演唱者 -->
          <template v-if="$root.musicStore.musicObj.song">
            <span class="name">{{$root.musicStore.musicObj.song.artists[0].name}}</span>
          </template>
          <!-- 搜索结果了吗的歌曲演唱者 -->
          <template v-if="$root.musicStore.musicObj.artists">
            <span class="name">{{$root.musicStore.musicObj.artists[0].name}}</span>
          </template>
          <!-- 歌单的演唱者 -->
          <template v-if="$root.musicStore.musicObj.ar">
            <span class="name">{{$root.musicStore.musicObj.ar[0].name}}</span>
          </template>
        </div>
      </div>
      <div class="music-rt">
        <div class="progress-circle" id="progressCircle" @click="operation">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" id="mySvg">
            <circle class="progress-background" cx="50%" cy="50%" r="50%" fill="transparent" />
            <circle
              class="progress-bar"
              cx="50%"
              cy="50%"
              r="50%"
              fill="transparent"
              :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"
            />
          </svg>
          <!-- 播放暂停键 -->
          <span class="icons iconfont" :class="isStatus?'icon-iconfront-':'icon-play-full icons1'"></span>
        </div>
        <!-- 播放列表 -->
        <span class="iconfont icon-bofangliebiao menu" @click="$emit('sidebarShow')"></span>
        <!-- controls -->
        <audio :src="`https://music.163.com/song/media/outer/url?id=${$root.musicStore.musicID}.mp3`" @timeupdate="timeupdate" id="audio" @ended="ended($event,$root.musicStore.musicID)" @canplay="getDuration" ref="audio" autoplay></audio>
      </div>
    </div>
    <!-- <Lyrics v-if="fullFlag"></Lyrics> -->
  </div>
</template>
<script>
// import Lyrics from '../components/Lyrics'
export default {
  components:{
    // Lyrics,
  },
  data() {
    return {
      dashArray: 0,
      current: 0,
      dashOffset: 0,
      // 播放状态  false 暂停  true 播放
      // isStatus: false, 
      // fullFlag:true,
    };
  },
  props:[],
  computed: {
    // 实时监听播放进度条
    // getDashOffset() {
    //   let percent = 0;
    //   if (document.getElementsByTagName("audio")[0]) {
    //     计算播放进度比例
    //     let duration = document.getElementsByTagName("audio")[0].duration;
    //     percent = Math.min(1, this.current / duration);
    //     this.dashOffset = (1 - percent) * this.dashArray;
    //   } else {
    //     this.dashOffset = (1 - 0) * this.dashArray;
    //   }
    // }
    isStatus(){
      // console.log("底部=>",this.$root.flag);
      return this.$root.flag;
    }
  },
  methods: {
    getDuration() {
       this.$root.totalTime = this.$refs.audio.duration;
    },
    // 实时获取音频当前播放时长
    timeupdate(e) {
      // console.log("e===>", e.target.currentTime);
      this.current = e.target.currentTime;
      this.$root.currentTime=this.current;
      let duration = document.getElementsByTagName("audio")[0].duration;
      // this.$root.currentTime=this.current;
      // this.$root.totalTime=duration;
      let percent = Math.min(1, this.current / duration);
      this.dashOffset = (1 - percent) * this.dashArray;
      this.$emit("changeTime",this.current);
    },
    ended(e,ids) {
    //   console.log("播放结束~~~");
      // this.isStatus = false;
      e.target.currentTime=0;
      let list = this.$root.musicStore.musicList;
      let lsn;
      for(let i=0;i<list.length;i++){
        if(list[i].id == ids){
          lsn = i;
          break;
        }
      }
      lsn = lsn>=list.length-2?0:lsn;
      // 是否是随机播放
      if(this.$root.playMode==2){
        // 随机
        console.log(lsn);
        console.log(this.$root.randomList);
        this.$root.musicStore.musicID= this.$root.randomList[lsn].id;
        this.$root.musicStore.musicObj =this.$root.randomList[lsn];
      }else if(this.$root.playMode==0){
        // 顺序
        this.$root.musicStore.musicID= this.$root.musicStore.musicList[lsn].id;
        this.$root.musicStore.musicObj =this.$root.musicStore.musicList[lsn];
      }else if(this.$root.playMode==1){
        // 单曲
        this.$root.musicStore.musicID= this.$root.dsingleList[lsn].id;
        this.$root.musicStore.musicObj =this.$root.dsingleList[lsn];
      }
      e.target.play().catch(error => {
        // 当播放异常时，走异常流程
        console.log(error);
      });
      this.$root.flag=true;
      // 初始化 圆形进度条的周长
      let circleWidth = document.getElementById("progressCircle").offsetWidth;
      this.dashArray = Math.PI * circleWidth;
      this.dashOffset = Math.PI * circleWidth;
    },
    
    // 操作音乐播放/暂停
    operation() {
      let audio = document.getElementById("audio");
      if (audio.paused) {
        audio.play().catch(error => {
        // 当播放异常时，走异常流程
        console.log(error);
    });
        this.$refs.rotatImg.style.animationPlayState="running";
        // this.isStatus = true;
        this.$root.flag=true;
      } else {
        audio.pause();
        this.$refs.rotatImg.style.animationPlayState="paused";
        // this.isStatus = false;
        this.$root.flag=false;
      }
    },
    // full(){
    //   console.log(this.fullFlag);
    //   this.fullFlag=true;
    // }
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化圆的周长
      let circleWidth = document.getElementById("progressCircle").offsetWidth;
      this.dashArray = Math.PI * circleWidth;
      this.dashOffset = Math.PI * circleWidth;
    });
    this.$root.audio=this.$refs.audio;
    this.$root.miImg=this.$refs.rotatImg;
  }
};
</script>
<style lang="css" scoped>
.font {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.playmusic {
  height: 3.41333333rem;
  width: 100vw;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
}
.playmusic .bottom-music {
  box-sizing: border-box;
  height: 10vh;
  padding: 0 0.64rem;
  z-index: 3;
  box-shadow: 5px 5px 5px 5px #efefef, -5px 5px 5px 5px rgba(255, 255, 255, 0.5);
}
.playmusic .bottom-music {
  height: 3.41333333rem;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
}
.playmusic .bottom-music .music-lt {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 70%;
  overflow: hidden;
  position: relative;
}
.playmusic .bottom-music .music-lt .lt-avator {
  width: 3.13333333rem;
  height: 3.13333333rem;
  background: url("../assets/coverall1.png") no-repeat 0 0/cover;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0.4rem;
  animation: randImg 5s linear 0s infinite;
  /* animation-play-state:paused; */
  position: relative;
}
.playmusic .bottom-music .music-lt .lt-avator img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
}
@keyframes randImg{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.playmusic .bottom-music .music-lt .lt-title {
  padding: 0 0.42666667rem;
  width: 80%;
}
.playmusic .bottom-music .music-lt .lt-title span {
  /* display: block; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  text-align: left;
  box-sizing: border-box;
  /* padding-left: 2vw; */
}
.playmusic .bottom-music .music-lt .lt-title .title {
  font-size: 0.59733333rem;
  font-weight: 600;
  color: #333;
}
.playmusic .bottom-music .music-lt .lt-title .name {
  font-size: 0.46933333rem;
  color: #666;
}
.playmusic .bottom-music .music-rt {
  display: flex;
  justify-content: end;
  align-items: center;
}
.playmusic .bottom-music .music-rt .progress-circle {
  width: 1.92rem;
  height: 1.92rem;
  position: relative;
}
.playmusic .bottom-music .music-rt .progress-circle circle {
  stroke-width: 0.14933333rem;
  transform-origin: center;
}
.playmusic .bottom-music .music-rt .progress-circle .progress-background {
  transform: scale(0.9);
  stroke:#d4d4d4;
}
.playmusic .bottom-music .music-rt .progress-circle .progress-bar {
  transform: scale(0.9) rotate(-90deg);
  stroke:#717774;
}
.playmusic .bottom-music .music-rt .progress-circle .icons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color:#717774;
}
.playmusic .bottom-music .music-rt .progress-circle .icons {
  font-size: 1.17333333rem;
}
.playmusic .bottom-music .music-rt .progress-circle .icons1 {
  font-size: 0.96rem;
}
.playmusic .bottom-music .music-rt .menu {
  font-size: 1.70666667rem;
  color:#717774;
  font-weight: 500;
}
.playmusic .bottom-music .music-rt .menu {
  padding-left: 0.85333333rem;
}
audio{
    height: 30px;
    position: absolute;
    top: -30px;
    left: 50%;
}
</style>
