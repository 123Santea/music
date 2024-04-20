<template>
    <ol>
        <li v-for="(i,index) in AlbumsArr" :key="index">
            <Dvd :AlbumsArr="i" :albumSize="albumSize"></Dvd>
        </li>
        <Load v-if="loadFlag"></Load>
        <p v-if="end">全部都加载完啦</p>
    </ol>
</template>
<script>
import Dvd from '../Singer/Dvd'
import Load from '../Loading'
export default {
    props:["albumSize","id"],
    data(){
        return{
            AlbumsArr:[],
            pages:1,
            loadFlag:true,
            end:false,
        }
    },
    components:{
        Dvd,
        Load,
    },
    methods:{
        hotLoad(){
                this.axios.get("/artist/album?id="+this.id+"&limit=30&offset="+(this.pages-1)*30).then(res=>{
                // console.log(res);
                this.AlbumsArr=this.AlbumsArr.concat(res.data.hotAlbums);
                this.loadFlag = false;
                // console.log(this.AlbumsArr);
                if(this.AlbumsArr.length >= this.albumSize){
                    this.end = true;
                }
            })
        }
    },
    created(){
        this.end = false;
        this.loadFlag=true;
        this.pages=1;
        this.AlbumsArr=[];
        // 获取歌手专辑
        this.hotLoad();
    },
    mounted(){
        let that=this;
        window.onscroll = function(){
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            // console.log(scrollTop);
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            // console.log(windowHeight);
            let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
            // console.log(scrollHeight);
            if(Math.floor(scrollTop)+windowHeight==scrollHeight&&(!that.end)){
                that.pages++;
                that.loadFlag = true;
                that.hotLoad();
                // console.log(that.pages);
            }
        }
    }
}
</script>
<style lang="less" scoped>
ol{
    padding-top: 2vh;
    li{
        padding: 6px 0;
    }
}
</style>