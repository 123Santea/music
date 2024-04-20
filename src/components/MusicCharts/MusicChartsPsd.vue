<template>
    <div class="musicChartsPsd-box">
        <div class="musicChartsPsd-l">
            <h3 ref="psdh3">{{item.name}}</h3>
            <div class="musicChartsPsd-l-img" :style="{backgroundImage:`url('${songs[0].al.picUrl}')`}" v-if="songs.length">
                <i class="iconfont icon-bofanganniu"></i>
            </div>
        </div>
        <div class="musicChartsPsd-r">
            <ul>
                <li v-for="(i,index) in songs" :key="i.id">
                    <p>{{index+1}}. {{i.name}} <span class="span">- {{i.ar[0].name}}<span v-if="i.ar[1]">/{{i.ar[1].name}}</span></span></p>
                </li>
            </ul>
        </div>
        <span class="updateFrequency">{{item.updateFrequency}}</span>
        <Load v-if="!songs.length"></Load>
    </div>
</template>
<script>
import Load from '../Loading'
export default {
    props:["index","item"],
    data(){
        return{
            songs:[],
            img1:null,
            // playlist:null,
        }
    },
    components:{
        Load,
    },
    created(){
        this.songs=[],
        
        // 歌单详情
        // console.log(this.item);
        this.axios.get("http://music.kele8.cn/playlist/detail?id="+this.item.id).then(res=>{
        // this.axios.get("/playlist/detail?id="+this.item.id).then(res=>{
            // console.log(res);
            let trackIds = res.data.playlist.trackIds.slice(0,3);
            let ids = trackIds.map(value=>{
                return value.id;
            })
            let str = ids.join(",");
            this.axios.get("http://music.kele8.cn/song/detail?ids="+str).then(res=>{
                // console.log(res);
                this.songs=res.data.songs;
                // this.img1=this.songs[0].
                // console.log(this.songs);
            })
        })
    },
    methods:{
        color(node){
            let index = this.index;
            if(index ==0){
                node.style.color = "#f5222d";
            }else if(index==1){
                node.style.color = "#40a9ff";
            }else if(index==2){
                node.style.color = "#ef5350";
            }else if(index==3){
                node.style.color="#64b5f6";
            }else{
                node.style.color="#fff176";
            }
        }
    },
    mounted(){
        let h3 = this.$refs.psdh3;
        this.color(h3);
    }
}
</script>
<style lang="less" scoped>
.musicChartsPsd-box{
    display: flex;
    .musicChartsPsd-l{
        h3{
            font-size: 1rem;
            // color: #f5222d;
            font-weight: 600;
        }
        .musicChartsPsd-l-img{
            background-size: cover;
            width: 5rem;
            height: 5rem;
            border-radius: 15px;
            position: relative;
            i{
                font-size: 1.2rem;
                color: rgba(255,255,255,.8);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
        }
    }
    .musicChartsPsd-r{
        display: flex;
        align-items: center;
        flex: 1;
        box-sizing: border-box;
        padding-left: 2.5vw;
        padding-top: 2vh;
        ul{
            li{
                padding: 0.5vh 0;
                font-size: 0.8rem;
                p{
                    text-align: left;
                    .span{
                        color: #434343;
                    }
                }
            }
        }
    }
    .updateFrequency{
        font-size: 0.5rem;
        color: #bfbfbf;
    }
}
</style>
