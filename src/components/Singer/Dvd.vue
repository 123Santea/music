<template>
    <div class="dvd-box" @click="jmp">
        <div class="dvdImg" :style="{backgroundImage:`url('${AlbumsArr.picUrl}?imageView=1&type=webp&thumbnail=247x0')`}"></div>
        <div class="dvdTitle">
            <div>
                <p>{{AlbumsArr.name}}</p>
                <p>{{AlbumsArr.publishTime|timestampToTime}}<span>{{AlbumsArr.size}}首</span></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:["AlbumsArr","albumSize"],
    created(){
        // console.log(this.AlbumsArr);
    },
    filters:{
        //将时间戳转换成正常时间格式
        timestampToTime(val) {
            // console.log(val);
            //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let date=val.toString().length >10 ? new Date(val) :new Date(val*1000)
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = (date.getDate()<10 ? '0'+date.getDate() :date.getDate()) + ' ';
            // let h = date.getHours() + ':';
            // let m = date.getMinutes() + ':';
            // let s = date.getSeconds();
            // console.log(Y+M+D);
            return Y+M+D;
        }
    },
    methods:{
        jmp(){
            this.axios.get("/album?id="+this.AlbumsArr.id).then(res=>{
                // console.log(res);
                let albums = JSON.stringify(res.data.album);
                let songs = JSON.stringify(res.data.songs);
                this.$router.push({
                    name:'Albums',
                    // params:{
                    //     albums:albums,
                    //     songs:songs
                    // },
                    query:{
                        albums:albums,
                        songs:songs
                    }
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
.dvd-box{
    display: flex;
    width: 100vw;
    box-sizing: border-box;
    padding-left: 2.5vw;
    .dvdImg{
        background-size: cover;
        border-radius: 15px;
        width: 5rem;
        height: 5rem;
        border: 1px solid #d4d4d4;
    }
    .dvdTitle{
        display: flex;
        align-items: center;
        margin-left: 2vw;
        div{
            p{
                text-align: left;
                padding: 3px 0;
            }
            p:first-child{
                font-size: 1rem;
                font-weight: 550;
            }
            p:last-child{
                font-size: 0.6rem;
            }
        }
    }
}
</style>