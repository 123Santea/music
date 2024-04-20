<template>
  <div class="searchResults-box">
    <p>最佳匹配</p>
    <!-- 专辑 -->
    <div v-if="albumsObj" @click="jmpAlbum(albumsObj)">
      <Album :albumss="albumsObj" :keyword="keyword"></Album>
    </div>
    <!-- 歌手 -->
    <div v-if="artistObj" @click="jmpSinger(artistObj)">
      <Album :superJunior="artistObj" :keyword="keyword"></Album>
    </div>
    <ul class="searchResults-box-ul1">
      <li v-for="(i, index) in result" :key="index">
        <LatestMusic
          :item="i"
          :index="index"
          :keyword="keyword"
          v-if="i"
          @end="end"
        ></LatestMusic>
        <!-- <p v-show="!(i)" class="end">加载完毕</p> -->
      </li>
    </ul>
    <p class="end" v-show="endFlag">加载完毕</p>
    <Loading v-if="flag"></Loading>
  </div>
</template>
<script>
// 最新
import LatestMusic from "../components/LatestMusic";
import Loading from "../components/Loading";
// 专辑，歌手
import Album from "../components/Album";
export default {
  components: {
    LatestMusic,
    Loading,
    Album,
  },
  props: ["keyword", "node"],
  data() {
    return {
      result: [],
      // typeID:null,
      album: null,
      artist: null,
      // 分页
      pages: 1,
      // 控制分页时的load
      flag: true,
      // 数据总数
      count: null,
      // 只取一次歌曲数据长度的开关
      countFlag: true,
      // 一次提示加载到底
      toLoad: true,
      // 专辑
      albumsObj: null,
      // 歌手
      artistObj: null,
      // 是否完毕加载完毕
      endFlag: false,
    };
  },
  methods: {
    loadSearchResults() {
      this.axios
        .get(
          "/search?keywords=" +
            this.keyword +
            "&type=1&offset=" +
            (this.pages - 1) * 30
        )
        .then((res) => {
          this.flag = false;
          if (res.data.result.songCount == 0) {
            this.endFlag = true;
            return false;
          }
          if (this.countFlag) {
            this.count = res.data.result.songCount;
            this.countFlag = false;
          }
          // console.log("count=>",this.count);
          this.result = this.result.concat(res.data.result.songs);
          //
        });
    },
    end() {
      this.endFlag = true;
    },
    jmpAlbum(item) {
      // console.log(item);
      this.axios.get("/album?id=" + item.id).then((res) => {
        // console.log(res);
        let albums = JSON.stringify(res.data.album);
        let songs = JSON.stringify(res.data.songs);
        this.$router.push({
          name: "Albums",
          // params:{
          //     albums:albums,
          //     songs:songs
          // },
          query: {
            albums: albums,
            songs: songs,
          },
        });
      });
    },
    jmpSinger(item) {
      // console.log(item);
      let id = item.id;
      this.$router.push({
        name: "Details",
        params: {
          id: id,
        },
      });
    },
  },
  created() {
    this.endFlag = false;
    this.result = [];
    this.loadSearchResults();
    // 把搜索的记录存进localStorage
    let str = localStorage.getItem("hist");
    str = str + this.keyword + ",";
    localStorage.setItem("hist", str);
    // 专辑搜索
    this.axios
      .get("/search?keywords=" + this.keyword + "&type=10")
      .then((res) => {
        // console.log(res.data.result.albums[0]);
        this.albumsObj = res.data.result.albums[0];
      });
    // 歌手搜索
    this.axios
      .get("/search?keywords=" + this.keyword + "&type=100")
      .then((res) => {
        // console.log(res.data.result.artists[0]);
        this.artistObj = res.data.result.artists[0];
      });
  },
  mounted() {
    let that = this;
    let top = this.node.offsetTop + this.node.offsetHeight - 20;
    window.onscroll = function () {
      //滚动条滚动时，距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // screenTop = Math.ceil(screenTop);
      // console.log(scrollTop);
      //是可视区的高度
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // console.log(windowHeight);
      //滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // console.log(scrollHeight);
      // console.log("儿子",ul.children.length);
      // console.log("父亲",that.count);
      if (scrollTop > top) {
        that.node.classList.add("active");
      } else {
        that.node.classList.remove("active");
      }
      //滚动条到底部的条件
      if (
        Math.ceil(scrollTop) + windowHeight == scrollHeight &&
        !that.endFlag
      ) {
        that.flag = true;
        that.pages++;
        that.loadSearchResults();
      }
    };
  },
};
</script>
<style lang="less" scoped>
.searchResults-box {
  width: 100vw;
  box-sizing: border-box;
  padding-left: 10px;
  p {
    box-sizing: border-box;
    text-align: left;
    font-size: 12px;
    line-height: 16px;
    color: #666;
  }
}
.end {
  color: #888 !important;
  line-height: 30px !important;
  font-size: 14px !important;
  text-align: center !important;
}
</style>