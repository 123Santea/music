<template>
<div class="chinese-box">
    <div class="songMenuMain">
        <ul class="songMenuMain-ul">
            <li v-for="(i,index) in hotResult" :key="index">
                <SongMenuPsd :item="i"></SongMenuPsd>
            </li>
        </ul>
    </div>
    <Load v-if="loadFlag"></Load>
</div>
</template>
<script>
import SongMenuPsd from '../SongMenu/SongMenuPsd'
import Load from '../Loading'
export default {
    components:{
        SongMenuPsd,
        Load,
    },
    data(){
        return{
            loadFlag:true,
            pages:1,
            hotResult:[],
            node:null,
        }
    },
    methods:{
        hotLoad(){
            this.axios.get("/top/playlist?limit=30&order=hot&cat=古风&offset="+(this.pages-1)*30).then(res=>{
                // console.log(res);
                this.loadFlag=false;
                this.hotResult=this.hotResult.concat(res.data.playlists);
            })
        },
        // jmp(id){
        //     this.axios.get("/playlist/detail?id="+id).then(res=>{
        //         console.log(res);
        //     })
        // }
    },

    created(){
        this.hotLoad();
        // this.axios.get("/playlist/detail?id=24381616").then(res=>{
        //     console.log(res);
        // })
    },
    mounted(){
        let that=this;
        window.onscroll = function(){
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
            if(Math.ceil(scrollTop)+windowHeight==scrollHeight){
                that.pages++;
                that.loadFlag = true;
                that.hotLoad();
            }
        }
    }
}
</script>
<style lang="less" scoped>
.chinese-box{
    width: 100vw;
    box-sizing: border-box;
    padding-top: 2vh;
    .songMenuMain{
        width: 100vw;
        box-sizing: border-box;
        .songMenuMain-ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            li{
                width: 32vw;
            }
        }
    }
}
</style>