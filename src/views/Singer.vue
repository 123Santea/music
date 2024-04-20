<template>
    <div class="singer-box" ref="singerBox">
        <div class="fixed" ref="fixed">
            <Nav>歌手库</Nav>
            <div class="singer-topNav">
                <Type :item="singerSortList.type" @typeChange="change1"></Type>
                <SingerArea :item="singerSortList.area" @areaChange="change2"></SingerArea>
            </div>
        </div>
        <div class="songerList" v-show="singerResult.length">
            <ul class="songerListUl">
                <li v-for="(i,index) in singerResult" :key="index" @click="jmp(i)">
                    <div class="singerLeft" :style="{backgroundImage:`url('${i.picUrl}?imageView=1&type=webp&thumbnail=247x0')`}">
                    </div>
                    <div class="singerRight">
                        <p>{{i.name}}</p>
                        <p v-if="i.alias.length">别名:<span v-for="(t,index) in i.alias" :key="index"><i v-if="index>=1">，</i>{{t}}</span></p>
                        <p>专辑：{{i.albumSize}}</p>
                        <p>歌曲：{{i.musicSize}}</p>
                    </div>
                    <i class="i"></i>
                </li>
            </ul>
            <p v-show="!flag">全部加载完，到底啦</p>
        </div>
        <Load v-if="loadFlag"></Load>
    </div>
</template>
<script>
import Nav from '@/components/topNav'
import Type from '@/components/Singer/SingerType'
import SingerArea from '@/components/Singer/SingerArea'
import Load from '@/components/Loading'
export default {
    components:{
        Nav,
        Type,
        SingerArea,
        Load,
    },
    data(){
        return{
            singerSortList:{
                type:[
                    {num:"1",name:"男歌手"},
                    {num:"2",name:"女歌手"},
                    {num:"3",name:"乐队"}
                ],
                area:[
                    {num:"100",name:"华语"},
                    {num:"200",name:"欧美"},
                    {num:"600",name:"日本"},
                    {num:"700",name:"韩国"},
                    {num:"400",name:"其他"},
                ]
            },
            type:"1",
            area:"100",
            singerResult:[],
            pages:1,
            loadFlag:true,
            flag:true,
        }
    },
    methods:{
        change1(val){
            this.type=val;
            // console.log("type=>",this.type);
        },
        change2(val){
            this.area=val;
            // console.log("area=>",this.area);
        },
        singerLoad(type,area){
            // console.log(type,area);
            let str=area+type;
            // console.log("str=>",str);
            this.axios.get("http://music.kele8.cn/artist/list?limit=30&cat="+str+"&offset="+(this.pages-1)*30).then(res=>{
                this.loadFlag=false;
                this.singerResult=this.singerResult.concat(res.data.artists);
                // console.log(res.data.artists);
                if(!(res.data.artists.length>0)){
                    this.flag = false;
                }
            })
        },
        jmp(item){
            // console.log(item);
            // 获取歌手单曲
            // this.axios.get("/artists?id="+item.id).then(res=>{
            //     let artist = res.data.artist;
            //     let hotSongs = res.data.hotSongs;
            //     console.log(artist);
            //     console.log(hotSongs);
            // })
            let id=item.id;
            // this.axios.get("/artists?id="+id).then(res=>{
            //     console.log(res);
            //     let artist = res.data.artist
            //     let hotSongs = res.data.hotSongs;
            // })
            this.$router.push({name:'Details',params:{
                id:id,
            }})
        },
    },
    created(){
        this.singerResult=[];
        this.singerLoad(this.type,this.area);
        // let time = new Date("1609430400000");
        // console.log(time);
    },
    watch:{
        type(){
            // console.log("type值改变了");
            this.singerResult=[];
            this.loadFlag=true;
            this.flag=true;
            this.pages=1;
            // console.log(this.type,this.area);
            this.singerLoad(this.type,this.area);
        },
        area(){
            // console.log("area值改变了");
            this.singerResult=[];
            this.loadFlag=true;
            this.flag=true;
            this.pages=1;
            // console.log(this.type,this.area);
            this.singerLoad(this.type,this.area);
        }
    },
    mounted(){
        let that=this;
        let node = this.$refs.fixed;
        this.$refs.singerBox.style.paddingTop = node.offsetHeight+"px";
        window.onscroll = function(){
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
            if(Math.ceil(scrollTop)+windowHeight==scrollHeight&&that.flag){
                that.pages++;
                that.loadFlag = true;
                that.singerLoad(that.type,that.area);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.singer-box{
    width: 100vw;
    box-sizing: border-box;
    .fixed{
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 99;
    }
    .songerList{
        .songerListUl{
            li{
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding: 5px 18px;
                .singerLeft{
                    width: 5rem;
                    height: 5rem;
                    border-radius: 50%;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center center;
                }
                .singerRight{
                    flex: 1;
                    text-align: left;
                    box-sizing: border-box;
                    padding-left: 3vw;
                    p:nth-child(1){
                        // font-size: 18px;
                        font-size: 1rem;
                        font-weight: 600;
                    }
                    p:not(:first-child){
                        color: #717774;
                        font-size: 0.5rem;
                    }
                }
                .i{
                    width: 8px;
                    height: 13px;
                    display: block;
                    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAyNiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWI5YjliIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTIuOTM5IDIzLjkzOUwxMy44NzkgMTMgMi45MzkgMi4wNjEiLz48L3N2Zz4=);
                    background-position: 0 0;
                    background-size: contain;
                    background-repeat: no-repeat;
                }
            }
        }
    }
}
</style>