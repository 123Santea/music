<template>
    <div class="songListDetails-box" ref="songListDetailsBox">
        <div class="songListDetailsTop" ref="songListDetailsTop">
            <TopNav :tracers="tracers">歌单</TopNav>
            <!-- <span>{{item.name}}</span> -->
        </div>
        <div class="songListDetailsTopTitle" v-if="item">
            <div class="songListDetailsTopTitleLeft">
                <Psd :item="item" :flag="true"></Psd>
            </div>
            <div class="songListDetailsTopTitleRight">
                <p>{{item.name}}</p>
                <p><span :style="{backgroundImage:`url(${item.creator.avatarUrl})`}"></span><i>{{item.creator.nickname}}</i></p>
                <p>{{item.description|match1}}</p>
            </div>
        </div>
        <h3>歌单歌曲列表</h3>
        <div class="songListDetails-list">
            <ul v-if="list">
                <li v-for="(i,index) in list" :key="index">
                    <SongPattern :item="i" :index="index" @add-musiclist="add(list)"></SongPattern>
                </li>
            </ul>
        </div>
        <Load v-if="$root.gd"></Load>
    </div>
</template>
<script>
import TopNav from '../topNav'
import Psd from '../SongMenu/SongMenuPsd'
import SongPattern from '../SongMenu/SongPattern'
import Load from '../Loading'
export default {
    data(){
        return{
            item:null,
            // 歌单详情点击返回按钮，应该回去的上一级路径
            // tracers:null,
            tracers:"",
            songID:[],
            list:null,
        }
    },
    methods:{
        add(val){
            // let existList = this.$root.musicStore.musicList;
            // this.list.map(d=>{
            //   let find = false;
            //   for(let i of existList){
            //       if(i.id==d.id){
            //           find=true;
            //           break;
            //         }
            //     }
            //     if(!find)existList.push(d); 
            // })
            // this.$root.musicStore.musicList=existList;
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
    components:{
        TopNav,
        Psd,
        SongPattern,
        Load,
    },
    filters:{
        match1(val){
            val = val.replaceAll(/\s+/g,"，");
            return val;
        }
    },
    created(){
        // this.songID=[],
        // console.log("55555=>",this.$route.query.playlist);
        // if(!this.$route.query.playlist){
        //     this.$root.gd=true;
        // }
        // this.item=JSON.parse(this.$route.query.playlist);
        // this.songID=this.songID.concat(this.item.trackIds.map(i=>{
        //     return i.id;
        // }))
        // let str = this.songID.join(",");
        // 获取歌单的歌曲详情
        // this.axios.get("http://music.kele8.cn/song/detail?ids="+str).then(res=>{
        //     this.list=res.data.songs;
        // })
        // console.log("ids=>",this.$route.query.id);
        this.axios.get("http://music.kele8.cn/playlist/detail?id="+this.$route.query.id).then(res=>{
            this.item=res.data.playlist;
            return res.data.playlist;
        }).then(res=>{
            return this.songID=this.songID.concat(res.trackIds.map(i=>{
                return i.id;
            }))
        }).then(res=>{
            let str = res.join(",");
            this.axios.get("http://music.kele8.cn/song/detail?ids="+str).then(res=>{
                this.list=res.data.songs;
            })
        })
    },
    mounted(){
    },
    beforeRouteEnter(to, from, next){
        next(vm=>{
            vm.tracers=from.path;
        });
    }
}
</script>
<style lang="less" scoped>
.songListDetails-box{
    width: 100vw;
    padding-top: 32.4px;
    box-sizing: border-box;
    .songListDetailsTop{
        background-color: #797979;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0px;
        color: #fff;
        z-index: 999;
        display: flex;
        align-items: center;
        span{
            flex: 1;
            text-align: center;
        }
    }
    .songListDetailsTopTitle{
        display: flex;
        padding: 2vh 0;
        box-sizing: border-box;
        background-color: #797979;
        .songListDetailsTopTitleLeft{
            // width:3rem;
            // height:6rem;
            overflow:hidden;
            flex: 2;
            box-sizing: border-box;
            padding-left: 2vw;
        }
        .songListDetailsTopTitleRight{
            flex: 4;
            p{
                box-sizing: border-box;
                padding-left:2vw;
                line-height: 2rem;
            }
            p:first-child{
                color:#fff;
                text-align: left;
                padding-top: 2px;
                padding-bottom: 2px;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            p:nth-child(2){
                font-size: 0.5rem;
                display: flex;
                align-items: center;
                color: #d4d4d4;
                padding-top: 3px;
                padding-bottom: 3px;
                span{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                i{
                    margin-left: 1vw;
                }
            }
            p:nth-child(3){
                color: #d4d4d4;
                font-size: 0.7rem;
                width: 100%;
                box-sizing: border-box;
                text-align: left;
                // text-indent: 2rem;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                // overflow:hidden;
                // text-overflow:ellipsis;
                // white-space:nowrap;
            }
        }
    }
    h3{
        text-align: left;
        box-sizing: border-box;
        padding: 4px 0 4px 2vw;
        font-size: 1rem;
    }
    .songListDetails-list{
        ul{
            li{
                padding: 5px 0;
                width:100vw;
                padding-right:0.3rem !important;
            }
        }
    }
}
</style>