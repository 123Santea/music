<template>
<!-- 轮播组件 -->
  <div class="recommendPage">
    <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(i,index) in slides" :key="index">
            <!-- <img :src="i.img_url"> -->
            <img :src="i">
        </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
      <!-- <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
  </div>
</template>
 
<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "../css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide,
  },
  props:["slides1"],
  data() {
    return {
      swiperOption: {
        //是否开启循坏
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 滑动速度
        speed:1000,
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      slides:this.slides1,
      // slides:[
      //   {id:1,img_url:'http://p1.music.126.net/qGmEr900RHhdTCTUxSXc_A==/109951165672845446.jpg?imageView&quality=89'},
      //   {id:2,img_url:'http://p1.music.126.net/lGqQr7Nt2fWfHuAN3h01ng==/109951165676627387.jpg?imageView&quality=89'},
      //   {id:3,img_url:'http://p1.music.126.net/GBNX38pxYXXxmHATKwg4rA==/109951165675649416.jpg?imageView&quality=89'},
      //   {id:4,img_url:'http://p1.music.126.net/yA9SP88mN4CpEZFT2Hji4g==/109951165675669999.jpg?imageView&quality=89'},
      //   {id:5,img_url:'http://p1.music.126.net/RI1Q-657Dhb3OMK7IKIO-g==/109951165676643427.jpg?imageView&quality=89'},
      //   {id:6,img_url:'http://p1.music.126.net/JITX5r6JWzYzSHBrbnFWXw==/109951165676623678.jpg?imageView&quality=89'},
      //   {id:7,img_url:'http://p1.music.126.net/400ExknDzFb-eEm9AA1Igg==/109951165675668711.jpg?imageView&quality=89'},
      //   {id:8,img_url:'http://p1.music.126.net/hqlW7jg8XGvKXzVrEg37Tw==/109951165676613152.jpg?imageView&quality=89'},
      // ]
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  }
};
</script>
<style lang="less" scoped >
*{
  padding: 0;
  margin: 0;
}
.recommendPage .swiper-container{
  position: relative;
  width: 100%;
  background: #F9FAFB;
}  
.recommendPage .swiper-container .swiper-slide{
  width: 100%;
  background: #F9FAFB;
  color: #000;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
}
.recommendPage{
  border-radius: .10667rem;
  div{
    border-radius: .10667rem;
    img{
      border-radius: .10667rem;
    }
  }
}
</style>