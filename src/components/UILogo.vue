<template>
  <div id="logo" class="overlay">
    <div class="text">
      <h1><span>AIM</span> <span>OVER</span></h1>
    </div>
    <div class="actions">
      <div class="btn" @click="$emit('btnEvt', 'play')">Play</div>
      <div class="btn" @click="$emit('btnEvt', 'record')">Record</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import gsap from 'gsap';

export default defineComponent({
  name: 'UILogo',
  data: function(){
    return {
    }
  },
  mounted(){
    gsap.set("h1 span", {y: "-=30", opacity: 0});
    gsap.set(".actions", {y: "+=50", opacity: 0});

    gsap.to("h1 span", {
      stagger: {
        each: .4,
        onStart: ()=>{
          gsap.from('#container', {backgroundColor: "rgb(255,0,0)", duration: .2})
        }
      }, 
      y: "+=30", 
      opacity: 1, 
      ease: "bounce.out", 
      duration: .4,
      delay: .8, 
      onComplete:()=>{
        gsap.to(".actions", {y: "-=10", opacity: 1, duration: .3})
      }
    });
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo{
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  }
  #logo h1{
    margin: 0px;
    padding: 0px;
    text-align: center;
    padding: 10px;
    flex: 1;
    }
    #logo span{
      display: inline-block;
    }
  .actions{
    flex-direction: row;
  }
</style>
