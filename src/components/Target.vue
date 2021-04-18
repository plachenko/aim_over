<template>
  <div :style="styleObj" @click="onHit" ref="target" class="circ"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Target',
  props: {
    pos: Object,
  },
  computed: {
    styleObj(): string{
      let pos = this.pos || {x: 0, y: 0, hit: false}
      return `top: ${pos.x}px; left: ${pos.y}px;`
    }
  },
  data: function(){
    return {
      amtHit: 0
    }
  },
  methods:{
    onHit(){
      this.amtHit++;
      this.$emit('on-hit', this)
    }
  },
  mounted: function(){
    // console.log(this.k)
    //
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.circ{
  position: absolute;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  z-index: 9999;
  background-color:#F00;
}
</style>
