<template>
    <Type :item="item" :flag="flag" @areaChange="change"></Type>
</template>
<script>
import Type from '../Singer/SingerType'
export default {
    components:{
        Type,
    },
    props:["item"],
    data(){
        return{
            flag:true,
        }
    },
    methods:{
        change(val){
            this.$emit("areaChange",val);
        }
    }
}
</script>