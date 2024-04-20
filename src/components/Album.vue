<template>
    <div class="album-box">
        <div class="album-box1">
            <!-- 专辑 -->
            <template v-if="albumss">
            <div class="piccover">
                <img :src="albumss.picUrl">
            </div>
            <article class="describe">
                <h4>
                    <span>专辑：</span>
                    <span v-html="$options.filters.highlight1(albumss.name,keyword)"></span>
                </h4>
                <p>
                    <span class="album-songer" v-html="$options.filters.highlight1(albumss.artists[0].name,keyword)">
                        <!-- {{albumss.artists[0].name}} -->
                    </span>/
                    <template v-if="albumss.artists.length>1">
                         <span class="album-normal" v-html="$options.filters.highlight1(albumss.artists[1].name,keyword)">
                            {{albumss.artists[1].name}}
                        </span>
                    </template>
                </p>
            </article>
            </template>
            <!-- 歌手 -->
            <template v-if="superJunior">
            <div class="piccover1">
                <img :src="superJunior.picUrl">
            </div>
            <article class="describe">
                <h4>
                    <!-- 歌手：{{superJunior.name}} -->
                    <span>歌手：</span>
                    <span v-html="$options.filters.highlight1(superJunior.name,keyword)"></span>
                    <template v-if="superJunior.alias.length">  
                        <span>（<span v-html="$options.filters.highlight1(superJunior.alias[0],keyword)"></span>）</span>
                    </template>
                </h4>
            </article>
            </template>
            <i class="album-i"></i>
        </div>
    </div>
</template>
<script>
export default {
    props:["albumss","superJunior","keyword"],
    created(){
        // console.log("ablum里面的数据",this.album);
        // console.log("ablum里面的数据artist",this.artists);
    },
    filters:{
       highlight1(val,keyword){
           let reg = new RegExp(keyword,'g');
           if(reg.test(val)){
               return val.replace(reg,"<span class='focusrect'>"+keyword+"</span>");
           }else{
               return val;
           }
       },
   }
}
</script>
<style lang="less" scoped>
.album-box{
    position: relative;
    height: 66px;
    text-align: left;
    .album-box1{
        display: flex;
        align-items: center;
        height: 66px;
        margin-left: 10px;
        padding: 8px 10px 8px 0;
        box-sizing: border-box;
        .piccover{
            position: relative;
            width: 50px;
            height: 50px;
            margin-right: 15px;
            line-height: 0;
            &::after{
            content: "";
            position: absolute;
            top: 2px;
            right: -10px;
            width: 10px;
            height: 46px;
            background-repeat: no-repeat;
            background-size: 166px 97px;
            background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
            background-position: 0 -30px;
            }
            img{
                display: block;
                width: 100%;
            }
        }
        .piccover1{
            position: relative;
            width: 50px;
            height: 50px;
            margin-right: 15px;
            line-height: 0;
        }
        .describe{
            flex: 1;
            display: inline-block;
            width: 1%;
            h4{
                font-size: 17px;
                line-height: 30px;
                color: #333;
            }
            p{
                font-size: 12px;
                line-height: 15px;
                color: #999;
                width: 100%;
                display: inline-block;
                .album-songer{
                    // color: #507daf;
                }
            }
        }
        .album-i{
            margin-right: 8px;
            margin-left: 10px;
            flex: 0 0 auto;
            display: inline-block;
            width: 8px;
            height: 13px;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAyNiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWI5YjliIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTIuOTM5IDIzLjkzOUwxMy44NzkgMTMgMi45MzkgMi4wNjEiLz48L3N2Zz4=);
            vertical-align: middle;
            background-position: 0 0;
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
}
</style>