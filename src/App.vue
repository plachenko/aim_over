<template>
  <div style="height: 100%">
    <Builder v-if="DBGBuilder" />

    <!-- Start Button -->
    <div id="startCont" v-show="!running">
      <div style="text-align: center; width: 200px;">
        <div>
          <h1>AIM OVER</h1>
          <span v-if="targetsHit > 1">Targets Hit: {{targetsHit}} / {{numTargets}}</span>
          <span v-if="targetsHit > 1">Accuracy: {{targetHitPercent}}%</span>
        </div>
        <div id="start" class="btn" style="float: left;" @click="onStart">start</div>
      </div>
    </div>

    <div id="targetCont" ref="targetCont" v-show="running && targetArr">

      <Target 
        v-show="!target.hit && target.id+1 == time" 
        v-for="target in targetArr" 
        :key="target.id" 
        :pos="target" 
        @on-hit="onHit(target.id)" 
        />

      <!-- Stats -->
      <div id="statsCont" v-if="running">
        <div>
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
import Builder from './components/builder/Builder.vue';

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
    Target,
    Builder
  },
  computed: {
    targetHitPercent(): number{
      const ratio = this.targetsHit / this.numTargets; 
      return (ratio * 100);
    }
  },
  data: function(){
    return{
      DBGBuilder: false,
      targetArr: [],
      tickTime: 900,
      numTargets: 10,
      targetsHit: 0,
      running: false,
      timer: 10,
      time: 0
    }
  },
  methods:{
    reset(){
      this.time = 10;
      this.targetsHit = 0;
      this.targetArr = [];
    },
    onStart(){
      this.running = true;
      this.reset();
      this.$nextTick(()=>{
        this.generateTargets();
      })
      this.timer = setInterval(() => {
        if(this.time <= 1){
          this.onEnd()
        }
        this.time--;
      }, this.tickTime)
    },
    generateTargets(){
      const contEl = this.$refs.targetCont as HTMLElement;
      for(let i = 0; i < this.numTargets; i++){
        const targetObj: TargetObj = {
          id: i,
          x: Math.round(Math.random() * (contEl.offsetWidth-30)), 
          y: Math.round(Math.random() * (contEl.offsetHeight-30)),
          hit: false
        };

        const tArr: TargetObj[] = this.targetArr;

        tArr.push(targetObj)
      }
    },
    onHit(i: number){
      const tObj: TargetObj = this.targetArr[i]
      tObj.hit = true;

      if(this.targetsHit >= this.targetArr.length-1){
        this.onEnd();
      }
      this.targetsHit ++;
    },
    onEnd(){
      this.running = false;
      clearInterval(this.timer);
      this.timer = 0;
    }
  },
  mounted(){
    document.addEventListener("keyup", (e)=>{
      switch(e.code){
        case 'KeyQ':
          this.DBGBuilder = !this.DBGBuilder;
          break;
      }
    });
    // this.onStart();
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
  bottom: -50px;
  width: 100%;
  border: 1px solid;
  box-sizing: border-box;
  padding: 10px;  
}

#targetCont{
  cursor: crosshair;
  border: 1px solid;
  width: 500px;
  height: 500px;
  position: relative;
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
