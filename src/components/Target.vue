<template>
  <div @click="onHit" :style="style" ref="target" class="circ"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Target',
  props: {
    pos: Object,
  },
  computed: {
    style: () =>{
      // let pos = this.pos
      const x = Math.round(Math.random()*100)
      const y = Math.round(Math.random()*100)
      return `top: ${x}px, left: ${y}px`
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
      this.$emit('on-hit')
    }
  },
  mounted: function(){
    console.log(this.pos)
    console.log(this.$refs.target)
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
  background-color:#F00;
}
</style>
