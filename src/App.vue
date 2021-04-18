<template>
  <div style="height: 100%">

    <!-- Start Button -->
    <div id="startCont" v-show="!running">
      <div id="start" class="btn" @click="onStart">start</div>
    </div>

    <div v-show="running && showTargets.length">

      <Target v-for="(target, i) in showTargets" :key="i" :pos="target" />

      <!-- Stats -->
      <div id="statsCont" v-if="running">
        <div style="background-color: #F00; padding: 10px;">
          <span>time: {{time}}</span>
          <span>hit: {{targetsHit}}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Target from './components/Target.vue';

export interface TargetObj{
  x: number,
  y: number,
  hit: boolean
}

let targetArr: TargetObj[] = []

export default defineComponent({
  name: 'App',
  components: {
    Target
  },
  computed: {
    showTargets(){
      return targetArr
    },
    targetsHit(){
      return 0;
    }
  },
  data: function(){
    return{
      running: false,
      time: 0,
      timer: 0
    }
  },
  methods:{
    onStart(){
      this.running = true;
      this.timer = setInterval(() => {
        this.time++;
      }, 1000)
    },
    onHit(){
      console.log('hitted')
    }
  },
  mounted: function(){
    for(let i = 0; i< 10; i++){
      const targetObj: TargetObj = {
        x: Math.round(Math.random()*300), 
        y: Math.round(Math.random()*300),
        hit: false
      };

      targetArr.push(targetObj)
    }
  }
});
</script>

<style>
body, html{
  padding: 0px;
  margin: 0px;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
  height: 100%;
  }

#startCont{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  }

#statsCont{
  position: absolute;
  bottom: 0px;
}

.btn{
  background-color: #00C;
  color: #FFF;
  float: left;
  padding: 10px 40px;
  }
  .btn:hover{
    background-color: #C00;
    cursor: crosshair;
    }

</style>
