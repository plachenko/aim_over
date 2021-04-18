<template>
  <div style="height: 100%">

    <!-- Start Button -->
    <div id="startCont" v-show="!running">
      <div style="text-align: center; width: 200px;">
        <div >
          <h1>AIM OVER</h1>
        </div>
        <div id="start" class="btn" style="float: left;" @click="onStart">start</div>
      </div>
    </div>

    <div v-if="running && targetArr" id="targetCont">

      <Target v-for="target in targetArr" v-show="!target.hit" @on-hit="onHit(target.id)" :key="target.id" :pos="target" />

      <!-- Stats -->
      <div id="statsCont" v-if="running">
        <div style="background-color: #F00; padding: 10px;">
          <span>time: {{time}}</span>
          <!-- <span>hit: {{targetsHit}}</span> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Target from './components/Target.vue';

export interface TargetObj{
  id: number,
  x: number,
  y: number,
  hit: boolean
}

// let targetArr: TargetObj[] = []

export default defineComponent({
  name: 'App',
  components: {
    Target
  },
  data: function(){
    return{
      targetArr: [],
      running: false,
      timer: 0,
      time: 0
    }
  },
  methods:{
    onStart(){
      this.running = true;
      this.timer = setInterval(() => {
        this.time++;
      }, 1000)
    },
    onHit(i: number){
      const tObj: TargetObj = this.targetArr[i]
      tObj.hit = true;
    }
  },
  mounted: function(){
    console.log(window.innerWidth, window.innerHeight)
    for(let i = 0; i< 10; i++){
      const targetObj: TargetObj = {
        id: i,
        x: Math.round(Math.random()*window.innerWidth), 
        y: Math.round(Math.random()*window.innerHeight),
        hit: false
      };
      
      const tArr: TargetObj[] = this.targetArr;

      tArr.push(targetObj)
    }
  }
});
</script>

<style>
body, html{
  padding: 0px;
  margin: 0px;
  height: 100%;
  overflow: hidden;
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

#targetCont{
  cursor: crosshair;
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
