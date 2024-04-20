<template>
  <div class="songMenuHot-box">
    <div class="songMenuMain">
      <ul class="songMenuMain-ul">
        <li v-for="(i, index) in hotResult" :key="index">
          <SongMenuPsd :item="i"></SongMenuPsd>
        </li>
      </ul>
    </div>
    <!-- loadFlag -->
    <Load v-if="loadFlag"></Load>
  </div>
</template>
<script>
import SongMenuPsd from "../SongMenu/SongMenuPsd";
import Load from "../Loading";
export default {
  components: {
    SongMenuPsd,
    Load,
  },
  data() {
    return {
      //数据渲染
      hotResult: [],
      loadFlag: true,
      // 页数
      pages: 1,
      // count:null,
    };
  },
  filters: {
    convert(val) {
      if (val >= 100000) {
        return (val / 10000).toFixed(2) + "万";
      } else {
        return val;
      }
    },
  },
  created() {
    this.hotResult = [];
    this.hotLoad();
  },
  methods: {
    hotLoad() {
      this.axios
        .get("/top/playlist?limit=30&order=hot&offset=" + (this.pages - 1) * 30)
        .then((res) => {
          this.loadFlag = false;
          this.hotResult = this.hotResult.concat(res.data.playlists);
        });
    },
    jmp(ids) {
      this.axios
        .get("http://music.kele8.cn/playlist/detail?id=" + ids)
        .then((res) => {
          // this.axios.get("/playlist/detail?id="+ids).then(res=>{
          let playlist = JSON.stringify(res.data.playlist);
          this.$router.push({
            name: "SongListDetails",
            query: {
              playlist: playlist,
            },
          });
        });
    },
  },
  mounted() {
    let that = this;
    window.onscroll = function () {
      //滚动条滚动时，距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //是可视区的高度
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (Math.ceil(scrollTop) + windowHeight == scrollHeight) {
        that.pages++;
        that.loadFlag = true;
        that.hotLoad();
      }
    };
  },
};
</script>
<style lang="less" scoped>
.songMenuHot-box {
  .songMenuHot {
    width: 85vw;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 10px 0;
    .songMenuHotTop {
      border-radius: 15px;
      background-color: #ffffff;
      border: 1px solid #ededef;
      .hotTopImg {
        position: relative;
        img {
          border-radius: 15px 15px 0 0;
          vertical-align: middle;
        }
        span {
          position: absolute;
          top: 3px;
          right: 15px;
          color: #fff;
          font-size: 12px;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2px 8px;
          border-radius: 15px;
        }
        i.i2 {
          font-size: 24px;
          position: absolute;
          right: 10px;
          bottom: 10px;
          color: #fff;
        }
      }
      .hotTopTitle {
        font-size: 12px;
        padding: 5px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .songMenuMain {
    width: 100vw;
    box-sizing: border-box;
    .songMenuMain-ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 31.5vw;
      }
    }
  }
}
</style>