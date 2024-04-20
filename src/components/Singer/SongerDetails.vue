<template>
    <div class="songerDetails-box">
        <div class="songerDetails-box-top" :style="{backgroundImage:`url('${artist.picUrl}?imageView=1&type=webp&thumbnail=247x0')`}" v-if="artist">
            <div class="songerDetails-box-topNav" ref="songerDetailsBoxTopNav">
                <TopNav :tracers="tracers" :color="color"></TopNav>
            </div>
        </div>
        <div class="songerDetails-info" v-if="artist" ref="info">
            <div class="songerDetails-info-img" :style="{backgroundImage:`url('${artist.img1v1Url}?imageView=1&type=webp&thumbnail=247x0')`}" v-if="artist.img1v1Url" ref="img1v1Url"></div>
            <p>{{artist.name}}</p>
            <p>专辑：<strong>{{artist.albumSize}}</strong>歌曲：<strong>{{artist.musicSize}}</strong></p>
            <p>{{artist.briefDesc}}</p>
        </div>
        <div class="songerDetails-nav">
            <ul ref="songerDetailsUl">
                <li class="active" @click="ms1">热门歌曲50首</li>
                <li @click="ms2">专辑</li>
            </ul>
            <component :is="type" :songArr="hotSongs" :singSize="singSize" :albumSize="albumSize" :id="ids"></component>
        </div>
        <Load v-if="end"></Load>
    </div>
</template>
<script>
import TopNav from '../topNav'
import SingerAnisong from '../Singer/SingerAnisong'
import SingerDve from '../Singer/SingerDve'
import Load from '../Loading'
export default {
    components:{
        TopNav,
        SingerAnisong,
        SingerDve,
        Load,
    },
    // 
    data(){
        return{
            tracers:"",
            artist:null,
            hotSongs:null,
            type:'SingerAnisong',
            color:"#fff",
            // 页数
            pages:1,
            // hotAlbumsArr:[],
            ids:null,
            // 歌曲数量
            singSize:null,
            // 专辑数量
            albumSize:null,
            end:true,
            flag:true,
        }
    },
    created(){
        this.end=true;
        this.hotAlbumsArr=[];
        let id = this.$route.params.id;
        this.ids=id;
        // 获取歌手单曲
        this.axios.get("/artists?id="+id).then(res=>{
            this.artist = res.data.artist;
            // 获取数量
            this.singSize = this.artist.musicSize;
            this.albumSize =this.artist.albumSize;
            // console.log(this.singSize,this.albumSize);
            this.hotSongs = res.data.hotSongs;
            // console.log(this.hotSongs);
            // console.log("单曲=>",res.data);
            this.end=false;
        })
        // 获取歌手专辑
        // this.axios.get("/artist/album?id="+id+"&limit=30&offset"+(this.pages-1)*30).then(res=>{
        //     this.hotAlbumsArr=this.hotAlbumsArr.concat(res.data.hotAlbums);
        // })
    },
    methods:{
        ms1(e){
            let ul = this.$refs.songerDetailsUl;
            let len = ul.children.length;
            for(let i=0;i<len;i++){
                ul.children[i].classList.remove("active");
            }
            e.target.classList.add("active");
            this.type="SingerAnisong";
        },
        ms2(e){
            let ul = this.$refs.songerDetailsUl;
            let len = ul.children.length;
            for(let i=0;i<len;i++){
                ul.children[i].classList.remove("active");
            }
            e.target.classList.add("active");
            this.type="SingerDve";
        },
    },
    watch:{
        artist(){
            // console.log(this.artist);
            // console.log("值改变了");
            // console.log(this.$refs.img1v1Url);
        }
    },
    mounted(){
        let that=this;
        window.onscroll = function(){
            // console.log("主页面");
            let info = that.$refs.info;
            let top = info.offsetTop+info.offsetHeight-32;
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(scrollTop>249){
                that.$refs.songerDetailsBoxTopNav.style.backgroundColor="rgba(255,255,255,1)";
                that.color="#323836";
            }else{
                that.$refs.songerDetailsBoxTopNav.style.backgroundColor="rgba(255,255,255,0)";
                that.color="#fff";
            }
            let navTop = that.$refs.songerDetailsBoxTopNav.offsetHeight;
            if(scrollTop>top){
                that.$refs.songerDetailsUl.classList.add("songerU");
                that.$refs.songerDetailsUl.style.paddingTop = navTop+"px";
            }else{
                that.$refs.songerDetailsUl.classList.remove("songerU");
                that.$refs.songerDetailsUl.style.paddingTop = 0+"px";
            }
        }
    },
    beforeRouteEnter(to,from,next){
        // console.log(to);
        next(vm=>{
            // if(vm.flag){
            //     vm.tracers=from.path;
            //     console.log("vm=>",vm.tracers);
            //     vm.flag=false;
            // }
            vm.tracers="/singer";
        });
    }
}
</script>
<style lang="less" scoped>
.songerDetails-box{
    .songerDetails-box-top{
        background-size: cover;
        height: 50vh;
        .songerDetails-box-topNav{
            background-color:rgba(255,255,255,0);
            position: fixed;
            top: 0;
            left: 0;
            width: 100vh;
            box-sizing: border-box;
            z-index: 999;
        }
    }
    .songerDetails-info{
        width: 90vw;
        margin: 0 auto;
        background-color: #ededef;
        border-radius: 0.5rem;
        position: relative;
        top: -5vh;
        padding-top: calc(7rem / 2);
        padding-bottom: 2vh;
        .songerDetails-info-img{
            width: 7rem;
            height: 7rem;
            border: 1px solid #fff;
            box-sizing: border-box;
            padding: 1rem;
            border-radius: 50%;
            background-size: cover;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        p:nth-child(2){
            color: black;
            font-size: 600;
            font-size: 1.3rem;
            padding: 3px 0;
        }
        p:nth-child(3){
            font-size: 0.5rem;
            padding: 3px 0;
        }
        p:nth-child(4){
            text-align: left;
            font-size: 0.6rem;
            padding: 3px 0 0.9rem 0;
            // text-overflow: -o-ellipsis-lastline;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // line-clamp: 2;
            // -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; //需要控制的文本行数
            overflow: hidden;
        }
    }
    .songerDetails-nav{
        position: relative;
        top: -2vh;
        ul{
            display: flex;
            padding-bottom: 1vh;
            border-bottom: 1px solid #d4d4d4;
            &.songerU{
                width: 100vw;
                position: fixed;
                top: 0;
                left: 0;
                background-color: #fff;
                z-index: 99;
            }
            li{
                flex: 1;
                color: #8b8e86;
                font-size: 1rem;
                &.active{
                    color: #201f3d;
                    font-weight: 600;
                }
            }
        }
        ol{
            li{
                padding: 4px 0;
            }
        }
    }
}
</style>