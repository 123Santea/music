<template>
    <div class="singerAlbum-box">
        <div class="singerAlbum-top" ref="nav">
            <TopNav :tracers="tracers">专辑</TopNav>
        </div>
        <div class="singerAlbum-bg" ref="singerAlbum">
            <div class="singerAlbum-img" :style="{backgroundImage:`url('${albums.picUrl}?imageView=1&type=webp&thumbnail=247x0')`}"></div>
            <div class="singerAlbum-main">
                <div class="singerAlbum-main-l" :style="{backgroundImage:`url('${albums.picUrl}?imageView=1&type=webp&thumbnail=247x0')`}"></div>
                <div class="singerAlbum-main-r">
                    <p>{{albums.name}}</p>
                    <p>歌手：{{albums.artist.name}}</p>
                    <p>发行时间：{{albums.publishTime|timestampToTime}}</p>
                    <p>{{albums.description}}</p>
                </div>
            </div>
        </div>
        <div class="singerAlbumSongs">
            <ul>
                <li v-for="(i,index) in songs" :key="index">
                    <SongPattern :item="i" :index="index"></SongPattern>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import TopNav from '../topNav'
import SongPattern from '../SongMenu/SongPattern'
export default {
    components:{
        TopNav,
        SongPattern,
    },
    data(){
        return{
            // albums:this.$route.params.albums,
            // songs:this.$route.params.songs,
            albums:JSON.parse(this.$route.query.albums),
            songs:JSON.parse(this.$route.query.songs),
            tracers:"",
            // flag:true,
        }
    },
    created(){
        // console.log(this.albums);
    },
    beforeRouteEnter(to,from,next){
        // console.log(to);
        next(vm=>{
            // if(vm.flag){
                vm.tracers=from.path;
                // vm.flag = false;
            // }
        });
    },
    filters:{
        //将时间戳转换成正常时间格式
        timestampToTime(val) {
            // console.log(val);
            //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let date=val.toString().length >10 ? new Date(val) :new Date(val*1000)
            let Y = date.getFullYear() + '.';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
            let D = (date.getDate()<10 ? '0'+date.getDate() :date.getDate()) + ' ';
            // let h = date.getHours() + ':';
            // let m = date.getMinutes() + ':';
            // let s = date.getSeconds();
            // console.log(Y+M+D);
            return Y+M+D;
        }
    },
    mounted(){
        let that=this;
        window.onscroll = function(){
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            let node = that.$refs.singerAlbum;
            let top = node.offsetHeight;
            console.log("专辑");
            if(scrollTop>top){
                that.$refs.nav.style.backgroundColor="#323836";
            }else{
                that.$refs.nav.style.backgroundColor="transparent";
            }
        }
    }
}
</script>
<style lang="less" scoped>
.singerAlbum-box{
    .singerAlbum-top{
        width: 100vw;
        text-align: left;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
    }
    .singerAlbum-bg{
        background-size: cover;
        width: 100vw;
        height: 30vh;
        position: relative;
        display: flex;
        align-items: center;
        .singerAlbum-img{
            filter: blur(15px);
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }
        .singerAlbum-main{
            display: flex;
            padding: 2.6vh 0;
            // align-items: center;
            .singerAlbum-main-l{
                // width: 15rem;
                // height: 8rem;
                width: 120px;
                height: 120px;
                border-radius: 15px;
                background-size: cover;
                box-sizing: border-box;
                // padding-left: 2vw;
                margin-left: 2vw;
            }
            .singerAlbum-main-r{
                box-sizing: border-box;
                padding-left: 2vw;
                flex: 1;
                p{
                    text-align: left;
                    padding: 3px 0;
                }
                p:nth-child(1){
                    color: #fff;
                    font-size: 1rem;
                    font-size: 550;
                }
                p:nth-child(2){
                    font-size: 0.8rem;
                    color: #f8f9fa;
                }
                p:nth-child(3){
                    font-size: 0.6rem;
                    color: #adb5bd;
                }
                p:nth-child(4){
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2; //需要控制的文本行数
                    overflow: hidden;
                    font-size: 0.6rem;
                    color: #adb5bd;
                }
            }
        }
    }
    .singerAlbumSongs{
        padding-top: 2.5vh;
        ul{
            li{
                box-sizing: border-box;
                padding-right: 0.2rem;
            }
        }
    }
}
</style>