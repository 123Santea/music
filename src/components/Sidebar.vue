<template>
<!-- 播放列表 -->
    <div class="sidebar-box">
        <!-- <h3>当前播放</h3> -->
        <div class="sidebar-ul">
            <ul>
                <li class="sidebarPO"><h3>当前播放({{$root.musicStore.musicList.length}})</h3></li>
                <li v-for="(i,index) in $root.musicStore.musicList" :key="index" :class="{active:$root.musicStore.musicID==i.id}" class="soli">
                    <div class="i1" v-if="$root.musicStore.musicID==i.id"></div><p @click="change(i)">{{i.name}}<span v-if="i.ar"> - {{i.ar[0].name}}</span></p><span class="iconfont icon-RectangleCopy" @click="erase({obj:i,index:index})"></span>
                </li>
                <span class="iconfont icon-quxiao" @click="$emit('sidebarShow')"></span>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 再点击删除的歌与当前播放不是同一首时，打开开关播放这首
            icr:true,
        }
    },
    methods:{
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
      change(i){
          if(this.icr){
              this.$root.musicStore.musicID=i.id;
              this.$root.musicStore.musicObj=i;
          }
      },
      // 删除
      erase(obj){
          let index = obj.index;
          let item = obj.obj;
        //   如果当前列表只有一首音乐，则先把播放暂停，再删
        if(this.$root.musicStore.musicList.length==1){
            console.log("留一首歌哦");
            // console.dir(this.$toast);
            this.$toast('要留一首歌呦');
            return ;
        }
        // 删除的音乐是当前播放的音乐
        if(item.id == this.$root.musicStore.musicID){
            let index2 = (index+1)>this.$root.musicStore.musicList.length-1?0:(index+1);
            this.$root.musicStore.musicID=this.$root.musicStore.musicList[index2].id;
            this.$root.musicStore.musicObj=this.$root.musicStore.musicList[index2];
            this.icr=false;
        }else{
            this.icr=true;
        }
        this.$root.musicStore.musicList.splice(index,1);
      }
    },
    created(){
        // console.log(this.$root.musicStore.musicList);
        this.stop();
    },
    // bodyScroll(event){
    //     event.preventDefault();  
    // },
    destroyed(){
       this.move();
    },
   
}
</script>
<style lang="less" scoped>
.sidebar-box{
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    background-color: rgba(0,0,0,.5);
    text-align: left;
    // display: flex;
    .sidebar-ul{
        width: 60vw;
        height: 45vh;
        position: absolute;
        bottom: 4.41333333rem;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
        margin: 0 auto;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0px 0px 5px 5px #efefef,0px 0px 0px 0px #efefef, 0px 0px 5px 5px rgba(255, 255, 255, 0.5);
        ul{
            width: 60vw;
            height: 45vh;
            overflow: auto;
            box-sizing: border-box;
            padding: 39.58px 3vw 0;
            .icon-quxiao{
                position:absolute; 
                top: -1rem;
                right: -0.7rem;
                font-size: 2rem;
                border-radius: 50%;
                 box-shadow: 0px 0px 5px 5px #FFFFFF,0px 0px 0px 0px #FFFFFF, 0px 0px 5px 5px #FFFFFF,0px 0px 0px 0px #FFFFFF;
                background-color: #FFFFFF;
                color: #d4d4d4;
                z-index:999;
            }
            .sidebarPO{
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                margin: 0 0;
                padding: 0 0;
                background-color:#fff;
                z-index: 99;
                border-radius: 12px 60px 12px 12px;
                box-shadow:0 0 0.2rem -0.1rem #aaa;
                text-align: center;
            }
            li.active{
                color: #77d2fb;
            }
            li{
                display: flex;
                align-items: center;
                padding: 0.3rem 0;
                h3{
                    padding: 1vh 0 1.2vh 2px;
                }
                span{
                    font-size: 0.6rem;
                }
                .i1{
                    display: inline-block;
                    width: 2rem;
                    height: 2rem;
                    background-image: url("../assets/2333.gif");
                    background-size: cover;
                }
                p{
                     display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .icon-RectangleCopy{
                    padding: 0 0.2rem;
                    font-size: 2rem;
                }
            }
            .soli{
                border-bottom:1px solid #eee;
            }
        }
    }
}
</style>