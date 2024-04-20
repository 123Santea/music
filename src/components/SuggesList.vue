<template>
    <div class="suggesList-box">
        <Loading v-if="!suggesList.order"></Loading>
        <!-- <Loading v-if="!suggesList"></Loading> -->
        <div class="suggesList-title">
            <span>搜索：</span>
            <span class="suggesList-title-first">{{this.keyword}}</span>
        </div>
        <div class="suggesList-song">
            <ul>
                <!-- 歌曲 -->
                <template v-if="suggesList.songs">
                    <li v-for="i in suggesList.songs" :key="i.id" class="suggesList-song-ul-li" @click="$emit('change',i.name)">
                        {{i.name}}
                    </li>
                </template>
                <!-- 歌手 -->
                <template v-if="suggesList.artists">
                    <li v-for="i in suggesList.artists" :key="i.id" class="suggesList-song-ul-li" @click="$emit('change',i.name)">
                        {{i.name}}
                    </li>
                </template>
                <!-- 专辑 -->
                <template v-if="suggesList.albums">
                    <li v-for="i in suggesList.albums" :key="i.id" class="suggesList-song-ul-li" @click="$emit('change',i.name)">
                        {{i.name}}
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
import Loading from '../components/Loading'
export default {
    components:{
        Loading,
    },
    props:["keyword"],
    data(){
        return{
            // 搜索建议清单
            suggesList:{},
            // typeIndex:1,
            timer:null,
        }
    },
    watch:{
        keyword(val){
            // console.log(val);
            clearTimeout(this.timer);
            this.timer=setTimeout(() => {
                this.suggesListRender(val);
            }, 250);
        }
    },
    created(){
        // let str=localStorage.getItem("hist");
        // str = str+this.keyword;
        // localStorage.setItem("hist", str);
        // console.log(this.keyword);
        this.suggesListRender(this.keyword);
    },
    methods:{
        suggesListRender(val){
            if(val == "") return false;
            this.axios.get("http://musicapi.leanapp.cn/search/suggest?keywords= "+val+"&type=mobile").then(res=>{
                // console.log(res);
                this.suggesList=[]; //清空原数组
                this.suggesList = res.data.result;
            })
        }
    }
}
</script>
<style lang="less" scoped>
.suggesList-title{
    width: 100vw;
    height: 13.333vw;
    font-size: 3.267vw;
    font-weight: 400;
    line-height: 13.333vw;
    padding: 0 5.333vw;
    box-sizing: border-box;
    color: #000;
    text-align: left;
    .suggesList-title-first{
        color: #598ecd;
    }
}
.suggesList-song-ul-li{
    font-size: 4.267vw;
    color: #000;
    width: 100vw;
    height: 13.333vw;
    line-height: 13.333vw;
    padding-left: 12vw;
    padding-right: 5.333vw;
    box-sizing: border-box;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAulBMVEUAAAD///////+qqv+/v7+qqtW2traqqr+xscShrryqqramprylpbWnp7eqqrmlpbSjqrijqrekpLWhprejp7Sjp7OlpbShpLWipbShpLaipbSipLWipbWipLOjpbSipLWhprWjpbWipLOipbOipbSiprSipbShpbSipLSipLShpbOipLShpbOipLShpbShpbSipbShpLShpLSipbOipLOhpbSipbOipLShpLSiprSipbOipbSipLOhpLPPc6XZAAAAPXRSTlMAAQIDBAYHDA0TFRcfICEiJCctPD1AQUxVV1haYGVma3V/h5GZmp++wsjR09TW2t/g4eTr7O3u8ff4+fv8fREgdAAAAexJREFUWMPtmH9TgkAQhklEyiCJgFAJiEBMUkwlC7rv/7WauUPG+HVrnDPN1P65t/PAcbvv7cJx//Z37UJ1/DBO0jSJQ99RL04n9PRgh77ZLtB7JyEG9grV2MoewBnTDWqwzRSIGM1Ri81HEMZ4j1ptP6YzvKP4yDM1RRQVzfSiI7dHQfRnRejSkY5XJGdZLM36rZCCsbb48hpvrQsKZC+ZK9QtC25G39E4D9nqTRH6Ng9p/Lqj/FwWcvNz5EV+Rk0nnefHQmzb8WVOmTfkab4Xuf0A5XxHtbk7ILme6bRM0snX3dTVkU0e4NLz0SWRdk3tk7pdC3SIQPJlVVUGg+AtSHlZJNaoLAQk13kIhCcVEFS0kOiYA1MLh2hdWTFV8oYSDCKRaLWWHUG1L6p9bx+kFKVK9UveEHtNKMTE4WHJG2OvBoVoODwueRPsVaAQBYcnJW+KvSIUIuLw9BwQJtth8mGZHDGTZGOS9kwKkIkUMBGln8ijfh6hZnJlsLm8mFyjbC50UGtx80ppLbgJvcn5oDU5gHbrE9JAAhu/t2H3FhShl2HXZhhAmVDachiFMiDMYBTKqPIEpLQPTVAK1zOq45txqH0wpXWQPFCeea6DHSj3HAPKA9edkt12nL0fM/Rud57gr++uft1fhS/69e1IfVq+YAAAAABJRU5ErkJggg==);
    background-size: 4.533vw 4.533vw;
    background-position: 5.333vw;
    background-repeat: no-repeat;
    text-align: left;
}
</style>