<template>
    <div class="songMenu-top">
        <!-- !tracers -->
        <template v-if="!tracers"> 
            <router-link class="iconfont icon-arrowLeft bl" tag="i" to="/" ref="ito"></router-link>
        </template>
        <template v-if="tracers">
            <router-link class="iconfont icon-arrowLeft ff" tag="i" :to="{path:tracers}" :style="{color:color}"></router-link>
        </template>
        <p :class="tracers?'p1':'p2'"><slot></slot></p>
    </div>
</template>
<script>
export default {
    props:["tracers","color"],
    created(){
        // console.log("进去之后=>",this.tracers);
    },
    mounted(){
        // let i = this.$refs.ito;
        // if(this.color){
        //     i.style.color=this.color;
        // }
    },
    // watch:{
    //     color(){
    //         let i = this.$refs.ito;
    //         if(this.color){
    //             i.style.color=this.color;
    //         }
    //     }
    // }
}
</script>
<style lang="less" scoped>
.songMenu-top{
        text-align: left;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 3px 5px;
        // position: fixed;
        // top: 0;
        // left: 0;
        // z-index: 99;
        .iconfont{
            font-size: 24px;
            font-weight: bolder;
        }
        .bl{
            color: #323836;
        }
        .ff{
            color: #fff;
        }
        .p2{
            // padding-left: 0.7rem;
            flex: 1;
            text-align:center;
            font-weight: 500;
            color: black;
        }
        .p1{
            flex: 1;
            box-sizing: border-box;
            padding-left: 0.7rem;
            text-align:center;
            font-weight: 500;
            color: white;
        }
    }
</style>