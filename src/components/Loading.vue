<template>
    <transition name="fade">
        <section>
            <div class="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
            </div>
        </section>
    </transition>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style scoped lang="css">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
section {
    width: 5rem;
    height: 5rem;
    border-radius: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.3);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loading {
    width: 100%;
    text-align: center;
}
.loading span{
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background: lightgreen;
    -webkit-animation: load 1s ease infinite;
    margin-left: 5px;
}
@-webkit-keyframes load{
    0%,100%{
        height: 40px;
        background: lightgreen;
    }
    50%{
        height: 70px;
        margin: -15px 0;
        background: lightblue;
    }
}
.loading span:nth-child(2){
    animation-delay:0.2s;
}
.loading span:nth-child(3){
    animation-delay:0.4s;
}
.loading span:nth-child(4){
    animation-delay:0.6s;
}
.loading span:nth-child(5){
    animation-delay:0.8s;
}
</style>