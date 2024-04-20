<template>
    <div class="Type">
        <ul class="TypeUl">
            <li v-for="(i,index) in item" :key="index" @click="change($event,index)" :class="{'active':index==0}">
                {{i.name}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:["item","flag"],
    methods:{
        change($event,index){
            let ul = $event.target.parentNode;
            let len = ul.children.length;
            for(let i=0;i<len;i++){
                ul.children[i].classList.remove("active");
            }
            ul.children[index].classList.add("active");
            let num = this.item[index].num;
            if(!this.flag){ //是性别选项
                this.$emit("typeChange",num);
            }else{ //国家
                this.$emit("areaChange",num);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.Type{
    width: 100vw;
    box-sizing: border-box;
    .TypeUl{
        display: flex;
        width: 100vw;
        box-sizing: border-box;
        padding: 1vh 0;
        padding-left: 3vw;
        li{
            padding: 1.5px 10px;
            border: 1px solid #ededef;
            border-radius: 12px;
            font-size: 0.8rem;
            margin-left: 2vw;
            &:first-child{
                margin-left: 0;
            }
        }
        li.active{
            background-color: #77d2fb;
            color: white;
        }
    }
}
</style>