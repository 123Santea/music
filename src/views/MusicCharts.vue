<template>
    <div class="musicCharts-box" ref="musicCharts">
        <div class="musicChartsTop" ref="musicChartsTop">
            <TopNav>排行榜</TopNav>
        </div>
        <h1>官方榜</h1>
        <div class="desdev">
            <ul>
                <li v-for="(i,index) in officialArr" :key="i.id" @click="jump(i.id)">
                    <MusicChartsPsd :index="index" :item="i"></MusicChartsPsd>
                </li>
            </ul>
        </div>
        <h1>精选榜</h1>
        <div class="featur">
            <ul>
                <li v-for="(i,index) in featurArr" :key="index" @click="jump(i.id)">
                    <div class="featurArr-box">
                        <div class="featurArr-top" :style="{backgroundImage:`url('${i.coverImgUrl}')`}">
                            <span>{{i.updateFrequency}}</span>
                        </div>
                        <p>{{i.name}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import TopNav from '../components/topNav'
import MusicChartsPsd from '../components/MusicCharts/MusicChartsPsd'
export default {
    components:{
        TopNav,
        MusicChartsPsd,
    },
    data(){
        return{
            officialArr:[],
            featurArr:[],
        }
    },
    created(){
        this.officialArr=[];
        this.featurArr=[];
        this.axios.get("/toplist").then(res=>{
            let list =res.data.list;
            this.officialArr = list.splice(0,5);
            // console.log(list);
            this.featurArr = list;
            // console.log(this.featurArr);
        })
    },
    mounted(){
        let h = this.$refs.musicChartsTop.offsetHeight;
        this.$refs.musicCharts.style.paddingTop=h+"px";
    },
    methods:{
        jump(ids){
            this.axios.get("http://music.kele8.cn/playlist/detail?id="+ids).then(res=>{
            // this.axios.get("/playlist/detail?id="+ids).then(res=>{
                // console.log(res);
                let playlist = JSON.stringify(res.data.playlist);
                // let id = res.data.playlist.id;
                this.$router.push({
                    // path:'/songListDetails/'+id,
                    name:'SongListDetails',
                    query:{
                        // id:id,
                        playlist:playlist,
                    }
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
.musicCharts-box{
    width: 100vw;
    box-sizing: border-box;
    // padding: 0 2vw;
    .musicChartsTop{
        background-color: #fff;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 19;
    }
    h1{
        font-weight: 800;
        font-size: 1.5rem;
        text-align: left;
        box-sizing: border-box;
        padding: 2vh 2vw;
    }
    .desdev{
        ul{
            li:nth-child(1){
                background-color: rgba(250,162,193,.3);
            }
            li:nth-child(2){
                background-color: rgba(56,217,169,.3);
            }
            li:nth-child(3){
                background-color: rgba(239,83,80,.3);
            }
            li:nth-child(4){
                background-color: rgba(100,181,246,.3);
            }
            li:nth-child(5){
                background-color: rgba(255,245,157,.3);
            }
            li{
                border-radius: 12px;
                width: 96vw;
                // margin: 0 auto;
                padding: 2vh 2vw;
                margin: 6px auto;
            }
        }
    }
    .featur{
        width: 100vw;
        box-sizing: border-box;
        padding: 0 2vw;
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            li{
                // width: 30vw;
                width: 6.2rem;
                .featurArr-box{
                    .featurArr-top{
                        // width: 10rem;
                        // height: 10rem;
                        width: 100%;
                        height: 6.2rem;
                        background-size: cover;
                        border-radius: 12px;
                        position: relative;
                        span{
                            font-size: 0.3rem;
                            position: absolute;
                            top: 5px;
                            right: 12px;
                            color: #fff;
                            padding: 3px 6px;
                            border-radius: 10px;
                            background-color: rgba(217,217,217,.3);
                        }
                    }
                    p{
                        padding: 4px 0;
                        font-size: 0.8rem;
                        text-align: left;
                    }
                }
            }
        }
    }
}
</style>