<template>
  <div id="app" :class="$root.musicStore.musicObj?'spac':''">
      <!-- <div v-show="!lyricsFlag"> -->
        <router-link to="/"></router-link>
      <router-view></router-view>
      <Bottommusic v-if="$root.musicStore.musicObj" class="animate__animated animate__backInLeft" @sidebarShow="change" @showLyrics="showLyrics" @changeTime="changeTime"></Bottommusic>
      <transition name="circle"  enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
          <Sidebar v-if="sidebarFlag" @sidebarShow="change" @touchmove.prevent = "false"></Sidebar>
      </transition>
      <!-- </div> -->
      <transition enter-active-class="animate__animated animate__bounceInDown" leave-active-class="animate__animated animate__fadeOutDownBig">
            <Lyrics v-if="lyricsFlag" @hideLyrics="hideLyrics" @touchmove.prevent = "false" @sidebarShow="change" :audioTime="audioTime"></Lyrics>
      </transition>
      <Load v-if="$root.gd"></Load>
  </div>
</template>
<script>
import Bottommusic from './components/Bottommusic'
import Sidebar from './components/Sidebar'
import Lyrics from './components/Lyrics'
import Load from './components/Loading'
export default {
  components:{
    Bottommusic,
    Sidebar,
    Lyrics,
    Load,
  },
  data(){
    return{
      // 控制音乐列表的显示与隐藏
      sidebarFlag:false,
      // 控制音乐播放页面的显示与隐藏
      lyricsFlag:false,
      // imgNode:null,
      audioTime:0,
    }
  },
  watch:{
    audioTime(){
      return this.audioTime;
    }
  },
  methods:{
    change(){
      this.sidebarFlag = !this.sidebarFlag;
    },
    showLyrics(){
      this.lyricsFlag=true;
    },
    hideLyrics(){
      this.lyricsFlag=false;
    },
    changeTime(val){
      this.audioTime=val;
    }
  },
  created(){
    // this.$cookie.setCookie("hist",'');
    // localStorage.setItem("hist", '');
  }
}
</script>
<style lang="less" scoped>
// 去除页面被动禁止滑动和滚动的报错
* { touch-action: pan-y; }
#app {
  box-sizing: border-box;
  // min-width: 320px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  position: relative;
}
.spac{
padding-bottom: 3.41333333rem;
}
.app-lyrics{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
