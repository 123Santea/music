<template>
  <div class="songPattern-box">
    <div class="songPatternLeft">{{ index + 1 }}</div>
    <div class="songPatterncenter">
      <p>{{ item.name }}</p>
      <p>{{ item.ar[0].name }}<i>-</i>{{ item.al.name }}</p>
    </div>
    <div class="songPatternRight">
      <i
        @click="change(item)"
        class="i123"
        :style="{
          display: item.id == $root.musicStore.musicID ? 'none' : 'block',
        }"
      ></i>
      <i
        class="songPattern-i"
        :style="{
          display: item.id == $root.musicStore.musicID ? 'block' : 'none',
        }"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "index", "singSize"],
  methods: {
    change(val) {
      this.$root.musicStore.musicID = val.id;
      this.$root.musicStore.musicObj = val;
      this.$root.flag = true;
      this.$emit("add-musiclist");
      let existList = this.$root.musicStore.musicList;
      let find = false;
      for (let i of existList) {
        if (i.id == val.id) {
          find = true;
        }
      }
      if (!find) this.$root.musicStore.musicList.push(val);
    },
  },
  created() {
    // console.log(this.singSize);
  },
};
</script>
<style lang="less" scoped>
.songPattern-box {
  display: flex;
  align-items: center;
  text-align: left;
  box-sizing: border-box;
  .songPatternLeft {
    flex: 0.3;
    box-sizing: border-box;
    padding-left: 2vw;
    font-size: 1.2rem;
    color: #797979;
  }
  .songPatterncenter {
    flex: 4;
    box-sizing: border-box;
    p {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    p:last-child {
      color: #797979;
      font-size: 0.3rem;
      padding-top: 0.1rem;
    }
  }
  .songPatternRight {
    flex: 0.35;
    display: flex;
    align-items: center;
    justify-content: end;
    box-sizing: border-box;
    .i123 {
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url("../../assets/index_icon_2x.png") no-repeat -24px 0/166px 97px;
    }
    .songPattern-i {
      display: inline-block;
      width: 32px;
      height: 32px;
      background: url("../../assets/2333.gif") no-repeat 0 0 / cover;
    }
  }
}
</style>