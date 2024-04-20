<template>
  <div class="latestMusic-list">
    <!-- 最新音乐 -->
    <template v-if="item.song">
      <div class="left">
        <p class="songName">
          {{ item.name }}
          <span v-if="item.song.alias.length">{{ item.song.alias[0] }}</span>
        </p>
        <p class="songer">
          <i v-if="item.song.exclusive"></i>{{ item.song.artists[0].name }}
        </p>
      </div>
      <span class="play">
        <i
          @click="playback(item)"
          :style="{
            display: item.id == $root.musicStore.musicID ? 'none' : 'block',
          }"
        ></i>
        <i
          :style="{
            display: item.id == $root.musicStore.musicID ? 'block' : 'none',
          }"
        ></i>
      </span>
    </template>
    <!-- 搜索结果展示 -->
    <template v-if="!item.song">
      <div class="left">
        <!-- {{item.name}}
                        <span v-if="item.alias.length">{{item.alias[0]}}</span> -->
        <p
          class="songName"
          v-html="$options.filters.highlight(item.name, keyword)"
        ></p>
        <!-- <p class="songer"><i v-if="item.exclusive"></i>{{item.artists[0].name}}</p> -->
        <p
          class="songer"
          v-html="$options.filters.highlight(item.artists[0].name, keyword)"
        ></p>
      </div>
      <span class="play">
        <i
          @click="playback1(item)"
          :style="{
            display: item.id == $root.musicStore.musicID ? 'none' : 'block',
          }"
        ></i>
        <i
          :style="{
            display: item.id == $root.musicStore.musicID ? 'block' : 'none',
          }"
        ></i>
      </span>
    </template>
  </div>
</template>
<script>
export default {
  props: ["item", "index", "keyword"],
  data() {
    return {};
  },

  //    http://musicapi.leanapp.cn/recommend/songs?csrf_token=5c836758605511eea978a498ec42674c
  filters: {
    highlight(val, keyword) {
      let reg = new RegExp(keyword, "g");
      if (reg.test(val)) {
        return val.replace(
          reg,
          "<span class='focusrect'>" + keyword + "</span>"
        );
      } else {
        return val;
      }
    },
  },
  methods: {
    playback(item) {
      this.$root.musicStore.musicID = item.id;
      this.$root.musicStore.musicObj = item;
      this.$root.flag = true;
      // console.log(this.$root.musicStore.musicObj);
      this.$emit("add-musicList");
    },
    playback1(item) {
      this.$root.musicStore.musicID = item.id;
      this.$root.musicStore.musicObj = item;
      this.$root.flag = true;
      //    console.log(this.$root.musicStore.musicObj);
      let existList = this.$root.musicStore.musicList;
      let find = false;
      for (let i of existList) {
        if (i.id == item.id) {
          find = true;
        }
      }
      if (!find) this.$root.musicStore.musicList.push(item);
    },
  },
  watch: {
    item(newValue) {
      if (!newValue) {
        this.$emit("end");
      }
    },
  },
};
</script>
<style lang="less">
.latestMusic-list {
  padding: 5px 0;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .left {
    text-align: left;
    flex: 1;
    p {
      box-sizing: border-box;
    }
    .songName {
      font-size: 17px;
    //   flex: 1;
    width: 16rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
      span {
        color: #888;
        // margin-left: 4px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // word-break: normal;
      }
    }
    .songer {
      font-size: 12px;
      color: #888;
      i {
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        background: url("../assets/index_icon_2x.png") no-repeat 0 0/166px 97px;
      }
    }
  }
  .play {
    //   width: 3rem;
    padding: 0 10px;
    display: flex;
    align-items: center;
    i {
      display: inline-block;
      width: 22px;
      height: 22px;
    }
    i:nth-child(1) {
      background: url("../assets/index_icon_2x.png") no-repeat -24px 0/166px 97px;
    }
    i:nth-child(2) {
      width: 32px;
      height: 32px;
      background: url("../assets/2333.gif") no-repeat 0 0 / cover;
    }
  }
}
span.focusrect {
  color: #77d2fb !important;
  margin: 0;
}
</style>
