<template>
  <div id="capture" ref="capture">
    <audio>
      <!-- <source src="../assets/nomaready.mkv" /> -->
    </audio>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UIAudio',
  data: function(){
    return {
      ctx: {} as AudioContext,
      osc: {} as OscillatorNode,
      loop: 0 
    }
  },
  unmounted(){
    const osc: any = this.osc;

    clearInterval(this.loop);
    this.loop = 0;
    osc?.stop();
  },
  mounted(){ 
    this.ctx = new window.AudioContext();

    let osc2 = this.ctx.createOscillator();

    this.osc = this.ctx.createOscillator();
    this.osc.frequency.value = 0;
    this.osc.connect(this.ctx.destination);
    this.osc.start(0);
    let i = 200;

    this.loop = setInterval(() => {
      if(i < 300){
        this.osc.frequency.value = i;
        i += 1;
      }else{
        i = 200;
      }
      console.log(i)
    }, 100);

    const mount = document;

    mount.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    })

    mount.addEventListener('pointerdown', (e) => {
      this.$emit('pntEvt', e);
    })

    mount.addEventListener('pointerup', (e) => {
      this.$emit('pntEvt', e);
    })
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#capture{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  z-index: 9998;
  cursor: crosshair;
  }
</style>
