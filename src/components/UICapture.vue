<template>
  <div id="capture" ref="capture">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UICapture',
  data: function(){
    return {
    }
  },
  mounted(){ 
    // const mount = this.$el as HTMLElement;
    // const mount = document;
    const mount = this.$refs.capture as HTMLElement;

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
  left: 0px;
  z-index: 9999;
  cursor: crosshair;
  }
</style>
