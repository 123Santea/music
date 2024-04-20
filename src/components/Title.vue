<template>
    <h2><slot></slot></h2>
</template>
<script>
export default {
    name:"Title" 
}
</script>
<style lang="less" scoped>
h2{
    font-weight: inherit;
    font-style: normal;
    font-family: '思源黑体';
    padding: 0.2rem;
    text-align: left;
    color: #333;
    position: relative;
    padding-left: 9px;
    margin-bottom: 14px;
    font-size: 1rem !important;
    // height: 20px;
    // line-height: 20px;
    &::after{
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -9px;
    width: 2px;
    height: 16px;
    // background-color:  #77d2fb;
    background-color:  #007aff;;
    }
}
</style>