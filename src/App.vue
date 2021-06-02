<template>
  <div id="container">
    <!-- <Builder v-if="DBGBuilder" /> -->
    <UILogo v-if="states[state] == 'logo'" @btnEvt="btnEvt" />
    <span>{{currentTime}}</span>
    <div v-if="states[state] == 'playing'" id="playContainer">
      <div v-for="(target, key) in targetArr" :key="key">
        <UITarget v-if="(currentTime >= target.time) && !target.hit" :pos="target.position" @onHit="onHit(target.id)" />
      </div>
      <!-- <UITarget  v-for="(i, key) in 10" :id="key" :key="key" /> -->
      <div v-show="bFlash" id="flash" />
    </div>
    <div id="recordingDiv" v-show="states[state] == 'recording'">
      <UICapture @pntEvt="pntEvt" />
      <span>Recording</span>
      <UITarget v-for="(target, key) in targetArr" :pos="target.position" :id="key" :key="key" />
    </div>

    <UIAudio v-if="audioOn" />

    <!-- Start Button -->
    <!--
    <div id="startCont" v-show="!running">
      <div style="text-align: center; width: 200px;">
        <div>
          <h1>AIM OVER</h1>
          <span>Targets Hit: {{targetsHit}} / {{numTargets}}</span>
          <span v-if="targetsHit > 1">Accuracy: {{targetHitPercent}}%</span>
        </div>
        <div id="start" class="btn" style="float: left;" @click="onStart">start</div>
        <div id="record" class="btn" style="float: left;" @click="onRecord">record</div>
      </div>
    </div>

    <div>

    </div>

    <div id="targetCont" ref="targetCont" v-show="running && targetArr">


      <UITarget 
        v-show="checkTargetShow(target)"
        v-for="target in targetArr" 
        :key="target.id" 
        :pos="target" 
        @on-hit="onHit(target.id, $event)" 
        />
        -->

      <!-- Stats -->
      <!--
      <div id="statsCont" v-if="running">
        <div>
          <span>time: {{time}}</span>
          <span>hit: {{targetsHit}}</span>
        </div>
      </div>

    </div>
    -->
      <!-- <div id="container"> </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Target from './classes/Target';
import UITarget from './components/UITarget.vue';
// import Builder from './components/builder/Builder.vue';
import UILogo from './components/UILogo.vue';
import UICapture from './components/UICapture.vue';
import UIAudio from './components/UIAudio.vue';
import gsap from 'gsap';
import Position from './classes/Position';

export default defineComponent({
  name: 'App',
  components: {
    UILogo,
    UICapture,
    UITarget,
    UIAudio
    // Builder
  },
  watch: {
    state: function(val) {
      switch(val){
        case 0:
          window.cancelAnimationFrame(this.loop);
          this.loop = 0;
          return;
        case 1: 
          this.currentTime = 0;
          this.loop = window.requestAnimationFrame(this.step)
          break;
        case 2:
          this.currentTime = 0;
          this.loop = window.requestAnimationFrame(this.step)
          console.log('resetting array!');
          this.targetArr = [];
          break;
      }
    }
  },
  computed: {
    targetHitPercent(): number{
      const ratio = this.targetsHit / this.numTargets; 
      return (ratio * 100);
    },
  },
  data: function(){
    return{
      DBGBuilder: false,
      targetArr: [],
      numTargets: 10,
      targetsHit: 0,
      iFlashTime: 30,
      iClickNum: 0,
      states: [
        'logo',
        'playing',
        'recording'
      ],
      state: 0,
      bPlaying: false,
      bRecording: false,
      audioOn: false,
      running: false,
      bFlash: false,
      timer: 0,
      tickTime: 900,
      time: 0,
      timeEnd: 0,
      logo: true,
      timeIncrement: 1,
      targetId: 0,
      loop: 0,
      currentTime: 0
    }
  },
  methods:{
    checkTargetShow(target: Target): boolean{
      // let res = true;
      let res = !target.hit && target.time+1 == this.time;

      return res;
    },
    step(){
      setTimeout(()=>{
        this.currentTime++;
        if(this.loop){
          window.requestAnimationFrame(this.step)
        }
      }, 10)
    },
    pntEvt(e: any){
      const target = new Target(this.targetId, e.offsetX, e.offsetY, this.currentTime);

      if(e.pressure){
        this.addTarget(target)
      }
      
      // this.targetArr.push({pos: pos});
    },
    btnEvt(e: any){
      switch(e){
        case 'play':
          this.state = 1;
          // this.play();
          break;
        case 'record':
          this.state = 2;
          // this.record()
          break;
        case 'audio':
          this.audioOn = !this.audioOn;
          return;
      }

      gsap.to('#logo', {opacity: 0, duration: .1, delay: .1})
      gsap.from('#container', {backgroundColor: "rgb(255,0,0)", duration: .2, onComplete:()=>{
        this.logo = false;
      }})
    },
    play(){
      console.log('play');

      // State 1 is PLAY -- TODO: Look into labels.
      // this.state = 1;

    },
    record(){
      console.log('record');

      // State 2 is RECORDING -- TODO: Look into labels.
      // this.state = 2;

      this.loop = requestAnimationFrame((step)=>{
        setTimeout(() => {
          (step);
          this.time++;
        }, 100);
      });
    },
    reset(){
      this.time = 90;
      this.targetsHit = 0;
      this.targetArr = [];
    },
    endRecord(){
      this.bRecording = false;
      this.running = false;
      this.iClickNum = 0;
      this.onEnd();
    },
    onRecord(){
      // Record targets

      this.running = true;
      this.bRecording = true;
      // this.startTimer();
    },
    onStart(){
      // Start game

      this.running = true;
      this.reset();

      this.$nextTick(()=>{
        this.generateTargets();
        this.startTimer();
      })
    },
    updateTime(increment: number){
      this.timeEnd += increment;
    },
    startTimer(){
      this.timer = setInterval(() => {
        if(this.timeEnd && this.time >= this.timeEnd){
          this.onEnd();
        }

        this.time += this.timeIncrement;
      }, this.tickTime)
    },
    addTarget(target: Target){
      const tArr: Target[] = this.targetArr;
      tArr.push(target)
      this.targetId ++;
    },
    generateTargets(){
      const contEl = this.$refs.targetCont as HTMLElement;
      
      for(let i = 0; i < this.numTargets; i++){

        const x = Math.round(Math.random() * (contEl.offsetWidth-30)); 
        const y = Math.round(Math.random() * (contEl.offsetHeight-30)); 
        const target = new Target(i, x, y, i)
        this.addTarget(target)
      }
    },
    onHit(i: number){
      gsap.from('#container', {backgroundColor: "rgb(255,0,0)", duration: .2});

      const tObj: Target = this.targetArr[i];
      tObj.hit = true;

      this.targetsHit ++;
    },
    onEnd(){
      this.running = false;
      clearInterval(this.timer);
      this.timer = 0;
    },
    onSpeed(amt = 1){
      this.tickTime = (amt * 1000);
    },
  },
  mounted(){
    document.addEventListener("keyup", (e) => {
      switch(e.code){
        case 'Space':
          this.state = 0
          this.endRecord();
          break;
        case 'KeyQ':
          this.DBGBuilder = !this.DBGBuilder;
          break;
      }
    });
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
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  }
  #container{
    width: 400px;
    height: 400px;
    border: 1px solid;
    position: relative;
    box-sizing: border-box;
    }

.overlay{
  position: relative;
  z-index: 9999;
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
  margin: 5px;
  }
  .btn:hover{
    background-color: #C00;
    cursor: crosshair;
    }

#flash{
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color:#F00;
}
#recordingDiv{
  width:100%;
  height:100%;
  overflow: hidden;
}

#playContainer{
  position: absolute;
  width:100%;
  height: 100%;
  left: 0px;
  top:0px;
}
</style>
