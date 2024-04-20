<template>
    <div>
        <div class="search-box" ref="searchBox">
            <div class="search-input-box">
                <div class="search-input-back">
                    <div class="search-ico"></div>
                    <input type="text" placeholder="搜索歌曲、歌手、专辑" class="search-input" v-model="keyword" @input="inputing=true">
                    <div class="search-iocr" v-show="keyword" @click="pruge"></div>
                </div>
            </div>
            <router-link class="search-input-butt" tag="div" to="/" v-show="!(keyword)">取消</router-link>
            <div class="search-input-butt" v-show="keyword" @click="change(keyword)">搜索</div>
        </div>
        <component :is="searchType" :keyword="this.keyword" @change="change" :node="node"></component>
        <Loading v-show="flag"></Loading>
        <!-- <HotSearch v-show="!(this.keyword)"></HotSearch>
        <SuggesList v-show="this.keyword&&this.inputing" :keyword="this.keyword" @change="change"></SuggesList>
        <SearchResults></SearchResults> -->
    </div>
</template>
<script>
// 搜索组件
import HotSearch from '../components/HotSearch'
// 搜索建议组件
import SuggesList from '../components/SuggesList'
// 搜索结果
import SearchResults from '../components/SearchResults'
import Loading from '../components/Loading'
export default {
    components:{
        HotSearch,
        SuggesList,
        SearchResults,
        Loading,
    },
    data(){
        return{
            keyword:null,
            inputing:false,
            searchType:"HotSearch",
            flag:true,
            node:null,
        }
    },
    watch:{
        keyword(val){
            if(val == ""){
                this.flag=false;
                this.searchType = "HotSearch";
            }else if(this.inputing){
                this.flag=false;
                this.searchType = "SuggesList";
            }
        }
    },
    created(){
        // 设置历史记录的cookie
        // this.$cookie.setCookie("hist",'');
    },
    mounted(){
        this.flag =false;
        // let that=this;
         this.node = this.$refs.searchBox;
        let top = this.node.offsetTop+this.node.offsetHeight-20;
        let that=this;
        window.onscroll = function(){
            //滚动条滚动时，距离顶部的距离
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(scrollTop>top){
                that.node.classList.add("active");
            }else{
                that.node.classList.remove("active");
            }
        }
    },
    methods:{
        change(val){
            this.flag=false;
            this.inputing =false;
            this.keyword = val;
            this.searchType = "SearchResults";
        },
        pruge(){
            this.keyword = "";
        }
    }
}
</script>
<style lang="less" scoped>
.search-box{
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    padding: 20px 0;
    padding-right: 2.3vw;
    background-color: #fff;
    &.active{
        position: fixed;
        top: 0;
        left: 0;
    }
    .search-input-box{
        height: 10.667vw;
        width: 90.467vw;
        position: relative;
        display: flex;
        justify-content: center;
        .search-input-back{
            width: 79.467vw;
            background: #f7f7f7;
            border-radius: 5.333vw;
            padding: 2.4vw;
            box-sizing: border-box;
            display: flex;
            .search-ico{
                margin: .533vw 2.133vw 0 1.067vw;
                width: 4.533vw;
                height: 4.533vw;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAulBMVEUAAAD///////+qqv+/v7+qqtW2traqqr+xscShrryqqramprylpbWnp7eqqrmlpbSjqrijqrekpLWhprejp7Sjp7OlpbShpLWipbShpLaipbSipLWipbWipLOjpbSipLWhprWjpbWipLOipbOipbSiprSipbShpbSipLSipLShpbOipLShpbOipLShpbShpbSipbShpLShpLSipbOipLOhpbSipbOipLShpLSiprSipbOipbSipLOhpLPPc6XZAAAAPXRSTlMAAQIDBAYHDA0TFRcfICEiJCctPD1AQUxVV1haYGVma3V/h5GZmp++wsjR09TW2t/g4eTr7O3u8ff4+fv8fREgdAAAAexJREFUWMPtmH9TgkAQhklEyiCJgFAJiEBMUkwlC7rv/7WauUPG+HVrnDPN1P65t/PAcbvv7cJx//Z37UJ1/DBO0jSJQ99RL04n9PRgh77ZLtB7JyEG9grV2MoewBnTDWqwzRSIGM1Ri81HEMZ4j1ptP6YzvKP4yDM1RRQVzfSiI7dHQfRnRejSkY5XJGdZLM36rZCCsbb48hpvrQsKZC+ZK9QtC25G39E4D9nqTRH6Ng9p/Lqj/FwWcvNz5EV+Rk0nnefHQmzb8WVOmTfkab4Xuf0A5XxHtbk7ILme6bRM0snX3dTVkU0e4NLz0SWRdk3tk7pdC3SIQPJlVVUGg+AtSHlZJNaoLAQk13kIhCcVEFS0kOiYA1MLh2hdWTFV8oYSDCKRaLWWHUG1L6p9bx+kFKVK9UveEHtNKMTE4WHJG2OvBoVoODwueRPsVaAQBYcnJW+KvSIUIuLw9BwQJtth8mGZHDGTZGOS9kwKkIkUMBGln8ijfh6hZnJlsLm8mFyjbC50UGtx80ppLbgJvcn5oDU5gHbrE9JAAhu/t2H3FhShl2HXZhhAmVDachiFMiDMYBTKqPIEpLQPTVAK1zOq45txqH0wpXWQPFCeea6DHSj3HAPKA9edkt12nL0fM/Rud57gr++uft1fhS/69e1IfVq+YAAAAABJRU5ErkJggg==);
                background-repeat: no-repeat;
                background-size: 4.533vw;
                background-position: 50%;
            }
            .search-input{
                background: none;
                outline: none;
                border: 0;
                width: 58.667vw;
                height: 5.867vw;
                padding-right: 2.4vw;
                box-sizing: border-box;
                font-size: 4.267vw;
                font-weight: 400;
                color: #000;
                line-height: 6vw;
            }
            .search-iocr{
                border-radius: 50%;
                width: 5.867vw;
                height: 5.867vw;
                background-color: #e6e6e6;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAMAAABGS8AGAAAAkFBMVEUAAAD////////////////n5+fo6Ojp6enm5ubn5+fo6Ojp6enp6enm5ubn5+fm5ubo6Ojn5+fm5ubn5+fn5+fn5+fn5+fn5+fn5+fm5ubm5ubm5ubn5+fn5+fn5+fn5+fm5ubm5ubm5ubm5ubm5ubn5+fm5ubn5+fp6enr6+vt7e34+Pj7+/v9/f3+/v7///8/U3W8AAAAJnRSTlMAAgMFBiAhIykrLFBRXF5mbXd8gImTlJ6pr8LFytLd3+Ts7u/5+5EBoAYAAAJ4SURBVFjDtZnZcqpAEIbHxKMoEiBoCCggLh2N4rz/24V4TFxCz97/bRdfUTPTO2NS9Tw/TvOiqjebuiryNPa9HrPWKMpW8EerLBrZUIdJCajKZGhGfQrmINE8eNLG9sMSFFSGfT3uyxIUtXzRwI5z0FA+VsQ+T7egpe30WYU7WIC2Fv/k3MkaDLSeyLivYKhXsffOwFgzgZ/338FC7+iT7llxWzL2zzOw1MzxvUlucAIO1PHqBmsX4PXgjx8vwIkWj949BUeaPsSzrSvw9j7W5eBM+V1cB4e6ifz9pUvw8uraIThV+JuPS7fg8id3B+BYwQWM1w8fos9x4/xS72D2zyM/HXbdtt3hxI+f2Jf/a6QE4/JvNfsu2745GzFycgZjV3fkKPnC5Ufs+s7ejB0h5xj5h8s5ds7ffh1hB3XCyFfuCfs2asEZZjzwbvKVyw/Yt1mbQVeYcdd0km+4zQ77dtVjHv5Q913kfcPxw7/KYz5okRW54LMYdMiqXIhZChpkZS6kstxxh1LntnmkAHWyOhcKVoE6WZ0LFatBnyznQs02oE1W4MJGBfxAVuG24Bo0yUrc9igqGnAlfW6GR1GoFFcml5dLXNr4uaXiIGTuILEwbFq4tC8K9DZByBOkJpuw2aYmPJnaBPpMlP5tUlMkKFiskulIVGJZpP9SWBRaFCyJsIy1KLGGosLboiici1sF8zI2EDc3xoX3b3ODtWOmrUIobyCNmpubBpKs5aVr0unGCmSDELrRDdmwiW48RjfQY+yNaARJNzQlG/PSDabpRumEw3/DdcVAac1EtGChWwkRLrEI1250i0LC1eblHrFl7JhZy2x9/AVTl5zIy7+EzAAAAABJRU5ErkJggg==);
                background-repeat: no-repeat;
                background-size: 5.867vw;
                background-position: 50%;
            }
        }
    }
    .search-input-butt{
        width: 9.867vw;
        height: 5.867vw;
        margin-top: 2.133vw;
        font-size: 4.267vw;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color: #262338;
        color: rgba(38,35,56,.5);
        line-height: 6vw;
        margin-left: -4vw;
    }
}
</style>