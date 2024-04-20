<template>
  <div class="home">
    <!-- 轮播图组件 -->
    <div class="shuffl">
      <Slider1 :slides1="banners" v-if="banners.length"></Slider1>
    </div>
    <!-- 搜索框组件 -->
    <router-link tag="section" to="/search">
      <Search1></Search1>
    </router-link>
    <!-- 列表 -->
    <div class="list">
      <ul>
        <router-link class="music-list" tag="li" to="/recommendedDai"><i class="iconfont icon-icon-"></i><span>每日推荐</span></router-link>
        <router-link class="music-list" tag="li" to="/songMenu"><i class="iconfont icon-songlist-01"></i><span>分类歌单</span></router-link>
        <router-link class="music-list" tag="li" to="/singer"><i class="iconfont icon-geshou"></i><span>歌手</span></router-link>
        <router-link class="music-list" tag="li" to="/musicCharts"><i class="iconfont icon-paihangbang"></i><span>排行榜</span></router-link>
      </ul>
    </div>
    <div class="content" v-if="recommendPlaylistArr.length">
      <Title>推荐歌单</Title>
      <div class="recommendPlaylists">
        <Playlist :songArr="recommendPlaylistArr"></Playlist>
      </div>
      <Title>最新音乐</Title>
        <ul class="latesMusic">
            <li v-for="i in latestMusic" :key="i.id">
              <!-- 点击最新音乐把全部最新音乐加入音乐列表 -->
                <LatestMusic :item="i" @add-musicList="addMusicList(latestMusic)"></LatestMusic>
            </li>
        </ul>
    </div>
    <Loading v-if="flag"></Loading>
    <div class="home-footer">
      <img src="../assets/music.jpg" alt="">
    </div>
  </div>
</template>
<script>
// 
// 引入轮播图
import Slider1 from '../components/Slider'
// 引入搜索框
import Search1 from '../components/Search111'
// 
import Title from '../components/Title'
// 歌单
import Playlist from '../components/Playlist'
// 最新音乐
import LatestMusic from '../components/LatestMusic'
// 加载动画组件
import Loading from '../components/Loading'
export default {
  name: 'Home',
  components: {
    Slider1,
    Search1,
    Title,
    Playlist,
    LatestMusic,
    Loading,
    
  },
  data(){
    return{
      recommendPlaylistArr:[],
      latestMusic:[],
      flag:true,
      banners:[],
    }
  },
  // 添加1音乐列表
  methods:{
    addMusicList(val){
      // this.$root.musicStore.musicList=this.$root.musicStore.musicList.concat(val);
      // 已经存在的音乐列表
      let existList = this.$root.musicStore.musicList;
      // 遍历点击所在的音乐数据
      val.map(d=>{
        let find = false; //是否已经存在于音乐列表
        for(let i of existList){
          if(i.id==d.id){
            find=true; //点击的当前音乐已经存在于音乐列表
            break;
          }
        }
        if(!find)existList.push(d); //当前音乐不存在于音乐列表，添加进去
      })
      this.$root.musicStore.musicList=existList;
    }
  },
  created(){
    // 推荐歌单
    this.axios.get("/personalized?limit=9").then(res=>{
           this.recommendPlaylistArr=res.data.result;
           this.flag = false;
    });
    // 最新音乐
    this.axios.get("/personalized/newsong").then(res=>{
        this.latestMusic = res.data.result;
        this.flag =false;
        // console.log(this.latestMusic);
    })
    // 轮播图片
    this.axios.get("http://music.kele8.cn/banner?type=1").then(res=>{
        // console.log(res.data.banners);
        let arr = res.data.banners
        this.banners = arr.map(d=>{
          return d.pic;
        })
    })
  }
}
</script>
<style lang="less" scoped>
.shuffl{
  width: 100%;
  box-sizing: border-box;
  // padding: 10px 10px 0;
  border-radius: .10667rem;
}
.list{
  width:100vw ;
  box-sizing: border-box;
  height: 7.4rem;
  padding: 20px 0;
  ul{
    display: flex;
    .music-list{
      flex:1;
      height: 1.6rem;
      color:  #77d2fb;
      // color: #007aff;
      i{
          font-size: 3rem;
          display: block;
      }
      span{
            font-size: .32rem;
            line-height: 1.8rem;
            color: #999;
            display: block;
      }
    }
  }
}
.latesMusic{
    li{
        box-sizing: border-box;
        padding-left: 10px;
    }
}
.home-footer{
  width: 100vw;
  padding: 20px 0 0;
  img{
    width: 100%;
    height: auto;
    vertical-align: middle;
  }
}
</style>
