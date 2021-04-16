<template>
  <div>
    <Target :pos="{x:0, y:0}" @on-hit="onHit(e)" />
    <Target :pos="{x:10, y:10}" @on-hit="onHit(e)" />
    <Target :pos="{x:30, y:30}" @on-hit="onHit(e)" />
    <!-- <Target v-for="(target, idx) in targetArr" :key="idx" :pos="{x:0, y:0}" @on-hit="onHit(e)" /> -->
    <div style="position: absolute; bottom: 0px;">
      Hit: {{  }}

    </div>
    <canvas ref="can"></canvas>
  </div>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Target from './components/Target.vue';

export default defineComponent({
  name: 'App',
  components: {
    Target
  },
  data: function(){
    return{
      targetArr: []
    }
  },
  methods:{
    onHit(){
      console.log('hitted')
    }
  },
  mounted: function(){
    for(let i = 0; i< 10; i++){
      const targetObj : {x: number, y: number, hit: boolean}[] = [{
        x: 0, 
        y: 0,
        hit: false
      }];

      // this.targetArr.push(targetObj)
    }

    setInterval(()=>{
      console.log('here');
    }, 1000)
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  cursor: crosshair;
}
</style>
