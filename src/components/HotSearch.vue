<template>
  <div class="hotSearch-box">
    <p><span class="hotSearch-span">热门搜索</span></p>
    <div class="hotSearch-ul">
      <ul>
        <li
          v-for="(i, index) in hotSearchArr"
          :key="index"
          class="hotSearch-li"
          @click="$emit('change', i.first)"
        >
          <span class="hotSearch-index">{{ index + 1 }}</span>
          <span class="hotSearch-first">{{ i.first }}</span>
          <i v-if="index <= 2"></i>
        </li>
      </ul>
    </div>
    <!-- iconfont icon-RectangleCopy -->
    <!-- @click="del(index) -->
    <!-- @click="$emit('change', i) -->
    <div class="history">
      <div class="ssls" v-show="histArr.length">
        <span>搜索历史</span>
        <i class="iconfont icon-RectangleCopy" @click="allDel"></i>
      </div>
      <ul>
        <li v-for="(i, index) in histArr" :key="index">
          <img :src="sv"/>
          <div><span class="divs" @click="$emit('change', i)">{{i}}</span></div>
          <img :src="cw" @click="del(index)"/>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import sv from '../assets/12.svg'
import cw from '../assets/11.svg'
export default {
  data() {
    return {
      hotSearchArr: [],
      histArr: [],
      sv,
      cw,
    };
  },
  props: ["keyword"],
  created() {
    this.axios.get("/search/hot").then((res) => {
      this.hotSearchArr = res.data.result.hots;
    });
    if (localStorage.getItem("hist")) {
      let arr = localStorage.getItem("hist").split(",");
      arr[0] = arr[0].replace("null", "");
      arr.pop();
      let arr2 = arr.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
      this.histArr = arr2;
    }
  },
  methods: {
    del(index) {
      // console.log(index);
      let ds = this.histArr[index];
      console.log(ds);
      this.histArr.splice(index, 1);
      let arr = localStorage.getItem("hist").split(",");
      arr[0] = arr[0].replace("null", "");
      if (arr[arr.length-1]=="") {
          arr.pop();
      }
      let arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] != ds) {
          //   console.log("记录");
          arr2.push(arr[i]);
        }
      }
      let arr3 = arr2.join();
      localStorage.setItem("hist", arr3);
    //   localStorage.getItem("hist");
    },
    // 全删
    allDel(){
      this.histArr=[];
      localStorage.setItem("hist","");
    }
  },
};
</script>
<style lang="less" scoped>
.hotSearch-box {
  width: 100vw;
  padding-bottom: 1.067vw;
  box-sizing: border-box;
  padding-left: 4vw;
  p {
    text-align: left;
    .hotSearch-span {
      font-size: 5.333vw;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #262338;
      position: relative;
      font-weight: 700;
      line-height: normal;
    }
  }
  .hotSearch-ul {
    ul {
      li {
        height: 9.333vw;
        padding: 2.4vw 6.133vw;
        box-sizing: border-box;
        font-size: 4.267vw;
        font-weight: 400;
        color: #262338;
        line-height: 9.333vw;
        display: flex;
        align-items: center;
        margin-top: 1.867vw;
        .hotSearch-index {
          width: 7.2vw;
          text-align: center;
          font-size: 4.8vw;
          font-weight: 700;
          line-height: 5.2vw;
          margin-right: 5.867vw;
          color: #a1a4b3;
        }
        .hotSearch-first {
          max-width: 66.667vw;
          margin-right: 2.133vw;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        i {
          width: 10.133vw;
          height: 4.667vw;
          background-repeat: no-repeat;
          background-size: 10.133vw 4.667vw;
          background-position: 50%;
          background-image: url("http://h5static.kuwo.cn/www/kuwo-m/img/icon01.bb07bd0.png");
        }
      }
      .hotSearch-li:first-child .hotSearch-index {
        color: #f84824;
      }
      .hotSearch-li:nth-child(2) .hotSearch-index {
        color: #f47f1b;
      }
      .hotSearch-li:nth-child(3) .hotSearch-index {
        color: #ffb11f;
      }
    }
  }
  .history {
    .ssls{
      font-size: 1.1rem;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #262338;
      position: relative;
      font-weight: 700;
      line-height: normal;
      display: flex;
      align-items: center;
      i{
        // flex: 1;
        font-size: 1.55rem;
        margin-left: 0.6rem;
      }
    }
    ul {
      box-sizing: border-box;
      padding: 0 1rem;
      li {
        box-sizing: border-box;
        text-align: left;
        padding: 0.3rem 0;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        img{
          width: 1.2rem;
          height: auto;
        }
        img:nth-child(3){
          width: 1.8rem;
          margin-right: 0.5rem;
        }
        div{
          flex: 1;
          text-align: left;
          margin-left: 0.4rem;
          .divs{
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>