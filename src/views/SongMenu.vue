<template>
    <div class="songMenu-box" ref="songMenuBox">
        <div ref="songMenuNav" class="active">
            <Nav>歌单广场</Nav>
            <div class="songMenu-nav">
                <ul>
                    <router-link tag="li" :to="{name:'Hot',params:{'node':node}}">最热<i ref="i"></i></router-link>
                    <router-link tag="li" :to="{name:'Chinese',params:{'node':node}}">华语<i ref="i"></i></router-link>
                    <router-link tag="li" :to="{name:'Boutique',params:{'node':node}}">影视原声<i ref="i"></i></router-link>
                    <router-link tag="li" :to="{name:'Pop',params:{'node':node}}">流行<i ref="i"></i></router-link>
                    <router-link tag="li" :to="{name:'LightMusic',params:{'node':node}}">轻音乐<i ref="i"></i></router-link>
                    <router-link tag="li" :to="{name:'Antique',params:{'node':node}}">古风<i ref="i"></i></router-link>
                    <router-link tag="li" :to="{name:'RockRoll',params:{'node':node}}">摇滚<i ref="i"></i></router-link>
                </ul>
            </div>
        </div>
        <!-- <component :is="type"></component> -->
        <router-view></router-view>
    </div>
</template>
<script>
import Nav from '../components/topNav'
export default {
    created(){
        // this.axios.get("/top/playlist?limit=50&order=hot").then(res=>{
        //     console.log(res);
        // })
    },
    data(){
        return{
            type:"Hot",
            node:null,
        }
    },
    methods:{
    },
    components:{
        Nav,
    },
    mounted(){
        this.node = this.$refs.songMenuNav;
        this.$refs.songMenuBox.style.paddingTop=this.$refs.songMenuNav.offsetHeight+"px";
    }
}
</script>
<style lang="less" scoped>
.songMenu-box{
    width: 100vw;
    box-sizing: border-box;
    .active{
            position: fixed;
            width: 100vw;
            top: 0;
            left: 0;
            background-color: #fff;
            z-index: 999;
        }
    .songMenu-nav{
        height: 6vh;
        width: 100vw;
        box-sizing: border-box;
        // padding: 10px 0;
        border-bottom: 1px solid #bcc7c7;
        ul{
            display: flex;
            justify-content:space-around;
            // display: inline-block;
            overflow-x: auto;
            height: 6vh;
            li{
                // float: left;
                // margin: 0 2rem;
                // width: 250rem;
                color: #434343;
                position: relative;
                &.router-link-exact-active{
                    color:black;
                    font-size: 17px;
                    font-weight: 500;
                    i{
                    width: 120%;
                    height: 5px;
                    background-color: rgba(119,210,251,0.7);
                    border-radius: 15px;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
                }
            }
        }
    }
}
</style>