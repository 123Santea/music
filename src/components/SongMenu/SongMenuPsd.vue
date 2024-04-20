<template>
    <div class="songMenuHotTop" @click="flag?jpm12():jpm(item.id)">
        <div class="hotTopImg">
            <img :src="item.coverImgUrl+'?imageView=1&type=webp&thumbnail=247x0'" :class="flag?'img1':'img2'">
            <span><i class="iconfont icon-bofang"></i>{{item.playCount|convert}}</span>
            <i class="iconfont icon-bofang2 i2" v-if="!flag"></i>
        </div>
        <div class="hotTopTitle" v-if="!flag">
            {{item.name}}
        </div>
    </div>
</template>
<script>
export default {
    props:["item","flag"],
    methods:{
        jpm(ids){
            // this.axios.get("http://music.kele8.cn/playlist/detail?id="+ids).then(res=>{
            // this.axios.get("/playlist/detail?id="+ids).then(res=>{
            //     let playlist = JSON.stringify(res.data.playlist);
            //     this.$router.push({
            //         name:'SongListDetails',
            //         query:{
            //             playlist:playlist,
            //         }
            //     })
            // })
            this.$router.push({
                name:'SongListDetails',
                query:{
                    id:ids,
                }
            })
        },
        jpm12(){
            return;
        }
    },
    filters:{
        convert(val){
            if(val<100000){
                return val;
            }else if(val<100000000){
                return (val/10000).toFixed(2)+"万";
            }else{
                return (val/100000000).toFixed(2)+"亿";
            }
        }
    },
}
</script>
<style lang="less" scoped>
.songMenuHotTop{
            border-radius: 15px;
            background-color: #FFFFFF;
            .hotTopImg{
                position: relative;
                // width:6rem;
                // height:6rem;
                .img2{
                    border-radius: 12px 12px 0 0;
                    vertical-align: middle;
                }
                .img1{
                    border-radius: 15px;
                    vertical-align: middle;
                }
                span{
                    position: absolute;
                    top: 3px;
                    right: 8px;
                    color: #fff;
                    font-size: 0.1rem;
                    background-color: rgba(0,0,0,0.3);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0.1rem 0.3rem;
                    font-size:0.22rem;
                    border-radius: 15px;
                }
                i.i2{
                    font-size: 1.3rem;
                    position: absolute;
                    right: 10px;
                    bottom: 10px;
                    color: #fff;
                }
            }
            .hotTopTitle{
                font-size: 12px;
                padding: 5px 0;
                text-align: left;
                padding-bottom: 3vh;
                // display: -webkit-box;
                // -webkit-line-clamp: 1;
                // -webkit-box-orient: vertical;
                // overflow: hidden;
                white-space:nowrap;
   overflow:hidden;
   text-overflow:ellipsis;
            }
        }
</style>