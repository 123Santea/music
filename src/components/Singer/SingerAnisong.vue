<template>
    <ol>
        <li v-for="(i,index) in songArr" :key="index">
            <SongPattern :item="i" :index="index" :singSize="singSize"></SongPattern>
        </li>
    </ol>
</template>
<script>
import SongPattern from '../SongMenu/SongPattern'
export default {
    props:["songArr","singSize"],
    components:{
        SongPattern,
    }
}
</script>
<style lang="less" scoped>
ol{
    li{
        padding: 6px 0;
        box-sizing: border-box;
        padding-right: 0.3rem;
    }
}
</style>