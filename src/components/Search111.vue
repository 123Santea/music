<template>
<div class="box">
    <div class="search">
        <div class="ico">
            <img src="http://h5static.kuwo.cn/www/kuwo-m/img/search@2x.0cd8619.png">
        </div>
        <span class="span">搜索你想听的歌曲</span>
    </div>
</div>
</template>
<style lang="less" scoped>
.box{
    width: 100vw;
    box-sizing: border-box;
    padding: 10px 0 15px 0;
    display: flex;
    justify-content: center;
    // background: #F9FAFB;
    .search{
        width: 91.467vw;
        height: 8.533vw;
        background: #f2f4f5;
        border-radius: 5.333vw;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        .ico{
            width: 4.533vw;
            height: 4.533vw;
        }
        .span{
            display: inline-block;
            width: 34.133vw;
            font-size: 3.733vw;
            font-family: PingFangSC-Regular,PingFang SC;
            font-weight: 400;
            // line-height: normal;
            color: #a1a4b3;
            text-align: center;
        }
    }
}
</style>
<script>
export default {
    name:"Search",
}
</script>